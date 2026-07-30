package com.mediaclub.backend.service;

import com.mediaclub.backend.dto.NotificationPreferenceResponse;
import com.mediaclub.backend.dto.NotificationSettingsResponse;
import com.mediaclub.backend.entity.Channel;
import com.mediaclub.backend.entity.Club;
import com.mediaclub.backend.entity.NotificationPreference;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.exception.ResourceNotFoundException;
import com.mediaclub.backend.repository.ChannelRepository;
import com.mediaclub.backend.repository.ClubRepository;
import com.mediaclub.backend.repository.NotificationPreferenceRepository;
import com.mediaclub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationPreferenceService {

    private final NotificationPreferenceRepository notificationPreferenceRepository;
    private final ChannelRepository channelRepository;
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public NotificationSettingsResponse getSettings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<NotificationPreferenceResponse> preferences = notificationPreferenceRepository.findByUserId(userId).stream()
                .map(NotificationPreferenceResponse::from)
                .toList();

        return new NotificationSettingsResponse(user.isDmNotificationsMuted(), preferences);
    }

    @Transactional
    public void setClubMute(Long userId, Long clubId, boolean muted) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new ResourceNotFoundException("Club not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        NotificationPreference pref = notificationPreferenceRepository.findByUserIdAndClubIdAndChannelIsNull(userId, clubId)
                .orElseGet(() -> NotificationPreference.builder().user(user).club(club).build());

        pref.setMuted(muted);
        notificationPreferenceRepository.save(pref);
    }

    @Transactional
    public void setChannelMute(Long userId, Long channelId, boolean muted) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new ResourceNotFoundException("Channel not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        NotificationPreference pref = notificationPreferenceRepository.findByUserIdAndChannelId(userId, channelId)
                .orElseGet(() -> NotificationPreference.builder()
                        .user(user)
                        .club(channel.getClub())
                        .channel(channel)
                        .build());

        pref.setMuted(muted);
        notificationPreferenceRepository.save(pref);
    }

    @Transactional
    public void setDmMute(Long userId, boolean muted) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setDmNotificationsMuted(muted);
        userRepository.save(user);
    }

    /**
     * Resolution order: a channel-specific row always wins if one exists; otherwise
     * fall back to the club-level default; otherwise not muted.
     */
    @Transactional(readOnly = true)
    public boolean isChannelMuted(Long userId, Long channelId, Long clubId) {
        return notificationPreferenceRepository.findByUserIdAndChannelId(userId, channelId)
                .map(NotificationPreference::isMuted)
                .orElseGet(() -> notificationPreferenceRepository.findByUserIdAndClubIdAndChannelIsNull(userId, clubId)
                        .map(NotificationPreference::isMuted)
                        .orElse(false));
    }

    @Transactional(readOnly = true)
    public boolean isDmMuted(Long userId) {
        return userRepository.findById(userId)
                .map(User::isDmNotificationsMuted)
                .orElse(false);
    }
}
