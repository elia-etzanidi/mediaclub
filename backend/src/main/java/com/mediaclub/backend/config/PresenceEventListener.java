package com.mediaclub.backend.config;

import com.mediaclub.backend.dto.PresenceEvent;
import com.mediaclub.backend.entity.Membership;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.repository.MembershipRepository;
import com.mediaclub.backend.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
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
public class PresenceEventListener {

    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public PresenceEventListener(
            UserRepository userRepository,
            MembershipRepository membershipRepository,
            @Lazy SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.membershipRepository = membershipRepository;
        this.messagingTemplate = messagingTemplate;
    }

    // Track sessionId -> userId and userId -> Set of sessionIds for multi-tab / multi-device support
    private final java.util.concurrent.ConcurrentHashMap<String, Long> sessionUserMap = new java.util.concurrent.ConcurrentHashMap<>();
    private final java.util.concurrent.ConcurrentHashMap<Long, java.util.Set<String>> userSessionsMap = new java.util.concurrent.ConcurrentHashMap<>();

    public void registerSession(String sessionId, Long userId) {
        if (sessionId == null || userId == null) return;
        sessionUserMap.put(sessionId, userId);
        userSessionsMap.computeIfAbsent(userId, k -> java.util.concurrent.ConcurrentHashMap.newKeySet()).add(sessionId);
        setUserOnline(userId);
    }

    public void unregisterSession(String sessionId) {
        if (sessionId == null) return;
        Long userId = sessionUserMap.remove(sessionId);
        if (userId != null) {
            java.util.Set<String> sessions = userSessionsMap.get(userId);
            if (sessions != null) {
                sessions.remove(sessionId);
                if (sessions.isEmpty()) {
                    userSessionsMap.remove(userId);
                    setUserOffline(userId);
                }
            } else {
                setUserOffline(userId);
            }
        }
    }

    @EventListener
    public void handleConnected(SessionConnectedEvent event) {
        if (event.getUser() != null) {
            updatePresence(event.getUser(), User.UserStatus.ONLINE, PresenceEvent.PresenceEventType.ONLINE);
        }
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        unregisterSession(event.getSessionId());
        if (event.getUser() != null) {
            updatePresence(event.getUser(), User.UserStatus.OFFLINE, PresenceEvent.PresenceEventType.OFFLINE);
        }
    }

    public void updatePresence(Principal principal, User.UserStatus status, PresenceEvent.PresenceEventType eventType) {
        if (principal == null) {
            return;
        }

        userRepository.findByUsername(principal.getName()).ifPresent(user -> {
            user.setStatus(status);
            user.setLastSeen(Instant.now());
            userRepository.save(user);

            broadcastPresence(user, eventType);
        });
    }

    public void setUserOffline(Long userId) {
        userSessionsMap.remove(userId);
        userRepository.findById(userId).ifPresent(user -> {
            user.setStatus(User.UserStatus.OFFLINE);
            user.setLastSeen(Instant.now());
            userRepository.save(user);

            broadcastPresence(user, PresenceEvent.PresenceEventType.OFFLINE);
        });
    }

    public void setUserOnline(Long userId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setStatus(User.UserStatus.ONLINE);
            user.setLastSeen(Instant.now());
            userRepository.save(user);

            broadcastPresence(user, PresenceEvent.PresenceEventType.ONLINE);
        });
    }

    private void broadcastPresence(User user, PresenceEvent.PresenceEventType eventType) {
        List<Membership> memberships = membershipRepository.findByUserId(user.getId());
        for (Membership membership : memberships) {
            Long clubId = membership.getClub().getId();
            PresenceEvent presenceEvent = new PresenceEvent(clubId, user.getId(), user.getUsername(), eventType);
            messagingTemplate.convertAndSend("/topic/club/" + clubId + "/presence", presenceEvent);
        }
    }
}
