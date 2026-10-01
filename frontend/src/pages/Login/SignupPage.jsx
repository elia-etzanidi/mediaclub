import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import logoImg from '../../assets/logo.png';
import { registerUser } from '../../services/authService';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isFromWelcome = location.state?.fromWelcome;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username: username.trim(),
        email: email.trim(),
        password,
      });
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container papercut-theme">
      <div className="auth-spacer"></div>
      <div className={`auth-content ${isFromWelcome ? 'slide-in' : ''}`}>

        <div className={`auth-form-wrapper ${isFromWelcome ? 'fade-in' : ''}`}>
          <img src={logoImg} alt="App Logo" className="auth-hero-logo" />

          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-description">Join the community and start sharing your thoughts.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="input-group">
              <input
                type="text"
                placeholder="Username (min 3 chars)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                autoComplete="username"
                minLength={3}
                maxLength={30}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                autoComplete="email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password (min 8 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                autoComplete="new-password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-filled-dark auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;