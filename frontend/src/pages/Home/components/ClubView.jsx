import React, { useState, useEffect, useRef } from 'react';
import ClubSidebar from './ClubSidebar';
import ChatArea from './ChatArea';
import ClubInfoView from './ClubInfoView';
import MembersSidebar from './MembersSidebar';
import UserAccountModal from './UserAccountModal';
import websocketService from '../../../services/websocketService';

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

  const clubRef = useRef(club);
  useEffect(() => {
    clubRef.current = club;
  }, [club]);

  // Subscribe to real-time club presence events (users logging in, logging out, disconnecting)
  useEffect(() => {
    if (!club?.id) return;

    const unsubscribe = websocketService.subscribeToClubPresence(club.id, (event) => {
      if (!event) return;
      const currentClub = clubRef.current;
      if (!currentClub) return;

      const isOnline = event.type === 'ONLINE' || event.type === 'JOINED';
      const isOffline = event.type === 'OFFLINE';
      const isLeft = event.type === 'LEFT';
      const isRoleChanged = event.type === 'ROLE_CHANGED';
      const eventUserId = event.userId;
      const eventUsername = (event.username || '').toLowerCase();

      const existingMembers = currentClub.members || [];
      const memberExists = existingMembers.some((m) => {
        const mId = m.id || m.userId;
        const mName = (m.username || m.name || '').toLowerCase();
        return (eventUserId && mId && String(mId) === String(eventUserId)) ||
          (eventUsername && mName && mName === eventUsername);
      });

      let updatedMembers;
      if (isLeft) {
        updatedMembers = existingMembers.filter((m) => {
          const mId = m.id || m.userId;
          const mName = (m.username || m.name || '').toLowerCase();
          return !((eventUserId && mId && String(mId) === String(eventUserId)) ||
            (eventUsername && mName && mName === eventUsername));
        });
      } else if (memberExists) {
        updatedMembers = existingMembers.map((m) => {
          const mId = m.id || m.userId;
          const mName = (m.username || m.name || '').toLowerCase();
          const isMatch = (eventUserId && mId && String(mId) === String(eventUserId)) ||
            (eventUsername && mName && mName === eventUsername);

          if (isMatch) {
            const onlineNow = isOnline ? true : (isOffline ? false : m.isOnline);
            const roleNow = isRoleChanged && event.role ? event.role.toLowerCase() : m.role;
            return {
              ...m,
              isOnline: onlineNow,
              status: onlineNow ? 'Online' : 'Offline',
              role: roleNow
            };
          }
          return m;
        });
      } else if (event.type === 'JOINED') {
        const newMember = {
          id: eventUserId,
          name: event.username || 'Member',
          username: event.username || 'Member',
          img: defaultAvatar,
          avatarUrl: defaultAvatar,
          role: 'member',
          status: 'Online',
          isOnline: true
        };
        updatedMembers = [...existingMembers, newMember];
      } else {
        updatedMembers = existingMembers;
      }

      if (onUpdateClub) {
        onUpdateClub({
          ...currentClub,
          members: updatedMembers,
          memberCount: updatedMembers.length
        });
      }

      // If user card modal is open for this member, update its status live
      setSelectedUserForCard((prev) => {
        if (!prev) return prev;
        const prevId = prev.id || prev.userId;
        const prevName = (prev.username || prev.name || '').toLowerCase();
        const isMatch = (eventUserId && prevId && String(prevId) === String(eventUserId)) ||
          (eventUsername && prevName && prevName === eventUsername);
        if (isMatch) {
          const onlineNow = isOnline ? true : (isOffline ? false : prev.isOnline);
          return {
            ...prev,
            isOnline: onlineNow,
            status: onlineNow ? 'Online' : 'Offline'
          };
        }
        return prev;
      });
    });

    return () => {
      unsubscribe();
    };
  }, [club?.id, onUpdateClub]);

  const activeChannel =
    club.channels?.find(
      (c) =>
        String(c.id) === String(selectedChannelId) ||
        (selectedChannelId === 'info' && (c.name === 'info' || c.type === 'info'))
    ) || club.channels?.[0];
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
