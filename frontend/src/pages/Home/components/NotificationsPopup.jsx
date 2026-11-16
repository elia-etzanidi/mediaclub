import React, { useState, useEffect } from 'react';
import './NotificationsPopup.css';
import { formatNotificationTime } from '../../../services/notificationService';

const NotificationsPopup = ({
  notifications = [],
  onClose,
  onNotificationClick,
  onClearAll,
  onRemoveNotification,
  onMarkAllAsRead
}) => {
  const [revealedSpoilers, setRevealedSpoilers] = useState({});
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleSpoiler = (key) => {
    setRevealedSpoilers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderTextWithMentions = (text, keyPrefix) => {
    if (!text) return null;
    const mentionRegex = /(?<![a-zA-Z0-9_])(@[a-zA-Z0-9_.-]+)(?![a-zA-Z0-9_])/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    let mIdx = 0;

    while ((match = mentionRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }
      parts.push(
        <span key={`${keyPrefix}-m-${mIdx++}`} className="notif-mention-tag">
          {match[1]}
        </span>
      );
      lastIdx = match.index + match[0].length;
    }

    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderNotificationPreview = (content, notifId) => {
    if (!content) return 'Sent a new message';

    const spoilerRegex = /\|\|(.*?)\|\|/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let tokenIdx = 0;

    while ((match = spoilerRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textSegment = content.substring(lastIndex, match.index);
        parts.push(
          <span key={`txt-${tokenIdx++}`}>
            {renderTextWithMentions(textSegment, `txt-${tokenIdx}`)}
          </span>
        );
      }
      const spoilerKey = `${notifId}-${tokenIdx++}`;
      const spoilerText = match[1];
      const isRevealed = Boolean(revealedSpoilers[spoilerKey]);

      parts.push(
        <span
          key={spoilerKey}
          className={`notif-spoiler ${isRevealed ? 'revealed' : 'redacted'}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSpoiler(spoilerKey);
          }}
          title={isRevealed ? 'Click to hide spoiler' : 'Spoiler! Click to reveal'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              toggleSpoiler(spoilerKey);
            }
          }}
        >
          {renderTextWithMentions(spoilerText, spoilerKey)}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const remaining = content.substring(lastIndex);
      const unclosedMatch = remaining.match(/^(.*?)\|\|(.*)$/);
      if (unclosedMatch) {
        if (unclosedMatch[1]) {
          parts.push(
            <span key={`txt-${tokenIdx++}`}>
              {renderTextWithMentions(unclosedMatch[1], `txt-${tokenIdx}`)}
            </span>
          );
        }
        const spoilerKey = `${notifId}-${tokenIdx++}`;
        const isRevealed = Boolean(revealedSpoilers[spoilerKey]);
        parts.push(
          <span
            key={spoilerKey}
            className={`notif-spoiler ${isRevealed ? 'revealed' : 'redacted'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSpoiler(spoilerKey);
            }}
            title={isRevealed ? 'Click to hide spoiler' : 'Spoiler! Click to reveal'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                toggleSpoiler(spoilerKey);
              }
            }}
          >
            {renderTextWithMentions(unclosedMatch[2], spoilerKey)}
          </span>
        );
      } else {
        parts.push(
          <span key={`txt-${tokenIdx++}`}>
            {renderTextWithMentions(remaining, `txt-${tokenIdx}`)}
          </span>
        );
      }
    }

    return parts.length > 0 ? parts : renderTextWithMentions(content, `plain-${notifId}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="notifications-popup"
      id="notifications-popup"
      role="dialog"
      aria-label="User Notifications"
      tabIndex={-1}
    >
      {/* Header */}
      <div className="notif-header">
        <div className="notif-header-title-wrap">
          <svg
            className="notif-header-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="notif-header-title">Notifications</span>
          {unreadCount > 0 && (
            <span className="notif-header-count-pill" title={`${unreadCount} unread`}>
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="notif-header-actions">
          {notifications.length > 0 && onClearAll && (
            <button
              type="button"
              className="notif-trash-btn"
              onClick={onClearAll}
              title="Clear all notifications"
              aria-label="Clear all notifications"
              id="notif-clear-all-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}

          {onClose && (
            <button
              type="button"
              className="notif-close-btn"
              onClick={onClose}
              aria-label="Close notifications"
              title="Close"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Body: Empty State or Notification List */}
      {notifications.length === 0 ? (
        <div className="notifications-empty-container" id="notifications-empty-state">
          <div className="notifications-empty-icon-wrap">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="notifications-empty-svg"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <p className="notifications-empty-title">You have no notifications</p>
          <p className="notifications-empty-desc">
            When you receive DMs or club updates, they will appear here.
          </p>
        </div>
      ) : (
        <div className="notifications-list" role="list">
          {notifications.map((notif) => {
            const isModPromo =
              notif.type === 'MODERATOR_PROMOTION' || notif.type === 'MODERATOR';
            const notifText = notif.content || notif.contentPreview || '';
            const isMention =
              !isModPromo &&
              (notif.type === 'MENTION' ||
              Boolean(notifText.match(/(?:^|\s)@[a-zA-Z0-9_.-]+/)));
            const isDm = notif.type === 'DIRECT_MESSAGE';
            const isUnread = !notif.read;

            return (
              <div
                key={notif.id}
                className={`notification-item ${isUnread ? 'unread' : 'read'}`}
                role="listitem"
                tabIndex={0}
                onClick={() => onNotificationClick?.(notif)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNotificationClick?.(notif);
                  }
                }}
                aria-label={`Notification from ${notif.senderUsername || notif.sourceName || 'Member'}`}
              >
                <div className="notification-icon-col">
                  {isModPromo ? (
                    <div className="notification-type-badge moderator-badge" title="Moderator">
                      <span className="notif-moderator-icon">𖤝</span>
                    </div>
                  ) : isDm ? (
                    <div className="notification-type-badge dm-badge" title="DM">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="notification-type-badge channel-badge" title={isMention ? 'Mention' : 'Club Channel'}>
                      <span className="channel-star">{isMention ? '@' : '✦'}</span>
                    </div>
                  )}
                </div>

                <div className="notification-content-col">
                  <div className="notification-meta-row">
                    <span className="notification-sender">
                      {isModPromo ? (notif.sourceName || 'Media Club') : (notif.senderUsername || 'Someone')}
                    </span>
                    <span className="notification-source">
                      {isModPromo ? '𖤝 Moderator' : (isDm ? 'DM' : `✦ ${notif.sourceName || 'general'}`)}
                    </span>
                    <span className="notification-time">
                      {formatNotificationTime(notif.timestamp)}
                    </span>
                  </div>
                  <p className="notification-preview">
                    {renderNotificationPreview(notif.content || notif.contentPreview || 'You are now a moderator!', notif.id)}
                  </p>
                </div>

                <div className="notification-actions-col">
                  {onRemoveNotification && (
                    <button
                      type="button"
                      className="notification-dismiss-btn"
                      title="Dismiss notification"
                      aria-label="Dismiss notification"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveNotification(notif.id);
                      }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
