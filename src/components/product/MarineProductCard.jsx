import React from 'react';

export default function MarineProductCard({ product }) {
  return (
    <div className="marine-card p-4 flex flex-col hover:border-marine-blue">
      <div className="border border-gray-300 h-40 flex items-center justify-center mb-4 overflow-hidden">
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
      <h3 className="font-mono font-bold text-marine-darkBlue">{product.name}</h3>
      <p className="font-mono font-bold text-marine-blue">
        {typeof product.price === 'number' 
          ? `Rp${product.price.toLocaleString()}`
          : product.price}
      </p>
    </div>
  );
}
