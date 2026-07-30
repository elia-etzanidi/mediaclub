package com.mediaclub.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/**
 * A single mute setting for a user. Two kinds of row:
 *  - channel != null: mutes one specific channel (overrides the club-level default)
 *  - channel == null, club != null: mutes every channel in that club by default,
 *    unless a channel-level row exists overriding it
 * DM notifications are NOT stored here - see User.dmNotificationsMuted, since DMs
 * aren't club-scoped.
 */
@Entity
@Table(name = "notification_preferences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    // null = this row is a club-level default; set = this row overrides one specific channel
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @Column(nullable = false)
    private boolean muted;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        this.updatedAt = Instant.now();
    }
}
