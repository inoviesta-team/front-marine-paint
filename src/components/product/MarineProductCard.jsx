import React from 'react';

export default function MarineProductCard({ product }) {
  return (
    <div className="group">
      <div className="marine-card p-5 flex flex-col hover:border-marine-blue shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden h-full">
        {/* Enhanced image container with scaling effect */}
        <div className="h-48 rounded-lg overflow-hidden mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-marine-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="h-full w-full bg-marine-blue/10 flex items-center justify-center">
              <span className="text-marine-blue/60 font-sans">Product Image</span>
            </div>
          )}
        </div>
        
        {/* Category tag */}
        {product.category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-marine-blue/10 rounded-full text-marine-blue text-xs font-sans">
              {product.category}
            </span>
          </div>
        )}
        
        {/* Enhanced product title */}
        <h3 className="font-sans font-bold text-marine-darkBlue text-lg mb-1 group-hover:text-marine-blue transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Short description if available */}
        {product.description && (
          <p className="font-sans text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price with better styling */}
        <div className="mt-auto">
          <p className="font-sans font-bold text-lg text-marine-blue">
            {typeof product.price === 'number' 
              ? `Rp${product.price.toLocaleString()}`
              : product.price}
          </p>
        </div>
      </div>
    </div>
  );
}
