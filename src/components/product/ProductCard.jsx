import React, { useState } from 'react';
import { useCart } from '@hooks/useCart';
import Button from '@components/ui/Button';

export default function ProductCard({ product }) {
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

  const handleAddToCart = () => {
    cart.addItem(product, 1);
  };

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200" transition:name={`product-image-${product.id}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900" transition:name={`product-title-${product.id}`}>
          <a href={`/products/${product.id}`}>
            {product.name}
          </a>
        </h3>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">
            ${(product.price || 0).toFixed(2)}
          </p>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!isClient} // Disable button server-side or when context is not available
            className="transition-all duration-300"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
