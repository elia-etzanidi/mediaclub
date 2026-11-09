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
import { getCurrentUser, getUserProfile, getToken } from '../../services/authService';
import {
  fetchMyClubsApi,
  fetchAllClubsApi,
  joinClubApi,
  createClubApi,
  leaveClubApi,
  fetchClubMembersApi
} from '../../services/clubService';
import { fetchConversationsApi } from '../../services/directMessageService';
import defaultAvatar from '../../assets/default-avatar.png';

const getClubsKey = (uid) => `mediaclub_${uid || 'guest'}_joined_clubs`;
const getPeopleKey = (uid) => `mediaclub_${uid || 'guest'}_direct_messages_people`;
const getLastClubKey = (uid) => `mediaclub_${uid || 'guest'}_last_selected_club_id`;
const getLastPersonKey = (uid) => `mediaclub_${uid || 'guest'}_last_selected_person_id`;

const HomePage = () => {
  const savedUser = getCurrentUser();
  const initialUserId = savedUser?.id || savedUser?.userId || 'guest';
  const token = getToken();

  const [user, setUser] = useState(() => {
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

  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedClubId, setSelectedClubId] = useState(() => {
    try {
      const saved = localStorage.getItem(getLastClubKey(initialUserId));
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [selectedPersonId, setSelectedPersonId] = useState(() => {
    try {
      const saved = localStorage.getItem(getLastPersonKey(initialUserId));
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [selectedChannelId, setSelectedChannelId] = useState('info');
  const [showMembers, setShowMembers] = useState(true);
  const [dmUpdateTick, setDmUpdateTick] = useState(0);

  // Clubs state: user-scoped, defaults to empty for new authenticated accounts
  const [clubs, setClubs] = useState(() => {
    try {
      const saved = localStorage.getItem(getClubsKey(initialUserId));
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

  // Direct message contacts state (persisted per user)
  const [people, setPeople] = useState(() => {
    try {
      const saved = localStorage.getItem(getPeopleKey(initialUserId));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error loading saved direct message people:', e);
    }
    return token ? [] : initialPeople;
  });

  const [isStartDmModalOpen, setIsStartDmModalOpen] = useState(false);
  const [selectedUserForDmCard, setSelectedUserForDmCard] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(getClubsKey(user?.id), JSON.stringify(clubs));
    } catch (e) {
      console.warn('Error saving clubs:', e);
    }
  }, [clubs, user?.id]);

  useEffect(() => {
    try {
      localStorage.setItem(getPeopleKey(user?.id), JSON.stringify(people));
    } catch (e) {
      console.warn('Error saving direct message people:', e);
    }
  }, [people, user?.id]);

  useEffect(() => {
    if (selectedClubId) {
      try {
        localStorage.setItem(getLastClubKey(user?.id), JSON.stringify(selectedClubId));
      } catch (e) {}
    }
  }, [selectedClubId, user?.id]);

  useEffect(() => {
    if (selectedPersonId) {
      try {
        localStorage.setItem(getLastPersonKey(user?.id), JSON.stringify(selectedPersonId));
      } catch (e) {}
    }
  }, [selectedPersonId, user?.id]);

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

  // Load user data, clubs from DB, system clubs from DB, and DM conversations
  useEffect(() => {
    const activeToken = getToken();
    if (!activeToken) return;

    getUserProfile().then((profile) => {
      if (profile) {
        setUser((prev) => ({
          ...prev,
          ...profile,
          pfp: profile.avatarUrl || profile.pfp || defaultAvatar,
        }));
      }
    });

    fetchMyClubsApi().then((myClubs) => {
      if (Array.isArray(myClubs)) {
        setClubs(myClubs);
        if (myClubs.length > 0) {
          setSelectedClubId((prevId) => {
            const exists = myClubs.some((c) => c.id === prevId);
            return exists ? prevId : myClubs[0].id;
          });
        } else {
          setSelectedClubId(null);
        }
      }
    });

    fetchAllClubsApi().then((allClubs) => {
      if (Array.isArray(allClubs) && allClubs.length > 0) {
        setSystemClubs(allClubs);
      }
    });

    fetchConversationsApi().then((convs) => {
      if (Array.isArray(convs)) {
        setPeople(convs);
        if (convs.length > 0) {
          setSelectedPersonId((prevId) => {
            const exists = convs.some((p) => p.id === prevId);
            return exists ? prevId : convs[0].id;
          });
        } else {
          setSelectedPersonId(null);
        }
      }
    });
  }, [user?.id]);

  const handleUpdateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  // Active club: selectedClubId if found in clubs, else first club
  const activeClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  // Sync active club's latest members from backend to ensure right panel is always accurate
  useEffect(() => {
    if (!activeClub?.id || typeof activeClub.id !== 'number') return;
    let isMounted = true;
    fetchClubMembersApi(activeClub.id).then((freshMembers) => {
      if (isMounted && Array.isArray(freshMembers) && freshMembers.length > 0) {
        setClubs((prev) =>
          prev.map((c) => (c.id === activeClub.id ? { ...c, members: freshMembers, memberCount: freshMembers.length } : c))
        );
        setSystemClubs((prev) =>
          prev.map((c) => (c.id === activeClub.id ? { ...c, members: freshMembers, memberCount: freshMembers.length } : c))
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activeClub?.id]);

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
  const handleJoinClub = async (item) => {
    const itemName = (item.title || item.name || '').toLowerCase();
    let targetClub = systemClubs.find(
      (c) => c.name.toLowerCase() === itemName
    );

    const currentUserMember = {
      id: user?.id || 1,
      name: user?.username || 'Member',
      username: user?.username || 'Member',
      img: user?.pfp || user?.avatarUrl || defaultAvatar,
      role: 'member'
    };

    if (targetClub && typeof targetClub.id === 'number') {
      await joinClubApi(targetClub.id);
      const freshMembers = await fetchClubMembersApi(targetClub.id);
      if (Array.isArray(freshMembers) && freshMembers.length > 0) {
        targetClub = {
          ...targetClub,
          members: freshMembers,
          memberCount: freshMembers.length
        };
      }
    } else if (!targetClub) {
      const created = await createClubApi(item);
      if (created) {
        targetClub = created;
      }
    }

    if (!targetClub) {
      targetClub = {
        id: Date.now(),
        name: item.title || item.name,
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
        members: [{ ...currentUserMember, role: 'moderator' }],
        mediaDetails: item.mediaDetails || null
      };
      setSystemClubs((prev) => [...prev, targetClub]);
    } else {
      const existingMembers = targetClub.members || [];
      const alreadyIn = existingMembers.some(
        (m) =>
          (m.id && user?.id && String(m.id) === String(user.id)) ||
          (m.name || m.username || '').toLowerCase() === (user?.username || '').toLowerCase()
      );
      if (!alreadyIn) {
        const updatedMembers = [...existingMembers, currentUserMember];
        targetClub = {
          ...targetClub,
          members: updatedMembers,
          memberCount: updatedMembers.length
        };
      }
      setSystemClubs((prev) =>
        prev.map((c) => (c.id === targetClub.id ? targetClub : c))
      );
    }

    setClubs((prev) => {
      const alreadyJoined = prev.some(
        (c) => c.id === targetClub.id || c.name.toLowerCase() === targetClub.name.toLowerCase()
      );
      if (alreadyJoined) {
        return prev.map((c) =>
          (c.id === targetClub.id || c.name.toLowerCase() === targetClub.name.toLowerCase())
            ? targetClub
            : c
        );
      }
      return [...prev, targetClub];
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
    const itemName = (item.title || item.name || '').toLowerCase();
    const existing = systemClubs.find(
      (c) => c.name.toLowerCase() === itemName
    );
    if (existing) {
      handleJoinClub(item);
      return;
    }

    setPendingClubToCreate(item);
  };

  // Finalize club creation after user confirms in the moderator popup
  const handleConfirmCreateClub = async (item) => {
    if (!item) return;

    const itemName = (item.title || item.name || '').toLowerCase();
    const existing = systemClubs.find(
      (c) => c.name.toLowerCase() === itemName
    );
    if (existing) {
      await handleJoinClub(item);
      setPendingClubToCreate(null);
      return;
    }

    const currentUserMod = {
      id: user?.id || 1,
      name: user?.username || 'Moderator',
      username: user?.username || 'Moderator',
      img: user?.pfp || user?.avatarUrl || defaultAvatar,
      role: 'moderator'
    };

    const createdClub = await createClubApi(item);
    const newClub = createdClub ? {
      ...createdClub,
      members: (createdClub.members && createdClub.members.length > 0)
        ? createdClub.members
        : [currentUserMod]
    } : {
      id: Date.now(),
      name: item.title || item.name,
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
      members: [currentUserMod],
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
    if (typeof clubId === 'number') {
      leaveClubApi(clubId);
    }
    setSystemClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const updatedMembers = (c.members || []).filter(
            (m) => !(m.id && user?.id ? String(m.id) === String(user.id) : (m.name || '').toLowerCase() === (user?.username || '').toLowerCase())
          );
          return { ...c, members: updatedMembers, memberCount: updatedMembers.length };
        }
        return c;
      })
    );
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