import React from 'react';

const ChatArea = ({ activeChannel }) => {
  return (
    <div className="club-chat-area">
      <div className="chat-top-nav">
        <div className="chat-nav-title">
          <span className="channel-icon-large">✦</span> {activeChannel?.name || 'select-channel'}
        </div>
      </div>
      <div className="chat-messages-container"></div>
    </div>
  );
};

export default ChatArea;
