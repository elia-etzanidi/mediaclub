import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ManageMembersModal.css';
import { promoteMemberApi, kickMemberApi } from '../../../services/clubService';
import defaultAvatar from '../../../assets/default-avatar.png';

const ManageMembersModal = ({
  isOpen,
  club,
  currentUser,
  onUpdateClub,
  onClose,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmRemoveId, setConfirmRemoveId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (confirmRemoveId) {
          setConfirmRemoveId(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, confirmRemoveId, onClose]);

  if (!isOpen || !club) return null;

  const membersList = club.members || [];

  // Filter members by search query
  const filteredMembers = membersList.filter((m) =>
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Count moderators
  const moderatorCount = membersList.filter(
    (m) => m.role?.toLowerCase() === 'moderator'
  ).length;

  // Check if member is current user
  const isCurrentMemberUser = (member) => {
    return (
      (member.id && currentUser?.id && member.id === currentUser.id) ||
      member.name?.toLowerCase() === currentUser?.username?.toLowerCase()
    );
  };

  // Promote to moderator
  const handlePromote = async (member) => {
    const updatedMembers = membersList.map((m) =>
      (m.id && member.id ? m.id === member.id : m.name === member.name)
        ? { ...m, role: 'moderator' }
        : m
    );

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        members: updatedMembers
      });
    }

    if (showToast) {
      showToast(`✓ Promoted ${member.name} to Moderator!`);
    }

    if (member.id && club.id) {
      promoteMemberApi(club.id, member.id);
    }
  };

  // Demote to regular member
  const handleDemote = async (member) => {
    if (moderatorCount <= 1) {
      alert('A club must have at least one moderator.');
      return;
    }

    const updatedMembers = membersList.map((m) =>
      (m.id && member.id ? m.id === member.id : m.name === member.name)
        ? { ...m, role: 'member' }
        : m
    );

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        members: updatedMembers
      });
    }

    if (showToast) {
      showToast(`Demoted ${member.name} to Member.`);
    }
  };

  // Remove member from club
  const handleConfirmRemove = async (member) => {
    const updatedMembers = membersList.filter(
      (m) => !(m.id && member.id ? m.id === member.id : m.name === member.name)
    );

    if (onUpdateClub) {
      onUpdateClub({
        ...club,
        members: updatedMembers
      });
    }

    setConfirmRemoveId(null);

    if (showToast) {
      showToast(`✓ Removed ${member.name} from club.`);
    }

    if (member.id && club.id) {
      kickMemberApi(club.id, member.id);
    }
  };

  return createPortal(
    <div
      className="manage-members-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-members-title"
    >
      <div
        className="manage-members-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="manage-members-header">
          <div className="manage-members-title-wrap">
            <h3 id="manage-members-title" className="manage-members-title">
              <span>✦</span> Manage Members
            </h3>
            <span className="manage-members-header-divider">•</span>
            <span className="manage-members-club-name" title={club.name}>
              {club.name}
            </span>
          </div>
          <button
            type="button"
            className="manage-members-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="manage-members-body">
          {/* Search Bar */}
          <div className="manage-members-search-wrap">
            <svg
              className="manage-members-search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="manage-members-search-input"
              placeholder="Filter members by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="manage-members-section-header">
            CLUB MEMBERS ({filteredMembers.length})
          </div>

          {/* Members List */}
          <div className="manage-members-list">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const isMod = member.role?.toLowerCase() === 'moderator';
                const isYou = isCurrentMemberUser(member);
                const isConfirming =
                  confirmRemoveId === (member.id || member.name);

                return (
                  <div
                    key={member.id || member.name}
                    className="manage-member-item"
                  >
                    {isConfirming ? (
                      <div className="manage-remove-confirm-box">
                        <span className="manage-remove-confirm-text">
                          Remove {member.name} from {club.name}?
                        </span>
                        <div className="manage-confirm-actions">
                          <button
                            type="button"
                            className="manage-confirm-remove-btn"
                            onClick={() => handleConfirmRemove(member)}
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            className="manage-cancel-remove-btn"
                            onClick={() => setConfirmRemoveId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="manage-member-left">
                          <img
                            src={member.img || defaultAvatar}
                            alt={member.name}
                            className="manage-member-avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultAvatar;
                            }}
                          />
                          <div className="manage-member-info">
                            <div className="manage-member-name-row">
                              <span className="manage-member-name">
                                {member.name}
                              </span>
                              {isYou && (
                                <span className="manage-member-you-badge">
                                  You
                                </span>
                              )}
                            </div>
                            <span
                              className={`manage-member-role-badge ${
                                isMod ? 'is-moderator' : 'is-member'
                              }`}
                            >
                              {isMod ? '𖤝 Moderator' : '★ Member'}
                            </span>
                          </div>
                        </div>

                        <div className="manage-member-actions">
                          {/* Role Toggle: Promote or Demote */}
                          {isMod ? (
                            <button
                              type="button"
                              className="manage-role-btn demote"
                              onClick={() => handleDemote(member)}
                              disabled={isYou || moderatorCount <= 1}
                              title={
                                isYou
                                  ? 'You cannot demote yourself'
                                  : moderatorCount <= 1
                                  ? 'Club must have at least one moderator'
                                  : 'Demote to regular member'
                              }
                            >
                              Demote
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="manage-role-btn promote"
                              onClick={() => handlePromote(member)}
                              title="Make this member a moderator"
                            >
                              <span>𖤝</span> Make Moderator
                            </button>
                          )}

                          {/* Remove from club button */}
                          <button
                            type="button"
                            className="manage-remove-btn"
                            onClick={() =>
                              setConfirmRemoveId(member.id || member.name)
                            }
                            disabled={isYou || (isMod && moderatorCount <= 1)}
                            title={
                              isYou
                                ? 'Use Leave Club to remove yourself'
                                : isMod && moderatorCount <= 1
                                ? 'Cannot remove the sole moderator'
                                : `Remove ${member.name} from club`
                            }
                            aria-label={`Remove ${member.name}`}
                          >
                            {/* Trash / User-minus icon */}
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="8.5" cy="7" r="4" />
                              <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="manage-members-empty">
                No members found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="manage-members-footer">
          <button
            type="button"
            className="manage-members-done-btn"
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

export default ManageMembersModal;
