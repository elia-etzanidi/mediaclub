package com.mediaclub.backend.service;

import com.mediaclub.backend.dto.MessageResponse;
import com.mediaclub.backend.dto.NotificationEvent;
import com.mediaclub.backend.dto.ReactionSummary;
import com.mediaclub.backend.entity.*;
import com.mediaclub.backend.exception.BadRequestException;
import com.mediaclub.backend.exception.ForbiddenException;
import com.mediaclub.backend.exception.ResourceNotFoundException;
import com.mediaclub.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ReactionRepository reactionRepository;
    private final ChannelRepository channelRepository;
    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;
    private final NotificationPreferenceService notificationPreferenceService;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public MessageResponse sendMessage(Long channelId, Long senderId, String content) {
        Channel channel = getChannelOrThrow(channelId);
        requireCanPost(channel, senderId);

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Message message = Message.builder()
                .channel(channel)
                .sender(sender)
                .content(content)
                .build();
        message = messageRepository.save(message);

        notifyOtherMembers(channel, sender, content);

        return MessageResponse.from(message, List.of());
    }

    /**
     * Pushes a lightweight notification to every other club member who isn't muted
     * for this channel - lets the frontend show a badge/toast even if they're not
     * actively looking at this channel right now.
     */
    private void notifyOtherMembers(Channel channel, User sender, String content) {
        Long clubId = channel.getClub().getId();
        String preview = content.length() > 100 ? content.substring(0, 100) + "..." : content;

        List<Membership> members = membershipRepository.findByClubId(clubId);
        for (Membership member : members) {
            Long memberId = member.getUser().getId();
            if (memberId.equals(sender.getId())) {
                continue; // don't notify yourself
            }
            if (notificationPreferenceService.isChannelMuted(memberId, channel.getId(), clubId)) {
                continue;
            }

            NotificationEvent event = new NotificationEvent(
                    NotificationEvent.NotificationType.CHANNEL_MESSAGE,
                    clubId,
                    channel.getId(),
                    null,
                    channel.getName(),
                    sender.getUsername(),
                    preview,
                    Instant.now()
            );
            messagingTemplate.convertAndSendToUser(member.getUser().getUsername(), "/queue/notifications", event);
        }
    }

    public List<MessageResponse> getHistory(Long channelId, Long requesterId, int limit) {
        Channel channel = getChannelOrThrow(channelId);
        requireCanRead(channel, requesterId);

        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "sentAt"));
        List<Message> messages = messageRepository.findByChannelIdOrderBySentAtDesc(channelId, pageable);

        // reverse so the response is oldest -> newest, like a normal chat scroll
        return messages.stream()
                .sorted(Comparator.comparing(Message::getSentAt))
                .map(m -> MessageResponse.from(m, getReactionSummaries(m.getId())))
                .toList();
    }

    @Transactional
    public void deleteMessage(Long messageId, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        Long clubId = message.getChannel().getClub().getId();
        boolean isOwnMessage = message.getSender().getId().equals(requesterUserId);
        boolean isModerator = isModeratorOf(clubId, requesterUserId);

        if (!isOwnMessage && !isModerator && !requesterIsGlobalAdmin) {
            throw new ForbiddenException("You don't have permission to delete this message");
        }

        message.setDeleted(true);
        messageRepository.save(message);
    }

    @Transactional
    public List<ReactionSummary> addReaction(Long messageId, Long userId, String emoji) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));

        requireCanRead(message.getChannel(), userId);

        boolean alreadyReacted = reactionRepository.findByMessageIdAndUserIdAndEmoji(messageId, userId, emoji).isPresent();
        if (alreadyReacted) {
            throw new BadRequestException("You already reacted with this emoji");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Reaction reaction = Reaction.builder()
                .message(message)
                .user(user)
                .emoji(emoji)
                .build();
        reactionRepository.save(reaction);

        return getReactionSummaries(messageId);
    }

    @Transactional
    public List<ReactionSummary> removeReaction(Long messageId, Long userId, String emoji) {
        Reaction reaction = reactionRepository.findByMessageIdAndUserIdAndEmoji(messageId, userId, emoji)
                .orElseThrow(() -> new ResourceNotFoundException("Reaction not found"));

        reactionRepository.delete(reaction);

        return getReactionSummaries(messageId);
    }

    // --- internal helpers ---

    private List<ReactionSummary> getReactionSummaries(Long messageId) {
        List<Reaction> reactions = reactionRepository.findByMessageId(messageId);

        Map<String, List<Reaction>> grouped = reactions.stream()
                .collect(Collectors.groupingBy(Reaction::getEmoji, LinkedHashMap::new, Collectors.toList()));

        return grouped.entrySet().stream()
                .map(entry -> new ReactionSummary(
                        entry.getKey(),
                        entry.getValue().size(),
                        entry.getValue().stream().map(r -> r.getUser().getId()).toList()
                ))
                .toList();
    }

    private Channel getChannelOrThrow(Long channelId) {
        return channelRepository.findById(channelId)
                .orElseThrow(() -> new ResourceNotFoundException("Channel not found"));
    }

    /**
     * General channel is readable by anyone (even non-members), matching the
     * "browse before you join" design. Every other channel type requires membership.
     */
    private void requireCanRead(Channel channel, Long userId) {
        if (channel.getType() == ChannelType.GENERAL) {
            return;
        }
        boolean isMember = membershipRepository.existsByUserIdAndClubId(userId, channel.getClub().getId());
        if (!isMember) {
            throw new ForbiddenException("You must join this club to view this channel");
        }
    }

    /**
     * Anyone can post in general/spoilers/requests as long as they're a member.
     * The info channel is read-only for regular members - only moderators/admins can post there.
     */
    private void requireCanPost(Channel channel, Long userId) {
        boolean isMember = membershipRepository.existsByUserIdAndClubId(userId, channel.getClub().getId());
        if (!isMember) {
            throw new ForbiddenException("You must join this club to post here");
        }

        if (channel.getType() == ChannelType.INFO && !isModeratorOf(channel.getClub().getId(), userId)) {
            throw new ForbiddenException("Only moderators can post in the info channel");
        }
    }

    private boolean isModeratorOf(Long clubId, Long userId) {
        return membershipRepository.findByUserIdAndClubId(userId, clubId)
                .map(m -> m.getRole() == MembershipRole.MODERATOR)
                .orElse(false);
    }
}
