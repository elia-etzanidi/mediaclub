package com.mediaclub.backend.entity;

public enum ExternalSource {
    OPEN_LIBRARY,
    TMDB,
    RAWG,
    MANUAL // fallback if a title isn't found in any external API
}
