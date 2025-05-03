import { productApiStatic } from '@features/products/api/productApiStatic';
import { useEffect, useState } from 'react';

export default function ProductImageGallery({ productId, productImages = [] }) {
  // return null;
  const [selectedImage, setSelectedImage] = useState({});
  const [otherImage, setOtherImage] = useState([]);
  
  

  useEffect(() => {
    const getImages = async () => {
      const response = await productApiStatic.getImages(productId);
      const images = response.data
     
      setSelectedImage(images.find((img) => img.isMain)[0] || images[0]);
      setOtherImage(images);
    }
    
    getImages();
  }, [])
  
  return (
    <div className="w-full">
      {/* Main Image with navigation */}
      <div className="relative mb-4 border border-gray-200 rounded-lg overflow-hidden h-80 flex items-center justify-center bg-white">
        <img 
          src={selectedImage?.filePath} 
          alt={selectedImage?.fileName} 
          className="w-full h-full object-contain transition-all duration-300"
          onError={(e) => {
            e.target.src = '/images/products/placeholder.png';
          }}
        />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="overflow-x-auto">
      <div className="flex gap-3 p-2">
        {otherImage.map((image, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 border rounded-lg overflow-hidden h-24 cursor-pointer transition-all duration-200 ${
              selectedImage.id === image.id
                ? "border-marine-blue ring-2 ring-marine-blue ring-opacity-50" 
                : "border-gray-200 hover:border-marine-blue"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.filePath} 
              alt={`View ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}