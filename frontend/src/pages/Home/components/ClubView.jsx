import React from 'react';
import ClubSidebar from './ClubSidebar';
import ChatArea from './ChatArea';
import MembersSidebar from './MembersSidebar';

const ClubView = ({
  club,
  selectedChannelId,
  onSelectChannel,
  showMembers,
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
        showMembers={showMembers}
        onToggleMembers={onToggleMembers}
      />

      {showMembers && (
        <MembersSidebar members={club.members || []} />
      )}
    </div>
  );
};

export default ClubView;
