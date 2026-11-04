import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './StartDirectMessageModal.css';
import defaultAvatar from '../../../assets/default-avatar.png';

const StartDirectMessageModal = ({
  isOpen,
  onClose,
  clubs = [],
  systemClubs = [],
  currentUser,
  onSelectUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // Extract all unique members from joined clubs and system clubs, excluding the current user
  const availableMembers = useMemo(() => {
    const memberMap = new Map();
    const currentName = currentUser?.username?.toLowerCase() || 'demouser';
    const currentId = currentUser?.id;

    // Combine joined clubs and system clubs
    const allClubs = [...(clubs || []), ...(systemClubs || [])];

    allClubs.forEach((club) => {
      if (Array.isArray(club.members)) {
        club.members.forEach((m) => {
          const name = m.name || m.username;
          if (!name) return;
          const lowerName = name.toLowerCase();

          // Exclude self
          if (lowerName === currentName || (currentId && m.id === currentId)) {
            return;
          }

          if (memberMap.has(lowerName)) {
            const existing = memberMap.get(lowerName);
            if (!existing.clubs.includes(club.name)) {
              existing.clubs.push(club.name);
            }
          } else {
            memberMap.set(lowerName, {
              id: m.id || Date.now() + Math.floor(Math.random() * 1000),
              name: name,
              username: name,
              img: m.img || m.avatarUrl || defaultAvatar,
              role: m.role || 'member',
              clubs: [club.name]
            });
          }
        });
      }
    });

    // If list is empty (e.g. brand new user with no clubs yet), provide default community members
    if (memberMap.size === 0) {
      const defaultPresets = [
        { id: 101, name: 'Alice Smith', username: 'Alice Smith', role: 'moderator', clubs: ['Inception'] },
        { id: 102, name: 'Bob Jones', username: 'Bob Jones', role: 'member', clubs: ['Inception', 'Breaking Bad'] },
        { id: 103, name: 'Charlie Day', username: 'Charlie Day', role: 'member', clubs: ['Inception'] },
        { id: 104, name: 'Diana Prince', username: 'Diana Prince', role: 'moderator', clubs: ['Breaking Bad'] }
      ];
      defaultPresets.forEach((dp) => {
        if (dp.username.toLowerCase() !== currentName) {
          memberMap.set(dp.username.toLowerCase(), {
            ...dp,
            img: defaultAvatar
          });
        }
      });
    }

    return Array.from(memberMap.values());
  }, [clubs, systemClubs, currentUser]);

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return availableMembers;
    const q = searchTerm.trim().toLowerCase();
    return availableMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.clubs.some((c) => c.toLowerCase().includes(q))
    );
  }, [availableMembers, searchTerm]);

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      return;
    }

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
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
      onClose();
    }
  };

  const handleSelect = (member) => {
    onSelectUser(member);
    onClose();
  };

  return createPortal(
    <div
      className="start-dm-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-dm-title"
    >
      <div
        ref={modalRef}
        className="start-dm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="start-dm-header">
          <div className="start-dm-title-wrap">
            <div className="start-dm-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 id="start-dm-title" className="start-dm-title">New Direct Message</h2>
              <p className="start-dm-subtitle">Select a club member to start a private conversation</p>
            </div>
          </div>
          <button
            type="button"
            className="start-dm-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Search input */}
        <div className="start-dm-search-bar">
          <svg className="start-dm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="start-dm-search-input"
            placeholder="Search by name or club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="start-dm-clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {/* Members List */}
        <div className="start-dm-list" role="listbox">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div
                key={member.id || member.name}
                className="start-dm-cell"
                onClick={() => handleSelect(member)}
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(member);
                  }
                }}
              >
                <div className="start-dm-avatar-wrap">
                  <img
                    src={member.img || defaultAvatar}
                    alt={member.name}
                    className="start-dm-avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                  <span className="start-dm-status-dot" aria-hidden="true" />
                </div>
                <div className="start-dm-info">
                  <div className="start-dm-name-row">
                    <span className="start-dm-name">{member.name}</span>
                    {member.role === 'moderator' && (
                      <span className="start-dm-badge moderator" title="Club Moderator">
                        𖤝 Mod
                      </span>
                    )}
                  </div>
                  <span className="start-dm-clubs">
                    {member.clubs.length > 0
                      ? `In ${member.clubs.join(', ')}`
                      : 'Club Member'}
                  </span>
                </div>
                <button
                  type="button"
                  className="start-dm-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(member);
                  }}
                  title={`Message ${member.name}`}
                >
                  Message
                </button>
              </div>
            ))
          ) : (
            <div className="start-dm-empty">
              <span className="start-dm-empty-icon">🔍</span>
              <p className="start-dm-empty-text">No members found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StartDirectMessageModal;
