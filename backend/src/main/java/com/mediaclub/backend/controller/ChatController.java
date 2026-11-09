package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.MessageResponse;
import com.mediaclub.backend.dto.ReactionRequest;
import com.mediaclub.backend.dto.SendMessageRequest;
import com.mediaclub.backend.dto.TypingEvent;
import com.mediaclub.backend.dto.TypingIndicatorRequest;
import com.mediaclub.backend.security.UserPrincipal;
import com.mediaclub.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.Map;

/**
 * Handles messages sent BY clients to /app/** destinations (see WebSocketConfig).
 * Results are broadcast to everyone subscribed to the relevant /topic/** destination.
 */
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/channel/{channelId}/send")
    public void sendMessage(@DestinationVariable Long channelId,
                             @Payload SendMessageRequest request,
                             Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            return;
        }
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        MessageResponse response = messageService.sendMessage(channelId, user.getId(), request.getContent());

        messagingTemplate.convertAndSend("/topic/channel/" + channelId, response);
    }

    @MessageMapping("/channel/{channelId}/react")
    public void react(@DestinationVariable Long channelId,
                      @Payload ReactionRequest request,
                      Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            return;
        }
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        messageService.toggleReaction(request.getMessageId(), user.getId(), request.getEmoji());
    }

    @MessageMapping("/channel/{channelId}/delete")
    public void deleteMessage(@DestinationVariable Long channelId,
                              @Payload Map<String, Long> payload,
                              Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            return;
        }
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        Long messageId = payload.get("messageId");
        if (messageId != null) {
            boolean isAdmin = user.getUser().isGlobalAdmin();
            messageService.deleteMessage(messageId, user.getId(), isAdmin);
        }
    }

    @MessageMapping("/channel/{channelId}/typing")
    public void typing(@DestinationVariable Long channelId,
                        @Payload TypingIndicatorRequest request,
                        Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            return;
        }
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        TypingEvent event = new TypingEvent(channelId, user.getId(), user.getUsername(), request.isTyping());

        messagingTemplate.convertAndSend("/topic/channel/" + channelId + "/typing", event);
    }

    /**
     * Without this, an exception thrown inside a @MessageMapping method (e.g. permission
     * denied) would just be logged server-side and the client would get no feedback at all.
     * This sends the error back privately to whichever user triggered it.
     */
    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public String handleException(Exception exception) {
        return exception.getMessage();
    }
}
