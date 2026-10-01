import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LoginPage.css';
import logoImg from '../../assets/logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const isFromWelcome = location.state?.fromWelcome;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login credentials ready:', { email, password });
    // TODO: Add backend connection here
  };

  return (
    <div className="auth-container papercut-theme">
      <div className="auth-spacer"></div>

      <div className={`auth-content ${isFromWelcome ? 'slide-in' : ''}`}>

        <div className={`auth-form-wrapper ${isFromWelcome ? 'fade-in' : ''}`}>
          {/* NEW: Logo placed right above the title */}
          <img src={logoImg} alt="App Logo" className="auth-hero-logo" />

          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-description">Log in to continue your discussions.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <button type="submit" className="btn btn-filled-dark auth-submit">
              Log In
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;