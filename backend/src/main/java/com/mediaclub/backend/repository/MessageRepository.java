package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // newest first - used for paginated channel history ("load more" as user scrolls up)
    List<Message> findByChannelIdOrderBySentAtDesc(Long channelId, Pageable pageable);

    void deleteByChannelId(Long channelId);

    void deleteByChannel_ClubId(Long clubId);
}
