package com.mediaclub.backend.dto;

import com.mediaclub.backend.entity.Channel;
import com.mediaclub.backend.entity.ChannelType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChannelResponse {

    private Long id;
    private String name;
    private ChannelType type;
    private Long clubId;

    public static ChannelResponse from(Channel channel) {
        return new ChannelResponse(
                channel.getId(),
                channel.getName(),
                channel.getType(),
                channel.getClub().getId()
        );
    }
}
