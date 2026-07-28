package com.mediaclub.backend.entity;

public enum ChannelType {
    GENERAL,
    SPOILERS,
    INFO,      // read-only, only moderators/admins can post
    REQUESTS   // plain chat channel for members to suggest new channels
}
