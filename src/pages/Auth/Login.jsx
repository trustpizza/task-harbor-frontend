// Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth(); // Destructure login, loading, and error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(email, password); // Use the login function from useAuth
      if (userData) {
        navigate('/projects'); // Redirect after successful login
      } else {
        // Error is handled by the useAuth hook, but you can add more specific handling here
        console.error("Login failed");
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Display error message */}
      <input
        type="email" // Changed to email type
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;