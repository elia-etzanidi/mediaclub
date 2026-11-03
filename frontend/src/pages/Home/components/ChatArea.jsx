import React, { useState, useEffect, useRef, useMemo } from 'react';
import './ChatArea.css';
import defaultAvatar from '../../../assets/default-avatar.png';
import {
  fetchChannelMessages,
  sendChannelMessage,
  deleteChannelMessage,
  toggleMessageReaction
} from '../../../services/messageService';

// Standard topic hints by channel name
const CHANNEL_TOPICS = {
  general: 'General discussion & community talk',
  spoilers: '⚠️ Spoilers allowed! Discuss plot twists & endings freely',
  theories: 'Fan theories, hidden easter eggs & lore speculation',
  reviews: 'Member reviews, impressions & ratings',
  requests: 'Suggest new channels, watchlist additions & ideas',
  episodes: 'Episode-by-episode breakdown and discussion'
};

const QUICK_EMOJIS = ['❤️', '👍', '🔥', '🍿', '😮', '😂'];
const PICKER_EMOJIS = [
  '❤️', '👍', '🔥', '🍿', '😮', '😂', '💯',
  '👏', '🎬', '📺', '📚', '💡', '😱', '🤯',
  '✨', '🎉', '🚀', '💬', '👀', '⭐', '🙌'
];

const ChatArea = ({ club, activeChannel, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState({});
  const [showSpoilerBanner, setShowSpoilerBanner] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const activeChannelName = activeChannel?.name || 'general';
  const activeChannelId = activeChannel?.id;
  const clubName = club?.name || 'Club';
  const isSpoilerChannel =
    activeChannelName.toLowerCase().includes('spoiler') ||
    activeChannel?.type === 'spoilers';

  // Topic description
  const channelTopic =
    CHANNEL_TOPICS[activeChannelName.toLowerCase()] ||
    `Discussion channel for #${activeChannelName}`;

  // Load channel messages whenever channel changes
  useEffect(() => {
    let isCurrent = true;
    const load = async () => {
      if (!club || !activeChannel) return;
      const data = await fetchChannelMessages(club, activeChannel);
      if (isCurrent) {
        setMessages(data);
        // Scroll to bottom on channel switch
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
        }, 50);
      }
    };

    load();
    setShowEmojiPicker(false);
    setInputText('');
    setSearchQuery('');
    setShowSpoilerBanner(true);

    return () => {
      isCurrent = false;
    };
  }, [club?.id, activeChannelId]);

  // Handle scroll detection for "jump to bottom" button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsScrolledUp(distanceFromBottom > 160);
  };

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Close emoji picker on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !e.target.closest('.emoji-toggle-btn')
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showEmojiPicker]);

  // Handle message submission
  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || !club || !activeChannel) return;

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const newMsg = await sendChannelMessage(club, activeChannel, trimmed, currentUser);
    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      setTimeout(() => scrollToBottom('smooth'), 40);
    }
  };

  // Modern IME-safe keydown handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Block submission if user is composing text with an IME or on Safari 229 keydown
      if (e.isComposing || e.keyCode === 229) {
        return;
      }
      handleSend();
    }
  };

  // Auto-resize textarea as user types
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 140)}px`;
  };

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updated = await deleteChannelMessage(club.id, activeChannel.id, messageId);
      setMessages(updated);
    }
  };

  // Toggle reaction
  const handleToggleReaction = async (messageId, emoji) => {
    const updated = await toggleMessageReaction(
      club.id,
      activeChannel.id,
      messageId,
      emoji,
      currentUser
    );
    setMessages(updated);
  };

  // Insert text helpers into textarea
  const insertFormatting = (prefix, suffix = prefix, placeholder = 'text') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selected = inputText.substring(start, end);
    const replacement = selected ? `${prefix}${selected}${suffix}` : `${prefix}${placeholder}${suffix}`;
    const nextVal = inputText.substring(0, start) + replacement + inputText.substring(end);
    setInputText(nextVal);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const cursorPosition = selected ? start + replacement.length : start + prefix.length;
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition + (selected ? 0 : placeholder.length));
      }
    }, 10);
  };

  const handleInsertEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Toggle spoiler reveal for a message token
  const toggleSpoiler = (spoilerKey) => {
    setRevealedSpoilers((prev) => ({
      ...prev,
      [spoilerKey]: !prev[spoilerKey]
    }));
  };

  // Parse markdown spoilers (||text||), bold (**text**), italics (*text*) and links
  const renderFormattedContent = (content, msgId) => {
    if (!content) return null;

    // First split by spoiler tags: ||spoiler||
    const spoilerRegex = /\|\|(.*?)\|\|/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let tokenIndex = 0;

    while ((match = spoilerRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.substring(lastIndex, match.index),
          key: `txt-${tokenIndex++}`
        });
      }
      parts.push({
        type: 'spoiler',
        value: match[1],
        key: `sp-${msgId}-${tokenIndex++}`
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex),
        key: `txt-${tokenIndex++}`
      });
    }

    return parts.map((part) => {
      if (part.type === 'spoiler') {
        const isRevealed = Boolean(revealedSpoilers[part.key]);
        return (
          <span
            key={part.key}
            className={`chat-spoiler ${isRevealed ? 'revealed' : ''}`}
            onClick={() => toggleSpoiler(part.key)}
            title={isRevealed ? 'Click to hide spoiler' : 'Click to reveal spoiler'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSpoiler(part.key);
              }
            }}
          >
            {part.value}
          </span>
        );
      }
      return <span key={part.key}>{part.value}</span>;
    });
  };

  // Format message timestamp
  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      if (isToday) return `Today at ${timeStr}`;

      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${timeStr}`;
      }

      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${timeStr}`;
    } catch {
      return '';
    }
  };

  const formatShortTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  // Format date divider label
  const getDateDividerLabel = (isoString) => {
    if (!isoString) return 'Today';
    try {
      const date = new Date(isoString);
      const now = new Date();
      if (date.toDateString() === now.toDateString()) return 'Today';

      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

      return date.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return 'Today';
    }
  };

  // Filter messages by search query if user typed into filter input
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const query = searchQuery.toLowerCase();
    return messages.filter(
      (m) =>
        m.content?.toLowerCase().includes(query) ||
        m.senderUsername?.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  // Determine if current user can delete a message
  const canDeleteMessage = (msg) => {
    if (!currentUser) return false;
    const isOwn =
      msg.senderId === currentUser.id ||
      msg.senderUsername?.toLowerCase() === currentUser.username?.toLowerCase();
    const isModerator =
      currentUser.isGlobalAdmin ||
      club?.members?.some(
        (m) =>
          (m.id === currentUser.id || m.name?.toLowerCase() === currentUser.username?.toLowerCase()) &&
          m.role?.toLowerCase() === 'moderator'
      );
    return isOwn || isModerator;
  };

  return (
    <div className="club-chat-area">
      {/* Chat Top Nav Bar */}
      <div className="chat-top-nav">
        <div className="chat-nav-left">
          <div className="chat-nav-title">
            <span className="channel-icon-large">✦</span>
            <span>{activeChannelName}</span>
          </div>
          <div className="chat-nav-divider" />
          <div className="chat-channel-topic" title={channelTopic}>
            {channelTopic}
          </div>
        </div>

        <div className="chat-nav-right">
          <div
            className="chat-filter-wrapper"
            onClick={(e) => {
              if (!e.target.closest('button')) {
                const input = e.currentTarget.querySelector('input');
                input?.focus();
              }
            }}
          >
            <span className="chat-filter-icon">🔍</span>
            <input
              type="text"
              className="chat-filter-input"
              placeholder="Search in channel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search messages in channel"
            />
            {searchQuery && (
              <button
                type="button"
                className="chat-filter-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spoilers Channel Alert Banner */}
      {isSpoilerChannel && showSpoilerBanner && (
        <div className="spoiler-warning-banner" role="alert">
          <div className="spoiler-banner-left">
            <span className="spoiler-banner-icon">⚠️</span>
            <span className="spoiler-banner-text">
              <strong>Caution: Spoilers Channel.</strong> Content may reveal major plot details for {clubName}. Conceal spoilers with <span className="spoiler-banner-code">||spoiler text||</span>.
            </span>
          </div>
          <button
            type="button"
            className="spoiler-banner-close"
            onClick={() => setShowSpoilerBanner(false)}
            title="Dismiss banner"
            aria-label="Dismiss spoiler warning"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Container */}
      <div
        className="chat-messages-container"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {/* Welcome Banner at the top of the channel */}
        {!searchQuery && (
          <div className="channel-welcome-banner">
            <div className="channel-welcome-icon-box">
              <span>✦</span>
            </div>
            <h1 className="channel-welcome-title">Welcome to #{activeChannelName}!</h1>
            <p className="channel-welcome-desc">
              This is the official start of the <strong>#{activeChannelName}</strong> channel in{' '}
              <strong>{clubName}</strong>. Kick off the conversation or say hello to fellow members!
            </p>
          </div>
        )}

        {/* Empty Search Results */}
        {searchQuery && filteredMessages.length === 0 && (
          <div className="chat-empty-filter">
            <span className="chat-empty-filter-icon">🔍</span>
            <p>No messages matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              className="chat-empty-filter-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear search filter
            </button>
          </div>
        )}

        {/* Message Items with Date Dividers & Consecutive Grouping */}
        {filteredMessages.map((msg, idx) => {
          const prevMsg = filteredMessages[idx - 1];
          const isSameSender =
            prevMsg &&
            prevMsg.senderUsername === msg.senderUsername &&
            new Date(msg.sentAt) - new Date(prevMsg.sentAt) < 300000; // within 5 min

          const showDateDivider =
            !prevMsg ||
            new Date(msg.sentAt).toDateString() !== new Date(prevMsg.sentAt).toDateString();

          const hasExplicitModerator = club?.members?.some(
            (m) => m.role?.toLowerCase() === 'moderator'
          );
          const isSenderModerator = Boolean(
            club?.members?.some(
              (m, mIdx) =>
                (m.id === msg.senderId || m.name?.toLowerCase() === msg.senderUsername?.toLowerCase()) &&
                (m.role?.toLowerCase() === 'moderator' || m.role?.toLowerCase() === 'admin' || (!hasExplicitModerator && mIdx === 0))
            )
          );

          return (
            <React.Fragment key={msg.id || idx}>
              {showDateDivider && (
                <div className="chat-date-divider">
                  <span className="chat-date-badge">
                    {getDateDividerLabel(msg.sentAt)}
                  </span>
                </div>
              )}

              <div className={`chat-message-row ${isSameSender ? 'is-consecutive' : ''}`}>
                {/* Avatar / Compact Timestamp column */}
                <div className={`message-avatar-col ${isSameSender ? 'consecutive-empty' : ''}`}>
                  {!isSameSender ? (
                    <img
                      src={msg.senderAvatarUrl || defaultAvatar}
                      alt={msg.senderUsername || 'User'}
                      className="message-avatar-img"
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                  ) : (
                    <span className="consecutive-timestamp">
                      {formatShortTime(msg.sentAt)}
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="message-body-col">
                  {!isSameSender && (
                    <div className="message-header">
                      <span className="message-author-name">
                        {msg.senderUsername || 'Member'}
                      </span>
                      {isSenderModerator && (
                        <span
                          className="message-moderator-icon"
                          title="Moderator"
                          aria-label="Moderator"
                        >
                          𖤝
                        </span>
                      )}
                      <span className="message-timestamp">
                        {formatTime(msg.sentAt)}
                      </span>
                    </div>
                  )}

                  <div className="message-content">
                    {renderFormattedContent(msg.content, msg.id || idx)}
                  </div>

                  {/* Reaction Chips */}
                  {Array.isArray(msg.reactions) && msg.reactions.length > 0 && (
                    <div className="message-reactions-row">
                      {msg.reactions.map((r, rIdx) => {
                        const hasReacted = r.userIds?.includes(currentUser?.id || 1);
                        return (
                          <button
                            key={rIdx}
                            type="button"
                            className={`reaction-chip ${hasReacted ? 'has-reacted' : ''}`}
                            onClick={() => handleToggleReaction(msg.id, r.emoji)}
                            title={`React with ${r.emoji}`}
                          >
                            <span className="reaction-chip-emoji">{r.emoji}</span>
                            <span className="reaction-chip-count">{r.count}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Floating Message Hover Action Bar */}
                <div className="message-hover-actions">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="action-btn"
                      onClick={() => handleToggleReaction(msg.id, emoji)}
                      title={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}

                  {canDeleteMessage(msg) && (
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteMessage(msg.id)}
                      title="Delete message"
                      aria-label="Delete message"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Jump to Bottom Floating Button */}
      {isScrolledUp && (
        <button
          type="button"
          className="jump-to-bottom-btn"
          onClick={() => scrollToBottom('smooth')}
          title="Jump to latest message"
        >
          ↓ Jump to bottom
        </button>
      )}

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <div className="emoji-picker-popover" ref={emojiPickerRef}>
          <div className="emoji-picker-header">Pick an emoji</div>
          <div className="emoji-grid">
            {PICKER_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="emoji-grid-btn"
                onClick={() => handleInsertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Message Input Box */}
      <div className="chat-bottom-input-container">
        <form
          className="chat-input-box"
          onClick={(e) => {
            if (!e.target.closest('button')) {
              textareaRef.current?.focus();
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <label htmlFor="chat-channel-input" className="visually-hidden" style={{ display: 'none' }}>
            Message #{activeChannelName}
          </label>
          <textarea
            id="chat-channel-input"
            ref={textareaRef}
            className="chat-textarea"
            placeholder={`Message #${activeChannelName}...`}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label={`Message #${activeChannelName}`}
          />

          <div className="chat-input-toolbar">
            <div className="chat-input-tools-left">
              <button
                type="button"
                className="tool-btn emoji-toggle-btn"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                title="Add emoji"
                aria-label="Open emoji picker"
              >
                😊
              </button>

              <button
                type="button"
                className="tool-btn spoiler-tool-btn"
                onClick={() => insertFormatting('||', '||', 'spoiler')}
                title="Conceal spoiler (||text||)"
                aria-label="Add spoiler tag"
              >
                ||spoiler||
              </button>

              <button
                type="button"
                className="tool-btn"
                onClick={() => insertFormatting('**', '**', 'bold')}
                title="Bold (**text**)"
                aria-label="Bold text"
              >
                <strong>B</strong>
              </button>

              <button
                type="button"
                className="tool-btn"
                onClick={() => insertFormatting('*', '*', 'italic')}
                title="Italic (*text*)"
                aria-label="Italic text"
              >
                <em>I</em>
              </button>
            </div>

            <div className="chat-input-tools-right">
              <button
                type="submit"
                className="send-message-btn"
                disabled={!inputText.trim()}
                title="Send message (Enter)"
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <div className="chat-input-hint-row">
          <span>
            <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for new line • <strong>||spoiler||</strong> to hide
          </span>
          <span>✦ #{activeChannelName}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
