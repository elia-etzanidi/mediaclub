package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findByMessageId(Long messageId);

    Optional<Reaction> findByMessageIdAndUserIdAndEmoji(Long messageId, Long userId, String emoji);

    void deleteByMessageId(Long messageId);

    // needed when a channel is deleted - removes reactions on all of that channel's messages
    void deleteByMessage_ChannelId(Long channelId);

    void deleteByMessage_Channel_ClubId(Long clubId);
}
