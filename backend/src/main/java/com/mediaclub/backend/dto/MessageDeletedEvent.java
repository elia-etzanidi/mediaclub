package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDeletedEvent {
    private Long messageId;
    private Long channelId;
}
