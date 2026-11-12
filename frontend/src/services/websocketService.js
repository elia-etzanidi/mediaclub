import { Client } from '@stomp/stompjs';

const getBrokerURL = () => {
  if (typeof window === 'undefined') return '';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws`;
};

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.channelSubscriptions = new Map(); // channelId -> Set of callback objects { onMessage, onReaction, onDelete, onTyping }
    this.clubPresenceSubscriptions = new Map(); // clubId -> Set of callbacks (presenceEvent) => void
    this.dmListeners = new Set(); // Set of callbacks (dmData) => void
    this.dmConversationSubscriptions = new Map(); // convId -> Set of callback objects { onMessage, onTyping }
    this.stompSubscriptions = new Map(); // key -> stompSubscription
    this.pendingConnect = null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Connect or return existing active connection
  connect() {
    const token = this.getToken();
    if (!token) {
      return Promise.resolve(null);
    }

    if (this.client && this.connected) {
      return Promise.resolve(this.client);
    }

    if (this.pendingConnect) {
      return this.pendingConnect;
    }

    this.pendingConnect = new Promise((resolve) => {
      this.client = new Client({
        brokerURL: getBrokerURL(),
        connectHeaders: {
          Authorization: `Bearer ${token}`
        },
        beforeConnect: () => {
          const currentToken = this.getToken();
          if (currentToken && this.client) {
            this.client.connectHeaders = {
              Authorization: `Bearer ${currentToken}`
            };
          }
        },
        reconnectDelay: 3000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          this.connected = true;
          this.pendingConnect = null;
          // Re-subscribe all active channel & club presence listeners
          this.resubscribeAll();
          resolve(this.client);
        },
        onStompError: (frame) => {
          console.warn('[STOMP] Broker error:', frame.headers?.['message'], frame.body);
          this.pendingConnect = null;
        },
        onWebSocketClose: () => {
          this.connected = false;
          this.pendingConnect = null;
        },
        onWebSocketError: (event) => {
          console.warn('[STOMP] WebSocket error:', event);
          this.pendingConnect = null;
        }
      });

      this.client.activate();
    });

    return this.pendingConnect;
  }

  disconnect() {
    if (this.client) {
      try {
        this.client.deactivate();
      } catch {
        // Ignore disconnect error
      }
      this.client = null;
      this.connected = false;
      this.channelSubscriptions.clear();
      this.clubPresenceSubscriptions.clear();
      this.dmListeners.clear();
      this.dmConversationSubscriptions.clear();
      this.stompSubscriptions.clear();
      this.pendingConnect = null;
    }
  }

  // Subscribe to channel messages, reactions, deletes, typing
  subscribeToChannel(channelId, callbacks = {}) {
    if (!channelId) return () => {};

    const chId = Number(channelId);
    if (!this.channelSubscriptions.has(chId)) {
      this.channelSubscriptions.set(chId, new Set());
    }
    const listenerSet = this.channelSubscriptions.get(chId);
    listenerSet.add(callbacks);

    if (this.connected && this.client) {
      this.setupStompSubscriptions(chId);
    } else {
      this.connect();
    }

    // Return unsubscribe cleanup function
    return () => {
      const set = this.channelSubscriptions.get(chId);
      if (set) {
        set.delete(callbacks);
        if (set.size === 0) {
          this.channelSubscriptions.delete(chId);
          this.teardownStompSubscriptions(chId);
        }
      }
    };
  }

  setupStompSubscriptions(chId) {
    if (!this.client || !this.connected) return;

    // Messages topic
    const msgKey = `msg_${chId}`;
    if (!this.stompSubscriptions.has(msgKey)) {
      try {
        const sub = this.client.subscribe(`/topic/channel/${chId}`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.channelSubscriptions.get(chId);
            if (listeners) {
              listeners.forEach((cb) => cb.onMessage?.(data));
            }
          } catch (e) {
            console.error('Error parsing message frame:', e);
          }
        });
        this.stompSubscriptions.set(msgKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to channel message topic:', e);
      }
    }

    // Reactions topic
    const reactKey = `react_${chId}`;
    if (!this.stompSubscriptions.has(reactKey)) {
      try {
        const sub = this.client.subscribe(`/topic/channel/${chId}/reactions`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.channelSubscriptions.get(chId);
            if (listeners) {
              listeners.forEach((cb) => cb.onReaction?.(data));
            }
          } catch (e) {
            console.error('Error parsing reaction frame:', e);
          }
        });
        this.stompSubscriptions.set(reactKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to channel reaction topic:', e);
      }
    }

    // Delete topic
    const deleteKey = `delete_${chId}`;
    if (!this.stompSubscriptions.has(deleteKey)) {
      try {
        const sub = this.client.subscribe(`/topic/channel/${chId}/delete`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.channelSubscriptions.get(chId);
            if (listeners) {
              listeners.forEach((cb) => cb.onDelete?.(data));
            }
          } catch (e) {
            console.error('Error parsing delete frame:', e);
          }
        });
        this.stompSubscriptions.set(deleteKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to channel delete topic:', e);
      }
    }

    // Typing topic
    const typingKey = `typing_${chId}`;
    if (!this.stompSubscriptions.has(typingKey)) {
      try {
        const sub = this.client.subscribe(`/topic/channel/${chId}/typing`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.channelSubscriptions.get(chId);
            if (listeners) {
              listeners.forEach((cb) => cb.onTyping?.(data));
            }
          } catch (e) {
            console.error('Error parsing typing frame:', e);
          }
        });
        this.stompSubscriptions.set(typingKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to channel typing topic:', e);
      }
    }
  }

  teardownStompSubscriptions(chId) {
    const keys = [`msg_${chId}`, `react_${chId}`, `delete_${chId}`, `typing_${chId}`];
    keys.forEach((key) => {
      const sub = this.stompSubscriptions.get(key);
      if (sub) {
        try {
          sub.unsubscribe();
        } catch {
          // Ignore unsubscribe error
        }
        this.stompSubscriptions.delete(key);
      }
    });
  }

  resubscribeAll() {
    this.stompSubscriptions.clear();
    for (const chId of this.channelSubscriptions.keys()) {
      this.setupStompSubscriptions(chId);
    }
    for (const clubId of this.clubPresenceSubscriptions.keys()) {
      this.setupClubPresenceSubscription(clubId);
    }
    if (this.dmListeners.size > 0) {
      this.setupDmSubscription();
      this.setupNotificationSubscription();
    }
    for (const convId of this.dmConversationSubscriptions.keys()) {
      this.setupDmConversationSubscriptions(convId);
    }
  }

  resubscribeAllChannels() {
    this.resubscribeAll();
  }

  // Subscribe to club presence events (online/offline status changes)
  subscribeToClubPresence(clubId, callback) {
    if (!clubId || typeof callback !== 'function') return () => {};

    const cId = Number(clubId);
    if (!this.clubPresenceSubscriptions.has(cId)) {
      this.clubPresenceSubscriptions.set(cId, new Set());
    }
    const listenerSet = this.clubPresenceSubscriptions.get(cId);
    listenerSet.add(callback);

    if (this.connected && this.client) {
      this.setupClubPresenceSubscription(cId);
    } else {
      this.connect();
    }

    // Return unsubscribe cleanup function
    return () => {
      const set = this.clubPresenceSubscriptions.get(cId);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.clubPresenceSubscriptions.delete(cId);
          const key = `presence_${cId}`;
          const sub = this.stompSubscriptions.get(key);
          if (sub) {
            try {
              sub.unsubscribe();
            } catch {
              // Ignore unsubscribe error
            }
            this.stompSubscriptions.delete(key);
          }
        }
      }
    };
  }

  setupClubPresenceSubscription(cId) {
    if (!this.client || !this.connected) return;

    const key = `presence_${cId}`;
    if (!this.stompSubscriptions.has(key)) {
      try {
        const sub = this.client.subscribe(`/topic/club/${cId}/presence`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.clubPresenceSubscriptions.get(cId);
            if (listeners) {
              listeners.forEach((cb) => {
                try {
                  cb(data);
                } catch (e) {
                  console.error('Error running presence callback:', e);
                }
              });
            }
          } catch (e) {
            console.error('Error parsing presence frame:', e);
          }
        });
        this.stompSubscriptions.set(key, sub);
      } catch (e) {
        console.warn('Failed to subscribe to club presence topic:', e);
      }
    }
  }

  // Publish message via STOMP
  sendMessage(channelId, content) {
    if (!this.connected || !this.client) {
      return false;
    }
    try {
      this.client.publish({
        destination: `/app/channel/${channelId}/send`,
        body: JSON.stringify({ content: content.trim() })
      });
      return true;
    } catch (e) {
      console.warn('Failed to send message via STOMP:', e);
      return false;
    }
  }

  // Publish reaction via STOMP
  sendReaction(channelId, messageId, emoji) {
    if (!this.connected || !this.client) {
      return false;
    }
    try {
      this.client.publish({
        destination: `/app/channel/${channelId}/react`,
        body: JSON.stringify({ messageId, emoji })
      });
      return true;
    } catch (e) {
      console.warn('Failed to send reaction via STOMP:', e);
      return false;
    }
  }

  // Send typing indicator
  sendTyping(channelId, isTyping) {
    if (!this.connected || !this.client) return;
    try {
      this.client.publish({
        destination: `/app/channel/${channelId}/typing`,
        body: JSON.stringify({ typing: isTyping })
      });
    } catch {
      // Ignore typing send error
    }
  }

  // Subscribe to incoming Direct Messages for the logged in user
  subscribeToDirectMessages(callback) {
    if (typeof callback !== 'function') return () => {};
    this.dmListeners.add(callback);

    if (this.connected && this.client) {
      this.setupDmSubscription();
      this.setupNotificationSubscription();
    } else {
      this.connect();
    }

    return () => {
      this.dmListeners.delete(callback);
    };
  }

  setupDmSubscription() {
    if (!this.client || !this.connected) return;
    const key = 'user_dms';
    if (!this.stompSubscriptions.has(key)) {
      try {
        const sub = this.client.subscribe('/user/queue/dms', (frame) => {
          try {
            const data = JSON.parse(frame.body);
            this.dmListeners.forEach((cb) => {
              try {
                cb(data);
              } catch (e) {
                console.error('Error running dm callback:', e);
              }
            });
          } catch (e) {
            console.error('Error parsing dm frame:', e);
          }
        });
        this.stompSubscriptions.set(key, sub);
      } catch (e) {
        console.warn('Failed to subscribe to /user/queue/dms:', e);
      }
    }
  }

  setupNotificationSubscription() {
    if (!this.client || !this.connected) return;
    const key = 'user_notifications';
    if (!this.stompSubscriptions.has(key)) {
      try {
        const sub = this.client.subscribe('/user/queue/notifications', (frame) => {
          try {
            const notif = JSON.parse(frame.body);
            if (notif.type === 'DIRECT_MESSAGE') {
              this.dmListeners.forEach((cb) => {
                try {
                  cb({
                    id: `notif-${Date.now()}`,
                    conversationId: notif.conversationId,
                    senderUsername: notif.senderUsername,
                    content: notif.contentPreview,
                    sentAt: notif.sentAt,
                    isNotification: true
                  });
                } catch (e) {}
              });
            }
          } catch (e) {
            console.error('Error parsing notification frame:', e);
          }
        });
        this.stompSubscriptions.set(key, sub);
      } catch (e) {
        console.warn('Failed to subscribe to /user/queue/notifications:', e);
      }
    }
  }

  // Subscribe to a specific DM conversation (real-time messages and typing indicators)
  subscribeToDmConversation(conversationId, callbacks = {}) {
    if (!conversationId) return () => {};

    const convId = Number(conversationId);
    if (!this.dmConversationSubscriptions.has(convId)) {
      this.dmConversationSubscriptions.set(convId, new Set());
    }
    const listenerSet = this.dmConversationSubscriptions.get(convId);
    listenerSet.add(callbacks);

    if (this.connected && this.client) {
      this.setupDmConversationSubscriptions(convId);
    } else {
      this.connect();
    }

    return () => {
      const set = this.dmConversationSubscriptions.get(convId);
      if (set) {
        set.delete(callbacks);
        if (set.size === 0) {
          this.dmConversationSubscriptions.delete(convId);
          this.teardownDmConversationSubscriptions(convId);
        }
      }
    };
  }

  setupDmConversationSubscriptions(convId) {
    if (!this.client || !this.connected) return;

    // Direct message topic for this conversation
    const dmMsgKey = `dm_msg_${convId}`;
    if (!this.stompSubscriptions.has(dmMsgKey)) {
      try {
        const sub = this.client.subscribe(`/user/queue/dm/${convId}`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.dmConversationSubscriptions.get(convId);
            if (listeners) {
              listeners.forEach((cb) => cb.onMessage?.(data));
            }
          } catch (e) {
            console.error('Error parsing DM message frame:', e);
          }
        });
        this.stompSubscriptions.set(dmMsgKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to DM message topic:', e);
      }
    }

    // Direct message typing topic for this conversation
    const dmTypingKey = `dm_typing_${convId}`;
    if (!this.stompSubscriptions.has(dmTypingKey)) {
      try {
        const sub = this.client.subscribe(`/user/queue/dm/${convId}/typing`, (frame) => {
          try {
            const data = JSON.parse(frame.body);
            const listeners = this.dmConversationSubscriptions.get(convId);
            if (listeners) {
              listeners.forEach((cb) => cb.onTyping?.(data));
            }
          } catch (e) {
            console.error('Error parsing DM typing frame:', e);
          }
        });
        this.stompSubscriptions.set(dmTypingKey, sub);
      } catch (e) {
        console.warn('Failed to subscribe to DM typing topic:', e);
      }
    }
  }

  teardownDmConversationSubscriptions(convId) {
    const keys = [`dm_msg_${convId}`, `dm_typing_${convId}`];
    keys.forEach((key) => {
      const sub = this.stompSubscriptions.get(key);
      if (sub) {
        try {
          sub.unsubscribe();
        } catch {
          // Ignore unsubscribe error
        }
        this.stompSubscriptions.delete(key);
      }
    });
  }

  // Send DM typing indicator
  sendDmTyping(conversationId, isTyping) {
    if (!this.connected || !this.client || !conversationId) return;
    try {
      this.client.publish({
        destination: `/app/dm/${conversationId}/typing`,
        body: JSON.stringify({ typing: isTyping })
      });
    } catch {
      // Ignore typing send error
    }
  }
}

export const websocketService = new WebSocketService();
export default websocketService;
