package com.mediaclub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class NotificationSettingsResponse {
    private boolean dmNotificationsMuted;
    private List<NotificationPreferenceResponse> preferences;
}
