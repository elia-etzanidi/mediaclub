import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import ProfilePopup from '../../ProfilePopup/ProfilePopup';
import NotificationsPopup from './NotificationsPopup';
import logoImg from '../../../assets/logo.png';
import defaultAvatar from '../../../assets/default-avatar.png';

const TopNav = ({
  currentUser,
  onUpdateUser,
  searchQuery,
  onSearchChange,
  searchFilter,
  onFilterChange,
  searchInputRef,
  isSearchHighlighted,
  onJoinClub,
  onCreateClub,
  joinedClubs = [],
  systemClubs = [],
  joinedClubTitles = [],
  existingClubTitles = [],
  joinedClubNames,
  notifications = [],
  onNotificationClick,
  onClearAllNotifications,
  onRemoveNotification,
  onMarkAllNotificationsRead
}) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navRightRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRightRef.current && !navRightRef.current.contains(event.target)) {
        setShowProfilePopup(false);
        setShowNotifications(false);
      }
    };

    if (showProfilePopup || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfilePopup, showNotifications]);

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <img src={logoImg} alt="App Logo" className="app-logo-img" />
        <span className="app-name">Media Club</span>
      </div>

      <div className="nav-middle">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          searchFilter={searchFilter}
          onFilterChange={onFilterChange}
          searchInputRef={searchInputRef}
          isHighlighted={isSearchHighlighted}
          onJoinClub={onJoinClub}
          onCreateClub={onCreateClub}
          joinedClubs={joinedClubs}
          systemClubs={systemClubs}
          joinedClubTitles={joinedClubTitles}
          existingClubTitles={existingClubTitles}
          joinedClubNames={joinedClubNames}
        />
      </div>

      <div className="nav-right" style={{ position: 'relative' }} ref={navRightRef}>
        {/* Envelope Icon for Notifications */}
        <div className="notifications-wrapper">
          <button
            type="button"
            id="notifications-envelope-btn"
            className={`notifications-envelope-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfilePopup(false);
            }}
            aria-label="Notifications"
            aria-haspopup="dialog"
            aria-expanded={showNotifications}
            title={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : 'Notifications'}
          >
            <svg
              className="notifications-envelope-svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {unreadCount > 0 && (
              <span className="notifications-badge" id="notifications-badge">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationsPopup
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
              onNotificationClick={(notif) => {
                setShowNotifications(false);
                onNotificationClick?.(notif);
              }}
              onClearAll={onClearAllNotifications}
              onRemoveNotification={onRemoveNotification}
              onMarkAllAsRead={onMarkAllNotificationsRead}
            />
          )}
        </div>

        <img
          src={currentUser?.pfp || currentUser?.avatarUrl || defaultAvatar}
          alt="Profile"
          className="profile-pic"
          onClick={() => {
            setShowProfilePopup((prev) => !prev);
            setShowNotifications(false);
          }}
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

