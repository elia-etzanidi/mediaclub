package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.NotificationPreference;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationPreferenceResponse {

    private Long clubId;
    private Long channelId; // null means this row is the club-level default
    private boolean muted;

    public static NotificationPreferenceResponse from(NotificationPreference pref) {
        return new NotificationPreferenceResponse(
                pref.getClub().getId(),
                pref.getChannel() != null ? pref.getChannel().getId() : null,
                pref.isMuted()
        );
    }
}
