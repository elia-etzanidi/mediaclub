import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LoginPage.css'; 

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const isFromWelcome = location.state?.fromWelcome;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log('Signup data ready:', { email, password });
    // TODO: Add backend connection here
  };

  return (
    <div className="auth-container papercut-theme">
      <div className="auth-spacer"></div>
      <div className={`auth-content ${isFromWelcome ? 'slide-in' : ''}`}>
        <div className={`auth-form-wrapper ${isFromWelcome ? 'fade-in' : ''}`}>
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-description">Join the community and start sharing your thoughts.</p>
          
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
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="auth-input"
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-filled-dark auth-submit">
              Sign Up
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