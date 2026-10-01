import React from 'react';

const MembersSidebar = ({ members }) => {
  return (
    <div className="members-sidebar">
      <div className="members-title">MEMBERS — {members.length}</div>
      <div className="members-list">
        {members.map((member) => (
          <div key={member.id} className="member-cell">
            <img src={member.img} alt={member.name} className="member-image" />
            <span className="member-name">{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSidebar;
