import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './EditChannelsModal.css';

const EditChannelsModal = ({
  isOpen,
  club,
  selectedChannelId,
  onSelectChannel,
  onUpdateClub,
  onClose
}) => {
  const [channels, setChannels] = useState([]);
  const [newChannelName, setNewChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Editing state for rename
  const [editingChannelId, setEditingChannelId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Delete confirmation state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (club?.channels) {
      setChannels(club.channels);
    }
  }, [club]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (confirmDeleteId) {
          setConfirmDeleteId(null);
        } else if (editingChannelId) {
          setEditingChannelId(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmDeleteId, editingChannelId, onClose]);

  if (!isOpen || !club) return null;

  // Sanitize channel name (lowercase, dashes instead of spaces, no special characters)
  const sanitizeName = (val) => {
    return val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '')
      .replace(/-+/g, '-');
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    const cleanName = sanitizeName(newChannelName).trim();
    if (!cleanName) {
      setErrorMessage('Please enter a channel name');
      return;
    }

    if (channels.some((c) => c.name.toLowerCase() === cleanName.toLowerCase())) {
      setErrorMessage(`A channel named "${cleanName}" already exists`);
      return;
    }

    const newChannel = {
      id: Date.now(),
      name: cleanName,
      type: 'text'
    };

    const updatedChannels = [...channels, newChannel];
    setChannels(updatedChannels);
    setNewChannelName('');
    setErrorMessage('');

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        channels: updatedChannels
      });
    }

    // Switch selection to new channel
    if (onSelectChannel) {
      onSelectChannel(newChannel.id);
    }
  };

  const handleStartRename = (channel) => {
    setEditingChannelId(channel.id);
    setEditingName(channel.name);
    setConfirmDeleteId(null);
  };

  const handleSaveRename = (channelId) => {
    const cleanName = sanitizeName(editingName).trim();
    if (!cleanName) return;

    if (
      channels.some(
        (c) => c.id !== channelId && c.name.toLowerCase() === cleanName.toLowerCase()
      )
    ) {
      alert(`A channel named "${cleanName}" already exists`);
      return;
    }

    const updatedChannels = channels.map((c) =>
      c.id === channelId ? { ...c, name: cleanName } : c
    );

    setChannels(updatedChannels);
    setEditingChannelId(null);

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        channels: updatedChannels
      });
    }
  };

  const handleDeleteChannel = (channelId) => {
    const channelToDelete = channels.find((c) => c.id === channelId);
    if (!channelToDelete) return;

    // Guard info channel
    if (
      channelToDelete.type === 'info' ||
      channelToDelete.name === 'info' ||
      channelToDelete.id === 'info'
    ) {
      return;
    }

    const updatedChannels = channels.filter((c) => c.id !== channelId);
    setChannels(updatedChannels);
    setConfirmDeleteId(null);

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        channels: updatedChannels
      });
    }

    // If active channel was deleted, select info or first channel
    if (selectedChannelId === channelId) {
      const fallbackId = updatedChannels[0]?.id || 'info';
      if (onSelectChannel) {
        onSelectChannel(fallbackId);
      }
    }
  };

  const handleMoveChannel = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= channels.length) return;

    // Keep info channel at top (index 0) if it's the info board
    const currentChannel = channels[index];
    const targetChannel = channels[targetIndex];

    if (
      currentChannel.type === 'info' ||
      currentChannel.name === 'info' ||
      targetChannel.type === 'info' ||
      targetChannel.name === 'info'
    ) {
      // Don't reorder above or move the official info channel
      return;
    }

    const updatedChannels = [...channels];
    const temp = updatedChannels[index];
    updatedChannels[index] = updatedChannels[targetIndex];
    updatedChannels[targetIndex] = temp;

    setChannels(updatedChannels);
    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        channels: updatedChannels
      });
    }
  };

  return createPortal(
    <div
      className="edit-channels-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-channels-title"
    >
      <div
        className="edit-channels-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="edit-channels-header">
          <div className="edit-channels-title-wrap">
            <h3 id="edit-channels-title" className="edit-channels-title">
              <span>✦</span> Edit Channels
            </h3>
            <span className="edit-channels-header-divider">•</span>
            <span className="edit-channels-club-name" title={club.name}>
              {club.name}
            </span>
          </div>
          <button
            type="button"
            className="edit-channels-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="edit-channels-body">
          {/* Section 1: Channel List */}
          <div className="edit-channels-section">
            <div className="edit-channels-section-title">
              <span>EXISTING CHANNELS ({channels.length})</span>
            </div>

            <div className="edit-channels-list">
              {channels.map((channel, idx) => {
                const isInfo =
                  channel.type === 'info' ||
                  channel.name === 'info' ||
                  channel.id === 'info';
                const isEditing = editingChannelId === channel.id;
                const isConfirmingDelete = confirmDeleteId === channel.id;
                const isActive = selectedChannelId === channel.id;

                return (
                  <div
                    key={channel.id}
                    className={`edit-channel-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      if (!isEditing && !isConfirmingDelete && onSelectChannel) {
                        onSelectChannel(channel.id);
                      }
                    }}
                  >
                    {isConfirmingDelete ? (
                      <div className="edit-delete-confirm-box" onClick={(e) => e.stopPropagation()}>
                        <span className="edit-delete-confirm-text">
                          Delete "{channel.name}"?
                        </span>
                        <div className="edit-delete-actions">
                          <button
                            type="button"
                            className="edit-confirm-delete-btn"
                            onClick={() => handleDeleteChannel(channel.id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="edit-inline-cancel-btn"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : isEditing ? (
                      <div className="edit-channel-inline-form" onClick={(e) => e.stopPropagation()}>
                        <span className="edit-channel-icon">✦</span>
                        <input
                          type="text"
                          className="edit-channel-inline-input"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveRename(channel.id);
                            if (e.key === 'Escape') setEditingChannelId(null);
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="edit-inline-save-btn"
                          onClick={() => handleSaveRename(channel.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="edit-inline-cancel-btn"
                          onClick={() => setEditingChannelId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="edit-channel-left">
                          <span className="edit-channel-icon">✦</span>
                          <span className="edit-channel-name">{channel.name}</span>
                          {isInfo && (
                            <span className="edit-channel-badge required">
                              Club Info
                            </span>
                          )}
                        </div>

                        <div className="edit-channel-actions" onClick={(e) => e.stopPropagation()}>
                          {/* Reorder buttons */}
                          <button
                            type="button"
                            className="edit-channel-btn"
                            onClick={() => handleMoveChannel(idx, -1)}
                            disabled={idx <= 1 || isInfo}
                            title="Move up"
                            aria-label="Move channel up"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="edit-channel-btn"
                            onClick={() => handleMoveChannel(idx, 1)}
                            disabled={idx === 0 || idx === channels.length - 1}
                            title="Move down"
                            aria-label="Move channel down"
                          >
                            ▼
                          </button>

                          {/* Rename button */}
                          <button
                            type="button"
                            className="edit-channel-btn"
                            onClick={() => handleStartRename(channel)}
                            disabled={isInfo}
                            title={isInfo ? 'The club info channel cannot be renamed' : 'Rename channel'}
                            aria-label="Rename channel"
                          >
                            ✎
                          </button>

                          {/* Delete button */}
                          <button
                            type="button"
                            className="edit-channel-btn delete-btn"
                            onClick={() => setConfirmDeleteId(channel.id)}
                            disabled={isInfo}
                            title={isInfo ? 'The club info channel cannot be deleted' : 'Delete channel'}
                            aria-label="Delete channel"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Add Channel */}
          <div className="edit-channels-section">
            <div className="edit-channels-section-title">
              <span>+ CREATE NEW CHANNEL</span>
            </div>

            <form className="edit-channels-add-card" onSubmit={handleAddChannel}>
              <div className="edit-channels-input-row">
                <div className="edit-channels-input-wrap">
                  <span className="edit-channels-hash">✦</span>
                  <input
                    type="text"
                    className="edit-channels-text-input"
                    placeholder="Enter channel name (e.g. lore)"
                    value={newChannelName}
                    onChange={(e) => {
                      setNewChannelName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    maxLength={30}
                  />
                </div>
                <button
                  type="submit"
                  className="edit-channels-add-btn"
                  disabled={!newChannelName.trim()}
                >
                  <span>+</span> Add Channel
                </button>
              </div>

              {errorMessage && (
                <div className="edit-channels-error-msg">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="edit-channels-footer">
          <button
            type="button"
            className="edit-channels-done-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditChannelsModal;
