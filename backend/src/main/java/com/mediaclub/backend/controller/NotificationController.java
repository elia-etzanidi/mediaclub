package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.NotificationSettingsResponse;
import com.mediaclub.backend.dto.SetChannelMuteRequest;
import com.mediaclub.backend.dto.SetClubMuteRequest;
import com.mediaclub.backend.dto.SetDmMuteRequest;
import com.mediaclub.backend.security.CurrentUserProvider;
import com.mediaclub.backend.service.NotificationPreferenceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationPreferenceService notificationPreferenceService;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping("/preferences")
    public ResponseEntity<NotificationSettingsResponse> getPreferences() {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(notificationPreferenceService.getSettings(userId));
    }

    @PatchMapping("/preferences/clubs/{clubId}")
    public ResponseEntity<Void> setClubMute(@PathVariable Long clubId, @Valid @RequestBody SetClubMuteRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        notificationPreferenceService.setClubMute(userId, clubId, request.isMuted());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/preferences/channels/{channelId}")
    public ResponseEntity<Void> setChannelMute(@PathVariable Long channelId, @Valid @RequestBody SetChannelMuteRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        notificationPreferenceService.setChannelMute(userId, channelId, request.isMuted());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/preferences/dms")
    public ResponseEntity<Void> setDmMute(@Valid @RequestBody SetDmMuteRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        notificationPreferenceService.setDmMute(userId, request.isMuted());
        return ResponseEntity.noContent().build();
    }
}

