import React from 'react';
import defaultAvatar from '../../../assets/default-avatar.png';

const MembersSidebar = ({
  members = [],
  onClose,
  onOpenUserCard,
  onStartDirectMessage,
  currentUser
}) => {
  // Deduplicate members list by id or username
  const uniqueMembers = members.reduce((acc, m) => {
    if (!m) return acc;
    const memberId = m.id !== undefined && m.id !== null ? String(m.id) : null;
    const memberName = (m.name || m.username || '').toLowerCase();
    const key = memberId ? `id_${memberId}` : `name_${memberName}`;
    if (!acc.seen.has(key)) {
      acc.seen.add(key);
      acc.list.push(m);
    }
    return acc;
  }, { seen: new Set(), list: [] }).list;

  // Separate into moderators and regular members
  // If no member has role === 'moderator', designate the first member as moderator
  const hasExplicitModerator = uniqueMembers.some(
    (m) => (m.role || '').toLowerCase() === 'moderator'
  );
  const moderators = uniqueMembers.filter(
    (m, idx) => (m.role || '').toLowerCase() === 'moderator' || (!hasExplicitModerator && idx === 0)
  );
  const regularMembers = uniqueMembers.filter(
    (m) => !moderators.some((mod) => (
      mod.id && m.id
        ? String(mod.id) === String(m.id)
        : (mod.name || mod.username || '').toLowerCase() === (m.name || m.username || '').toLowerCase()
    ))
  );

  const currentUsername = (currentUser?.username || '').toLowerCase();
  const currentUserId = currentUser?.id;

  const isSelf = (member) => {
    if (currentUserId && member.id && String(currentUserId) === String(member.id)) return true;
    const name = (member.name || member.username || '').toLowerCase();
    return Boolean(currentUsername && name === currentUsername);
  };

  const getMemberStatus = (member) => {
    if (isSelf(member)) return { isOnline: true, label: 'Online' };
    if (member.isOnline !== undefined) {
      const isOnline = Boolean(member.isOnline);
      return {
        isOnline,
        label: isOnline ? 'Online' : 'Offline'
      };
    }
    if (member.status) {
      const isOnline = member.status.toLowerCase().includes('online');
      return {
        isOnline,
        label: isOnline ? 'Online' : 'Offline'
      };
    }
    return { isOnline: false, label: 'Offline' };
  };

  const handleMemberClick = (member, role, statusInfo) => {
    const displayName = member.name || member.username || 'Member';
    const displayImg = member.img || member.avatarUrl || defaultAvatar;
    if (onOpenUserCard) {
      onOpenUserCard({
        id: member.id,
        name: displayName,
        username: member.username || displayName,
        avatarUrl: displayImg,
        role: role,
        status: statusInfo?.label || (statusInfo?.isOnline ? 'Online' : 'Offline'),
        isOnline: Boolean(statusInfo?.isOnline)
      });
    }
  };

  const handleQuickMessage = (e, member) => {
    e.stopPropagation();
    const displayName = member.name || member.username || 'Member';
    const displayImg = member.img || member.avatarUrl || defaultAvatar;
    if (onStartDirectMessage) {
      onStartDirectMessage({
        id: member.id,
        name: displayName,
        username: member.username || displayName,
        avatarUrl: displayImg
      });
    }
  };

  const renderMemberCell = (member, role) => {
    const isCurrentUser = isSelf(member);
    const statusInfo = getMemberStatus(member);
    const { isOnline, label: statusLabel } = statusInfo;
    const displayName = member.name || member.username || 'Member';
    const displayImg = member.img || member.avatarUrl || defaultAvatar;

    return (
      <div
        key={member.id ? String(member.id) : displayName}
        className={`member-cell ${role === 'moderator' ? 'moderator-cell' : ''}`}
        onClick={() => handleMemberClick(member, role, statusInfo)}
        role="button"
        tabIndex={0}
        title={`${displayName} • ${isCurrentUser ? 'Online (You)' : statusLabel}`}
        aria-label={`${displayName}, ${role === 'moderator' ? 'Moderator' : 'Member'}, ${isCurrentUser ? 'Online (You)' : statusLabel}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMemberClick(member, role, statusInfo);
          }
        }}
      >
        <div className="member-avatar-wrap">
          <img
            src={displayImg}
            alt={displayName}
            className="member-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <span
            className={`member-status-dot ${isOnline ? 'online' : 'offline'}`}
            title={statusLabel}
            aria-hidden="true"
          />
        </div>
        <div className="member-info">
          <span className={`member-name ${role === 'moderator' ? 'moderator-name' : ''}`}>
            {displayName}
          </span>
        </div>

        {/* Quick Message Button on Hover */}
        {!isCurrentUser && onStartDirectMessage && (
          <button
            type="button"
            className="member-quick-msg-btn"
            onClick={(e) => handleQuickMessage(e, member)}
            title={`Message ${displayName}`}
            aria-label={`Message ${displayName}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        )}

        <span
          className={`member-role-icon ${role === 'moderator' ? 'moderator-icon' : 'member-icon'}`}
          title={role === 'moderator' ? 'Moderator' : 'Member'}
          aria-label={role === 'moderator' ? 'Moderator' : 'Member'}
        >
          {role === 'moderator' ? '𖤝' : '★'}
        </span>
      </div>
    );
  };

  return (
    <aside className="members-sidebar" aria-label="Club members">
      {/* Sidebar Header / Close Bar */}
      <div className="members-sidebar-header">
        <span className="members-sidebar-heading">
          Members ({uniqueMembers.length})
        </span>
        {onClose && (
          <button
            type="button"
            className="members-sidebar-close-btn"
            onClick={onClose}
            title="Close members list"
            aria-label="Close members list"
          >
            &times;
          </button>
        )}
      </div>

      <div className="members-sidebar-scroll">
        {/* Moderators Section */}
        <div className="members-section">
          <div className="members-section-header">
            <span className="members-section-badge moderator-badge" aria-hidden="true">𖤝</span>
            <span className="members-section-title">
              MODERATORS — {moderators.length}
            </span>
          </div>
          <div className="members-list">
            {moderators.map((member) => renderMemberCell(member, 'moderator'))}
          </div>
        </div>

        {/* Regular Members Section */}
        <div className="members-section">
          <div className="members-section-header">
            <span className="members-section-badge member-badge" aria-hidden="true">★</span>
            <span className="members-section-title">
              MEMBERS — {regularMembers.length}
            </span>
          </div>
          <div className="members-list">
            {regularMembers.length > 0 ? (
              regularMembers.map((member) => renderMemberCell(member, 'member'))
            ) : (
              <div className="members-empty-hint">No other members yet</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MembersSidebar;
