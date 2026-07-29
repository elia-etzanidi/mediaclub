package com.mediaclub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddReactionRequest {

    @NotBlank
    private String emoji;
}
