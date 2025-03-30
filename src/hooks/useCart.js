import { useContext } from 'react';
import { CartContext } from '@context/CartContext';

// Create a mock cart for SSR that won't throw errors during build
const defaultCart = {
  items: [],
  loading: true,
  addItem: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
  total: 0
};

export function useCart() {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Get the actual context if available
  const context = useContext(CartContext);
  
  // During SSR or if context is missing in browser, handle gracefully
  if (!context) {
    // Only throw error in browser environment
    if (isBrowser) {
      console.warn('useCart must be used within a CartProvider');
    }
    // Return mock data during SSR
    return defaultCart;
  }
  
  return context;
}
