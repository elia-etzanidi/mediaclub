package com.mediaclub.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "clubs", uniqueConstraints = {
        // prevents two clubs being created for the exact same external title
        @UniqueConstraint(columnNames = {"external_source", "external_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g. "Dune"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType mediaType;

    @Enumerated(EnumType.STRING)
    @Column(name = "external_source", nullable = false)
    private ExternalSource externalSource;

    // the ID from Open Library / TMDB / RAWG - used to prevent duplicate clubs
    @Column(name = "external_id", nullable = false)
    private String externalId;

    private String coverImageUrl;

    @Column(length = 2000)
    private String description;

    private String releaseDate; // stored as string since APIs return varying formats (year-only, full date, etc.)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }
}