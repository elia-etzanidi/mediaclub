package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.*;
import com.mediaclub.backend.security.CurrentUserProvider;
import com.mediaclub.backend.service.ClubService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<ClubResponse> createClub(@Valid @RequestBody CreateClubRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(clubService.createClub(request, userId));
    }

    @GetMapping("/{clubId}")
    public ResponseEntity<ClubResponse> getClub(@PathVariable Long clubId) {
        return ResponseEntity.ok(clubService.getClub(clubId));
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<Void> deleteClub(@PathVariable Long clubId) {
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        clubService.deleteClub(clubId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{clubId}/join")
    public ResponseEntity<MembershipResponse> joinClub(@PathVariable Long clubId) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(clubService.joinClub(clubId, userId));
    }

    @PostMapping("/{clubId}/leave")
    public ResponseEntity<Void> leaveClub(@PathVariable Long clubId) {
        Long userId = currentUserProvider.getCurrentUserId();
        clubService.leaveClub(clubId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{clubId}/members")
    public ResponseEntity<List<MembershipResponse>> getMembers(
            @PathVariable Long clubId,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(clubService.getMembers(clubId, search));
    }

    @PostMapping("/{clubId}/channels")
    public ResponseEntity<ChannelResponse> createChannel(
            @PathVariable Long clubId,
            @Valid @RequestBody CreateChannelRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        return ResponseEntity.ok(clubService.createChannel(clubId, request, userId, isAdmin));
    }

    @DeleteMapping("/channels/{channelId}")
    public ResponseEntity<Void> deleteChannel(@PathVariable Long channelId) {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        clubService.deleteChannel(channelId, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{clubId}/members/{targetUserId}/promote")
    public ResponseEntity<Void> promoteMember(@PathVariable Long clubId, @PathVariable Long targetUserId) {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        clubService.promoteToModerator(clubId, targetUserId, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{clubId}/members/{targetUserId}")
    public ResponseEntity<Void> kickMember(@PathVariable Long clubId, @PathVariable Long targetUserId) {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        clubService.kickMember(clubId, targetUserId, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }
}
