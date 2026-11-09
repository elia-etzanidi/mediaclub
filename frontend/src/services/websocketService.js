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
        reconnectDelay: 3000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          this.connected = true;
          this.pendingConnect = null;
          // Re-subscribe all active channel listeners
          this.resubscribeAllChannels();
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

  resubscribeAllChannels() {
    this.stompSubscriptions.clear();
    for (const chId of this.channelSubscriptions.keys()) {
      this.setupStompSubscriptions(chId);
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
}

export const websocketService = new WebSocketService();
export default websocketService;
