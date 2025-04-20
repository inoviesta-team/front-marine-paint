import React from 'react';

export default function MarineProductCard({ product }) {
  return (
    <div className="border border-black rounded-lg p-4 flex flex-col">
      <div className="border border-gray-300 h-40 flex items-center justify-center mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <span className="text-gray-400">Product Image</span>
        )}
      </div>
      <h3 className="font-mono font-bold text-black">{product.name}</h3>
      <p className="font-mono font-bold text-black">
        {typeof product.price === 'number' 
          ? `Rp${product.price.toLocaleString()}`
          : product.price}
      </p>
    </div>
  );
}
