package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Membership;
import com.mediaclub.backend.entity.MembershipRole;
import com.mediaclub.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class MembershipResponse {

    private Long userId;
    private String username;
    private String avatarUrl;
    private MembershipRole role;
    private User.UserStatus status;
    private Instant joinedAt;

    public static MembershipResponse from(Membership membership) {
        return new MembershipResponse(
                membership.getUser().getId(),
                membership.getUser().getUsername(),
                membership.getUser().getAvatarUrl(),
                membership.getRole(),
                membership.getUser().getStatus() != null ? membership.getUser().getStatus() : User.UserStatus.OFFLINE,
                membership.getJoinedAt()
        );
    }
}
