import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container papercut-theme">
      <div className="welcome-spacer"></div>

      {/* Right-aligned content block */}
      <div className="welcome-content">
        <h1 className="welcome-title">
          Join discussions on your favorite media
        </h1>
        
        <p className="welcome-description">
          Discover like-minded people through vibrant communities and exclusive clubs. 
          Dive deeper into the books, movies, and shows you love and never watch alone again.
        </p>

        <div className="welcome-actions">
          <Link to="/signup" state={{ fromWelcome: true }} className="btn btn-filled-white">Join the club</Link>
          <Link to="/login" state={{ fromWelcome: true }} className="btn btn-hollow">Login</Link>
        </div>

        <div className="welcome-tags">
          <span className="tag">
            <span className="tag-icon">👥</span> 16,000+ active members
          </span>
          <span className="tag">
            <span className="tag-icon">📚</span> 500+ active clubs
          </span>
          <span className="tag">
            <span className="tag-icon">💬</span> Daily discussions
          </span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;