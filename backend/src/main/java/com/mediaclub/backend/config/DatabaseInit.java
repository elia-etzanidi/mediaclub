package com.mediaclub.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseInit implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        try {
            // Ensure avatar_url column in users table can store full base64 images without length limits
            jdbcTemplate.execute("ALTER TABLE users ALTER COLUMN avatar_url CLOB");
            log.info("Database migration: successfully ensured users.avatar_url is CLOB");
        } catch (Exception e) {
            log.debug("Database migration note for users.avatar_url: {}", e.getMessage());
        }
    }
}
