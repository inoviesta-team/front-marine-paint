import React from 'react';
import { useCart } from '@hooks/useCart';
import CartItem from './CartItem';
import Button from '@components/ui/Button';

export default function CartContents() {
  // Safely use the cart hook - it will now provide fallback values during SSR
  const { items = [], total = 0, itemCount = 0, loading = true } = useCart();

  // Safely handle the loading state
  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="animate-pulse bg-gray-300 h-16 w-full mb-4 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-16 w-full mb-4 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-16 w-full mb-4 rounded"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-500">
          Looks like you haven't added any products to your cart yet.
        </p>
        <div className="mt-6">
          <Button variant="primary" as="a" href="/products">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal ({itemCount} items)</p>
              <p className="text-sm font-medium text-gray-900">${total.toFixed(2)}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Shipping</p>
              <p className="text-sm font-medium text-gray-900">Free</p>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <p className="text-base font-medium text-gray-900">Order total</p>
              <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="primary" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/products" className="text-sm text-blue-600 hover:text-blue-500">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
