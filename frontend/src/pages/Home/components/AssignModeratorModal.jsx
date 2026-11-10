import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import defaultAvatar from '../../../assets/default-avatar.png';
import './AssignModeratorModal.css';

const AssignModeratorModal = ({
  isOpen,
  club,
  clubName = 'this club',
  members = [],
  onAssignAndLeave,
  onClose
}) => {
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // Initialize or reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setIsSubmitting(false);
      // If there is only 1 eligible member, pre-select them for convenience
      if (members.length === 1) {
        setSelectedIds(new Set([String(members[0].id || members[0].userId)]));
      } else {
        setSelectedIds(new Set());
      }
    }
  }, [isOpen, members]);

  // Trap focus & keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!isSubmitting) onClose();
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [isOpen, onClose, isSubmitting]);

  // Filter members by query
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase();
    return members.filter((m) => {
      const name = (m.name || m.username || '').toLowerCase();
      return name.includes(q);
    });
  }, [members, searchQuery]);

  const handleToggleMember = (member) => {
    if (isSubmitting) return;
    const memberId = String(member.id || member.userId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        if (next.size >= 2) {
          return prev; // Maximum 2 reached
        }
        next.add(memberId);
      }
      return next;
    });
  };

  const handleConfirm = async () => {
    if (selectedIds.size === 0 || selectedIds.size > 2 || isSubmitting) return;

    const chosen = members.filter((m) =>
      selectedIds.has(String(m.id || m.userId))
    );

    setIsSubmitting(true);
    try {
      await onAssignAndLeave(chosen);
    } catch (err) {
      console.error('Failed to assign moderator and leave:', err);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const count = selectedIds.size;
  const canSubmit = count >= 1 && count <= 2 && !isSubmitting;

  return createPortal(
    <div
      className="assign-mod-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-mod-title"
      aria-describedby="assign-mod-desc"
    >
      <div
        ref={modalRef}
        className="assign-mod-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="assign-mod-header">
          <div className="assign-mod-header-left">
            <div className="assign-mod-icon-wrap" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div>
              <h3 id="assign-mod-title" className="assign-mod-title">
                Assign New Moderator
              </h3>
              <span className="assign-mod-club-subtitle">{clubName}</span>
            </div>
          </div>

          <button
            type="button"
            className="assign-mod-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="assign-mod-body">
          {/* Explanation Alert Banner */}
          <div className="assign-mod-notice" id="assign-mod-desc">
            <span className="assign-mod-notice-icon">𖤝</span>
            <div className="assign-mod-notice-text">
              You are the <strong>last moderator</strong> of this club. Before you leave, you must designate <strong>1 or 2 members</strong> to become the new moderator(s).
            </div>
          </div>

          {/* Section Label */}
          <div className="assign-mod-counter-row">
            <span className="assign-mod-selection-label">Select Moderators:</span>
          </div>

          {/* Search Bar (if more than 3 members) */}
          {members.length > 3 && (
            <div className="assign-mod-search-wrap">
              <svg
                className="assign-mod-search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="assign-mod-search-input"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isSubmitting}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="assign-mod-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Member List */}
          <div className="assign-mod-list" role="listbox" aria-label="Club members to promote">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const memberId = String(member.id || member.userId);
                const isSelected = selectedIds.has(memberId);
                const isMaxReached = count >= 2 && !isSelected;

                return (
                  <div
                    key={memberId}
                    role="option"
                    aria-selected={isSelected}
                    className={`assign-mod-member-row ${isSelected ? 'selected' : ''} ${
                      isMaxReached ? 'max-disabled' : ''
                    }`}
                    onClick={() => handleToggleMember(member)}
                    title={
                      isMaxReached
                        ? 'Maximum 2 moderators selected. Deselect one first.'
                        : `Click to ${isSelected ? 'deselect' : 'select'} ${member.name || member.username}`
                    }
                  >
                    <div className="assign-mod-member-left">
                      {/* Checkbox indicator */}
                      <div
                        className={`assign-mod-checkbox ${isSelected ? 'checked' : ''}`}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      {/* Member Avatar */}
                      <img
                        src={member.img || member.avatarUrl || defaultAvatar}
                        alt=""
                        className="assign-mod-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultAvatar;
                        }}
                      />

                      {/* Name & Username */}
                      <div className="assign-mod-info">
                        <span className="assign-mod-name">
                          {member.name || member.username || 'Member'}
                        </span>
                        {member.username && member.name && member.username !== member.name && (
                          <span className="assign-mod-username">@{member.username}</span>
                        )}
                      </div>
                    </div>

                    <div className="assign-mod-member-right">
                      {member.isOnline ? (
                        <span className="assign-mod-status-online">
                          <span className="online-dot" /> Online
                        </span>
                      ) : (
                        <span className="assign-mod-status-offline">Offline</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="assign-mod-empty">
                No members found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="assign-mod-footer">
          <button
            type="button"
            className="assign-mod-btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="assign-mod-btn-confirm"
            onClick={handleConfirm}
            disabled={!canSubmit}
          >
            {isSubmitting ? (
              <>
                <span className="assign-mod-spinner" aria-hidden="true" />
                <span>Assigning & Leaving...</span>
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>
                  {count === 0
                    ? 'Select 1-2 Moderators'
                    : count === 1
                    ? 'Assign 1 Moderator & Leave'
                    : 'Assign 2 Moderators & Leave'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AssignModeratorModal;
