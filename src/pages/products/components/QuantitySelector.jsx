import useCartStore from '@features/cart/zustand/useCartStore';
import useModalStore from '@features/modal/zustand/useModalStore';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function QuantitySelector({ 
  initial = 1, 
  min = 1, 
  max = 99, 
  onChange,
  disabled = false,
  quantity,
  setQuantity,
  cart,
  setCart
}) {
  const { updateCart, deleteCart } = useCartStore();
  const { showModal: showModalStore, hideModal: hideModalStore } = useModalStore();

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
    } else if (cart?.id) {
      showModalStore(
        "CONFIRM",
        "DEFAULT",
        "Hapus produk dari keranjang belanja?",
        null,
        "Tutup",
        async () => {
          if (!cart?.id) return;
  
          await deleteCart(cart.id);
          setCart(null)
          // hideModalStore()
          showModalStore(
            "INFO",
            "SUCCESS",
            "Berhasil",
            "Berhasil hapus produk dari keranjang belanja",
            "Tutup",
            null
          );
        }
      )
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
        className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-gray-400 transition-colors ${
          disabled || !cart?.id 
            ? 'cursor-not-allowed opacity-50' 
            : 'text-marine-darkBlue'
        }`}
        // className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-gray-400 transition-colors text-marine-darkBlue`}
        onClick={handleDecrement}
        disabled={disabled || !cart?.id}
        aria-label="Decrease quantity"
      >
        <span className="text-xl font-bold"><Minus size={20} color='#15486b' /></span>
      </button>
      
      <input 
        type="text" 
        value={quantity} 
        min={min}
        max={max}
        onChange={handleInputChange}
        className={`w-16 h-10 border-gray-200 text-center font-sans focus:outline-none focus:ring-1 focus:ring-marine-blue rounded-lg mx-1 ${
          disabled ? 'cursor-not-allowed bg-gray-100' : ''
        }`}
        disabled={disabled}
        aria-label="Quantity"
      />
      
      <button 
        type="button"
        className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-gray-400 transition-colors ${
          disabled || quantity >= max 
            ? 'cursor-not-allowed opacity-50' 
            : 'text-marine-darkBlue'
        }`}
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <span className="text-xl font-bold"><Plus size={20} color='#15486b' /></span>
      </button>
    </div>
  );
}