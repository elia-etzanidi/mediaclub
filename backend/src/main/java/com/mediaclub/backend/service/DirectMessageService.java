package com.mediaclub.backend.service;

import com.mediaclub.backend.dto.ConversationResponse;
import com.mediaclub.backend.dto.DirectMessageResponse;
import com.mediaclub.backend.dto.NotificationEvent;
import com.mediaclub.backend.entity.Conversation;
import com.mediaclub.backend.entity.DirectMessage;
import com.mediaclub.backend.entity.Membership;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.exception.BadRequestException;
import com.mediaclub.backend.exception.ForbiddenException;
import com.mediaclub.backend.exception.ResourceNotFoundException;
import com.mediaclub.backend.repository.ConversationRepository;
import com.mediaclub.backend.repository.DirectMessageRepository;
import com.mediaclub.backend.repository.MembershipRepository;
import com.mediaclub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DirectMessageService {

    private final ConversationRepository conversationRepository;
    private final DirectMessageRepository directMessageRepository;
    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;
    private final NotificationPreferenceService notificationPreferenceService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Starts a new conversation, or returns the existing one if these two users
     * already have one - this makes "start conversation" a safe, idempotent action
     * a frontend can call every time a user clicks "message" on someone's profile.
     */
    @Transactional
    public ConversationResponse startOrGetConversation(Long currentUserId, Long recipientUserId) {
        if (currentUserId.equals(recipientUserId)) {
            throw new BadRequestException("You can't start a conversation with yourself");
        }

        User recipient = userRepository.findById(recipientUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        requireSharedClub(currentUserId, recipientUserId);

        // always store the lower user id as userA - guarantees (A,B) and (B,A) never
        // become two different conversations, and lets the unique constraint do its job
        Long lowerId = Math.min(currentUserId, recipientUserId);
        Long higherId = Math.max(currentUserId, recipientUserId);

        Conversation conversation = conversationRepository.findByUserAIdAndUserBId(lowerId, higherId)
                .orElseGet(() -> {
                    User userA = userRepository.getReferenceById(lowerId);
                    User userB = userRepository.getReferenceById(higherId);
                    Conversation created = Conversation.builder().userA(userA).userB(userB).build();
                    return conversationRepository.save(created);
                });

        return ConversationResponse.from(conversation, currentUserId);
    }

    public List<ConversationResponse> listConversations(Long userId) {
        List<Conversation> conversations = conversationRepository.findByUserAIdOrUserBId(userId, userId);
        return conversations.stream()
                .map(c -> ConversationResponse.from(c, userId))
                .toList();
    }

    @Transactional
    public DirectMessageResponse sendMessage(Long conversationId, Long senderId, String content) {
        Conversation conversation = getConversationOrThrow(conversationId);
        requireParticipant(conversation, senderId);

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        DirectMessage message = DirectMessage.builder()
                .conversation(conversation)
                .sender(sender)
                .content(content)
                .build();
        message = directMessageRepository.save(message);

        User recipient = conversation.getUserA().getId().equals(senderId) ? conversation.getUserB() : conversation.getUserA();
        if (!notificationPreferenceService.isDmMuted(recipient.getId())) {
            String preview = content.length() > 100 ? content.substring(0, 100) + "..." : content;
            NotificationEvent event = new NotificationEvent(
                    NotificationEvent.NotificationType.DIRECT_MESSAGE,
                    null,
                    null,
                    conversationId,
                    sender.getUsername(),
                    sender.getUsername(),
                    preview,
                    Instant.now()
            );
            messagingTemplate.convertAndSendToUser(recipient.getUsername(), "/queue/notifications", event);
        }

        return DirectMessageResponse.from(message);
    }

    public List<DirectMessageResponse> getHistory(Long conversationId, Long requesterId, int limit) {
        Conversation conversation = getConversationOrThrow(conversationId);
        requireParticipant(conversation, requesterId);

        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "sentAt"));
        List<DirectMessage> messages = directMessageRepository.findByConversationIdOrderBySentAtDesc(conversationId, pageable);

        return messages.stream()
                .sorted(Comparator.comparing(DirectMessage::getSentAt))
                .map(DirectMessageResponse::from)
                .toList();
    }

    @Transactional
    public void deleteMessage(Long messageId, Long requesterId) {
        DirectMessage message = directMessageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        if (!message.getSender().getId().equals(requesterId)) {
            throw new ForbiddenException("You can only delete your own messages");
        }

        message.setDeleted(true);
        directMessageRepository.save(message);
    }

    /**
     * Returns both participants' usernames - used by the WebSocket layer to know who
     * to push a new message to in real time. Resolved here (inside this transactional
     * method) rather than handing back the raw entity, since the lazy-loaded User
     * proxies on Conversation can't be read once this method's session has closed.
     */
    @Transactional(readOnly = true)
    public Set<String> getParticipantUsernames(Long conversationId) {
        Conversation conversation = getConversationOrThrow(conversationId);
        return Set.of(conversation.getUserA().getUsername(), conversation.getUserB().getUsername());
    }

    // --- internal helpers ---

    private Conversation getConversationOrThrow(Long conversationId) {
        return conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));
    }

    private void requireParticipant(Conversation conversation, Long userId) {
        boolean isParticipant = conversation.getUserA().getId().equals(userId)
                || conversation.getUserB().getId().equals(userId);
        if (!isParticipant) {
            throw new ForbiddenException("You are not part of this conversation");
        }
    }

    /**
     * DMs are only allowed between people who share at least one club - matches the
     * "discover people through shared communities, not a cold directory" design.
     */
    private void requireSharedClub(Long userIdA, Long userIdB) {
        Set<Long> clubsForA = membershipRepository.findByUserId(userIdA).stream()
                .map(m -> m.getClub().getId())
                .collect(Collectors.toSet());

        boolean sharesClub = membershipRepository.findByUserId(userIdB).stream()
                .map(Membership::getClub)
                .anyMatch(club -> clubsForA.contains(club.getId()));

        if (!sharesClub) {
            throw new ForbiddenException("You can only message people who share a club with you");
        }
    }
}
