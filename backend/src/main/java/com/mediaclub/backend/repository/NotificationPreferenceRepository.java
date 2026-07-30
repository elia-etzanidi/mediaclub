package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.NotificationPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationPreferenceRepository extends JpaRepository<NotificationPreference, Long> {

    // channel-specific override row
    Optional<NotificationPreference> findByUserIdAndChannelId(Long userId, Long channelId);

    // club-level default row (channel is null)
    Optional<NotificationPreference> findByUserIdAndClubIdAndChannelIsNull(Long userId, Long clubId);

    List<NotificationPreference> findByUserId(Long userId);

    void deleteByClubId(Long clubId);

    void deleteByChannelId(Long channelId);
}
