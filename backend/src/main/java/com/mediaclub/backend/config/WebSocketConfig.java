package com.mediaclub.backend.config;

import com.mediaclub.backend.security.JwtChannelInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtChannelInterceptor jwtChannelInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // clients connect here (via SockJS fallback for browsers that don't support raw WebSocket)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns(
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://localhost:5500",
                        "http://127.0.0.1:5500",
                        "http://localhost:5500"
                )
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // messages sent BY clients go to destinations starting with /app (routed to @MessageMapping methods)
        registry.setApplicationDestinationPrefixes("/app");

        // the broker delivers messages TO clients subscribed to /topic/** (broadcast) or /user/** (targeted)
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // runs our JWT check on every incoming STOMP frame (CONNECT, SEND, SUBSCRIBE, etc.)
        registration.interceptors(jwtChannelInterceptor);
    }
}
