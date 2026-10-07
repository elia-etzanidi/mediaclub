import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePopup.css';
import { logoutUser, updateUserAvatar } from '../../services/authService';
import defaultAvatar from '../../assets/default-avatar.png';

const ProfilePopup = ({ user, onUpdateUser, onClose }) => {
  const [silenceNotifs, setSilenceNotifs] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const currentPfp = user?.pfp || user?.avatarUrl || defaultAvatar;

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 3500);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  // Convert uploaded image to an optimized Data URL via canvas
  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file (PNG, JPG, WEBP, etc.)'));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Image file is too large (max 10MB)'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 360;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Use PNG if transparent or JPEG with high quality
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(outputType, 0.9);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Could not load image file'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const applyNewAvatar = async (newAvatarUrl) => {
    try {
      setIsUpdating(true);
      await updateUserAvatar(newAvatarUrl);
      if (onUpdateUser) {
        onUpdateUser({ pfp: newAvatarUrl, avatarUrl: newAvatarUrl });
      }
      showFeedback('success', 'Profile picture updated successfully!');
    } catch (err) {
      showFeedback('error', err.message || 'Failed to update avatar.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUpdating(true);
      const dataUrl = await processImageFile(file);
      await applyNewAvatar(dataUrl);
    } catch (err) {
      showFeedback('error', err.message || 'Error processing image');
      setIsUpdating(false);
    } finally {
      // Clear file input so the same file can be selected again if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatCreationDate = (dateVal) => {
    if (!dateVal) return 'Recently';
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    } catch {
      // fallback
    }
    return dateVal;
  };

  return (
    <div className="profile-popup" role="dialog" aria-label="User Profile">
      <div className="popup-header">
        {onClose && (
          <button
            type="button"
            className="popup-close-btn"
            onClick={onClose}
            aria-label="Close popup"
            title="Close"
          >
            &times;
          </button>
        )}

        <div className="popup-avatar-container">
          <div
            className="popup-avatar-wrapper"
            onClick={() => !isUpdating && fileInputRef.current?.click()}
            title="Click to upload a new profile picture"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <img src={currentPfp} alt="Profile" className="popup-pfp-large" />
            <div className="avatar-hover-overlay">
              <svg
                className="pencil-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              <span>{isUpdating ? 'Saving...' : 'Edit'}</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <div className="popup-info">
          <span className="popup-username">{user?.username || 'User'}</span>
          <span className="popup-email">{user?.email || ''}</span>
        </div>
      </div>

      {feedback.message && (
        <div className={`popup-alert alert-${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div className="popup-body">
        <div className="popup-detail">
          <span className="detail-label">Account created:</span>
          <span className="detail-value">{formatCreationDate(user?.createdAt)}</span>
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