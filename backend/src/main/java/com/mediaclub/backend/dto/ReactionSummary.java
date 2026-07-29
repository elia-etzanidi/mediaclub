package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ReactionSummary {
    private String emoji;
    private int count;
    private List<Long> userIds; // who reacted with this emoji - lets the frontend highlight "you reacted"
}
