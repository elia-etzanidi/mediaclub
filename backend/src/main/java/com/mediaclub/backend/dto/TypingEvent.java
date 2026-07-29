package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TypingEvent {
    private Long channelId;
    private Long userId;
    private String username;
    private boolean typing; // true = started typing, false = stopped
}
