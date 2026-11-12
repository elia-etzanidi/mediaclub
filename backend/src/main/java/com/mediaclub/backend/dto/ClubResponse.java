package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Channel;
import com.mediaclub.backend.entity.Club;
import com.mediaclub.backend.entity.ExternalSource;
import com.mediaclub.backend.entity.MediaType;
import com.mediaclub.backend.entity.Membership;
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
    private List<MembershipResponse> members;
    private Instant joinedAt;

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
                club.getCreatedBy() != null ? club.getCreatedBy().getId() : null,
                club.getCreatedBy() != null ? club.getCreatedBy().getUsername() : null,
                club.getCreatedAt(),
                channels != null ? channels.stream().map(ChannelResponse::from).toList() : List.of(),
                memberCount,
                List.of(),
                null
        );
    }

    public static ClubResponse from(Club club, List<Channel> channels, List<Membership> memberships) {
        return from(club, channels, memberships, null);
    }

    public static ClubResponse from(Club club, List<Channel> channels, List<Membership> memberships, Instant joinedAt) {
        return new ClubResponse(
                club.getId(),
                club.getName(),
                club.getMediaType(),
                club.getExternalSource(),
                club.getExternalId(),
                club.getCoverImageUrl(),
                club.getDescription(),
                club.getReleaseDate(),
                club.getCreatedBy() != null ? club.getCreatedBy().getId() : null,
                club.getCreatedBy() != null ? club.getCreatedBy().getUsername() : null,
                club.getCreatedAt(),
                channels != null ? channels.stream().map(ChannelResponse::from).toList() : List.of(),
                memberships != null ? memberships.size() : 0,
                memberships != null ? memberships.stream().map(MembershipResponse::from).toList() : List.of(),
                joinedAt
        );
    }
}
