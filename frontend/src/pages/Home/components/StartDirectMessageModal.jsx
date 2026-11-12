import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './StartDirectMessageModal.css';
import defaultAvatar from '../../../assets/default-avatar.png';
import { fetchClubMembersApi } from '../../../services/clubService';

// Helper to accurately measure text width using a 2D canvas context
let measureCanvas = null;
let measureCtx = null;

const getTextWidth = (text, font) => {
  if (!text) return 0;
  try {
    if (typeof document !== 'undefined') {
      if (!measureCanvas) {
        measureCanvas = document.createElement('canvas');
        measureCtx = measureCanvas.getContext('2d');
      }
      if (measureCtx) {
        if (font) measureCtx.font = font;
        return measureCtx.measureText(text).width;
      }
    }
  } catch (e) {
    // fallback
  }
  return text.length * 7;
};

// Component to display shared clubs with responsive "+N more" text when cut off
const SharedClubs = ({ clubs = [], searchTerm = '' }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect) {
            setContainerWidth(entry.contentRect.width);
          }
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Prioritize clubs matching current search term so they remain visible
  const sortedClubs = useMemo(() => {
    if (!clubs || clubs.length <= 1) return clubs || [];
    if (!searchTerm || !searchTerm.trim()) return clubs;
    const q = searchTerm.trim().toLowerCase();
    return [...clubs].sort((a, b) => {
      const aMatches = a.toLowerCase().includes(q);
      const bMatches = b.toLowerCase().includes(q);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [clubs, searchTerm]);

  // Dynamically calculate how many clubs fit in container width before cutting off
  const { visibleClubs, hiddenCount } = useMemo(() => {
    if (!sortedClubs || sortedClubs.length === 0) {
      return { visibleClubs: [], hiddenCount: 0 };
    }
    if (sortedClubs.length === 1) {
      return { visibleClubs: sortedClubs, hiddenCount: 0 };
    }

    const effectiveWidth = containerWidth > 0 ? containerWidth : 280;
    const prefix = 'Shared: ';

    let font = '400 12.5px Nunito, sans-serif';
    if (containerRef.current && typeof window !== 'undefined') {
      const computed = window.getComputedStyle(containerRef.current);
      if (computed.font) {
        font = computed.font;
      } else {
        font = `${computed.fontWeight || '400'} ${computed.fontSize || '12.5px'} ${computed.fontFamily || 'Nunito, sans-serif'}`;
      }
    }

    const prefixWidth = getTextWidth(prefix, font);
    const buffer = 4;
    const maxAvailable = Math.max(effectiveWidth - buffer, 60);

    // Check if ALL clubs fit without cutting off
    const allClubsText = sortedClubs.join(', ');
    const allWidth = prefixWidth + getTextWidth(allClubsText, font);
    if (allWidth <= maxAvailable) {
      return { visibleClubs: sortedClubs, hiddenCount: 0 };
    }

    // Find maximum number of clubs k (>= 1) that fit with "+N more" text
    for (let k = sortedClubs.length - 1; k >= 1; k--) {
      const remainingCount = sortedClubs.length - k;
      const moreText = ` +${remainingCount} more`;
      const moreWidth = getTextWidth(moreText, font);
      const candidateText = sortedClubs.slice(0, k).join(', ');
      const totalWidth = prefixWidth + getTextWidth(candidateText, font) + moreWidth;

      if (totalWidth <= maxAvailable) {
        return { visibleClubs: sortedClubs.slice(0, k), hiddenCount: remainingCount };
      }
    }

    return { visibleClubs: [sortedClubs[0]], hiddenCount: sortedClubs.length - 1 };
  }, [sortedClubs, containerWidth]);

  if (!clubs || clubs.length === 0) {
    return (
      <div ref={containerRef} className="start-dm-clubs">
        <span className="start-dm-clubs-empty">Club Member</span>
      </div>
    );
  }

  const hiddenClubs = sortedClubs.slice(visibleClubs.length);
  const fullTooltip = `Shared clubs (${sortedClubs.length}):\n${sortedClubs.join(', ')}`;
  const moreTooltip = `+${hiddenCount} more shared clubs:\n${hiddenClubs.join(', ')}`;

  return (
    <div
      ref={containerRef}
      className="start-dm-clubs"
      title={fullTooltip}
    >
      <span className="start-dm-clubs-prefix">Shared:</span>{' '}
      <span className="start-dm-clubs-names">
        {visibleClubs.join(', ')}
      </span>
      {hiddenCount > 0 && (
        <span className="start-dm-clubs-more" title={moreTooltip}>
          {` +${hiddenCount} more`}
        </span>
      )}
    </div>
  );
};

const StartDirectMessageModal = ({
  isOpen,
  onClose,
  clubs = [],
  currentUser,
  onSelectUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [freshMembersByClub, setFreshMembersByClub] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // When modal is open, fetch fresh members from backend for each joined club
  useEffect(() => {
    if (!isOpen || !Array.isArray(clubs) || clubs.length === 0) {
      setFreshMembersByClub({});
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const numericClubIds = clubs
      .map((c) => c?.id)
      .filter((id) => typeof id === 'number');

    if (numericClubIds.length > 0) {
      setIsLoading(true);
      Promise.all(
        numericClubIds.map(async (clubId) => {
          try {
            const members = await fetchClubMembersApi(clubId);
            return { clubId, members };
          } catch (e) {
            return null;
          }
        })
      )
        .then((results) => {
          if (!isMounted) return;
          const map = {};
          results.forEach((res) => {
            if (res && Array.isArray(res.members)) {
              map[res.clubId] = res.members;
            }
          });
          setFreshMembersByClub(map);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, clubs]);

  // Extract all unique members from joined clubs ONLY, strictly excluding self and dummy data
  const availableMembers = useMemo(() => {
    const memberMap = new Map();
    const currentName = (currentUser?.username || '').toLowerCase().trim();
    const currentId = currentUser?.id ?? currentUser?.userId;

    // Names of legacy dummy mock users to filter out if lingering in local caches
    const DUMMY_NAMES = new Set([
      'alice smith',
      'bob jones',
      'charlie day',
      'diana prince',
      'evan wright',
      'fiona gallagher'
    ]);

    // ONLY iterate over clubs the user has joined (clubs prop)
    (clubs || []).forEach((club) => {
      if (!club) return;
      const clubMembers = freshMembersByClub[club.id] || club.members;
      if (!Array.isArray(clubMembers)) return;

      clubMembers.forEach((m) => {
        if (!m) return;
        const rawName = m.username || m.name;
        if (!rawName) return;
        const name = String(rawName).trim();
        const lowerName = name.toLowerCase();
        const memberId = m.userId ?? m.id;

        // Exclude the current user themselves
        const isSelf =
          (currentId != null && memberId != null && String(memberId) === String(currentId)) ||
          (currentName && lowerName === currentName);

        if (isSelf) return;

        // Exclude legacy mock dummy users without a valid backend joined date or userId
        if (DUMMY_NAMES.has(lowerName) && !m.joinedAt && typeof m.userId !== 'number') {
          return;
        }

        const mapKey = memberId != null ? `id_${memberId}` : `name_${lowerName}`;
        const clubName = club.name || club.title || club.mediaDetails?.title || 'Club';

        if (memberMap.has(mapKey)) {
          const existing = memberMap.get(mapKey);
          if (clubName && !existing.clubs.includes(clubName)) {
            existing.clubs.push(clubName);
          }
          if (m.isOnline || m.status === 'Online' || m.status === 'ONLINE') {
            existing.isOnline = true;
            existing.status = 'Online';
          }
          if (m.role === 'moderator') {
            existing.role = 'moderator';
          }
        } else {
          const isOnline = Boolean(m.isOnline || m.status === 'Online' || m.status === 'ONLINE');
          memberMap.set(mapKey, {
            id: memberId || m.id || Date.now(),
            userId: memberId || m.userId,
            name: name,
            username: m.username || name,
            img: m.avatarUrl || m.img || defaultAvatar,
            avatarUrl: m.avatarUrl || m.img || defaultAvatar,
            role: (m.role || 'member').toLowerCase(),
            status: isOnline ? 'Online' : 'Offline',
            isOnline,
            clubs: clubName ? [clubName] : []
          });
        }
      });
    });

    return Array.from(memberMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }, [clubs, freshMembersByClub, currentUser]);

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
              <p className="start-dm-subtitle">Select a member who shares clubs with you</p>
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
            placeholder={availableMembers.length > 0 ? "Search by name or club..." : "Search members..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={availableMembers.length === 0}
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
          {isLoading && availableMembers.length === 0 ? (
            <div className="start-dm-loading">
              <div className="start-dm-spinner" aria-hidden="true" />
              <p className="start-dm-loading-text">Finding members in your clubs...</p>
            </div>
          ) : filteredMembers.length > 0 ? (
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
                  <span
                    className={`start-dm-status-dot ${member.isOnline ? 'online' : 'offline'}`}
                    aria-hidden="true"
                    title={member.isOnline ? 'Online' : 'Offline'}
                  />
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
                  <SharedClubs clubs={member.clubs} searchTerm={searchTerm} />
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
          ) : searchTerm.trim() ? (
            <div className="start-dm-empty">
              <span className="start-dm-empty-icon" aria-hidden="true">🔍</span>
              <h3 className="start-dm-empty-heading">No members found</h3>
              <p className="start-dm-empty-subtext">No members in your clubs match "{searchTerm}"</p>
              <button
                type="button"
                className="start-dm-empty-clear-btn"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          ) : (!clubs || clubs.length === 0) ? (
            <div className="start-dm-empty">
              <span className="start-dm-empty-icon" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <h3 className="start-dm-empty-heading">No clubs joined yet</h3>
              <p className="start-dm-empty-subtext">
                Direct messages can only be sent to members who share clubs with you. Join a club to start chatting!
              </p>
            </div>
          ) : (
            <div className="start-dm-empty">
              <span className="start-dm-empty-icon" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <h3 className="start-dm-empty-heading">No other members in your clubs</h3>
              <p className="start-dm-empty-subtext">
                None of the clubs you belong to have other members yet. When other people join your clubs, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StartDirectMessageModal;
