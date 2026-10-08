import React from 'react';

const MembersSidebar = ({ members = [], onClose }) => {
  // Separate into moderators and regular members
  // If no member has role === 'moderator', designate the first member as moderator
  const hasExplicitModerator = members.some((m) => m.role === 'moderator');
  const moderators = members.filter(
    (m, idx) => m.role === 'moderator' || (!hasExplicitModerator && idx === 0)
  );
  const regularMembers = members.filter(
    (m) => !moderators.some((mod) => (mod.id && m.id ? mod.id === m.id : mod.name === m.name))
  );

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
            {moderators.map((member) => (
              <div key={member.id || member.name} className="member-cell moderator-cell">
                <div className="member-avatar-wrap">
                  <img src={member.img} alt={member.name} className="member-image" />
                </div>
                <div className="member-info">
                  <span className="member-name moderator-name">{member.name}</span>
                </div>
                <span className="member-role-icon moderator-icon" title="Moderator" aria-label="Moderator">
                  𖤝
                </span>
              </div>
            ))}
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
              regularMembers.map((member) => (
                <div key={member.id || member.name} className="member-cell">
                  <div className="member-avatar-wrap">
                    <img src={member.img} alt={member.name} className="member-image" />
                  </div>
                  <div className="member-info">
                    <span className="member-name">{member.name}</span>
                  </div>
                  <span className="member-role-icon member-icon" title="Member" aria-label="Member">
                    ★
                  </span>
                </div>
              ))
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
