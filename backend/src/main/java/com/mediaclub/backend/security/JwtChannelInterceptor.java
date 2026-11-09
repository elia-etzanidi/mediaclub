package com.mediaclub.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;


@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final com.mediaclub.backend.config.PresenceEventListener presenceEventListener;

    public JwtChannelInterceptor(
            JwtUtil jwtUtil,
            CustomUserDetailsService userDetailsService,
            @org.springframework.context.annotation.Lazy com.mediaclub.backend.config.PresenceEventListener presenceEventListener) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.presenceEventListener = presenceEventListener;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = 
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // only need to authenticate once, at CONNECT time - the resulting Principal
        // is then attached to the STOMP session and reused for every later frame
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtUtil.extractUsername(token);

                UserPrincipal userDetails = (UserPrincipal) userDetailsService.loadUserByUsername(username);

                if (jwtUtil.isTokenValid(token, username)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    accessor.setUser(authToken);
                    presenceEventListener.registerSession(accessor.getSessionId(), userDetails.getId());
                }
            }
        }

        return message;
    }
}
