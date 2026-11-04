import React, { useState } from 'react';
import ClubSidebar from './ClubSidebar';
import ChatArea from './ChatArea';
import ClubInfoView from './ClubInfoView';
import MembersSidebar from './MembersSidebar';
import UserAccountModal from './UserAccountModal';

const ClubView = ({
  club,
  currentUser,
  selectedChannelId,
  onSelectChannel,
  showMembers = true,
  onToggleMembers,
  onUpdateClub,
  onLeaveClub,
  onStartDirectMessage
}) => {
  const [selectedUserForCard, setSelectedUserForCard] = useState(null);
  const [pendingMention, setPendingMention] = useState(null);

  const activeChannel = club.channels?.find((c) => c.id === selectedChannelId) || club.channels?.[0];
  const isInfoChannel =
    activeChannel?.type === 'info' ||
    activeChannel?.name === 'info' ||
    activeChannel?.id === 'info';

  const handleOpenUserCard = (userData) => {
    setSelectedUserForCard(userData);
  };

  const handleCloseUserCard = () => {
    setSelectedUserForCard(null);
  };

  const handleMentionUser = (username) => {
    setPendingMention(username);
  };

  return (
    <div className="club-view">
      <ClubSidebar
        club={club}
        clubName={club.name}
        channels={club.channels || []}
        selectedChannelId={selectedChannelId}
        onSelectChannel={onSelectChannel}
        currentUser={currentUser}
        activeChannel={activeChannel}
        onUpdateClub={onUpdateClub}
        onLeaveClub={onLeaveClub}
      />

      {isInfoChannel ? (
        <ClubInfoView
          club={club}
          activeChannel={activeChannel}
          onSelectChannel={onSelectChannel}
        />
      ) : (
        <ChatArea
          club={club}
          activeChannel={activeChannel}
          currentUser={currentUser}
          onSelectChannel={onSelectChannel}
          onOpenUserCard={handleOpenUserCard}
          pendingMention={pendingMention}
          onClearPendingMention={() => setPendingMention(null)}
        />
      )}

      {showMembers ? (
        <MembersSidebar
          members={club.members || []}
          onClose={onToggleMembers}
          onOpenUserCard={handleOpenUserCard}
          onStartDirectMessage={onStartDirectMessage}
          currentUser={currentUser}
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

      {selectedUserForCard && (
        <UserAccountModal
          isOpen={Boolean(selectedUserForCard)}
          user={selectedUserForCard}
          club={club}
          currentUser={currentUser}
          onClose={handleCloseUserCard}
          onMention={handleMentionUser}
          onStartDirectMessage={onStartDirectMessage}
        />
      )}
    </div>
  );
};

export default ClubView;
