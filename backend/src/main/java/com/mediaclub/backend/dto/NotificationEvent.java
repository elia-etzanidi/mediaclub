package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class NotificationEvent {

    private NotificationType type;
    private Long clubId;        // null for DM notifications
    private Long channelId;     // null for DM notifications
    private Long conversationId; // null for channel notifications
    private String sourceName;  // channel name, or the DM sender's username
    private String senderUsername;
    private String contentPreview;
    private Instant sentAt;

    public enum NotificationType {
        CHANNEL_MESSAGE, DIRECT_MESSAGE
    }
}
