import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login credentials ready for backend:', { email, password });
    // TODO: Add fetch/axios call to your Java backend here
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="footer-text">
        Don't have an account?{' '}
        <Link to="/signup" className="login-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;