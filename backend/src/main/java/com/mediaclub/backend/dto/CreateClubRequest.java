package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.ExternalSource;
import com.mediaclub.backend.entity.MediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateClubRequest {

    @NotBlank
    private String name;

    @NotNull
    private MediaType mediaType;

    @NotNull
    private ExternalSource externalSource;

    @NotBlank
    private String externalId;

    private String coverImageUrl;

    private String description;

    private String releaseDate;
}
