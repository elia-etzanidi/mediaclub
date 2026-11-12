import React, { useEffect, useState } from 'react';
import { generateClubProfilePicture } from '../../../services/clubService';
import './CreateClubModal.css';

const CreateClubModal = ({ item, onConfirm, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (onConfirm) {
        await onConfirm();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <img
              src={
                item.photo ||
                item.coverImageUrl ||
                item.img ||
                generateClubProfilePicture(item.title || item.name, item.type || item.mediaType)
              }
              alt={item.title || item.name}
              className="create-club-media-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = generateClubProfilePicture(item.title || item.name, item.type || item.mediaType);
              }}
            />
            <div className="create-club-media-info">
              <span className="create-club-media-title">{item.title}</span>
              <div className="create-club-media-meta">
                <div className="create-club-media-badge-row">
                  <span className="create-club-media-badge">{typeLabel}</span>
                  {item.year && <span className="create-club-media-year">{item.year}</span>}
                  {item.author && (
                    <span className="create-club-media-author">
                      {item.year ? '• ' : ''}by {item.author}
                    </span>
                  )}
                </div>
                {item.genre && (
                  <div className="create-club-media-genres">
                    {item.genre}
                  </div>
                )}
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
            The official information board (<strong>#info</strong>) and standard discussion channels (<strong>#general</strong>, <strong>#spoilers</strong>, and <strong>#requests</strong>) will be automatically created so members can jump right in.
          </p>
        </div>

        {/* Actions */}
        <div className="create-club-modal-actions">
          <button type="button" className="create-club-cancel-btn" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type="button"
            className="create-club-confirm-btn"
            onClick={handleConfirm}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
          >
            {isSubmitting ? 'Creating Club...' : 'Create Club & Become Moderator'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClubModal;
