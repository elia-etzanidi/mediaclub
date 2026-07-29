package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.DirectMessageResponse;
import com.mediaclub.backend.dto.SendMessageRequest;
import com.mediaclub.backend.dto.TypingEvent;
import com.mediaclub.backend.dto.TypingIndicatorRequest;
import com.mediaclub.backend.security.UserPrincipal;
import com.mediaclub.backend.service.DirectMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.Set;

/**
 * Unlike club channels (broadcast to /topic, anyone subscribed can see it), DMs are
 * delivered privately to each participant's personal queue via convertAndSendToUser -
 * only the two people in the conversation ever receive these messages.
 */
@Controller
@RequiredArgsConstructor
public class DmChatController {

    private final DirectMessageService directMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/dm/{conversationId}/send")
    public void sendMessage(@DestinationVariable Long conversationId,
                             @Payload SendMessageRequest request,
                             Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        DirectMessageResponse response = directMessageService.sendMessage(conversationId, user.getId(), request.getContent());

        deliverToBothParticipants(conversationId, "/queue/dm/" + conversationId, response);
    }

    @MessageMapping("/dm/{conversationId}/typing")
    public void typing(@DestinationVariable Long conversationId,
                        @Payload TypingIndicatorRequest request,
                        Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        TypingEvent event = new TypingEvent(conversationId, user.getId(), user.getUsername(), request.isTyping());

        deliverToBothParticipants(conversationId, "/queue/dm/" + conversationId + "/typing", event);
    }

    private void deliverToBothParticipants(Long conversationId, String destination, Object payload) {
        Set<String> usernames = directMessageService.getParticipantUsernames(conversationId);

        for (String username : usernames) {
            messagingTemplate.convertAndSendToUser(username, destination, payload);
        }
    }
}

