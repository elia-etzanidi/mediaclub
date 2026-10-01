import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logoImg from '../../assets/logo.png';
import { loginUser } from '../../services/authService';

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isFromWelcome = location.state?.fromWelcome;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser({ username: identifier.trim(), password });
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container papercut-theme">
      <div className="auth-spacer"></div>

      <div className={`auth-content ${isFromWelcome ? 'slide-in' : ''}`}>

        <div className={`auth-form-wrapper ${isFromWelcome ? 'fade-in' : ''}`}>
          {/* Logo placed right above the title */}
          <img src={logoImg} alt="App Logo" className="auth-hero-logo" />

          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-description">Log in to continue your discussions.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="input-group">
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="auth-input"
                autoComplete="username"
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
                autoComplete="current-password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-filled-dark auth-submit"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
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