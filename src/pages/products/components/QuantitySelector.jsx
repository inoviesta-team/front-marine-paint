import useCartStore from '@features/cart/zustand/useCartStore';
import { useState } from 'react';

export default function QuantitySelector({ 
  initial = 1, 
  min = 1, 
  max = 99, 
  onChange,
  disabled = false,
  quantity,
  setQuantity,
  cart
}) {
  const { updateCart } = useCartStore();

  const handleUpdateCart = async (cartId, quantity) => {
    const requestUpdateCart = {
      quantity
    };
    await updateCart(cartId, requestUpdateCart);
  };

  const handleIncrement = async () => {
    if (!disabled && quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      if (onChange) onChange(newValue);
      if(cart?.id) await handleUpdateCart(cart.id, newValue)
    }
  };
  
  const handleDecrement = async () => {
    if (!disabled && quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      if (onChange) onChange(newValue);
      if(cart?.id) await handleUpdateCart(cart.id, newValue)
    }
  };
  
  const handleInputChange = async (e) => {
    if (disabled) return;
    
    const value = Number(e.target.value);
    const isNaNValue = isNaN(value);
    const isValidValue = !isNaNValue && value >= min && value <= max;
    const isIntegerValue = Number.isInteger(value);

    if (isValidValue && isIntegerValue) {
      setQuantity(value);
      if (onChange) onChange(value);
      if(cart?.id) await handleUpdateCart(cart.id, value)
    } else {
      e.target.value = quantity;
    }
  };
  
  return (
    <div className="flex items-center">
      <button 
        type="button"
        className={`w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center border border-gray-200 text-marine-darkBlue transition-colors ${
          disabled || quantity <= min 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:bg-gray-200'
        }`}
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        <span className="text-xl font-bold">−</span>
      </button>
      
      <input 
        type="text" 
        value={quantity} 
        min={min}
        max={max}
        onChange={handleInputChange}
        className={`w-16 h-10 border-t border-b border-gray-200 text-center font-sans focus:outline-none focus:ring-1 focus:ring-marine-blue ${
          disabled ? 'cursor-not-allowed bg-gray-100' : ''
        }`}
        disabled={disabled}
        aria-label="Quantity"
      />
      
      <button 
        type="button"
        className={`w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center border border-gray-200 text-marine-darkBlue transition-colors ${
          disabled || quantity >= max 
            ? 'cursor-not-allowed opacity-50' 
            : 'hover:bg-gray-200'
        }`}
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  );
}