package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PresenceEvent {
    private Long clubId;
    private Long userId;
    private String username;
    private PresenceEventType type;

    public enum PresenceEventType {
        ONLINE, OFFLINE, JOINED, LEFT
    }
}
