package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Channel;
import com.mediaclub.backend.entity.Club;
import com.mediaclub.backend.entity.ExternalSource;
import com.mediaclub.backend.entity.MediaType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@AllArgsConstructor
public class ClubResponse {

    private Long id;
    private String name;
    private MediaType mediaType;
    private ExternalSource externalSource;
    private String externalId;
    private String coverImageUrl;
    private String description;
    private String releaseDate;
    private Long createdByUserId;
    private String createdByUsername;
    private Instant createdAt;
    private List<ChannelResponse> channels;
    private int memberCount;

    public static ClubResponse from(Club club, List<Channel> channels, int memberCount) {
        return new ClubResponse(
                club.getId(),
                club.getName(),
                club.getMediaType(),
                club.getExternalSource(),
                club.getExternalId(),
                club.getCoverImageUrl(),
                club.getDescription(),
                club.getReleaseDate(),
                club.getCreatedBy().getId(),
                club.getCreatedBy().getUsername(),
                club.getCreatedAt(),
                channels.stream().map(ChannelResponse::from).toList(),
                memberCount
        );
    }
}
