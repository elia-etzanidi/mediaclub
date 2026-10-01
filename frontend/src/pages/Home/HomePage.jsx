import React, { useState } from 'react';
import './HomePage.css';
import {
  currentUser,
  initialClubs,
  initialPeople,
  TopNav,
  LeftPane,
  ClubView,
  DirectMessageView
} from './components';
import { getCurrentUser } from '../../services/authService';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [selectedChannelId, setSelectedChannelId] = useState(1);
  const [showMembers, setShowMembers] = useState(false);

  const savedUser = getCurrentUser();
  const user = savedUser ? {
    username: savedUser.username,
    email: savedUser.email || `${savedUser.username.toLowerCase()}@example.com`,
    pfp: 'https://via.placeholder.com/40',
    createdAt: currentUser.createdAt
  } : currentUser;

  const clubs = initialClubs;
  const people = initialPeople;

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
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItemId(item.id);
    if (item.channels?.length) {
      setSelectedChannelId(item.channels[0].id);
    }
  };

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <TopNav currentUser={user} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Left Component */}
        <LeftPane
          activeTab={activeTab}
          onTabChange={handleTabChange}
          items={displayList}
          selectedItemId={selectedItemId}
          onSelectItem={handleSelectItem}
        />

        {/* Right Component */}
        <section className="right-pane">
          {activeTab === 'clubs' && activeItem && (
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
    </div>
  );
};

export default HomePage;