package com.mediaclub.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StartConversationRequest {

    @NotNull
    private Long recipientUserId;
}

