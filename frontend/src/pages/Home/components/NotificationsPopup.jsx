import React, { useEffect } from 'react';
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
  const unreadCount = notifications.filter((n) => !n.read).length;

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
                aria-label={`Notification from ${notif.senderUsername || 'Member'}`}
              >
                <div className="notification-icon-col">
                  {isDm ? (
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
                    <div className="notification-type-badge channel-badge" title="Club Channel">
                      <span className="channel-star">✦</span>
                    </div>
                  )}
                </div>

                <div className="notification-content-col">
                  <div className="notification-meta-row">
                    <span className="notification-sender">
                      {notif.senderUsername || 'Someone'}
                    </span>
                    <span className="notification-source">
                      {isDm ? 'DM' : `✦ ${notif.sourceName || 'general'}`}
                    </span>
                    <span className="notification-time">
                      {formatNotificationTime(notif.timestamp)}
                    </span>
                  </div>
                  <p className="notification-preview">
                    {notif.content || notif.contentPreview || 'Sent a new message'}
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
