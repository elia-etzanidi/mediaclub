package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.AddReactionRequest;
import com.mediaclub.backend.dto.MessageResponse;
import com.mediaclub.backend.dto.ReactionSummary;
import com.mediaclub.backend.security.CurrentUserProvider;
import com.mediaclub.backend.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping("/api/channels/{channelId}/messages")
    public ResponseEntity<List<MessageResponse>> getHistory(
            @PathVariable Long channelId,
            @RequestParam(defaultValue = "50") int limit) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(messageService.getHistory(channelId, userId, limit));
    }

    @DeleteMapping("/api/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId) {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean isAdmin = currentUserProvider.getCurrentUser().getUser().isGlobalAdmin();
        messageService.deleteMessage(messageId, userId, isAdmin);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/messages/{messageId}/reactions")
    public ResponseEntity<List<ReactionSummary>> addReaction(
            @PathVariable Long messageId,
            @Valid @RequestBody AddReactionRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(messageService.addReaction(messageId, userId, request.getEmoji()));
    }

    @DeleteMapping("/api/messages/{messageId}/reactions/{emoji}")
    public ResponseEntity<List<ReactionSummary>> removeReaction(
            @PathVariable Long messageId,
            @PathVariable String emoji) {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(messageService.removeReaction(messageId, userId, emoji));
    }
}
