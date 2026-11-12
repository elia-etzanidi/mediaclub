import defaultAvatar from '../assets/default-avatar.png';
import { websocketService } from './websocketService';

// Initial pre-seeded mock conversations for demo clubs
const SEED_MESSAGES = {
  'Inception': {
    'general': [
      {
        id: 'seed-inc-gen-1',
        senderId: 1,
        senderUsername: 'Alice Smith',
        senderAvatarUrl: defaultAvatar,
        content: "Welcome everyone to the Inception club! What was your favorite scene?",
        sentAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        reactions: [
          { emoji: '👋', count: 3, userIds: [1, 2, 3] },
          { emoji: '🔥', count: 2, userIds: [2, 3] }
        ]
      },
      {
        id: 'seed-inc-gen-2',
        senderId: 2,
        senderUsername: 'Bob Jones',
        senderAvatarUrl: defaultAvatar,
        content: "The rotating hallway gravity fight scene with Arthur is still unmatched in cinematic history.",
        sentAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        reactions: [
          { emoji: '💯', count: 2, userIds: [1, 3] }
        ]
      },
      {
        id: 'seed-inc-gen-3',
        senderId: 3,
        senderUsername: 'Charlie Day',
        senderAvatarUrl: defaultAvatar,
        content: "Hans Zimmer's soundtrack gives me chills every time. 'Time' is an absolute masterpiece.",
        sentAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        reactions: [
          { emoji: '❤️', count: 2, userIds: [1, 2] }
        ]
      }
    ],
    'spoilers': [
      {
        id: 'seed-inc-sp-1',
        senderId: 1,
        senderUsername: 'Alice Smith',
        senderAvatarUrl: defaultAvatar,
        content: "Let's settle this once and for all: did the spinning totem fall at the end, or was Cobb still in Limbo?",
        sentAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        reactions: [
          { emoji: '🍿', count: 3, userIds: [1, 2, 3] }
        ]
      },
      {
        id: 'seed-inc-sp-2',
        senderId: 2,
        senderUsername: 'Bob Jones',
        senderAvatarUrl: defaultAvatar,
        content: "Look at his wedding ring! In the real world, ||he never wears his ring, only in the dream world. In the final scene at his house, he is not wearing it!||",
        sentAt: new Date(Date.now() - 3600000 * 7).toISOString(),
        reactions: [
          { emoji: '😮', count: 3, userIds: [1, 2, 3] }
        ]
      },
      {
        id: 'seed-inc-sp-3',
        senderId: 3,
        senderUsername: 'Charlie Day',
        senderAvatarUrl: defaultAvatar,
        content: "||Michael Caine confirmed Nolan told him: 'If you're in the scene, it's reality.' Since Miles meets Cobb at the airport, it's 100% reality!||",
        sentAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        reactions: [
          { emoji: '🔥', count: 2, userIds: [1, 2] }
        ]
      }
    ],
    'theories': [
      {
        id: 'seed-inc-th-1',
        senderId: 3,
        senderUsername: 'Charlie Day',
        senderAvatarUrl: defaultAvatar,
        content: "Theory: The entire movie is actually Cobb's inception performed on him by Miles (Michael Caine) so he can let go of Mal's projection.",
        sentAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        reactions: [
          { emoji: '💡', count: 2, userIds: [1, 2] }
        ]
      },
      {
        id: 'seed-inc-th-2',
        senderId: 1,
        senderUsername: 'Alice Smith',
        senderAvatarUrl: defaultAvatar,
        content: "Whoa, that explains why Miles says 'Come back to reality' at the university!",
        sentAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        reactions: []
      }
    ],
    'reviews': [
      {
        id: 'seed-inc-rv-1',
        senderId: 2,
        senderUsername: 'Bob Jones',
        senderAvatarUrl: defaultAvatar,
        content: "10/10. Christopher Nolan at the absolute height of his creative powers. The concept, execution, practical effects, and emotional core are unforgettable.",
        sentAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        reactions: [
          { emoji: '🔥', count: 2, userIds: [1, 3] }
        ]
      }
    ]
  },
  'Breaking Bad': {
    'general': [
      {
        id: 'seed-bb-gen-1',
        senderId: 4,
        senderUsername: 'Diana Prince',
        senderAvatarUrl: defaultAvatar,
        content: "Welcome to the Breaking Bad club! Which season do you think had the best overall arc?",
        sentAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        reactions: [
          { emoji: '💬', count: 2, userIds: [4, 5] }
        ]
      },
      {
        id: 'seed-bb-gen-2',
        senderId: 5,
        senderUsername: 'Evan Wright',
        senderAvatarUrl: defaultAvatar,
        content: "Season 4 finale 'Face Off' was the most intense television finale I've ever experienced.",
        sentAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        reactions: [
          { emoji: '🔥', count: 2, userIds: [4, 6] }
        ]
      },
      {
        id: 'seed-bb-gen-3',
        senderId: 6,
        senderUsername: 'Fiona Gallagher',
        senderAvatarUrl: defaultAvatar,
        content: "'Ozymandias' in Season 5 broke my heart. Bryan Cranston and Aaron Paul gave career-defining performances.",
        sentAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        reactions: [
          { emoji: '❤️', count: 2, userIds: [4, 5] }
        ]
      }
    ],
    'spoilers': [
      {
        id: 'seed-bb-sp-1',
        senderId: 4,
        senderUsername: 'Diana Prince',
        senderAvatarUrl: defaultAvatar,
        content: "That crawl space scene when Walter laughs hysterically after discovering the money is gone... pure chilling cinema.",
        sentAt: new Date(Date.now() - 3600000 * 14).toISOString(),
        reactions: [
          { emoji: '😱', count: 2, userIds: [5, 6] }
        ]
      },
      {
        id: 'seed-bb-sp-2',
        senderId: 5,
        senderUsername: 'Evan Wright',
        senderAvatarUrl: defaultAvatar,
        content: "||Hank realizing Walt is Heisenberg while reading Leaves of Grass on the toilet was the craziest mid-season cliffhanger in TV history!||",
        sentAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        reactions: [
          { emoji: '🍿', count: 2, userIds: [4, 6] }
        ]
      }
    ],
    'episodes': [
      {
        id: 'seed-bb-ep-1',
        senderId: 6,
        senderUsername: 'Fiona Gallagher',
        senderAvatarUrl: defaultAvatar,
        content: "'Fly' (S03E10) directed by Rian Johnson is such an underrated bottle episode dissecting Walt's creeping guilt.",
        sentAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        reactions: [
          { emoji: '👍', count: 2, userIds: [4, 5] }
        ]
      }
    ]
  }
};

const getStorageKey = (clubId, channelId) => `mediaclub_msgs_${clubId}_${channelId}`;

export const isMessageDeleted = (m) => {
  if (!m) return true;
  if (m.deleted === true || m.isDeleted === true) return true;
  const content = (m.content || '').trim().toLowerCase();
  return content === '[message deleted]' || content === '[deleted message]';
};

// Fetch messages for a channel with backend integration + local storage fallback
export const fetchChannelMessages = async (club, channel) => {
  if (!club || !channel) return [];

  const clubId = club.id;
  const channelId = channel.id;
  const token = localStorage.getItem('token');

  // Try real backend if user is authenticated and channel has valid backend ID
  if (token && typeof channelId === 'number' && typeof clubId === 'number') {
    try {
      const res = await fetch(`/api/channels/${channelId}/messages?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Normalize reactions and sender avatar, filtering out any deleted messages
          const normalized = data
            .filter((m) => !isMessageDeleted(m))
            .map((m) => ({
              id: m.id,
              channelId: m.channelId,
              senderId: m.senderId,
              senderUsername: m.senderUsername,
              senderAvatarUrl: m.senderAvatarUrl || defaultAvatar,
              content: m.content,
              sentAt: m.sentAt,
              editedAt: m.editedAt,
              deleted: false,
              reactions: m.reactions || []
            }));
          // Save cache
          localStorage.setItem(getStorageKey(clubId, channelId), JSON.stringify(normalized));
          return normalized;
        }
      }
    } catch (err) {
      console.warn('Backend fetchChannelMessages failed, falling back to local storage:', err);
    }
  }

  // Local storage lookup
  const localKey = getStorageKey(clubId, channelId);
  try {
    const cached = localStorage.getItem(localKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((m) => !isMessageDeleted(m));
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(localKey, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }
  } catch (e) {
    console.warn('Error reading cached messages:', e);
  }

  // Pre-seed mock messages only if unauthenticated (demo guest mode)
  if (!token) {
    const clubName = club.name || '';
    const channelName = channel.name || '';
    const seedList = SEED_MESSAGES[clubName]?.[channelName] || [];

    if (seedList.length > 0) {
      try {
        localStorage.setItem(localKey, JSON.stringify(seedList));
      } catch (e) {}
      return seedList;
    }
  }

  // Default empty channel
  return [];
};

// Send message to a channel
export const sendChannelMessage = async (club, channel, content, currentUser) => {
  if (!club || !channel || !content?.trim()) return null;

  const clubId = club.id;
  const channelId = channel.id;
  const token = localStorage.getItem('token');
  const cleanContent = content.trim();

  // Try backend if authenticated
  if (token && typeof channelId === 'number') {
    try {
      const res = await fetch(`/api/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: cleanContent })
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = {
          id: data.id,
          channelId: data.channelId,
          senderId: data.senderId,
          senderUsername: data.senderUsername,
          senderAvatarUrl: data.senderAvatarUrl || currentUser?.pfp || defaultAvatar,
          content: data.content,
          sentAt: data.sentAt || new Date().toISOString(),
          reactions: data.reactions || []
        };
        // Update local cache
        saveMessageToLocal(clubId, channelId, newMsg);
        return newMsg;
      }
    } catch (err) {
      console.warn('Backend sendChannelMessage failed, falling back to local storage:', err);
    }
  }

  // Local fallback
  const newMsg = {
    id: `local-msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    channelId,
    senderId: currentUser?.id || 1,
    senderUsername: currentUser?.username || 'You',
    senderAvatarUrl: currentUser?.pfp || currentUser?.avatarUrl || defaultAvatar,
    content: cleanContent,
    sentAt: new Date().toISOString(),
    reactions: []
  };

  saveMessageToLocal(clubId, channelId, newMsg);
  return newMsg;
};

// Helper to save a single new message to local storage
export const saveMessageToLocal = (clubId, channelId, message) => {
  if (!clubId || !channelId || !message || isMessageDeleted(message)) return;
  const localKey = getStorageKey(clubId, channelId);
  try {
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]').filter((m) => !isMessageDeleted(m));
    const exists = existing.some((m) => m.id === message.id);
    const updated = exists
      ? existing.map((m) => (m.id === message.id ? { ...m, ...message } : m))
      : [...existing, message];
    localStorage.setItem(localKey, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save message to local storage:', e);
  }
};

// Helper to update reactions in local storage
export const updateLocalMessagesReactions = (clubId, channelId, messageId, reactions) => {
  if (!clubId || !channelId || !messageId) return;
  const localKey = getStorageKey(clubId, channelId);
  try {
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updated = existing.map((m) =>
      m.id === messageId ? { ...m, reactions: reactions || [] } : m
    );
    localStorage.setItem(localKey, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to update reactions in local storage:', e);
  }
};

// Helper to remove message in local storage
export const removeLocalMessage = (clubId, channelId, messageId) => {
  if (!clubId || !channelId || !messageId) return;
  const localKey = getStorageKey(clubId, channelId);
  try {
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updated = existing.filter((m) => m.id !== messageId && !isMessageDeleted(m));
    localStorage.setItem(localKey, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to remove message from local storage:', e);
  }
};

// Check if current user is the author of a message
export const canUserDeleteMessage = (msg, currentUser) => {
  if (!currentUser || !msg) return false;

  const currentUsername = (currentUser.username || currentUser.name || '').trim().toLowerCase();
  const senderUsername = (msg.senderUsername || msg.senderName || '').trim().toLowerCase();

  // Local messages posted with fallback 'You' belong to the current client session
  if (senderUsername === 'you') {
    return true;
  }

  // When usernames are present on both, they must match exactly
  if (currentUsername && senderUsername) {
    return currentUsername === senderUsername;
  }

  // Fall back to ID matching if username is missing on one of them
  const currentUserId = currentUser.id != null ? currentUser.id : currentUser.userId;
  const msgSenderId = msg.senderId != null ? msg.senderId : msg.userId;

  if (currentUserId != null && msgSenderId != null) {
    return String(currentUserId) === String(msgSenderId);
  }

  return false;
};

// Delete a message
export const deleteChannelMessage = async (clubId, channelId, messageId, currentUser = null) => {
  const token = localStorage.getItem('token');
  if (token && typeof messageId === 'number') {
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.warn('Backend deleteChannelMessage failed with status:', res.status);
      }
    } catch (err) {
      console.warn('Backend deleteChannelMessage failed:', err);
    }
  }

  // Always remove or mark deleted in local storage, verifying ownership if currentUser is passed
  const localKey = getStorageKey(clubId, channelId);
  try {
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const targetMsg = existing.find((m) => m.id === messageId);
    if (targetMsg && currentUser && !canUserDeleteMessage(targetMsg, currentUser)) {
      console.warn("Cannot delete someone else's message");
      return existing.filter((m) => !isMessageDeleted(m));
    }
    const updated = existing.filter((m) => m.id !== messageId && !isMessageDeleted(m));
    localStorage.setItem(localKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to update local messages on delete:', e);
    return [];
  }
};

// Toggle emoji reaction
export const toggleMessageReaction = async (clubId, channelId, messageId, emoji, currentUser) => {
  const userId = currentUser?.id || 1;
  const token = localStorage.getItem('token');

  const localKey = getStorageKey(clubId, channelId);
  let updatedList = [];

  try {
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    updatedList = existing.map((msg) => {
      if (msg.id !== messageId) return msg;

      const reactions = Array.isArray(msg.reactions) ? [...msg.reactions] : [];
      const reactionIdx = reactions.findIndex((r) => r.emoji === emoji);

      if (reactionIdx > -1) {
        const item = reactions[reactionIdx];
        const userList = item.userIds || [];
        const hasReacted = userList.includes(userId);

        if (hasReacted) {
          const nextUserList = userList.filter((id) => id !== userId);
          if (nextUserList.length === 0) {
            reactions.splice(reactionIdx, 1);
          } else {
            reactions[reactionIdx] = {
              ...item,
              count: nextUserList.length,
              userIds: nextUserList
            };
          }
        } else {
          reactions[reactionIdx] = {
            ...item,
            count: userList.length + 1,
            userIds: [...userList, userId]
          };
        }
      } else {
        reactions.push({
          emoji,
          count: 1,
          userIds: [userId]
        });
      }

      return { ...msg, reactions };
    });

    localStorage.setItem(localKey, JSON.stringify(updatedList));
  } catch (e) {
    console.warn('Failed to update reaction locally:', e);
  }

  // Sync with backend via WebSocket if connected, otherwise via REST endpoint
  if (token && typeof messageId === 'number') {
    const sentViaWs =
      typeof channelId === 'number' &&
      websocketService.sendReaction(channelId, messageId, emoji);

    if (!sentViaWs) {
      try {
        await fetch(`/api/messages/${messageId}/reactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ emoji })
        });
      } catch (e) {
        console.warn('Failed to sync reaction via REST:', e);
      }
    }
  }

  return updatedList;
};
