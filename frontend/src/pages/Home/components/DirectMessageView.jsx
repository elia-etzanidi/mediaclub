import React, { useState, useEffect, useRef, useMemo } from 'react';
import './DirectMessageView.css';
import defaultAvatar from '../../../assets/default-avatar.png';
import {
  fetchDirectMessages,
  sendDirectMessage,
  deleteDirectMessage,
  toggleDirectMessageReaction,
  isDirectMessageDeleted
} from '../../../services/directMessageService';
import DeleteMessageModal from './DeleteMessageModal';
import websocketService from '../../../services/websocketService';

const QUICK_EMOJIS = ['❤️', '👍', '🔥', '🍿', '😮', '😂'];
const PICKER_EMOJIS = [
  '❤️', '👍', '🔥', '🍿', '😮', '😂', '💯',
  '👏', '🎬', '📺', '📚', '💡', '😱', '🤯',
  '✨', '🎉', '🚀', '💬', '👀', '⭐', '🙌'
];


const DirectMessageView = ({
  person,
  currentUser,
  clubs = [],
  onOpenUserCard,
  onMessageSent
}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);
  const [conversationId, setConversationId] = useState(person?.conversationId || null);
  const [typingUsers, setTypingUsers] = useState({});

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const formRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const remoteTypingTimeoutRef = useRef(null);

  const personName = person?.name || person?.username || 'User';
  const personAvatar = person?.img || person?.avatarUrl || defaultAvatar;

  // Keep conversationId in sync with active person
  useEffect(() => {
    setConversationId(person?.conversationId || null);
  }, [person?.conversationId, person?.id]);

  // Find shared clubs with this person
  const sharedClubs = useMemo(() => {
    if (!person || !clubs) return [];
    const pName = personName.toLowerCase();
    return clubs
      .filter((c) =>
        Array.isArray(c.members) &&
        c.members.some((m) => (m.name || m.username || '').toLowerCase() === pName)
      )
      .map((c) => c.name);
  }, [person, personName, clubs]);

  // Load conversation messages
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!person) return;
      const data = await fetchDirectMessages(person, currentUser);
      if (isMounted) {
        setMessages(data);
        if (person.conversationId) {
          setConversationId(person.conversationId);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [person, currentUser]);

  // Subscribe to real-time incoming messages & typing for this conversation
  useEffect(() => {
    if (!person) return;

    // Reset typing users when switching chats
    setTypingUsers({});
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (remoteTypingTimeoutRef.current) clearTimeout(remoteTypingTimeoutRef.current);

    const activeConvId = conversationId || person.conversationId;

    let unsubscribeConv = () => {};
    if (activeConvId) {
      unsubscribeConv = websocketService.subscribeToDmConversation(activeConvId, {
        onMessage: (dm) => {
          if (!dm) return;
          setMessages((prev) => {
            if (prev.some((m) => m.id === dm.id)) return prev;
            const formatted = {
              id: dm.id,
              conversationId: dm.conversationId,
              senderId: dm.senderId,
              senderUsername: dm.senderUsername,
              senderAvatarUrl: dm.senderAvatarUrl || personAvatar,
              content: dm.content,
              sentAt: dm.sentAt || new Date().toISOString(),
              reactions: []
            };
            return [...prev, formatted];
          });
        },
        onTyping: (typingData) => {
          if (!typingData || !typingData.username) return;
          if (currentUser?.id && String(typingData.userId) === String(currentUser.id)) return;
          if (currentUser?.username && typingData.username.toLowerCase() === currentUser.username.toLowerCase()) return;

          const typerKey = typingData.userId || typingData.username;
          if (typingData.typing) {
            setTypingUsers((prev) => ({
              ...prev,
              [typerKey]: typingData.username
            }));

            if (remoteTypingTimeoutRef.current) clearTimeout(remoteTypingTimeoutRef.current);
            remoteTypingTimeoutRef.current = setTimeout(() => {
              setTypingUsers((prev) => {
                const next = { ...prev };
                delete next[typerKey];
                return next;
              });
            }, 3500);
          } else {
            setTypingUsers((prev) => {
              const next = { ...prev };
              delete next[typerKey];
              return next;
            });
            if (remoteTypingTimeoutRef.current) clearTimeout(remoteTypingTimeoutRef.current);
          }
        }
      });
    }

    // Also listen on general user DM queue for incoming DMs
    const unsubscribeGeneral = websocketService.subscribeToDirectMessages((dm) => {
      if (!dm) return;
      const isForThisConv =
        (activeConvId && dm.conversationId && String(activeConvId) === String(dm.conversationId)) ||
        (dm.senderId && person.id && String(dm.senderId) === String(person.id)) ||
        (dm.senderUsername && (person.name || person.username) &&
          dm.senderUsername.toLowerCase() === (person.name || person.username).toLowerCase());

      if (isForThisConv) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === dm.id)) {
            return prev;
          }
          const formatted = {
            id: dm.id,
            conversationId: dm.conversationId,
            senderId: dm.senderId,
            senderUsername: dm.senderUsername,
            senderAvatarUrl: dm.senderAvatarUrl || personAvatar,
            content: dm.content,
            sentAt: dm.sentAt || new Date().toISOString(),
            reactions: []
          };
          return [...prev, formatted];
        });
      }
    });

    return () => {
      unsubscribeConv();
      unsubscribeGeneral();
      if (activeConvId) {
        websocketService.sendDmTyping(activeConvId, false);
      }
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (remoteTypingTimeoutRef.current) clearTimeout(remoteTypingTimeoutRef.current);
    };
  }, [person, conversationId, currentUser, personAvatar]);

  // Auto-scroll to bottom when messages load or change (if not scrolled far up)
  useEffect(() => {
    if (!isScrolledUp) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isScrolledUp]);

  // Track scroll position to reveal "Jump to bottom" button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsScrolledUp(distFromBottom > 150);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsScrolledUp(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !e.target.closest('.dm-emoji-trigger-btn')
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Send message
  const handleSendMessage = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputText).trim();
    if (!text || !person) return;

    setInputText('');
    setShowEmojiPicker(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const activeConvId = conversationId || person.conversationId;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (activeConvId) {
      websocketService.sendDmTyping(activeConvId, false);
    }

    // Callback for simulated demo replies
    const onSimulatedReply = (reply) => {
      setMessages((prev) => [...prev, reply]);
      onMessageSent?.(person, reply);
    };

    const onSimulatedTyping = (isTyping) => {
      const typerKey = person.id || personName;
      setTypingUsers((prev) => {
        if (isTyping) {
          return { ...prev, [typerKey]: personName };
        } else {
          const next = { ...prev };
          delete next[typerKey];
          return next;
        }
      });
    };

    const newMsg = await sendDirectMessage(
      person,
      text,
      currentUser,
      onSimulatedReply,
      onSimulatedTyping
    );
    if (newMsg) {
      if (person.conversationId) {
        setConversationId(person.conversationId);
      }
      setMessages((prev) => [...prev, newMsg]);
      onMessageSent?.(person, newMsg);
      setIsScrolledUp(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  // IME-safe Enter handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Block submission if composing via IME
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  // Auto-resize input & broadcast typing indicator
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 140)}px`;

    const activeConvId = conversationId || person?.conversationId;
    if (activeConvId) {
      websocketService.sendDmTyping(activeConvId, true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        websocketService.sendDmTyping(activeConvId, false);
      }, 2500);
    }
  };

  const insertEmoji = (emoji) => {
    setInputText((prev) => `${prev}${emoji}`);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Toggle spoiler reveal
  const toggleSpoiler = (msgId, idx) => {
    const key = `${msgId}-${idx}`;
    setRevealedSpoilers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Render text with spoiler tags
  const renderMessageContent = (msg) => {
    const content = msg.content || '';
    const parts = content.split(/(\|\|.*?\|\|)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('||') && part.endsWith('||') && part.length > 4) {
        const text = part.slice(2, -2);
        const isRevealed = revealedSpoilers[`${msg.id}-${idx}`];
        return (
          <span
            key={idx}
            className={`dm-spoiler ${isRevealed ? 'revealed' : 'hidden'}`}
            onClick={() => toggleSpoiler(msg.id, idx)}
            title={isRevealed ? 'Click to hide spoiler' : 'Spoiler! Click to reveal'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSpoiler(msg.id, idx);
              }
            }}
          >
            {text}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Delete message handlers
  const handleRequestDelete = (msg) => {
    setMessageToDelete(msg);
  };

  const handleConfirmDelete = async () => {
    if (!messageToDelete || !person) return;
    const targetId = messageToDelete.id;
    setIsDeletingMessage(true);
    // Optimistically remove from view immediately
    setMessages((prev) => prev.filter((m) => m.id !== targetId));
    const updated = await deleteDirectMessage(person, targetId);
    const cleaned = Array.isArray(updated) ? updated.filter((m) => !isDirectMessageDeleted(m)) : [];
    setMessages(cleaned);
    setIsDeletingMessage(false);
    setMessageToDelete(null);
    if (onMessageSent) {
      const remainingLast = cleaned.length > 0 ? cleaned[cleaned.length - 1] : { content: '', sentAt: null };
      onMessageSent(person, remainingLast);
    }
  };

  // Toggle reaction
  const handleReaction = async (msgId, emoji) => {
    if (!person) return;
    const updated = await toggleDirectMessageReaction(person, msgId, emoji, currentUser);
    setMessages(updated);
  };

  // Check if message was sent by current user
  const isMessageFromSelf = (msg) => {
    if (!currentUser || !msg) return false;
    const myName = (currentUser.username || currentUser.name || '').trim().toLowerCase();
    const sender = (msg.senderUsername || msg.senderName || '').trim().toLowerCase();
    if (sender === 'you') return true;
    if (myName && sender) return myName === sender;
    if (msg.senderId != null && currentUser.id != null) {
      return String(msg.senderId) === String(currentUser.id);
    }
    return false;
  };

  // Filter messages by search query, excluding deleted messages
  const filteredMessages = useMemo(() => {
    const activeMsgs = messages.filter((m) => !isDirectMessageDeleted(m));
    if (!searchQuery.trim()) return activeMsgs;
    const q = searchQuery.toLowerCase();
    return activeMsgs.filter((m) => (m.content || '').toLowerCase().includes(q));
  }, [messages, searchQuery]);

  // Format timestamp
  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const formatDateLabel = (isoString) => {
    if (!isoString) return 'Today';
    try {
      const d = new Date(isoString);
      const today = new Date();
      if (d.toDateString() === today.toDateString()) return 'Today';
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Today';
    }
  };

  return (
    <div className="dm-view-container">
      {/* Top Header */}
      <header className="dm-header">
        <div className="dm-header-left">
          <div
            className="dm-header-avatar-wrap"
            onClick={() => onOpenUserCard?.(person)}
            title={`View ${personName}'s profile`}
            role="button"
            tabIndex={0}
          >
            <img
              src={personAvatar}
              alt={personName}
              className="dm-header-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
            <span className="dm-header-status-dot" aria-hidden="true" />
          </div>

          <div className="dm-header-meta">
            <div className="dm-header-name-row">
              <h2 className="dm-header-name">{personName}</h2>
            </div>
            {sharedClubs.length > 0 && (
              <p className="dm-header-subtitle">
                Shares: {sharedClubs.join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="dm-header-right">
          {/* Filter messages input */}
          <div className="dm-search-wrapper">
            <svg
              className="dm-search-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="dm-search-input"
              placeholder="Filter messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="dm-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Profile Card Button */}
          {onOpenUserCard && (
            <button
              type="button"
              className="dm-header-btn"
              onClick={() => onOpenUserCard(person)}
              title={`View ${personName}'s Profile`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </button>
          )}
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div
        ref={messagesContainerRef}
        className="dm-messages-container"
        onScroll={handleScroll}
      >
        {/* Welcome Header */}
        <div className="dm-welcome-banner">
          <div className="dm-welcome-avatar-wrap">
            <img
              src={personAvatar}
              alt={personName}
              className="dm-welcome-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
            <span className="dm-welcome-badge">✦</span>
          </div>
          <h3 className="dm-welcome-title">Direct Message with {personName}</h3>
          <p className="dm-welcome-desc">
            This is the start of your 1-on-1 private messaging history with {personName}.
            {sharedClubs.length > 0 && (
              <> You both belong to <strong>{sharedClubs.join(', ')}</strong>.</>
            )}
          </p>

        </div>

        {/* Message timeline */}
        <div className="dm-timeline">
          {filteredMessages.map((msg, index) => {
            const isSelf = isMessageFromSelf(msg);
            const prevMsg = filteredMessages[index - 1];
            const showDateSeparator =
              !prevMsg ||
              formatDateLabel(prevMsg.sentAt) !== formatDateLabel(msg.sentAt);

            return (
              <React.Fragment key={msg.id || index}>
                {showDateSeparator && (
                  <div className="dm-date-divider" role="separator">
                    <span className="dm-date-divider-line" />
                    <span className="dm-date-divider-text">
                      {formatDateLabel(msg.sentAt)}
                    </span>
                    <span className="dm-date-divider-line" />
                  </div>
                )}

                <div className={`dm-message-row ${isSelf ? 'from-self' : 'from-them'}`}>
                  {/* Sender Avatar */}
                  <div
                    className="dm-msg-avatar-wrap"
                    onClick={() => !isSelf && onOpenUserCard?.(person)}
                    title={isSelf ? 'You' : `View ${msg.senderUsername || personName}`}
                  >
                    <img
                      src={isSelf ? (currentUser?.pfp || defaultAvatar) : personAvatar}
                      alt={msg.senderUsername || 'User'}
                      className="dm-msg-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                      }}
                    />
                  </div>

                  {/* Message Bubble & Content */}
                  <div className="dm-msg-content-wrap">
                    <div className="dm-msg-header">
                      <span className="dm-msg-author">
                        {isSelf ? 'You' : (msg.senderUsername || personName)}
                      </span>
                      <span className="dm-msg-time">{formatTime(msg.sentAt)}</span>
                    </div>

                    <div className="dm-msg-body">
                      {renderMessageContent(msg)}
                    </div>

                    {/* Reactions Pill Display */}
                    {Array.isArray(msg.reactions) && msg.reactions.length > 0 && (
                      <div className="dm-reactions-list">
                        {msg.reactions.map((r) => {
                          const hasReacted =
                            currentUser &&
                            Array.isArray(r.userIds) &&
                            r.userIds.includes(currentUser.id || 1);
                          return (
                            <button
                              key={r.emoji}
                              type="button"
                              className={`dm-reaction-pill ${hasReacted ? 'active' : ''}`}
                              onClick={() => handleReaction(msg.id, r.emoji)}
                              title={`${r.count} reaction${r.count > 1 ? 's' : ''}`}
                            >
                              <span className="dm-pill-emoji">{r.emoji}</span>
                              <span className="dm-pill-count">{r.count}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Hover Actions Bar */}
                  <div className="dm-msg-hover-actions">
                    {QUICK_EMOJIS.slice(0, 4).map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="dm-hover-action-btn"
                        onClick={() => handleReaction(msg.id, emoji)}
                        title={`React ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}

                    {/* Delete button (only for messages sent by you) */}
                    {isSelf && (
                      <button
                        type="button"
                        className="dm-hover-action-btn delete-btn"
                        onClick={() => handleRequestDelete(msg)}
                        title="Delete message"
                        aria-label="Delete message"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Jump to Bottom Button */}
      {isScrolledUp && (
        <button
          type="button"
          className="dm-jump-bottom-btn"
          onClick={scrollToBottom}
          title="Jump to latest message"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          <span>Latest Messages</span>
        </button>
      )}

      {/* Message Input Bar */}
      <footer className="dm-input-container">
        {Object.keys(typingUsers).length > 0 && (
          <div className="dm-typing-indicator" aria-live="polite">
            <span className="typing-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
            <span className="dm-typing-text">
              <strong>{Object.values(typingUsers).join(', ')}</strong>{' '}
              {Object.keys(typingUsers).length === 1 ? 'is' : 'are'} typing...
            </span>
          </div>
        )}

        <form ref={formRef} className="dm-input-form" onSubmit={handleFormSubmit}>
          {/* Emoji Trigger */}
          <div className="dm-emoji-wrap">
            <button
              type="button"
              className="dm-emoji-trigger-btn"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              title="Insert emoji"
              aria-label="Insert emoji"
            >
              😊
            </button>

            {/* Emoji Picker Popup */}
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="dm-emoji-picker-popup">
                <div className="dm-emoji-picker-header">React & Emojis</div>
                <div className="dm-emoji-grid">
                  {PICKER_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="dm-emoji-cell"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className="dm-textarea"
            rows={1}
            placeholder={`Message @${personName}...`}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          {/* Send Button */}
          <button
            type="submit"
            className="dm-send-btn"
            disabled={!inputText.trim()}
            title="Send message (Enter)"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <div className="dm-input-hints">
          <span><strong>Return</strong> to send</span>
          <span>•</span>
          <span><strong>Shift + Return</strong> for new line</span>
          <span>•</span>
          <span><code>||spoiler||</code> for spoilers</span>
        </div>
      </footer>

      {/* Delete Message Confirmation Modal */}
      {messageToDelete && (
        <DeleteMessageModal
          isOpen={Boolean(messageToDelete)}
          onConfirm={handleConfirmDelete}
          onClose={() => setMessageToDelete(null)}
          isDeleting={isDeletingMessage}
        />
      )}
    </div>
  );
};

export default DirectMessageView;
