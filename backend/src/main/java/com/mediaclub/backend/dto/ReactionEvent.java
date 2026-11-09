package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReactionEvent {
    private Long messageId;
    private Long channelId;
    private List<ReactionSummary> reactions;
}
