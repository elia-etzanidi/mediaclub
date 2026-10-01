import React from 'react';

const ClubSidebar = ({ clubName, channels, selectedChannelId, onSelectChannel }) => {
  return (
    <div className="club-sidebar">
      <div className="club-header">
        <h2>{clubName}</h2>
      </div>
      <div className="channels-section">
        <div className="channels-title">CHANNELS</div>
        <div className="channel-list">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`channel-cell ${selectedChannelId === channel.id ? 'active' : ''}`}
              onClick={() => onSelectChannel(channel.id)}
            >
              <span className="channel-icon">✦</span> {channel.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubSidebar;
