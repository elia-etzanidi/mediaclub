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
          {channels.map((channel) => {
            const isInfo = channel.type === 'info' || channel.name === 'info' || channel.id === 'info';
            return (
              <div
                key={channel.id}
                className={`channel-cell ${selectedChannelId === channel.id ? 'active' : ''}`}
                onClick={() => onSelectChannel(channel.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectChannel(channel.id);
                  }
                }}
              >
                <span className="channel-icon">{isInfo ? 'ⓘ' : '✦'}</span>
                <span className="channel-name-text">{channel.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClubSidebar;
