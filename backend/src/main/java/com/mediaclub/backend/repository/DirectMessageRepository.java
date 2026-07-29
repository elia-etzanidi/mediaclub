package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.DirectMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Long> {

    List<DirectMessage> findByConversationIdOrderBySentAtDesc(Long conversationId, Pageable pageable);
}

