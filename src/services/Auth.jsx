import { useState, useEffect } from 'react';
import { AuthAPI } from './AuthAPI';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for token on mount
  useEffect(() => {
    const token = AuthAPI.getToken();
    if (token) {
      fetch('http://localhost:3000/api/v1/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.error(err);
          AuthAPI.clearToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await AuthAPI.login(email, password);
      console.log(userData);
      if (userData) {
        setUser(userData);
        return userData;
      } else {
        setError(new Error('Login failed'));
        return null;
      }
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthAPI.clearToken();
    setUser(null);
  };

  return { user, loading, error, login, logout };
};

export default useAuth;
