package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.Club;
import com.mediaclub.backend.entity.ExternalSource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findByExternalSourceAndExternalId(ExternalSource externalSource, String externalId);

    boolean existsByExternalSourceAndExternalId(ExternalSource externalSource, String externalId);
}
