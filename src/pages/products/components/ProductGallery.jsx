import { useState } from 'react';

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);
  
  return (
    <div>
      <div className="bg-gray-100 rounded overflow-hidden mb-4">
        <img 
          src={mainImage} 
          alt="Product" 
          className="w-full h-auto object-contain"
          style={{ maxHeight: '400px' }}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button 
            key={index}
            onClick={() => setMainImage(image)}
            className={`bg-gray-100 rounded overflow-hidden border-2 ${
              mainImage === image ? 'border-blue-800' : 'border-transparent'
            }`}
          >
            <img 
              src={image} 
              alt={`Product view ${index + 1}`}
              className="w-full h-auto object-cover"
              style={{ height: '70px' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}