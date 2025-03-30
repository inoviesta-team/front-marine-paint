import React, { useState } from 'react';
import { useCart } from '@hooks/useCart';
import Button from '@components/ui/Button';

export default function AddToCartForm({ product }) {
  const [isClient, setIsClient] = useState(false);
  let cart = { addItem: () => {} }; // Default no-op function
  
  // Only try to access the cart context on the client side
  try {
    cart = useCart();
    // If we get here, we're on the client side with a cart context
    if (!isClient) setIsClient(true);
  } catch (error) {
    // We're being rendered on the server or outside a CartProvider
    // Use the default no-op function for addItem
  }
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isClient) return; // Don't proceed if we're not on the client
    
    setIsAdding(true);
    
    // Add to cart
    cart.addItem(product, quantity);
    
    // Show success feedback
    setAdded(true);
    setIsAdding(false);
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-5">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-700 focus:outline-none"
            onClick={decrementQuantity}
            disabled={!isClient}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="text-center w-12 border-0 focus:ring-0"
            disabled={!isClient}
          />
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-700 focus:outline-none"
            onClick={incrementQuantity}
            disabled={!isClient}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isAdding}
        variant={added ? 'success' : 'primary'}
        disabled={!isClient}
      >
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </Button>
    </form>
  );
}
