package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.ConversationResponse;
import com.mediaclub.backend.dto.DirectMessageResponse;
import com.mediaclub.backend.dto.SendMessageRequest;
import com.mediaclub.backend.dto.StartConversationRequest;
import com.mediaclub.backend.security.CurrentUserProvider;
import com.mediaclub.backend.service.DirectMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dms")
@RequiredArgsConstructor
public class DirectMessageController {

    private final DirectMessageService directMessageService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<ConversationResponse> startConversation(@Valid @RequestBody StartConversationRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(directMessageService.startOrGetConversation(userId, request.getRecipientUserId()));
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> listConversations() {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(directMessageService.listConversations(userId));
    }

    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<DirectMessageResponse>> getHistory(
            @PathVariable Long conversationId,
            @RequestParam(defaultValue = "50") int limit) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(directMessageService.getHistory(conversationId, userId, limit));
    }

    // REST fallback for sending - the STOMP path (DmChatController) is used for the live chat UI,
    // this exists so a message can still be sent/tested without a WebSocket connection
    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<DirectMessageResponse> sendMessage(
            @PathVariable Long conversationId,
            @Valid @RequestBody SendMessageRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(directMessageService.sendMessage(conversationId, userId, request.getContent()));
    }

    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId) {
        Long userId = currentUserProvider.getCurrentUserId();
        directMessageService.deleteMessage(messageId, userId);
        return ResponseEntity.noContent().build();
    }
}

