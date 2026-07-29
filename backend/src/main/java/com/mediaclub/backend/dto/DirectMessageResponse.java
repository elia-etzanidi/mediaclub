package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.DirectMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class DirectMessageResponse {

    private Long id;
    private Long conversationId;
    private Long senderId;
    private String senderUsername;
    private String content;
    private Instant sentAt;
    private Instant editedAt;
    private boolean deleted;

    public static DirectMessageResponse from(DirectMessage message) {
        return new DirectMessageResponse(
                message.getId(),
                message.getConversation().getId(),
                message.getSender().getId(),
                message.getSender().getUsername(),
                message.isDeleted() ? "[message deleted]" : message.getContent(),
                message.getSentAt(),
                message.getEditedAt(),
                message.isDeleted()
        );
    }
}

