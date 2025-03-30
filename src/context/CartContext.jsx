import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext(null);

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser) {
      setLoading(false);
      return;
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart from localStorage:', err);
      }
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isBrowser || loading) {
      return;
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items, loading]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  const updateItemQuantity = useCallback((productId, quantity) => {
    setItems(prevItems => {
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        return prevItems.filter(item => item.id !== productId);
      }
      
      // Update quantity
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calculate totals
  const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const total = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  const value = {
    items,
    loading,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    itemCount,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
