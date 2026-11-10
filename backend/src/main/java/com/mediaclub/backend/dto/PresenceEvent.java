package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PresenceEvent {
    private Long clubId;
    private Long userId;
    private String username;
    private PresenceEventType type;
    private String role;

    public PresenceEvent(Long clubId, Long userId, String username, PresenceEventType type) {
        this(clubId, userId, username, type, null);
    }

    public enum PresenceEventType {
        ONLINE, OFFLINE, JOINED, LEFT, ROLE_CHANGED
    }
}
