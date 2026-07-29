package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@AllArgsConstructor
public class MessageResponse {

    private Long id;
    private Long channelId;
    private Long senderId;
    private String senderUsername;
    private String content;
    private Instant sentAt;
    private Instant editedAt;
    private boolean deleted;
    private List<ReactionSummary> reactions;

    public static MessageResponse from(Message message, List<ReactionSummary> reactions) {
        return new MessageResponse(
                message.getId(),
                message.getChannel().getId(),
                message.getSender().getId(),
                message.getSender().getUsername(),
                message.isDeleted() ? "[message deleted]" : message.getContent(),
                message.getSentAt(),
                message.getEditedAt(),
                message.isDeleted(),
                reactions
        );
    }
}
