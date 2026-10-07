package com.mediaclub.backend.controller;

import com.mediaclub.backend.dto.UpdateAvatarRequest;
import com.mediaclub.backend.dto.UserProfileResponse;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.exception.ResourceNotFoundException;
import com.mediaclub.backend.repository.UserRepository;
import com.mediaclub.backend.security.CurrentUserProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentProfile() {
        Long userId = currentUserProvider.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(UserProfileResponse.from(user));
    }

    @PatchMapping("/avatar")
    public ResponseEntity<UserProfileResponse> updateAvatar(@Valid @RequestBody UpdateAvatarRequest request) {
        Long userId = currentUserProvider.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setAvatarUrl(request.getAvatarUrl());
        user = userRepository.save(user);

        return ResponseEntity.ok(UserProfileResponse.from(user));
    }
}
