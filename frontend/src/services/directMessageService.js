// Direct Message Service - Handles 1-on-1 conversations with backend sync and robust local fallback
import defaultAvatar from '../assets/default-avatar.png';

const DM_STORAGE_PREFIX = 'mediaclub_dm_history_';

// Initial pre-seeded mock conversations for demo users
const SEED_DM_CONVERSATIONS = {
  'Alice Smith': [
    {
      id: 'seed-dm-alice-1',
      senderId: 101,
      senderUsername: 'Alice Smith',
      senderAvatarUrl: defaultAvatar,
      content: 'Hey there! Saw you also joined the Inception club. What was your favorite scene?',
      sentAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      reactions: [{ emoji: '👋', count: 1, userIds: [1] }]
    },
    {
      id: 'seed-dm-alice-2',
      senderId: 1,
      senderUsername: 'DemoUser',
      senderAvatarUrl: defaultAvatar,
      content: 'Definitely the rotating hallway fight scene with Arthur. The practical effects still blow my mind!',
      sentAt: new Date(Date.now() - 3600000 * 22).toISOString(),
      reactions: [{ emoji: '🔥', count: 1, userIds: [101] }]
    },
    {
      id: 'seed-dm-alice-3',
      senderId: 101,
      senderUsername: 'Alice Smith',
      senderAvatarUrl: defaultAvatar,
      content: 'Right?! Joseph Gordon-Levitt did so many of his own stunts for that. Have you watched Oppenheimer or Tenet yet?',
      sentAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      reactions: []
    },
    {
      id: 'seed-dm-alice-4',
      senderId: 1,
      senderUsername: 'DemoUser',
      senderAvatarUrl: defaultAvatar,
      content: 'Yes! Tenet was a wild ride. ||Neil\'s sacrifice at the very end made me tear up once I realized his timeline!||',
      sentAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      reactions: [{ emoji: '😮', count: 1, userIds: [101] }]
    },
    {
      id: 'seed-dm-alice-5',
      senderId: 101,
      senderUsername: 'Alice Smith',
      senderAvatarUrl: defaultAvatar,
      content: 'That ending was poignant. Let me know if you want to start a club for Interstellar or Oppenheimer too! 🎬',
      sentAt: new Date(Date.now() - 1800000).toISOString(),
      reactions: [{ emoji: '❤️', count: 1, userIds: [1] }]
    }
  ]
};

// Friendly simulated responses for demo users to make the UI feel alive when testing
const DEMO_RESPONSES = {
  'Alice Smith': [
    'Totally agree! That was one of the best moments.',
    'Have you checked out any good sci-fi books lately?',
    'I just rewatched that scene yesterday! Masterpiece cinema.',
    'Thanks for sharing! Let\'s discuss more in the club later.'
  ],
  'Bob Jones': [
    'Great point! I hadn\'t considered that angle before.',
    'Always glad to meet another film enthusiast here.',
    'Have you seen the director\'s commentary on that? Highly recommend!'
  ],
  'Charlie Day': [
    'Wild theories are my specialty! What else did you notice?',
    'I\'ve got a conspiracy board with red string about this exact topic haha.',
    'Spot on! That blew my mind too.'
  ]
};

import { getCurrentUser } from './authService';

export const getDmStorageKey = (person, currentUserId) => {
  if (!person) return `${DM_STORAGE_PREFIX}default`;
  const nameKey = (person.name || person.username || String(person.id)).trim().toLowerCase().replace(/\s+/g, '_');
  const uId = currentUserId || getCurrentUser()?.id || 'guest';
  return `${DM_STORAGE_PREFIX}u${uId}_${nameKey}`;
};

/**
 * Check if two accounts have any chat history
 */
export const hasDmHistory = (person, currentUserId) => {
  if (!person) return false;

  if (person.lastMessage && typeof person.lastMessage === 'string' && person.lastMessage.trim().length > 0) {
    return true;
  }
  if (person.hasSentMessage) {
    return true;
  }

  const key = getDmStorageKey(person, currentUserId);
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return true;
      }
    }
  } catch (e) {}

  const personName = person.name || person.username || '';
  if (!localStorage.getItem('token')) {
    const seed = SEED_DM_CONVERSATIONS[personName];
    if (Array.isArray(seed) && seed.length > 0) {
      return true;
    }
  }

  return false;
};

/**
 * Fetch DM conversation list from backend
 */
export const fetchConversationsApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await fetch('/api/dms', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((conv) => {
          const isOnline =
            conv.otherStatus === 'ONLINE' ||
            conv.otherStatus === 'Online' ||
            conv.isOnline === true;
          return {
            id: conv.otherUserId,
            conversationId: conv.id,
            name: conv.otherUsername,
            username: conv.otherUsername,
            img: conv.otherAvatarUrl || defaultAvatar,
            role: 'member',
            status: isOnline ? 'Online' : 'Offline',
            isOnline,
            lastMessage: conv.lastMessage || null,
            lastMessageAt: conv.lastMessageAt || conv.createdAt || null
          };
        });
      }
    }
  } catch (err) {
    console.warn('Backend fetchConversationsApi failed:', err);
  }
  return null;
};

export const isDirectMessageDeleted = (m) => {
  if (!m) return true;
  if (m.deleted === true || m.isDeleted === true) return true;
  const content = (m.content || '').trim().toLowerCase();
  return content === '[message deleted]' || content === '[deleted message]';
};

/**
 * Fetch DM message history for a given user
 */
export const fetchDirectMessages = async (person, currentUser) => {
  if (!person) return [];

  const token = localStorage.getItem('token');
  const targetId = person.id;
  let conversationId = person.conversationId;

  // If conversationId is missing but we have an authenticated session and numeric user ID,
  // get or start conversation on backend so conversationId and typing work immediately
  if (token && !conversationId && typeof targetId === 'number') {
    try {
      const convRes = await fetch('/api/dms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ recipientUserId: targetId })
      });
      if (convRes.ok) {
        const convData = await convRes.json();
        conversationId = convData.id;
        person.conversationId = convData.id;
      }
    } catch (e) {
      console.warn('Backend fetch or start conversation failed:', e);
    }
  }

  // Attempt backend history if authenticated and conversationId exists
  if (token && conversationId) {
    try {
      const res = await fetch(`/api/dms/${conversationId}/messages?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const normalized = data
            .filter((m) => !isDirectMessageDeleted(m))
            .map((m) => ({
              id: m.id,
              conversationId: m.conversationId,
              senderId: m.senderId,
              senderUsername: m.senderUsername,
              senderAvatarUrl: m.senderId === currentUser?.id ? (currentUser?.pfp || defaultAvatar) : (person.img || defaultAvatar),
              content: m.content,
              sentAt: m.sentAt,
              editedAt: m.editedAt,
              deleted: false,
              reactions: []
            }));

          // Cache locally
          localStorage.setItem(getDmStorageKey(person, currentUser?.id), JSON.stringify(normalized));
          return normalized;
        }
      }
    } catch (err) {
      console.warn('Backend fetchDirectMessages failed, falling back to local storage:', err);
    }
  }

  // Local storage lookup
  const key = getDmStorageKey(person, currentUser?.id);
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((m) => !isDirectMessageDeleted(m));
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(key, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }
  } catch (e) {
    console.warn('Error reading cached direct messages:', e);
  }

  // Seeded mock messages only if unauthenticated / guest demo
  if (!token) {
    const personName = person.name || person.username || '';
    const seedList = SEED_DM_CONVERSATIONS[personName] || [];
    if (seedList.length > 0) {
      try {
        localStorage.setItem(key, JSON.stringify(seedList));
      } catch (e) {}
      return seedList;
    }
  }

  return [];
};

/**
 * Send a direct message to a user
 */
export const sendDirectMessage = async (
  person,
  content,
  currentUser,
  onSimulatedReply = null,
  onSimulatedTyping = null
) => {
  if (!person || !content?.trim()) return null;

  const cleanContent = content.trim();
  const token = localStorage.getItem('token');
  const key = getDmStorageKey(person);
  let conversationId = person.conversationId;

  // Try backend if authenticated
  if (token) {
    try {
      // If we don't have a conversation ID yet, start/get one first
      if (!conversationId && typeof person.id === 'number') {
        const startRes = await fetch('/api/dms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ recipientUserId: person.id })
        });
        if (startRes.ok) {
          const convData = await startRes.json();
          conversationId = convData.id;
          person.conversationId = convData.id;
        }
      }

      if (conversationId) {
        const msgRes = await fetch(`/api/dms/${conversationId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ content: cleanContent })
        });
        if (msgRes.ok) {
          const data = await msgRes.json();
          const newMsg = {
            id: data.id,
            conversationId: data.conversationId,
            senderId: data.senderId,
            senderUsername: data.senderUsername,
            senderAvatarUrl: currentUser?.pfp || currentUser?.avatarUrl || defaultAvatar,
            content: data.content,
            sentAt: data.sentAt || new Date().toISOString(),
            reactions: []
          };
          saveDmToLocal(key, newMsg);
          return newMsg;
        }
      }
    } catch (err) {
      console.warn('Backend sendDirectMessage failed, falling back to local:', err);
    }
  }

  // Local fallback message
  const newMsg = {
    id: `local-dm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    conversationId: conversationId || `local-conv-${person.id || Date.now()}`,
    senderId: currentUser?.id || 1,
    senderUsername: currentUser?.username || 'You',
    senderAvatarUrl: currentUser?.pfp || currentUser?.avatarUrl || defaultAvatar,
    content: cleanContent,
    sentAt: new Date().toISOString(),
    reactions: []
  };

  saveDmToLocal(key, newMsg);

  // If in demo mode, simulate a polite reply after a short delay
  const targetName = person.name || person.username || '';
  const responses = DEMO_RESPONSES[targetName];
  if (responses && responses.length > 0 && typeof onSimulatedReply === 'function') {
    setTimeout(() => {
      onSimulatedTyping?.(true);
    }, 400);

    setTimeout(() => {
      onSimulatedTyping?.(false);
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const replyMsg = {
        id: `local-dm-reply-${Date.now()}`,
        conversationId: newMsg.conversationId,
        senderId: person.id || 999,
        senderUsername: targetName,
        senderAvatarUrl: person.img || person.avatarUrl || defaultAvatar,
        content: randomResponse,
        sentAt: new Date().toISOString(),
        reactions: []
      };
      saveDmToLocal(key, replyMsg);
      onSimulatedReply(replyMsg);
    }, 1800);
  }

  return newMsg;
};

export const saveDmToLocal = (key, message) => {
  if (!key || !message || isDirectMessageDeleted(message)) return;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]').filter((m) => !isDirectMessageDeleted(m));
    if (existing.some((m) => m.id === message.id)) {
      return;
    }
    const updated = [...existing, message];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save DM message to local storage:', e);
  }
};

/**
 * Delete a direct message
 */
export const deleteDirectMessage = async (person, messageId) => {
  const token = localStorage.getItem('token');
  if (token && typeof messageId === 'number') {
    try {
      await fetch(`/api/dms/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.warn('Backend deleteDirectMessage failed:', err);
    }
  }

  const key = getDmStorageKey(person);
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = existing.filter((m) => m.id !== messageId && !isDirectMessageDeleted(m));
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to update local direct messages on delete:', e);
    return [];
  }
};

/**
 * Toggle emoji reaction on a direct message
 */
export const toggleDirectMessageReaction = async (person, messageId, emoji, currentUser) => {
  const userId = currentUser?.id || 1;
  const key = getDmStorageKey(person);
  let updatedList = [];

  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
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

    localStorage.setItem(key, JSON.stringify(updatedList));
  } catch (e) {
    console.warn('Failed to update DM reaction locally:', e);
  }

  return updatedList;
};

/**
 * Get the latest message snippet and timestamp for a person to show in LeftPane
 */
export const getLatestDmSnippet = (person) => {
  if (!person) return null;

  const key = getDmStorageKey(person);
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const messages = JSON.parse(cached);
      if (Array.isArray(messages)) {
        const validMsgs = messages.filter((m) => !isDirectMessageDeleted(m));
        if (validMsgs.length > 0) {
          const last = validMsgs[validMsgs.length - 1];
          return {
            content: last.content,
            sentAt: last.sentAt,
            senderName: last.senderUsername
          };
        }
        return null;
      }
    }
  } catch (e) {}

  if (person.lastMessage && !isDirectMessageDeleted({ content: person.lastMessage })) {
    return {
      content: person.lastMessage,
      sentAt: person.lastMessageAt || new Date().toISOString(),
      senderName: person.name
    };
  }

  const personName = person.name || person.username || '';
  const seedList = SEED_DM_CONVERSATIONS[personName] || [];
  const validSeedList = seedList.filter((m) => !isDirectMessageDeleted(m));
  if (validSeedList.length > 0) {
    const last = validSeedList[validSeedList.length - 1];
    return {
      content: last.content,
      sentAt: last.sentAt,
      senderName: last.senderUsername
    };
  }

  return null;
};

/**
 * Get numerical timestamp of the most recent activity/message for a chat
 */
export const getDmTimestamp = (person) => {
  if (!person) return 0;

  // Momentary chat currently being composed stays at the top
  if (person.isTemporary) {
    return person.temporaryAt || Date.now() + 1000;
  }

  const snippet = getLatestDmSnippet(person);
  if (snippet?.sentAt) {
    const t = new Date(snippet.sentAt).getTime();
    if (!isNaN(t) && t > 0) return t;
  }

  if (person.lastMessageAt) {
    const t = new Date(person.lastMessageAt).getTime();
    if (!isNaN(t) && t > 0) return t;
  }

  if (person.createdAt) {
    const t = new Date(person.createdAt).getTime();
    if (!isNaN(t) && t > 0) return t;
  }

  return 0;
};

/**
 * Sort chat list in order from most to least recent
 */
export const sortChatsByRecency = (peopleList) => {
  if (!Array.isArray(peopleList)) return [];
  return [...peopleList].sort((a, b) => {
    // Keep temporary active chat at the very top
    if (a.isTemporary && !b.isTemporary) return -1;
    if (!a.isTemporary && b.isTemporary) return 1;

    const timeA = getDmTimestamp(a);
    const timeB = getDmTimestamp(b);
    return timeB - timeA;
  });
};

