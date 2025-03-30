import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

// Create a mock auth for SSR that won't throw errors during build
const defaultAuth = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  loading: true,
  error: null
};

export function useAuth() {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Get the actual context if available
  const context = useContext(AuthContext);
  
  // During SSR or if context is missing in browser, handle gracefully
  if (!context) {
    // Only throw error in browser environment
    if (isBrowser) {
      console.warn('useAuth must be used within an AuthProvider');
    }
    // Return mock data during SSR
    return defaultAuth;
  }
  
  return context;
}
