import { beUrl } from '@utils/url';
import React from 'react';

export default function MarineProductCardSearch({ product }) {
  // console.log("product: ", product);

  const media = product.media.length > 0 && product.media.filter((item) => item.isMain === true);
  
  return (
    <a href={`/products/${product?.slug}`} className="flex-shrink-0 max-w-72 group shadow-md rounded-xl">
      <div className="marine-card p-2.5 sm:p-3.5 flex flex-col hover:border-marine-blue shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">

        <div className="h-32 md:h-48 rounded-lg overflow-hidden mb-2 sm:mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-marine-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          
          {/* {product.image ? ( */}
            <img
              src={media.length > 0 ? beUrl + media[0].filePath : "/images/no-image.png"}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "/images/no-image.png"
              }}
            />
          {/* ) : (
            <div className="h-full w-full bg-marine-blue/10 flex items-center justify-center">
              <span className="text-marine-blue/60 font-sans">Product Image</span>
            </div>
          )} */}
        </div>
        
        {/* Category tag */}
        {/* {product.category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-marine-blue/10 rounded-full text-marine-blue text-xs font-sans">
              {product.category}
            </span>
          </div>
        )} */}
        
        <h3 className="line-clamp-1 font-bold text-marine-darkBlue text-md sm:text-lg mb-0.5 sm:mb-1 group-hover:text-marine-blue transition-colors duration-300">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="line-clamp-1 text-gray-600 text-sm mb-3">
            {product.description}
          </p>
        )}
        
        <div>
          <p className="font-bold text-sm sm:text-lg text-marine-blue">
            {typeof product.price === 'number' 
              ? `Rp ${product.price.toLocaleString()}`
              : product.price}
          </p>
        </div>
      </div>
    </a>
  );
}
