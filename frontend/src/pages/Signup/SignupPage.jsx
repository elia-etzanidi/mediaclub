import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Signup data ready for backend:', { email, password });
    // TODO: Add fetch/axios call to your Java backend here
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
          required
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <p className="signup-footer-text">
        Already have an account?{' '}
        <Link to="/login" className="signup-link">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;