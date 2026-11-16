/**
 * notificationService.js
 * Handles loading, saving, and updating user notifications in localStorage.
 */

const NOTIFICATION_KEY_PREFIX = 'mediaclub_notifications_';
const SILENCE_NOTIFS_KEY_PREFIX = 'mediaclub_silence_notifications_';
const MAX_NOTIFICATIONS = 50;

export const getNotificationsStorageKey = (userId) => {
  return `${NOTIFICATION_KEY_PREFIX}${userId || 'guest'}`;
};

export const getSilenceNotifications = (userId) => {
  try {
    if (userId) {
      const specific = localStorage.getItem(`${SILENCE_NOTIFS_KEY_PREFIX}${userId}`);
      if (specific !== null) return specific === 'true';
    }

    const savedUserStr = localStorage.getItem('user');
    if (savedUserStr) {
      const parsed = JSON.parse(savedUserStr);
      if (parsed?.notificationsSilenced !== undefined && parsed?.notificationsSilenced !== null) {
        return Boolean(parsed.notificationsSilenced);
      }
    }

    const fallback = localStorage.getItem(`${SILENCE_NOTIFS_KEY_PREFIX}guest`);
    return fallback === 'true';
  } catch {
    return false;
  }
};

export const setSilenceNotifications = (userId, silenced) => {
  const boolVal = Boolean(silenced);
  try {
    if (userId) {
      localStorage.setItem(`${SILENCE_NOTIFS_KEY_PREFIX}${userId}`, String(boolVal));
    }
    localStorage.setItem(`${SILENCE_NOTIFS_KEY_PREFIX}guest`, String(boolVal));

    const savedUserStr = localStorage.getItem('user');
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        parsed.notificationsSilenced = boolVal;
        localStorage.setItem('user', JSON.stringify(parsed));
      } catch (e) {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('mediaclub_silence_changed', {
          detail: { silenced: boolVal, userId }
        })
      );
    }
  } catch (err) {
    console.warn('Failed to save silence notifications setting:', err);
  }
};

export const updateSilenceNotificationsApi = async (silenced) => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await fetch('/api/notifications/preferences/silence', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ silenced: Boolean(silenced) })
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to update silence notifications preference on backend:', err);
    return false;
  }
};

export const fetchSilenceNotificationsApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await fetch('/api/notifications/preferences', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.notificationsSilenced !== undefined) {
        return Boolean(data.notificationsSilenced);
      }
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch silence notifications preference from backend:', err);
    return null;
  }
};

export const loadStoredNotifications = (userId) => {
  try {
    const raw = localStorage.getItem(getNotificationsStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const mapped = parsed.map((n) => {
      if (n.type === 'MODERATOR_PROMOTION' || n.type === 'MODERATOR') {
        return { ...n, type: 'MODERATOR_PROMOTION' };
      }
      const text = n.content || n.contentPreview || '';
      if (n.type !== 'DIRECT_MESSAGE' && (n.type === 'MENTION' || /(?:^|\s)@[a-zA-Z0-9_.-]+/.test(text))) {
        return { ...n, type: 'MENTION' };
      }
      return n;
    });

    const seen = [];
    for (const item of mapped) {
      const isDup = seen.some((s) => {
        if (s.id && item.id && s.id === item.id) return true;
        const isMod1 = s.type === 'MODERATOR_PROMOTION';
        const isMod2 = item.type === 'MODERATOR_PROMOTION';
        if (isMod1 && isMod2) {
          const sameClub = s.clubId && item.clubId && String(s.clubId) === String(item.clubId);
          const sameContent = s.content && item.content && s.content.trim() === item.content.trim();
          if (sameClub || sameContent) return true;
        }
        return (
          s.content === item.content &&
          s.senderUsername === item.senderUsername &&
          Math.abs(new Date(s.timestamp || 0).getTime() - new Date(item.timestamp || 0).getTime()) < 10000
        );
      });
      if (!isDup) {
        seen.push(item);
      }
    }
    return seen;
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

export const addModeratorPromotionNotification = (targetUserId, clubName, promoterUsername, clubId) => {
  if (!targetUserId) return null;
  if (getSilenceNotifications(targetUserId)) return null;

  const newNotif = {
    id: `notif-mod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type: 'MODERATOR_PROMOTION',
    clubId: clubId || null,
    channelId: null,
    conversationId: null,
    sourceName: clubName || 'Media Club',
    senderUsername: promoterUsername || 'Moderator',
    content: `You are now a moderator of ${clubName || 'this club'}!`,
    timestamp: new Date().toISOString(),
    read: false
  };

  const existing = loadStoredNotifications(targetUserId);
  const isDuplicate = existing.some(
    (n) =>
      n.type === 'MODERATOR_PROMOTION' &&
      String(n.clubId) === String(clubId) &&
      Math.abs(new Date(n.timestamp).getTime() - new Date(newNotif.timestamp).getTime()) < 10000
  );
  if (isDuplicate) return null;

  const updated = [newNotif, ...existing];
  saveStoredNotifications(targetUserId, updated);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('mediaclub_notification_received', {
        detail: { notif: newNotif, targetUserId }
      })
    );
  }
  return newNotif;
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
