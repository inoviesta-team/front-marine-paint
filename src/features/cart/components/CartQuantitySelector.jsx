import { useState } from "react";
import useCartStore from "../zustand/useCartStore";

export default function CartQuantitySelector({
  initial = 1,
  min = 1,
  max = 990,
  onChange,
  disabled = false,
  cart
}) {
  const { updateCart } = useCartStore();
  
  const [quantity, setQuantity] = useState(initial);

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
      if (cart?.id) await handleUpdateCart(cart.id, newValue);
    }
  };

  const handleDecrement = async () => {
    if (!disabled && quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      if (onChange) onChange(newValue);
      if (cart?.id) await handleUpdateCart(cart.id, newValue);
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
      if (cart?.id) await handleUpdateCart(cart.id, value);
    } else {
      e.target.value = quantity;
    }
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors ${
          disabled || quantity <= min
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14"></path>
        </svg>
      </button>

      <input
        type="text"
        value={quantity}
        min={min}
        max={max}
        onChange={handleInputChange}
        className={`w-16 h-10 text-center font-sans focus:outline-none focus:ring-1 focus:ring-marine-blue ${
          disabled ? "cursor-not-allowed bg-gray-100" : ""
        }`}
        disabled={disabled}
        aria-label="Quantity"
      />

      <button
        type="button"
        className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 transition-colors ${
          disabled || quantity >= max
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
    </div>
  );
}

