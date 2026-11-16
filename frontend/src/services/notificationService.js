/**
 * notificationService.js
 * Handles loading, saving, and updating user notifications in localStorage.
 */

const NOTIFICATION_KEY_PREFIX = 'mediaclub_notifications_';
const MAX_NOTIFICATIONS = 50;

export const getNotificationsStorageKey = (userId) => {
  return `${NOTIFICATION_KEY_PREFIX}${userId || 'guest'}`;
};

export const loadStoredNotifications = (userId) => {
  try {
    const raw = localStorage.getItem(getNotificationsStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((n) => {
      const text = n.content || n.contentPreview || '';
      if (n.type !== 'DIRECT_MESSAGE' && (n.type === 'MENTION' || /(?:^|\s)@[a-zA-Z0-9_.-]+/.test(text))) {
        return { ...n, type: 'MENTION' };
      }
      return n;
    });
  } catch (err) {
    console.warn('Failed to load notifications from storage:', err);
    return [];
  }
};

export const saveStoredNotifications = (userId, notifications) => {
  try {
    const list = Array.isArray(notifications) ? notifications.slice(0, MAX_NOTIFICATIONS) : [];
    localStorage.setItem(getNotificationsStorageKey(userId), JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn('Failed to save notifications to storage:', err);
    return notifications;
  }
};

export const formatNotificationTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Just now';
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 45) return 'Just now';
    if (diffSec < 3600) return `${Math.max(1, Math.floor(diffSec / 60))}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch {
    return 'Just now';
  }
};
