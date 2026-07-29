package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Optional<Membership> findByUserIdAndClubId(Long userId, Long clubId);

    boolean existsByUserIdAndClubId(Long userId, Long clubId);

    List<Membership> findByClubId(Long clubId);

    List<Membership> findByUserId(Long userId);

    // used for the searchable member list (case-insensitive username match)
    List<Membership> findByClubIdAndUser_UsernameContainingIgnoreCase(Long clubId, String usernameQuery);

    void deleteByClubId(Long clubId);
}
