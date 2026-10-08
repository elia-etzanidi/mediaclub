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
  CreateClubModal
} from './components';
import { getCurrentUser, getUserProfile } from '../../services/authService';
import defaultAvatar from '../../assets/default-avatar.png';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState('info');
  const [showMembers, setShowMembers] = useState(true);

  // Clubs state: defaults to empty so new users or users with 0 clubs see the empty state prompt
  const [clubs, setClubs] = useState([]);
  // System clubs: all clubs created in the platform (each media title has one and only one club)
  const [systemClubs, setSystemClubs] = useState(initialClubs);
  const people = initialPeople;

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

  const displayList = activeTab === 'clubs' ? clubs : people;
  const activeItem = displayList.find((item) => item.id === selectedItemId) || displayList[0];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const list = tab === 'clubs' ? clubs : people;
    if (list.length > 0) {
      setSelectedItemId(list[0].id);
      if (tab === 'clubs' && list[0].channels?.length) {
        setSelectedChannelId(list[0].channels[0].id);
      }
    } else {
      setSelectedItemId(null);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItemId(item.id);
    if (item.channels?.length) {
      setSelectedChannelId(item.channels[0].id);
    }
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
        mediaType: item.type || 'movies',
        img: item.photo,
        year: item.year,
        genre: item.genre,
        channels: [
          { id: 'info', name: 'info', type: 'info' },
          { id: 1, name: 'general', type: 'text' },
          { id: 2, name: 'spoilers', type: 'text' },
          { id: 3, name: 'reviews', type: 'text' },
          { id: 4, name: 'requests', type: 'text' }
        ],
        members: [{ id: user.id || 1, name: user.username, img: user.pfp, role: 'moderator' }]
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
    setSelectedItemId(targetClub.id);
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
      mediaType: item.type || 'movies',
      img: item.photo,
      year: item.year,
      genre: item.genre,
      channels: [
        { id: 'info', name: 'info', type: 'info' },
        { id: 1, name: 'general', type: 'text' },
        { id: 2, name: 'spoilers', type: 'text' },
        { id: 3, name: 'reviews', type: 'text' },
        { id: 4, name: 'requests', type: 'text' }
      ],
      members: [
        { id: user.id || 1, name: user.username, img: user.pfp, role: 'moderator' }
      ]
    };

    setSystemClubs((prev) => [...prev, newClub]);
    setClubs((prev) => [...prev, newClub]);
    setActiveTab('clubs');
    setSelectedItemId(newClub.id);
    if (newClub.channels?.length) {
      setSelectedChannelId(newClub.channels[0].id);
    }
    setPendingClubToCreate(null);
    setSearchQuery('');
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
          items={displayList}
          selectedItemId={selectedItemId}
          onSelectItem={handleSelectItem}
          onFocusSearch={() => handleFocusSearch()}
        />

        {/* Right Component */}
        <section className="right-pane">
          {activeTab === 'clubs' && clubs.length === 0 && (
            <EmptyClubsView onFocusSearch={() => handleFocusSearch()} />
          )}

          {activeTab === 'clubs' && clubs.length > 0 && activeItem && (
            <ClubView
              club={activeItem}
              selectedChannelId={selectedChannelId}
              onSelectChannel={setSelectedChannelId}
              showMembers={showMembers}
              onToggleMembers={() => setShowMembers((prev) => !prev)}
            />
          )}

          {activeTab === 'people' && activeItem && (
            <DirectMessageView person={activeItem} />
          )}
        </section>
      </main>

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