package com.mediaclub.backend.service;

import com.mediaclub.backend.dto.*;
import com.mediaclub.backend.entity.*;
import com.mediaclub.backend.exception.BadRequestException;
import com.mediaclub.backend.exception.ForbiddenException;
import com.mediaclub.backend.exception.ResourceNotFoundException;
import com.mediaclub.backend.repository.ChannelRepository;
import com.mediaclub.backend.repository.ClubRepository;
import com.mediaclub.backend.repository.MembershipRepository;
import com.mediaclub.backend.repository.MessageRepository;
import com.mediaclub.backend.repository.NotificationPreferenceRepository;
import com.mediaclub.backend.repository.ReactionRepository;
import com.mediaclub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ChannelRepository channelRepository;
    private final MembershipRepository membershipRepository;
    private final MessageRepository messageRepository;
    private final ReactionRepository reactionRepository;
    private final NotificationPreferenceRepository notificationPreferenceRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Creates a club and its 4 standard channels (general, spoilers, info, requests)
     * in a single atomic transaction. The creator automatically becomes MODERATOR.
     */
    @Transactional
    public ClubResponse createClub(CreateClubRequest request, Long creatorUserId) {
        if (clubRepository.existsByExternalSourceAndExternalId(request.getExternalSource(), request.getExternalId())) {
            throw new BadRequestException("A club for this title already exists - join it instead of creating a new one");
        }

        User creator = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String coverImageUrl = request.getCoverImageUrl();
        if (coverImageUrl == null || coverImageUrl.trim().isEmpty()) {
            coverImageUrl = generateClubAvatar(request.getName(), request.getMediaType());
        }

        Club club = Club.builder()
                .name(request.getName())
                .mediaType(request.getMediaType())
                .externalSource(request.getExternalSource())
                .externalId(request.getExternalId())
                .coverImageUrl(coverImageUrl)
                .description(request.getDescription())
                .releaseDate(request.getReleaseDate())
                .createdBy(creator)
                .build();
        club = clubRepository.save(club);

        // auto-create the 4 standard channels
        List<Channel> channels = List.of(
                Channel.builder().club(club).name("general").type(ChannelType.GENERAL).build(),
                Channel.builder().club(club).name("spoilers").type(ChannelType.SPOILERS).build(),
                Channel.builder().club(club).name("info").type(ChannelType.INFO).build(),
                Channel.builder().club(club).name("requests").type(ChannelType.REQUESTS).build()
        );
        channels = channelRepository.saveAll(channels);

        // creator becomes moderator automatically
        Membership founderMembership = Membership.builder()
                .user(creator)
                .club(club)
                .role(MembershipRole.MODERATOR)
                .build();
        founderMembership = membershipRepository.save(founderMembership);

        return ClubResponse.from(club, channels, List.of(founderMembership));
    }

    public ClubResponse getClub(Long clubId) {
        Club club = getClubOrThrow(clubId);
        List<Channel> channels = channelRepository.findByClubId(clubId);
        List<Membership> memberships = membershipRepository.findByClubId(clubId);
        return ClubResponse.from(club, channels, memberships);
    }

    public List<ClubResponse> getMyClubs(Long userId) {
        List<Membership> memberships = membershipRepository.findByUserId(userId);
        return memberships.stream().map(m -> {
            Club club = m.getClub();
            List<Channel> channels = channelRepository.findByClubId(club.getId());
            List<Membership> clubMemberships = membershipRepository.findByClubId(club.getId());
            return ClubResponse.from(club, channels, clubMemberships);
        }).toList();
    }

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll().stream().map(club -> {
            List<Channel> channels = channelRepository.findByClubId(club.getId());
            List<Membership> clubMemberships = membershipRepository.findByClubId(club.getId());
            return ClubResponse.from(club, channels, clubMemberships);
        }).toList();
    }

    @Transactional
    public MembershipResponse joinClub(Long clubId, Long userId) {
        Club club = getClubOrThrow(clubId);

        if (membershipRepository.existsByUserIdAndClubId(userId, clubId)) {
            Membership existing = membershipRepository.findByUserIdAndClubId(userId, clubId)
                    .orElseThrow(() -> new ResourceNotFoundException("Membership not found"));
            return MembershipResponse.from(existing);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Membership membership = Membership.builder()
                .user(user)
                .club(club)
                .role(MembershipRole.MEMBER)
                .build();
        membership = membershipRepository.save(membership);

        messagingTemplate.convertAndSend(
                "/topic/club/" + clubId + "/presence",
                new PresenceEvent(clubId, user.getId(), user.getUsername(), PresenceEvent.PresenceEventType.JOINED)
        );

        return MembershipResponse.from(membership);
    }

    @Transactional
    public void leaveClub(Long clubId, Long userId) {
        Membership membership = membershipRepository.findByUserIdAndClubId(userId, clubId)
                .orElseThrow(() -> new ResourceNotFoundException("You are not a member of this club"));
        boolean wasModerator = membership.getRole() == MembershipRole.MODERATOR;
        String username = membership.getUser().getUsername();
        membershipRepository.delete(membership);
        membershipRepository.flush();

        List<Membership> remaining = membershipRepository.findByClubId(clubId);
        if (remaining.isEmpty()) {
            // No users remain in this club - delete the club cleanly
            Club club = getClubOrThrow(clubId);
            reactionRepository.deleteByMessage_Channel_ClubId(clubId);
            messageRepository.deleteByChannel_ClubId(clubId);
            notificationPreferenceRepository.deleteByClubId(clubId);
            channelRepository.deleteByClubId(clubId);
            clubRepository.delete(club);
        } else {
            // Another user is also in that club - do not delete the club!
            // If the user who left was the only moderator, promote a remaining member
            boolean hasOtherModerator = remaining.stream()
                    .anyMatch(m -> m.getRole() == MembershipRole.MODERATOR);
            if (wasModerator && !hasOtherModerator) {
                Membership newMod = remaining.get(0);
                newMod.setRole(MembershipRole.MODERATOR);
                membershipRepository.save(newMod);
            }

            messagingTemplate.convertAndSend(
                    "/topic/club/" + clubId + "/presence",
                    new PresenceEvent(clubId, userId, username, PresenceEvent.PresenceEventType.LEFT)
            );
        }
    }

    public List<MembershipResponse> getMembers(Long clubId, String searchQuery) {
        getClubOrThrow(clubId); // 404 if club doesn't exist

        List<Membership> memberships = (searchQuery == null || searchQuery.isBlank())
                ? membershipRepository.findByClubId(clubId)
                : membershipRepository.findByClubIdAndUser_UsernameContainingIgnoreCase(clubId, searchQuery);

        return memberships.stream().map(MembershipResponse::from).toList();
    }

    @Transactional
    public ChannelResponse createChannel(Long clubId, CreateChannelRequest request, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        Club club = getClubOrThrow(clubId);
        requireModerator(clubId, requesterUserId, requesterIsGlobalAdmin);

        Channel channel = Channel.builder()
                .club(club)
                .name(request.getName())
                .type(request.getType())
                .build();
        channel = channelRepository.save(channel);

        return ChannelResponse.from(channel);
    }

    @Transactional
    public void deleteChannel(Long channelId, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new ResourceNotFoundException("Channel not found"));

        requireModerator(channel.getClub().getId(), requesterUserId, requesterIsGlobalAdmin);

        reactionRepository.deleteByMessage_ChannelId(channelId);
        messageRepository.deleteByChannelId(channelId);
        notificationPreferenceRepository.deleteByChannelId(channelId);
        channelRepository.delete(channel);
    }

    @Transactional
    public void promoteToModerator(Long clubId, Long targetUserId, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        requireModerator(clubId, requesterUserId, requesterIsGlobalAdmin);

        Membership targetMembership = membershipRepository.findByUserIdAndClubId(targetUserId, clubId)
                .orElseThrow(() -> new ResourceNotFoundException("That user is not a member of this club"));

        targetMembership.setRole(MembershipRole.MODERATOR);
        membershipRepository.save(targetMembership);
        membershipRepository.flush();

        messagingTemplate.convertAndSend(
                "/topic/club/" + clubId + "/presence",
                new PresenceEvent(clubId, targetUserId, targetMembership.getUser().getUsername(), PresenceEvent.PresenceEventType.ROLE_CHANGED, "moderator")
        );
    }

    @Transactional
    public void demoteToMember(Long clubId, Long targetUserId, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        requireModerator(clubId, requesterUserId, requesterIsGlobalAdmin);

        List<Membership> memberships = membershipRepository.findByClubId(clubId);
        long modCount = memberships.stream()
                .filter(m -> m.getRole() == MembershipRole.MODERATOR)
                .count();
        if (modCount <= 1) {
            throw new BadRequestException("A club must have at least one moderator");
        }

        Membership targetMembership = membershipRepository.findByUserIdAndClubId(targetUserId, clubId)
                .orElseThrow(() -> new ResourceNotFoundException("That user is not a member of this club"));

        targetMembership.setRole(MembershipRole.MEMBER);
        membershipRepository.save(targetMembership);
        membershipRepository.flush();

        messagingTemplate.convertAndSend(
                "/topic/club/" + clubId + "/presence",
                new PresenceEvent(clubId, targetUserId, targetMembership.getUser().getUsername(), PresenceEvent.PresenceEventType.ROLE_CHANGED, "member")
        );
    }

    @Transactional
    public void kickMember(Long clubId, Long targetUserId, Long requesterUserId, boolean requesterIsGlobalAdmin) {
        requireModerator(clubId, requesterUserId, requesterIsGlobalAdmin);

        Membership targetMembership = membershipRepository.findByUserIdAndClubId(targetUserId, clubId)
                .orElseThrow(() -> new ResourceNotFoundException("That user is not a member of this club"));

        membershipRepository.delete(targetMembership);
    }

    /**
     * Only global admins can delete a club entirely - too destructive for a single
     * per-club moderator to do unilaterally.
     */
    @Transactional
    public void deleteClub(Long clubId, boolean requesterIsGlobalAdmin) {
        if (!requesterIsGlobalAdmin) {
            throw new ForbiddenException("Only a global admin can delete a club");
        }
        Club club = getClubOrThrow(clubId);
        reactionRepository.deleteByMessage_Channel_ClubId(clubId);
        messageRepository.deleteByChannel_ClubId(clubId);
        notificationPreferenceRepository.deleteByClubId(clubId);
        membershipRepository.deleteByClubId(clubId);
        channelRepository.deleteByClubId(clubId);
        clubRepository.delete(club);
    }

    // --- internal helpers ---

    private Club getClubOrThrow(Long clubId) {
        return clubRepository.findById(clubId)
                .orElseThrow(() -> new ResourceNotFoundException("Club not found"));
    }

    /**
     * Throws ForbiddenException unless the user is a MODERATOR of this specific club,
     * or is a global admin (who can moderate every club).
     */
    private void requireModerator(Long clubId, Long userId, boolean isGlobalAdmin) {
        if (isGlobalAdmin) {
            return;
        }
        Membership membership = membershipRepository.findByUserIdAndClubId(userId, clubId)
                .orElseThrow(() -> new ForbiddenException("You must be a moderator of this club to do that"));

        if (membership.getRole() != MembershipRole.MODERATOR) {
            throw new ForbiddenException("You must be a moderator of this club to do that");
        }
    }

    public static String generateClubAvatar(String clubName, MediaType mediaType) {
        String letter = "C";
        if (clubName != null && !clubName.trim().isEmpty()) {
            String trimmed = clubName.trim();
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (Character.isLetterOrDigit(c)) {
                    letter = String.valueOf(Character.toUpperCase(c));
                    break;
                }
            }
        }
        String startColor = "%23005a56";
        String endColor = "%23003836";
        if (mediaType == MediaType.BOOK) {
            startColor = "%23f59e0b";
            endColor = "%23b45309";
        } else if (mediaType == MediaType.SHOW) {
            startColor = "%233f8f8f";
            endColor = "%23276060";
        } else if (mediaType == MediaType.GAME) {
            startColor = "%23818cf8";
            endColor = "%234f46e5";
        }

        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E"
                + "%3Cdefs%3E%3ClinearGradient id='cg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E"
                + "%3Cstop offset='0%25' stop-color='" + startColor + "'/%3E"
                + "%3Cstop offset='100%25' stop-color='" + endColor + "'/%3E"
                + "%3C/linearGradient%3E%3C/defs%3E"
                + "%3Crect width='100' height='100' rx='20' fill='url(%23cg)'/%3E"
                + "%3Ctext x='50%25' y='52%25' dominant-baseline='central' text-anchor='middle' fill='%23fafafa' "
                + "font-family='system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif' font-weight='700' font-size='48'%3E"
                + letter
                + "%3C/text%3E%3C/svg%3E";
    }
}
