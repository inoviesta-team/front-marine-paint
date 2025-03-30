/**
 * Authentication API functions
 */
import { api } from './client';
import { mockAuthResponses, mockUsers } from './mockData';

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

// Flag to use mock data or real API
const USE_MOCK_DATA = true;

export const authApi = {
  /**
   * Login a user with email and password
   */
  login: async (email, password) => {
    if (USE_MOCK_DATA) {
      // Simple mock validation
      if (email === 'user@example.com' && password === 'password123') {
        const response = mockAuthResponses.login;
        if (isBrowser) {
          localStorage.setItem('authToken', response.token);
        }
        return response;
      } else {
        throw new Error('Invalid credentials');
      }
    }

    try {
      const data = await api.post('/auth/login', { email, password }, { skipAuth: true });
      if (data.token && isBrowser) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (userData) => {
    if (USE_MOCK_DATA) {
      // Simple mock registration
      const response = {
        ...mockAuthResponses.register,
        user: {
          ...mockAuthResponses.register.user,
          name: userData.name,
          email: userData.email
        }
      };
      
      if (isBrowser) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    }

    try {
      const data = await api.post('/auth/register', userData, { skipAuth: true });
      if (data.token && isBrowser) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  /**
   * Get current user info
   */
  getCurrentUser: async () => {
    if (USE_MOCK_DATA) {
      if (!authApi.isAuthenticated()) {
        throw new Error('Not authenticated');
      }
      return mockUsers[0];
    }

    try {
      return await api.get('/auth/me');
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  },

  /**
   * Logout user (client-side only)
   */
  logout: () => {
    if (isBrowser) {
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Check if user is authenticated (client-side only)
   */
  isAuthenticated: () => {
    return isBrowser ? !!localStorage.getItem('authToken') : false;
  }
};
