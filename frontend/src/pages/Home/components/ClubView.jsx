import React from 'react';
import ClubSidebar from './ClubSidebar';
import ChatArea from './ChatArea';
import MembersSidebar from './MembersSidebar';

const ClubView = ({
  club,
  selectedChannelId,
  onSelectChannel,
  showMembers = true,
  onToggleMembers
}) => {
  const activeChannel = club.channels?.find((c) => c.id === selectedChannelId) || club.channels?.[0];

  return (
    <div className="club-view">
      <ClubSidebar
        clubName={club.name}
        channels={club.channels || []}
        selectedChannelId={selectedChannelId}
        onSelectChannel={onSelectChannel}
      />

      <ChatArea
        activeChannel={activeChannel}
      />

      {showMembers ? (
        <MembersSidebar
          members={club.members || []}
          onClose={onToggleMembers}
        />
      ) : (
        <button
          type="button"
          className="members-collapsed-tab"
          onClick={onToggleMembers}
          title="Open members list"
          aria-label="Open members list"
        >
          <span className="collapsed-tab-icon">𖤝</span>
          <span className="collapsed-tab-label">Members</span>
        </button>
      )}
    </div>
  );
};

export default ClubView;
