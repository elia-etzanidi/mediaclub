import React from 'react';

const ChatArea = ({ activeChannel, showMembers, onToggleMembers }) => {
  return (
    <div className="club-chat-area">
      <div className="chat-top-nav">
        <div className="chat-nav-title">
          <span className="channel-icon-large">✦</span> {activeChannel?.name || 'select-channel'}
        </div>
        <button
          className={`members-toggle ${showMembers ? 'active' : ''}`}
          onClick={onToggleMembers}
          aria-label="Toggle members sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </button>
      </div>
      <div className="chat-messages-container"></div>
    </div>
  );
};

export default ChatArea;
