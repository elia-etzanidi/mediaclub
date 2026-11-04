import React from 'react';
import './EmptyDirectMessagesView.css';

const EmptyDirectMessagesView = ({ onStartNewChat }) => {
  return (
    <div className="main-empty-dm-wrapper">
      <div className="main-empty-dm-content">
        <div className="main-empty-dm-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className="main-empty-dm-title">No direct messages</div>
        <p className="main-empty-dm-text">Start a conversation with someone</p>
        {onStartNewChat && (
          <button
            type="button"
            className="main-empty-dm-btn"
            onClick={onStartNewChat}
          >
            + Start a Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyDirectMessagesView;
