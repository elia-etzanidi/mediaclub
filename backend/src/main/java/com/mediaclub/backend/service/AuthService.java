package com.mediaclub.backend.service;

import com.mediaclub.backend.dto.AuthResponse;
import com.mediaclub.backend.dto.LoginRequest;
import com.mediaclub.backend.dto.RegisterRequest;
import com.mediaclub.backend.entity.User;
import com.mediaclub.backend.exception.BadRequestException;
import com.mediaclub.backend.repository.UserRepository;
import com.mediaclub.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Value("${app.bootstrap-admin-username:}")
    private String bootstrapAdminUsername;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        boolean isBootstrapAdmin = bootstrapAdminUsername != null
                && !bootstrapAdminUsername.isBlank()
                && bootstrapAdminUsername.equalsIgnoreCase(request.getUsername());

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isGlobalAdmin(isBootstrapAdmin)
                .status(User.UserStatus.OFFLINE)
                .build();

        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());
        return new AuthResponse(token, user.getId(), user.getUsername());
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadRequestException("Invalid username or password");
        }

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid username or password"));

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());
        return new AuthResponse(token, user.getId(), user.getUsername());
    }
}