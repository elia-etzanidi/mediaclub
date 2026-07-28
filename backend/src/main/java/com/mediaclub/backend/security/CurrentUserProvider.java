package com.mediaclub.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {

    /**
     * Returns the UserPrincipal for whoever is making the current request.
     * Safe to call from any controller/service - JwtAuthFilter guarantees
     * this is populated for any endpoint that requires authentication.
     */
    public UserPrincipal getCurrentUser() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }
}
