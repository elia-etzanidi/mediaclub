package com.mediaclub.backend.config;

import com.mediaclub.backend.dto.PresenceEvent;
import com.mediaclub.backend.entity.Membership;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.repository.MembershipRepository;
import com.mediaclub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

/**
 * A user is considered "online" the moment their WebSocket connects and "offline"
 * the moment it disconnects (browser closed, network drop, logout, etc.). On each
 * transition we broadcast a PresenceEvent to every club that user belongs to, so
 * other members see their status update live.
 */
@Component
@RequiredArgsConstructor
public class PresenceEventListener {

    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleConnect(SessionConnectEvent event) {
        updatePresence(event.getUser(), User.UserStatus.ONLINE, PresenceEvent.PresenceEventType.ONLINE);
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        updatePresence(event.getUser(), User.UserStatus.OFFLINE, PresenceEvent.PresenceEventType.OFFLINE);
    }

    private void updatePresence(Principal principal, User.UserStatus status, PresenceEvent.PresenceEventType eventType) {
        if (principal == null) {
            return; // shouldn't normally happen - JwtChannelInterceptor requires auth on CONNECT
        }

        userRepository.findByUsername(principal.getName()).ifPresent(user -> {
            user.setStatus(status);
            user.setLastSeen(Instant.now());
            userRepository.save(user);

            List<Membership> memberships = membershipRepository.findByUserId(user.getId());
            for (Membership membership : memberships) {
                Long clubId = membership.getClub().getId();
                PresenceEvent presenceEvent = new PresenceEvent(clubId, user.getId(), user.getUsername(), eventType);
                messagingTemplate.convertAndSend("/topic/club/" + clubId + "/presence", presenceEvent);
            }
        });
    }
}
