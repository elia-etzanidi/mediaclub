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
    private Instant createdAt;

    public static ConversationResponse from(Conversation conversation, Long requestingUserId) {
        User other = conversation.getUserA().getId().equals(requestingUserId)
                ? conversation.getUserB()
                : conversation.getUserA();

        return new ConversationResponse(
                conversation.getId(),
                other.getId(),
                other.getUsername(),
                other.getAvatarUrl(),
                conversation.getCreatedAt()
        );
    }
}
