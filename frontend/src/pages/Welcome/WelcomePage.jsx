import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <h1>Welcome to MediaClub</h1>

      <p className="welcome-subtitle">
        Discover, track, and share your favorite media.
      </p>

      <div className="welcome-button-group">
        <Link to="/login" className="welcome-primary-button">
          Log In
        </Link>

        <Link to="/signup" className="welcome-secondary-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;