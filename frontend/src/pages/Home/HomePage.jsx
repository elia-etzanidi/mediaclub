import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import {
  currentUser,
  initialClubs,
  initialPeople,
  TopNav,
  LeftPane,
  ClubView,
  DirectMessageView,
  EmptyClubsView,
  EmptyDirectMessagesView,
  StartDirectMessageModal,
  UserAccountModal,
  CreateClubModal
} from './components';
import { getCurrentUser, getUserProfile } from '../../services/authService';
import defaultAvatar from '../../assets/default-avatar.png';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedClubId, setSelectedClubId] = useState(() => {
    try {
      const saved = localStorage.getItem('mediaclub_last_selected_club_id');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [selectedPersonId, setSelectedPersonId] = useState(() => {
    try {
      const saved = localStorage.getItem('mediaclub_last_selected_person_id');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [selectedChannelId, setSelectedChannelId] = useState('info');
  const [showMembers, setShowMembers] = useState(true);
  const [dmUpdateTick, setDmUpdateTick] = useState(0);

  // Clubs state: defaults to saved clubs if available, or empty so new users see empty state
  const [clubs, setClubs] = useState(() => {
    try {
      const saved = localStorage.getItem('mediaclub_joined_clubs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error loading saved clubs:', e);
    }
    return [];
  });
  // System clubs: all clubs created in the platform (each media title has one and only one club)
  const [systemClubs, setSystemClubs] = useState(initialClubs);

  // Direct message contacts state (persisted)
  const [people, setPeople] = useState(() => {
    try {
      const saved = localStorage.getItem('mediaclub_direct_messages_people');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error loading saved direct message people:', e);
    }
    return initialPeople;
  });

  const [isStartDmModalOpen, setIsStartDmModalOpen] = useState(false);
  const [selectedUserForDmCard, setSelectedUserForDmCard] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('mediaclub_joined_clubs', JSON.stringify(clubs));
    } catch (e) {
      console.warn('Error saving clubs:', e);
    }
  }, [clubs]);

  useEffect(() => {
    try {
      localStorage.setItem('mediaclub_direct_messages_people', JSON.stringify(people));
    } catch (e) {
      console.warn('Error saving direct message people:', e);
    }
  }, [people]);

  useEffect(() => {
    if (selectedClubId) {
      try {
        localStorage.setItem('mediaclub_last_selected_club_id', JSON.stringify(selectedClubId));
      } catch (e) {}
    }
  }, [selectedClubId]);

  useEffect(() => {
    if (selectedPersonId) {
      try {
        localStorage.setItem('mediaclub_last_selected_person_id', JSON.stringify(selectedPersonId));
      } catch (e) {}
    }
  }, [selectedPersonId]);

  // Ensure a chat is always selected when people exist
  useEffect(() => {
    if (people.length > 0) {
      const exists = people.some((p) => p.id === selectedPersonId);
      if (!exists) {
        setSelectedPersonId(people[0].id);
      }
    } else {
      setSelectedPersonId(null);
    }
  }, [people, selectedPersonId]);

  // Search synchronization
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('movies');
  const [isSearchHighlighted, setIsSearchHighlighted] = useState(false);
  const searchInputRef = useRef(null);
  const [pendingClubToCreate, setPendingClubToCreate] = useState(null);

  const [user, setUser] = useState(() => {
    const savedUser = getCurrentUser();
    return savedUser ? {
      ...savedUser,
      username: savedUser.username,
      email: savedUser.email || `${savedUser.username.toLowerCase()}@example.com`,
      pfp: savedUser.pfp || savedUser.avatarUrl || defaultAvatar,
      createdAt: savedUser.createdAt || currentUser.createdAt
    } : {
      ...currentUser,
      pfp: currentUser.pfp || defaultAvatar
    };
  });

  useEffect(() => {
    getUserProfile().then((profile) => {
      if (profile) {
        setUser((prev) => ({
          ...prev,
          ...profile,
          pfp: profile.avatarUrl || profile.pfp || defaultAvatar,
        }));
      }
    });
  }, []);

  const handleUpdateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  // Active club: selectedClubId if found in clubs, else first club
  const activeClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  // Active person: selectedPersonId (the last chat the user had open) or first person
  const activePerson = people.find((p) => p.id === selectedPersonId) || people[0];

  // Current selected item ID for LeftPane highlighting
  const currentSelectedId = activeTab === 'clubs' ? activeClub?.id : activePerson?.id;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'clubs') {
      if (!selectedClubId && clubs.length > 0) {
        setSelectedClubId(clubs[0].id);
      }
      if (activeClub?.channels?.length) {
        setSelectedChannelId(activeClub.channels[0].id);
      }
    } else if (tab === 'people') {
      // The last chat the user had open will be shown!
      if (people.length > 0) {
        const exists = people.some((p) => p.id === selectedPersonId);
        if (!exists) {
          setSelectedPersonId(people[0].id);
        }
      }
    }
  };

  const handleSelectItem = (item) => {
    if (activeTab === 'clubs') {
      setSelectedClubId(item.id);
      if (item.channels?.length) {
        setSelectedChannelId(item.channels[0].id);
      }
    } else {
      setSelectedPersonId(item.id);
    }
  };

  const handleStartDirectMessage = (targetProfile) => {
    const targetName = targetProfile?.username || targetProfile?.name || 'Member';
    const targetImg = targetProfile?.avatarUrl || targetProfile?.pfp || targetProfile?.img || defaultAvatar;
    let person = people.find((p) => (p.name || p.username || '').toLowerCase() === targetName.toLowerCase());
    if (!person) {
      person = {
        id: targetProfile?.id || Date.now(),
        name: targetName,
        username: targetName,
        img: targetImg,
        role: targetProfile?.role || 'member'
      };
      setPeople((prev) => [person, ...prev]);
    }
    setActiveTab('people');
    setSelectedPersonId(person.id);
  };

  const handleDmMessageSent = (person, newMsg) => {
    setDmUpdateTick((prev) => prev + 1);
    setPeople((prev) => {
      const matchIndex = prev.findIndex(
        (p) => p.id === person.id || (p.name && person.name && p.name.toLowerCase() === person.name.toLowerCase())
      );
      if (matchIndex === -1) return prev;
      const updatedPerson = {
        ...prev[matchIndex],
        lastMessage: newMsg?.content || '',
        lastMessageAt: newMsg?.sentAt || new Date().toISOString()
      };
      const nextList = [...prev];
      nextList.splice(matchIndex, 1);
      nextList.unshift(updatedPerson);
      return nextList;
    });
  };

  // Focus and highlight the top search bar
  const handleFocusSearch = (suggestedQuery = '', suggestedFilter = '') => {
    if (suggestedQuery) {
      setSearchQuery(suggestedQuery);
    }
    if (suggestedFilter) {
      setSearchFilter(suggestedFilter);
    }
    setIsSearchHighlighted(true);
    setTimeout(() => {
      setIsSearchHighlighted(false);
    }, 1800);

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };


  // Join an existing club found through search
  const handleJoinClub = (item) => {
    let targetClub = systemClubs.find(
      (c) => c.name.toLowerCase() === item.title.toLowerCase()
    );

    if (!targetClub) {
      targetClub = {
        id: Date.now(),
        name: item.title,
        mediaType: item.type || item.mediaType || 'movies',
        externalSource: item.externalSource || (item.type === 'books' ? 'OPEN_LIBRARY' : 'TMDB'),
        externalId: item.externalId || String(item.id),
        img: item.photo || item.coverLarge || item.img,
        backdrop: item.backdrop || null,
        year: item.year,
        genre: item.genre,
        author: item.author,
        pages: item.pages || null,
        publisher: item.publisher || null,
        firstSentence: item.firstSentence || null,
        audience: item.audience || null,
        rating: item.rating || null,
        channels: [
          { id: 'info', name: 'info', type: 'info' },
          { id: 1, name: 'general', type: 'text' },
          { id: 2, name: 'spoilers', type: 'text' },
          { id: 3, name: 'reviews', type: 'text' },
          { id: 4, name: 'requests', type: 'text' }
        ],
        members: [{ id: user.id || 1, name: user.username, img: user.pfp, role: 'moderator' }],
        mediaDetails: item.mediaDetails || null
      };
      setSystemClubs((prev) => [...prev, targetClub]);
    } else {
      const isMember = targetClub.members?.some((m) => m.name === user.username);
      if (!isMember) {
        targetClub = {
          ...targetClub,
          members: [
            ...(targetClub.members || []),
            { id: user.id || 1, name: user.username, img: user.pfp, role: 'member' }
          ]
        };
        setSystemClubs((prev) =>
          prev.map((c) => (c.id === targetClub.id ? targetClub : c))
        );
      }
    }

    setClubs((prev) => {
      const alreadyJoined = prev.some(
        (c) => c.name.toLowerCase() === targetClub.name.toLowerCase()
      );
      return alreadyJoined ? prev : [...prev, targetClub];
    });

    setActiveTab('clubs');
    setSelectedClubId(targetClub.id);
    if (targetClub.channels?.length) {
      setSelectedChannelId(targetClub.channels[0].id);
    }
    setSearchQuery('');
  };

  // Trigger creation flow by prompting user with moderator explanation popup
  const handleCreateClub = (item) => {
    const existing = systemClubs.find(
      (c) => c.name.toLowerCase() === item.title.toLowerCase()
    );
    if (existing) {
      handleJoinClub(item);
      return;
    }

    setPendingClubToCreate(item);
  };

  // Finalize club creation after user confirms in the moderator popup
  const handleConfirmCreateClub = (item) => {
    if (!item) return;

    const existing = systemClubs.find(
      (c) => c.name.toLowerCase() === item.title.toLowerCase()
    );
    if (existing) {
      handleJoinClub(item);
      setPendingClubToCreate(null);
      return;
    }

    const newClub = {
      id: Date.now(),
      name: item.title, // Predetermined by the media API title
      mediaType: item.type || item.mediaType || 'movies',
      externalSource: item.externalSource || (item.type === 'books' ? 'OPEN_LIBRARY' : 'TMDB'),
      externalId: item.externalId || String(item.id),
      img: item.photo || item.coverLarge || item.img,
      backdrop: item.backdrop || null,
      year: item.year,
      genre: item.genre,
      author: item.author,
      pages: item.pages || null,
      publisher: item.publisher || null,
      firstSentence: item.firstSentence || null,
      audience: item.audience || null,
      rating: item.rating || null,
      channels: [
        { id: 'info', name: 'info', type: 'info' },
        { id: 1, name: 'general', type: 'text' },
        { id: 2, name: 'spoilers', type: 'text' },
        { id: 3, name: 'reviews', type: 'text' },
        { id: 4, name: 'requests', type: 'text' }
      ],
      members: [
        { id: user.id || 1, name: user.username, img: user.pfp, role: 'moderator' }
      ],
      mediaDetails: item.mediaDetails || null
    };

    setSystemClubs((prev) => [...prev, newClub]);
    setClubs((prev) => [...prev, newClub]);
    setActiveTab('clubs');
    setSelectedClubId(newClub.id);
    if (newClub.channels?.length) {
      setSelectedChannelId(newClub.channels[0].id);
    }
    setPendingClubToCreate(null);
    setSearchQuery('');
  };

  // Update club channels or metadata
  const handleUpdateClub = (updatedClub) => {
    if (!updatedClub) return;
    setClubs((prev) =>
      prev.map((c) => (c.id === updatedClub.id ? updatedClub : c))
    );
    setSystemClubs((prev) =>
      prev.map((c) => (c.id === updatedClub.id ? updatedClub : c))
    );
  };

  // Leave club handler
  const handleLeaveClub = (clubId) => {
    setClubs((prev) => {
      const remaining = prev.filter((c) => c.id !== clubId);
      if (remaining.length > 0) {
        setSelectedClubId(remaining[0].id);
        if (remaining[0].channels?.length) {
          setSelectedChannelId(remaining[0].channels[0].id);
        }
      } else {
        setSelectedClubId(null);
      }
      return remaining;
    });
  };

  // Dismiss club creation popup without creating, preserving search focus and opened results
  const handleCloseCreateClubModal = () => {
    setPendingClubToCreate(null);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        const len = searchInputRef.current.value ? searchInputRef.current.value.length : 0;
        if (typeof searchInputRef.current.setSelectionRange === 'function') {
          searchInputRef.current.setSelectionRange(len, len);
        }
      }
    }, 0);
  };

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <TopNav
        currentUser={user}
        onUpdateUser={handleUpdateUser}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchFilter={searchFilter}
        onFilterChange={setSearchFilter}
        searchInputRef={searchInputRef}
        isSearchHighlighted={isSearchHighlighted}
        onJoinClub={handleJoinClub}
        onCreateClub={handleCreateClub}
        joinedClubTitles={clubs.map((c) => c.name)}
        existingClubTitles={systemClubs.map((c) => c.name)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Left Component */}
        <LeftPane
          activeTab={activeTab}
          onTabChange={handleTabChange}
          items={activeTab === 'clubs' ? clubs : people}
          selectedItemId={currentSelectedId}
          onSelectItem={handleSelectItem}
          onFocusSearch={() => handleFocusSearch()}
          onOpenStartDmModal={() => setIsStartDmModalOpen(true)}
          dmUpdateTick={dmUpdateTick}
        />

        {/* Right Component */}
        <section className="right-pane">
          {activeTab === 'clubs' && clubs.length === 0 && (
            <EmptyClubsView onFocusSearch={() => handleFocusSearch()} />
          )}

          {activeTab === 'clubs' && clubs.length > 0 && activeClub && (
            <ClubView
              club={activeClub}
              currentUser={user}
              selectedChannelId={selectedChannelId}
              onSelectChannel={setSelectedChannelId}
              showMembers={showMembers}
              onToggleMembers={() => setShowMembers((prev) => !prev)}
              onUpdateClub={handleUpdateClub}
              onLeaveClub={handleLeaveClub}
              onStartDirectMessage={handleStartDirectMessage}
            />
          )}

          {activeTab === 'people' && people.length === 0 && (
            <EmptyDirectMessagesView
              onStartNewChat={() => setIsStartDmModalOpen(true)}
            />
          )}

          {activeTab === 'people' && people.length > 0 && activePerson && (
            <DirectMessageView
              person={activePerson}
              currentUser={user}
              clubs={clubs}
              onOpenUserCard={(u) => setSelectedUserForDmCard(u)}
              onMessageSent={handleDmMessageSent}
            />
          )}
        </section>
      </main>

      {/* Start Direct Message Modal */}
      {isStartDmModalOpen && (
        <StartDirectMessageModal
          isOpen={isStartDmModalOpen}
          onClose={() => setIsStartDmModalOpen(false)}
          clubs={clubs}
          systemClubs={systemClubs}
          currentUser={user}
          onSelectUser={handleStartDirectMessage}
        />
      )}

      {/* User Account Card when clicked inside Direct Messages */}
      {selectedUserForDmCard && (
        <UserAccountModal
          isOpen={Boolean(selectedUserForDmCard)}
          user={selectedUserForDmCard}
          club={null}
          currentUser={user}
          onClose={() => setSelectedUserForDmCard(null)}
          onStartDirectMessage={handleStartDirectMessage}
        />
      )}

      {/* Moderator Explanation Popup Modal before creating club */}
      {pendingClubToCreate && (
        <CreateClubModal
          item={pendingClubToCreate}
          onConfirm={() => handleConfirmCreateClub(pendingClubToCreate)}
          onClose={handleCloseCreateClubModal}
        />
      )}
    </div>
  );
};

export default HomePage;