import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePopup.css';
import { logoutUser } from '../../services/authService';

const ProfilePopup = ({ user }) => {
  const [silenceNotifs, setSilenceNotifs] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="profile-popup">
      <div className="popup-header">
        <img src={user.pfp} alt="Profile" className="popup-pfp-large" />
        <div className="popup-info">
          <span className="popup-username">{user.username}</span>
          <span className="popup-email">{user.email}</span>
        </div>
      </div>

      <div className="popup-body">
        <div className="popup-detail">
          <span className="detail-label">Account created:</span>
          <span className="detail-value">{user.createdAt}</span>
        </div>

        <div className="popup-action">
          <span className="action-label">Silence Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={silenceNotifs}
              onChange={() => setSilenceNotifs(!silenceNotifs)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button type="button" className="popup-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;