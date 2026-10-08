import React, { useEffect } from 'react';
import './CreateClubModal.css';

const CreateClubModal = ({ item, onConfirm, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const typeLabel = item.type === 'tv' ? 'TV Series' : item.type === 'books' ? 'Book' : 'Movie';

  return (
    <div
      className="create-club-modal-overlay"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="create-club-modal"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="create-club-modal-header">
          <h3 className="create-club-modal-title">
            <span>✦</span> Start Official Club
          </h3>
          <button
            type="button"
            className="create-club-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="create-club-modal-body">
          {/* Target Media Preview */}
          <div className="create-club-media-preview">
            <img src={item.photo} alt={item.title} className="create-club-media-photo" />
            <div className="create-club-media-info">
              <span className="create-club-media-title">{item.title}</span>
              <div className="create-club-media-meta">
                <span className="create-club-media-badge">{typeLabel}</span>
                <span>{item.genre}</span>
                {item.year && <span>• {item.year}</span>}
              </div>
            </div>
          </div>

          {/* Moderator Role Explanation */}
          <div className="create-club-moderator-box">
            <div className="create-club-moderator-header">
              <div className="create-club-shield-icon">𖤝</div>
              <div>
                <h4 className="create-club-moderator-heading">You will be the Club Moderator</h4>
                <p className="create-club-moderator-subtext">
                  As the creator of the official club for <strong>{item.title}</strong>, you will lead this community.
                </p>
              </div>
            </div>

            <ul className="create-club-perks-list">
              <li className="create-club-perk-item">
                <span className="create-club-perk-check">✧</span>
                <span><strong>Manage Discussion Channels:</strong> Customize channels and configure spoiler guidelines.</span>
              </li>
              <li className="create-club-perk-item">
                <span className="create-club-perk-check">✧</span>
                <span><strong>Community Moderation:</strong> Manage club members, keep chats friendly, and enforce rules.</span>
              </li>
              <li className="create-club-perk-item">
                <span className="create-club-perk-check">✧</span>
                <span><strong>Assign Roles:</strong> Promote active, trusted members to fellow moderators.</span>
              </li>
            </ul>
          </div>

          {/* Channels Note */}
          <p className="create-club-channels-note">
            The official information board (<strong>#info</strong>) and standard discussion channels (<strong>#general</strong>, <strong>#spoilers</strong>, <strong>#reviews</strong>, and <strong>#requests</strong>) will be automatically created so members can jump right in.
          </p>
        </div>

        {/* Actions */}
        <div className="create-club-modal-actions">
          <button type="button" className="create-club-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="create-club-confirm-btn" onClick={onConfirm}>
            Create Club & Become Moderator
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClubModal;
