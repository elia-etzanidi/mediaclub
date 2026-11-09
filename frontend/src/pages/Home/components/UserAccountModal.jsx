import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './UserAccountModal.css';
import defaultAvatar from '../../../assets/default-avatar.png';
import { fetchUserAccountDetails } from '../../../services/userService';

const UserAccountModal = ({
  isOpen,
  user,
  club,
  currentUser,
  onClose,
  onMention,
  onStartDirectMessage
}) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Fetch full rich details whenever opened or user changes
  useEffect(() => {
    let isMounted = true;
    if (!isOpen || !user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    fetchUserAccountDetails(user, club, currentUser)
      .then((data) => {
        if (isMounted) {
          setProfile(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to load user account details:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, user, club, currentUser]);

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === 'Tab' && cardRef.current) {
        const focusableElements = cardRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleMentionClick = () => {
    if (profile?.username && onMention) {
      onMention(profile.username);
      onClose?.();
    }
  };

  const handleDirectMessageClick = () => {
    if (onStartDirectMessage && profile) {
      onStartDirectMessage(profile);
      onClose?.();
    }
  };

  const isModerator =
    profile?.role?.toLowerCase() === 'moderator' ||
    profile?.role?.toLowerCase() === 'admin' ||
    user?.role?.toLowerCase() === 'moderator';

  const isSelf = Boolean(profile?.isCurrentUser);
  const isOnline = isSelf || (
    user?.isOnline !== undefined
      ? Boolean(user.isOnline)
      : (profile?.status ? profile.status.toLowerCase().includes('online') : false)
  );
  const statusDisplay = isSelf ? 'Online (You)' : (isOnline ? 'Online' : 'Offline');

  return createPortal(
    <div
      className="user-card-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`User profile for ${profile?.username || 'member'}`}
    >
      <div
        ref={cardRef}
        className="user-card-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient & pattern */}
        <div className="user-card-banner">
          <div className="user-card-banner-pattern" aria-hidden="true" />
          <button
            ref={closeBtnRef}
            type="button"
            className="user-card-close-btn"
            onClick={onClose}
            aria-label="Close user card"
            title="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Profile Avatar Header */}
        <div className="user-card-header">
          <div className="user-card-avatar-wrap">
            <img
              src={profile?.avatarUrl || defaultAvatar}
              alt={profile?.username || 'User avatar'}
              className="user-card-avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
            <span
              className={`user-card-status-badge ${
                isOnline ? 'status-online' : 'status-offline'
              }`}
              title={statusDisplay}
              aria-label={statusDisplay}
            />
          </div>
        </div>

        {/* User Identity */}
        <div className="user-card-body">
          <div className="user-card-name-group">
            <div className="user-card-name-row">
              <h2 className="user-card-display-name">
                {profile?.username || user?.username || user?.name || 'Loading...'}
              </h2>
              {isModerator && (
                <span className="user-role-badge badge-moderator" title="Club Moderator">
                  <span className="badge-symbol" aria-hidden="true">𖤝</span>
                  <span>Moderator</span>
                </span>
              )}
              {isSelf && (
                <span className="user-role-badge badge-self" title="This is your account">
                  <span>You</span>
                </span>
              )}
            </div>
            <span className="user-card-handle">
              @{profile?.handle || (profile?.username || '').toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>

          {/* Bio / Tagline (only if custom bio exists) */}
          {profile?.bio && (
            <div className="user-card-bio-section">
              <p className="user-card-bio">
                {profile.bio}
              </p>
            </div>
          )}

          <div className="user-card-divider" />

          {/* Account Details Grid */}
          <div className="user-card-details-grid">
            {/* Created At / Member Since */}
            <div className="user-detail-row">
              <div className="user-detail-icon-wrap" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="user-detail-content">
                <span className="user-detail-label">Account Created</span>
                <span className="user-detail-value">
                  {profile?.createdAt || 'October 15, 2023'}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="user-detail-row">
              <div className="user-detail-icon-wrap" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="user-detail-content">
                <span className="user-detail-label">Status</span>
                <span className="user-detail-value status-indicator-text">
                  <span className={`status-dot-pulse ${isOnline ? 'online' : 'offline'}`} aria-hidden="true" />
                  {isSelf ? 'Online' : (isOnline ? 'Online' : 'Offline')}
                </span>
              </div>
            </div>
          </div>

          {/* Clubs section */}
          {Array.isArray(profile?.clubs) && profile.clubs.length > 0 && (
            <div className="user-card-clubs-section">
              <span className="user-card-section-label">Joined Clubs</span>
              <div className="user-card-clubs-list">
                {profile.clubs.map((cName) => (
                  <span key={cName} className="user-club-chip">
                    <span className="chip-star">✦</span>
                    <span>{cName}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions Bar (only when viewing another user's profile) */}
          {!isSelf && (onMention || onStartDirectMessage) && (
            <div className="user-card-actions">
              {onMention && (
                <button
                  type="button"
                  className="user-card-action-btn btn-mention"
                  onClick={handleMentionClick}
                  title={`Mention @${profile?.username || 'user'} in chat`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                  </svg>
                  <span>Mention</span>
                </button>
              )}

              {onStartDirectMessage && (
                <button
                  type="button"
                  className="user-card-action-btn btn-direct-message"
                  onClick={handleDirectMessageClick}
                  title={`Send direct message to ${profile?.username || 'user'}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Message</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserAccountModal;
