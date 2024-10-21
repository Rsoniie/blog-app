import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // console.log("handle login is clicked");
      await authService.login({ username, password });
      navigate('/');  // Redirect to Home after successful login
    } catch (err) {
      console.error('Login failed', err);
      // Display error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
