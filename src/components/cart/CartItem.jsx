import React from 'react';
import { useCart } from '@hooks/useCart';

export default function CartItem({ item }) {
  const { updateItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateItemQuantity(item.id, newQuantity);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-center object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              <a href={`/products/${item.id}`}>{item.name || 'Product'}</a>
            </h3>
            <p className="ml-4 text-sm font-medium text-gray-900">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
        </div>
        
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">
              Qty
            </label>
            <select
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
