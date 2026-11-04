import React from 'react';
import defaultAvatar from '../../../assets/default-avatar.png';

const MembersSidebar = ({
  members = [],
  onClose,
  onOpenUserCard,
  onStartDirectMessage,
  currentUser
}) => {
  // Separate into moderators and regular members
  // If no member has role === 'moderator', designate the first member as moderator
  const hasExplicitModerator = members.some((m) => m.role === 'moderator');
  const moderators = members.filter(
    (m, idx) => m.role === 'moderator' || (!hasExplicitModerator && idx === 0)
  );
  const regularMembers = members.filter(
    (m) => !moderators.some((mod) => (mod.id && m.id ? mod.id === m.id : mod.name === m.name))
  );

  const currentUsername = (currentUser?.username || '').toLowerCase();
  const currentUserId = currentUser?.id;

  const isSelf = (member) => {
    if (currentUserId && member.id && currentUserId === member.id) return true;
    const name = (member.name || member.username || '').toLowerCase();
    return name === currentUsername;
  };

  const handleMemberClick = (member, role) => {
    if (onOpenUserCard) {
      onOpenUserCard({
        id: member.id,
        name: member.name,
        username: member.name,
        avatarUrl: member.img,
        role: role
      });
    }
  };

  const handleQuickMessage = (e, member) => {
    e.stopPropagation();
    if (onStartDirectMessage) {
      onStartDirectMessage({
        id: member.id,
        name: member.name,
        username: member.name,
        avatarUrl: member.img
      });
    }
  };

  const renderMemberCell = (member, role) => {
    const isCurrentUser = isSelf(member);

    return (
      <div
        key={member.id || member.name}
        className={`member-cell ${role === 'moderator' ? 'moderator-cell' : ''}`}
        onClick={() => handleMemberClick(member, role)}
        role="button"
        tabIndex={0}
        title={`View ${member.name}'s account details`}
        aria-label={`View ${member.name}'s profile`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMemberClick(member, role);
          }
        }}
      >
        <div className="member-avatar-wrap">
          <img
            src={member.img || defaultAvatar}
            alt={member.name}
            className="member-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="member-info">
          <span className={`member-name ${role === 'moderator' ? 'moderator-name' : ''}`}>
            {member.name}
          </span>
        </div>

        {/* Quick Message Button on Hover */}
        {!isCurrentUser && onStartDirectMessage && (
          <button
            type="button"
            className="member-quick-msg-btn"
            onClick={(e) => handleQuickMessage(e, member)}
            title={`Message ${member.name}`}
            aria-label={`Message ${member.name}`}
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
          Members ({members.length})
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
