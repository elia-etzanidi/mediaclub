package com.mediaclub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.mediaclub.backend.entity.ChannelType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateChannelRequest {

    @NotBlank
    private String name;

    @NotNull
    private ChannelType type;
}