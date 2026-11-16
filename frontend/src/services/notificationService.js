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

/**
 * Determines whether the specific chat from which a notification originated is currently open in the UI.
 * If true, the notification should not be sent to the inbox.
 */
export const isSpecificChatOpen = (event, currentChat) => {
  if (!event || !currentChat) return false;

  const {
    activeTab,
    selectedClubId,
    activeClub,
    selectedChannelId,
    activeChannel,
    activePerson,
    selectedPersonId
  } = currentChat;

  // 1. Direct Message notification (DIRECT_MESSAGE or MENTION inside a DM)
  const isDm =
    event.type === 'DIRECT_MESSAGE' ||
    (!event.clubId && !event.channelId && (event.conversationId || event.senderUsername));

  if (isDm) {
    if (activeTab !== 'people') return false;

    const person = activePerson || (selectedPersonId != null ? { id: selectedPersonId } : null);
    if (!person) return false;

    // Check conversation ID match
    if (
      event.conversationId != null &&
      person.conversationId != null &&
      String(event.conversationId) === String(person.conversationId)
    ) {
      return true;
    }

    // Check username/name match
    const sender = (event.senderUsername || event.sourceName || '').toLowerCase().trim();
    if (sender) {
      const pUsername = (person.username || '').toLowerCase().trim();
      const pName = (person.name || '').toLowerCase().trim();
      if (sender === pUsername || sender === pName) {
        return true;
      }
    }

    return false;
  }

  // 2. Club Channel notification (CHANNEL_MESSAGE or MENTION inside a channel)
  if (event.clubId != null) {
    if (activeTab !== 'clubs') return false;

    const club = activeClub || (selectedClubId != null ? { id: selectedClubId } : null);
    if (!club) return false;

    // Check club ID match
    const currentClubId = String(club.id ?? selectedClubId ?? '');
    const notifClubId = String(event.clubId);
    if (currentClubId !== notifClubId) {
      return false;
    }

    // Resolve channel in active club
    const effectiveChannel =
      activeChannel ||
      club.channels?.find(
        (c) =>
          String(c.id) === String(selectedChannelId) ||
          (selectedChannelId === 'info' && (c.name === 'info' || c.type === 'info'))
      ) ||
      club.channels?.[0];

    const isInfoChannel =
      effectiveChannel?.type === 'info' ||
      effectiveChannel?.name === 'info' ||
      effectiveChannel?.id === 'info' ||
      selectedChannelId === 'info';

    // If on the info/overview view, channel chat is not open
    if (isInfoChannel) {
      return false;
    }

    const notifChannelId = event.channelId != null ? String(event.channelId) : null;
    const notifChannelName = (event.sourceName || '').toLowerCase().trim();

    const currentChannelId =
      effectiveChannel?.id != null
        ? String(effectiveChannel.id)
        : selectedChannelId != null
          ? String(selectedChannelId)
          : null;
    const currentChannelName = (
      effectiveChannel?.name || (typeof selectedChannelId === 'string' ? selectedChannelId : '')
    )
      .toLowerCase()
      .trim();

    // Match by Channel ID
    if (notifChannelId && currentChannelId && notifChannelId === currentChannelId) {
      return true;
    }

    // Match by Channel Name (e.g. 'general', 'spoilers')
    if (
      notifChannelName &&
      (notifChannelName === currentChannelName ||
        notifChannelName === String(selectedChannelId || '').toLowerCase().trim())
    ) {
      return true;
    }

    return false;
  }

  return false;
};
