import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '@api/auth';

export const AuthContext = createContext(null);

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial mount
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser) {
      setLoading(false);
      return;
    }

    const checkUser = async () => {
      if (!authApi.isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Failed to load user:', err);
        // Clear token if invalid
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authApi.register(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
