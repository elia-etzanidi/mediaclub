import React, { useState, useRef, useEffect } from 'react';
import EditChannelsModal from './EditChannelsModal';
import ManageMembersModal from './ManageMembersModal';
import LeaveClubModal from './LeaveClubModal';
import AssignModeratorModal from './AssignModeratorModal';
import { promoteMemberApi } from '../../../services/clubService';

const ClubSidebar = ({
  club,
  clubName,
  channels = [],
  selectedChannelId,
  onSelectChannel,
  currentUser,
  activeChannel,
  onUpdateClub,
  onLeaveClub
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditChannelsOpen, setIsEditChannelsOpen] = useState(false);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isLeaveClubOpen, setIsLeaveClubOpen] = useState(false);
  const [isAssignModeratorOpen, setIsAssignModeratorOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const menuContainerRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const activeClubName = club?.name || clubName || 'Club';
  const activeChannelsList = club?.channels || channels || [];

  // Determine current active channel if not directly supplied
  const currentActiveChannel =
    activeChannel ||
    activeChannelsList.find((c) => c.id === selectedChannelId) ||
    activeChannelsList[0];

  // Determine if current user is moderator
  const userMember = club?.members?.find((m) => {
    const mId = m.id || m.userId;
    const cId = currentUser?.id || currentUser?.userId;
    const isIdMatch = mId && cId && String(mId) === String(cId);
    const mName = (m.username || m.name || '').toLowerCase();
    const cName = (currentUser?.username || currentUser?.name || '').toLowerCase();
    const isNameMatch = mName && cName && mName === cName;
    return isIdMatch || isNameMatch;
  });

  const isActualModerator = Boolean(
    currentUser?.isGlobalAdmin ||
    userMember?.role?.toLowerCase() === 'moderator' ||
    userMember?.role?.toLowerCase() === 'admin' ||
    // If club was created by current user and they are the sole member
    (club?.members?.length === 1 &&
      ((userMember?.name || userMember?.username || '').toLowerCase() === (currentUser?.username || '').toLowerCase())) ||
    // If no explicit moderator exists in the club, first member is moderator
    (!club?.members?.some((m) => (m.role || '').toLowerCase() === 'moderator') &&
      ((club?.members?.[0]?.name || club?.members?.[0]?.username || '').toLowerCase() === (currentUser?.username || '').toLowerCase()))
  );

  const isModerator = isActualModerator;

  // Find eligible members (everyone except current user)
  const eligibleMembers = (club?.members || []).filter((m) => {
    const isSelf =
      (m.id && currentUser?.id && String(m.id) === String(currentUser.id)) ||
      ((m.name || m.username || '').toLowerCase() === (currentUser?.username || '').toLowerCase());
    return !isSelf;
  });

  // Check if there are any other moderators in the club
  const otherModerators = (club?.members || []).filter((m) => {
    const isSelf =
      (m.id && currentUser?.id && String(m.id) === String(currentUser.id)) ||
      ((m.name || m.username || '').toLowerCase() === (currentUser?.username || '').toLowerCase());
    const isMod =
      (m.role || '').toLowerCase() === 'moderator' || (m.role || '').toLowerCase() === 'admin';
    return !isSelf && isMod;
  });

  const isLastModerator = isModerator && otherModerators.length === 0;

  // Handle outside click to close dropdown menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Toast feedback helper
  const showToast = (msg) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2600);
  };

  // Copy Channel Link
  const handleCopyChannelLink = async () => {
    const channelName = currentActiveChannel?.name || 'general';
    const url = `${window.location.origin}${window.location.pathname}?club=${encodeURIComponent(
      activeClubName
    )}&channel=${encodeURIComponent(channelName)}`;

    let copied = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copied = true;
      } catch (err) {
        console.warn('Clipboard writeText failed:', err);
      }
    }

    if (!copied) {
      const el = document.createElement('textarea');
      el.value = url;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      try {
        document.execCommand('copy');
        copied = true;
      } catch (e) {
        console.warn('execCommand failed:', e);
      }
      document.body.removeChild(el);
    }

    showToast(`✓ Copied link to #${channelName}!`);
    setIsMenuOpen(false);
  };

  // Copy Club Link
  const handleCopyClubLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?club=${encodeURIComponent(
      activeClubName
    )}`;

    let copied = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copied = true;
      } catch (err) {
        console.warn('Clipboard writeText failed:', err);
      }
    }

    if (!copied) {
      const el = document.createElement('textarea');
      el.value = url;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      try {
        document.execCommand('copy');
        copied = true;
      } catch (e) {}
      document.body.removeChild(el);
    }

    showToast(`✓ Copied link to ${activeClubName}!`);
    setIsMenuOpen(false);
  };

  // Toggle Mute Notifications
  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      showToast(
        next
          ? `Muted notifications for ${activeClubName}`
          : `Unmuted notifications for ${activeClubName}`
      );
      return next;
    });
    setIsMenuOpen(false);
  };

  // Leave Club Modal Handlers
  const handleOpenLeaveModal = () => {
    setIsMenuOpen(false);
    if (isLastModerator && eligibleMembers.length > 0) {
      setIsAssignModeratorOpen(true);
    } else {
      setIsLeaveClubOpen(true);
    }
  };

  const handleConfirmLeave = () => {
    setIsLeaveClubOpen(false);
    if (isLastModerator && eligibleMembers.length > 0) {
      setIsAssignModeratorOpen(true);
      return;
    }
    if (onLeaveClub && club?.id) {
      onLeaveClub(club.id);
    }
  };

  const handleAssignAndLeave = async (selectedMembers) => {
    setIsAssignModeratorOpen(false);
    if (!selectedMembers || selectedMembers.length === 0) return;

    // 1. Promote chosen 1-2 members to moderator
    for (const member of selectedMembers) {
      const memberId = member.id || member.userId;
      if (memberId && club?.id) {
        await promoteMemberApi(club.id, memberId);
      }
    }

    // 2. Update local club members role so open views immediately reflect the new moderators
    if (onUpdateClub && club) {
      const selectedIdSet = new Set(selectedMembers.map((m) => String(m.id || m.userId)));
      const updatedMembers = (club.members || []).map((m) => {
        if (selectedIdSet.has(String(m.id || m.userId))) {
          return { ...m, role: 'moderator' };
        }
        return m;
      });
      onUpdateClub({
        ...club,
        members: updatedMembers
      });
    }

    // 3. Show confirmation toast
    const names = selectedMembers.map((m) => m.name || m.username).join(' & ');
    showToast(`✓ Promoted ${names} to Moderator!`);

    // 4. Leave the club
    if (onLeaveClub && club?.id) {
      onLeaveClub(club.id);
    }
  };

  return (
    <div className="club-sidebar">
      {/* Club Header with Name and Three-Dots Menu */}
      <div className="club-header">
        <h2 title={activeClubName}>{activeClubName}</h2>

        <div className="club-header-actions" ref={menuContainerRef}>
          <button
            type="button"
            className={`club-menu-trigger-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            title="Club options"
            aria-label="Club options menu"
            aria-expanded={isMenuOpen}
          >
            {/* Clean three horizontal dots icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="5" cy="12" r="2.2" />
              <circle cx="12" cy="12" r="2.2" />
              <circle cx="19" cy="12" r="2.2" />
            </svg>
          </button>

          {/* List Menu Dropdown */}
          {isMenuOpen && (
            <div className="club-dropdown-menu" role="menu">
              {/* Header inside dropdown */}
              <div className="club-dropdown-top">
                <div className="club-dropdown-club-name" title={activeClubName}>
                  {activeClubName}
                </div>
                <div className="club-dropdown-role-row">
                  <span
                    className={`club-dropdown-role-badge ${
                      isModerator ? 'is-moderator' : 'is-member'
                    }`}
                  >
                    {isModerator ? '𖤝 Moderator' : '★ Member'}
                  </span>
                </div>
              </div>

              <div className="club-dropdown-divider" />

              {/* Standard Options (Available to all club members) */}
              <div className="club-dropdown-group">
                <button
                  type="button"
                  className="club-dropdown-item"
                  onClick={handleCopyChannelLink}
                  role="menuitem"
                >
                  <span className="club-dropdown-item-icon">
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
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </span>
                  <div className="club-dropdown-item-content">
                    <span className="club-dropdown-item-label">
                      Copy Channel Link
                    </span>
                    <span className="club-dropdown-item-sub">
                      #{currentActiveChannel?.name || 'general'}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className="club-dropdown-item"
                  onClick={handleCopyClubLink}
                  role="menuitem"
                >
                  <span className="club-dropdown-item-icon">
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
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </span>
                  <div className="club-dropdown-item-content">
                    <span className="club-dropdown-item-label">
                      Copy Club Link
                    </span>
                    <span className="club-dropdown-item-sub">
                      Share community invite
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className="club-dropdown-item"
                  onClick={handleToggleMute}
                  role="menuitem"
                >
                  <span className="club-dropdown-item-icon">
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
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      {isMuted && <line x1="1" y1="1" x2="23" y2="23" />}
                    </svg>
                  </span>
                  <div className="club-dropdown-item-content">
                    <span className="club-dropdown-item-label">
                      {isMuted ? 'Unmute Club' : 'Mute Notifications'}
                    </span>
                    <span className="club-dropdown-item-sub">
                      {isMuted ? 'Notifications silenced' : 'Receive message alerts'}
                    </span>
                  </div>
                </button>
              </div>

              {/* MODERATOR ONLY SECTION - Hidden for regular members */}
              {isModerator && (
                <>
                  <div className="club-dropdown-divider" />
                  <div className="club-dropdown-section-title">
                    <span className="mod-shield-mini">𖤝</span> MODERATOR CONTROLS
                  </div>

                  <div className="club-dropdown-group">
                    <button
                      type="button"
                      className="club-dropdown-item mod-item"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsEditChannelsOpen(true);
                      }}
                      role="menuitem"
                    >
                      <span className="club-dropdown-item-icon mod-icon">
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
                          <line x1="4" y1="9" x2="20" y2="9" />
                          <line x1="4" y1="15" x2="20" y2="15" />
                          <line x1="10" y1="3" x2="8" y2="21" />
                          <line x1="16" y1="3" x2="14" y2="21" />
                        </svg>
                      </span>
                      <div className="club-dropdown-item-content">
                        <span className="club-dropdown-item-label">
                          Edit Channels
                        </span>
                        <span className="club-dropdown-item-sub">
                          Add, rename, delete or reorder
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="club-dropdown-item mod-item"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsManageMembersOpen(true);
                      }}
                      role="menuitem"
                    >
                      <span className="club-dropdown-item-icon mod-icon">
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
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </span>
                      <div className="club-dropdown-item-content">
                        <span className="club-dropdown-item-label">
                          Manage Members
                        </span>
                        <span className="club-dropdown-item-sub">
                          Assign moderators & remove
                        </span>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {/* Leave Club Option */}
              {onLeaveClub && (
                <>
                  <div className="club-dropdown-divider" />
                  <div className="club-dropdown-group">
                    <button
                      type="button"
                      className="club-dropdown-item danger-item"
                      onClick={handleOpenLeaveModal}
                      role="menuitem"
                    >
                      <span className="club-dropdown-item-icon danger-icon">
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
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      </span>
                      <div className="club-dropdown-item-content">
                        <span className="club-dropdown-item-label">
                          Leave Club
                        </span>
                        <span className="club-dropdown-item-sub">
                          Remove from your active clubs
                        </span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Channels Section */}
      <div className="channels-section">
        <div className="channels-title-row">
          <span className="channels-title">CHANNELS</span>
          {isModerator && (
            <button
              type="button"
              className="add-channel-quick-btn"
              onClick={() => setIsEditChannelsOpen(true)}
              title="Add or edit channels (Moderator)"
              aria-label="Add or edit channels"
            >
              +
            </button>
          )}
        </div>

        <div className="channel-list">
          {activeChannelsList.map((channel) => {
            const isInfo =
              channel.type === 'info' ||
              channel.name === 'info' ||
              channel.id === 'info';
            return (
              <div
                key={channel.id}
                className={`channel-cell ${
                  selectedChannelId === channel.id ? 'active' : ''
                }`}
                onClick={() => onSelectChannel(channel.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectChannel(channel.id);
                  }
                }}
              >
                <span className="channel-icon">✦</span>
                <span className="channel-name-text">{channel.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Channels Modal (Opened via Moderator Menu option) */}
      <EditChannelsModal
        isOpen={isEditChannelsOpen}
        club={club || { name: activeClubName, channels: activeChannelsList }}
        selectedChannelId={selectedChannelId}
        onSelectChannel={onSelectChannel}
        onUpdateClub={onUpdateClub}
        onClose={() => setIsEditChannelsOpen(false)}
      />

      {/* Manage Members Modal (Opened via Moderator Menu option) */}
      <ManageMembersModal
        club={club || { name: activeClubName, members: club?.members || [] }}
        currentUser={currentUser}
        isOpen={isManageMembersOpen}
        onClose={() => setIsManageMembersOpen(false)}
        onUpdateClub={onUpdateClub}
        showToast={showToast}
      />

      {/* Leave Club Confirmation Popup Modal */}
      <LeaveClubModal
        isOpen={isLeaveClubOpen}
        clubName={activeClubName}
        onConfirm={handleConfirmLeave}
        onClose={() => setIsLeaveClubOpen(false)}
      />

      {/* Assign New Moderator Modal when last moderator decides to leave */}
      <AssignModeratorModal
        isOpen={isAssignModeratorOpen}
        club={club}
        clubName={activeClubName}
        members={eligibleMembers}
        onAssignAndLeave={handleAssignAndLeave}
        onClose={() => setIsAssignModeratorOpen(false)}
      />

      {/* Toast Notification for Link Copying & Settings */}
      {toastMessage && (
        <div className="club-toast-banner" role="status" aria-live="polite">
          <span className="club-toast-icon">✓</span>
          <span className="club-toast-text">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ClubSidebar;
