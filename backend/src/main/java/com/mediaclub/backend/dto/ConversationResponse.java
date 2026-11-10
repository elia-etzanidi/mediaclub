package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Conversation;
import com.mediaclub.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class ConversationResponse {

    private Long id;
    private Long otherUserId;
    private String otherUsername;
    private String otherAvatarUrl;
    private User.UserStatus otherStatus;
    private Instant createdAt;
    private String lastMessage;
    private Instant lastMessageAt;

    public static ConversationResponse from(Conversation conversation, Long requestingUserId) {
        return from(conversation, requestingUserId, null, conversation.getCreatedAt());
    }

    public static ConversationResponse from(Conversation conversation, Long requestingUserId, String lastMessage, Instant lastMessageAt) {
        User other = conversation.getUserA().getId().equals(requestingUserId)
                ? conversation.getUserB()
                : conversation.getUserA();

        return new ConversationResponse(
                conversation.getId(),
                other.getId(),
                other.getUsername(),
                other.getAvatarUrl(),
                other.getStatus() != null ? other.getStatus() : User.UserStatus.OFFLINE,
                conversation.getCreatedAt(),
                lastMessage,
                lastMessageAt != null ? lastMessageAt : conversation.getCreatedAt()
        );
    }
}
