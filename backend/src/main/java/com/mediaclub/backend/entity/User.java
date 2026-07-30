package com.mediaclub.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private UserStatus status = UserStatus.OFFLINE;

    @Column(nullable = false)
    @Builder.Default
    private boolean isGlobalAdmin = false;

    @Column(nullable = false)
    @Builder.Default
    private boolean dmNotificationsMuted = false;

    private Instant lastSeen;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        if (this.status == null) {
            this.status = UserStatus.OFFLINE;
        }
    }

    public enum UserStatus {
        ONLINE, OFFLINE
    }
}
