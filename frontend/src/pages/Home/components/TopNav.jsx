import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProfilePopup from '../../ProfilePopup/ProfilePopup';
import logoImg from '../../../assets/logo.png';

const TopNav = ({ currentUser }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <img src={logoImg} alt="App Logo" className="app-logo-img" />
        <span className="app-name">Media Club</span>
      </div>

      <div className="nav-middle">
        <SearchBar />
      </div>

      <div className="nav-right" style={{ position: 'relative' }}>
        <img
          src={currentUser.pfp}
          alt="Profile"
          className="profile-pic"
          onClick={() => setShowProfilePopup((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        />
        {showProfilePopup && <ProfilePopup user={currentUser} />}
      </div>
    </nav>
  );
};

export default TopNav;
