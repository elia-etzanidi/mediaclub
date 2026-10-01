import React, { useState } from 'react';
import './HomePage.css';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import logoImg from '../../assets/logo.png';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [selectedChannelId, setSelectedChannelId] = useState(1);
  const [showMembers, setShowMembers] = useState(false); 
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('movies'); // 'movies', 'tv', 'books'

  const currentUser = {
    username: 'DemoUser',
    email: 'demouser@example.com',
    pfp: 'https://via.placeholder.com/40',
    createdAt: 'October 15, 2023'
  };

  // Mock data for clubs/people
  const clubs = [
    { id: 1, name: 'General Chat', img: 'https://via.placeholder.com/50', channels: [{ id: 1, name: 'welcome' }, { id: 2, name: 'general' }], members: [{ id: 1, name: 'Alice Smith', img: 'https://via.placeholder.com/32' }] },
    { id: 2, name: 'Gaming Lounge', img: 'https://via.placeholder.com/50', channels: [{ id: 4, name: 'lfg' }], members: [{ id: 4, name: 'Diana Prince', img: 'https://via.placeholder.com/32' }] }
  ];
  const people = [
    { id: 101, name: 'Alice Smith', img: 'https://via.placeholder.com/50/FF5733/FFFFFF' }
  ];

  // --- MOCK SEARCH RESULTS ---
  const mockSearchResults = [
    { id: 1, type: 'movies', title: 'Inception', genre: 'Sci-Fi', year: '2010', photo: 'https://via.placeholder.com/40x56/004643/FFFFFF?text=M' },
    { id: 2, type: 'tv', title: 'Breaking Bad', genre: 'Drama', year: '2008', photo: 'https://via.placeholder.com/40x56/357979/FFFFFF?text=TV' },
    { id: 3, type: 'books', title: 'Dune', genre: 'Sci-Fi', year: '1965', photo: 'https://via.placeholder.com/40x56/91a1a4/FFFFFF?text=B' },
  ];

  // Logic to filter our mock results. (Will be replaced by API response later)
  const filteredResults = mockSearchResults.filter(item => 
    item.type === searchFilter && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayList = activeTab === 'clubs' ? clubs : people;
  const activeItem = displayList.find(item => item.id === selectedItemId) || displayList[0];
  const activeChannel = activeItem?.channels?.find(c => c.id === selectedChannelId) || activeItem?.channels?.[0];

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <img src={logoImg} alt="App Logo" className="app-logo-img" />
          <span className="app-name">Media Club</span>
        </div>
        
        <div className="nav-middle">
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* --- SEARCH POPUP --- */}
            {searchQuery.length > 0 && (
              <div className="search-popup">
                {/* Header / Tabs */}
                <div className="search-popup-header">
                  {['movies', 'tv', 'books'].map((filter) => (
                    <button
                      key={filter}
                      className={`search-filter-btn ${searchFilter === filter ? 'active' : ''}`}
                      onClick={() => setSearchFilter(filter)}
                    >
                      {filter === 'tv' ? 'TV Series' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Body / Results */}
                <div className="search-popup-body">
                  {filteredResults.length > 0 ? (
                    <div className="search-results-list">
                      {filteredResults.map(item => (
                        <div key={item.id} className="search-result-item">
                          <img src={item.photo} alt={item.title} className="search-result-photo" />
                          <div className="search-result-info">
                            <div className="search-result-title">{item.title}</div>
                            <div className="search-result-meta">{item.genre} • {item.year}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="search-no-results">
                      Couldn't find any results
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* ------------------------ */}

          </div>
        </div>
        
        <div className="nav-right" style={{ position: 'relative' }}>
          <img 
            src={currentUser.pfp} 
            alt="Profile" 
            className="profile-pic" 
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            style={{ cursor: 'pointer' }}
          />
          {showProfilePopup && <ProfilePopup user={currentUser} />}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Left Component */}
        <aside className="left-pane">
          <div className="list-header">
            <button className={`tab-button ${activeTab === 'clubs' ? 'active' : ''}`} onClick={() => { setActiveTab('clubs'); setSelectedItemId(clubs[0].id); }}>Clubs</button>
            <button className={`tab-button ${activeTab === 'people' ? 'active' : ''}`} onClick={() => { setActiveTab('people'); setSelectedItemId(people[0].id); }}>People</button>
          </div>

          <div className="scrollable-list">
            {displayList.map((item) => (
              <div key={item.id} className={`list-cell ${selectedItemId === item.id ? 'selected' : ''}`} onClick={() => { setSelectedItemId(item.id); if (item.channels?.length) setSelectedChannelId(item.channels[0].id); }}>
                <img src={item.img} alt={item.name} className="cell-image" />
                <span className="cell-name">{item.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Component */}
        <section className="right-pane">
          {activeTab === 'clubs' && activeItem && (
            <div className="club-view">
              <div className="club-sidebar">
                <div className="club-header"><h2>{activeItem.name}</h2></div>
                <div className="channels-section">
                  <div className="channels-title">CHANNELS</div>
                  <div className="channel-list">
                    {activeItem.channels?.map(channel => (
                      <div 
                        key={channel.id} 
                        className={`channel-cell ${selectedChannelId === channel.id ? 'active' : ''}`}
                        onClick={() => setSelectedChannelId(channel.id)}
                      >
                        {/* Changed class name and symbol */}
                        <span className="channel-icon">✦</span> {channel.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="club-chat-area">
                <div className="chat-top-nav">
                  <div className="chat-nav-title">
                    <span className="channel-icon-large">✦</span> {activeChannel?.name || 'select-channel'}
                  </div>
                  <button className={`members-toggle ${showMembers ? 'active' : ''}`} onClick={() => setShowMembers(!showMembers)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </button>
                </div>
                <div className="chat-messages-container"></div>
              </div>

              {showMembers && (
                <div className="members-sidebar">
                  <div className="members-title">MEMBERS — {activeItem.members?.length || 0}</div>
                  <div className="members-list">
                    {activeItem.members?.map(member => (
                      <div key={member.id} className="member-cell">
                        <img src={member.img} alt={member.name} className="member-image" />
                        <span className="member-name">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'people' && activeItem && (
            <div className="dm-view-placeholder"><h2>Direct Message with {activeItem.name}</h2></div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;