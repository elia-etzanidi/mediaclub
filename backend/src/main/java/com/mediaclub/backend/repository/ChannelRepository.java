package com.mediaclub.backend.repository;

import com.mediaclub.backend.entity.Channel;
import com.mediaclub.backend.entity.ChannelType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

    List<Channel> findByClubId(Long clubId);

    Optional<Channel> findByClubIdAndType(Long clubId, ChannelType type);

    void deleteByClubId(Long clubId);
}
