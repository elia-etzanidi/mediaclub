import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import ProfilePopup from '../../ProfilePopup/ProfilePopup';
import logoImg from '../../../assets/logo.png';
import defaultAvatar from '../../../assets/default-avatar.png';

const TopNav = ({ currentUser, onUpdateUser }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navRightRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRightRef.current && !navRightRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };

    if (showProfilePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfilePopup]);

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <img src={logoImg} alt="App Logo" className="app-logo-img" />
        <span className="app-name">Media Club</span>
      </div>

      <div className="nav-middle">
        <SearchBar />
      </div>

      <div className="nav-right" style={{ position: 'relative' }} ref={navRightRef}>
        <img
          src={currentUser?.pfp || currentUser?.avatarUrl || defaultAvatar}
          alt="Profile"
          className="profile-pic"
          onClick={() => setShowProfilePopup((prev) => !prev)}
          style={{ cursor: 'pointer' }}
          title="Account profile"
        />
        {showProfilePopup && (
          <ProfilePopup
            user={currentUser}
            onUpdateUser={onUpdateUser}
            onClose={() => setShowProfilePopup(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default TopNav;
