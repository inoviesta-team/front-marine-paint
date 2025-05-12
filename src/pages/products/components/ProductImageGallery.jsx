import { productApiStatic } from '@features/products/api/productApiStatic';
import { beUrl } from '@utils/url';
import { useEffect, useState } from 'react';

export default function ProductImageGallery({ productId, productImages = [] }) {
  // return null;
  const [selectedImage, setSelectedImage] = useState({});
  const [otherImage, setOtherImage] = useState([]);
  
  const getImages = async () => {
    const response = await productApiStatic.getImages(productId);
    const images = response.data
   
    setSelectedImage(images && images.find((img) => img.isMain) || images[0]);
    // setSelectedImage(null);
    setOtherImage(images);
  }

  useEffect(() => {
    getImages();
  }, [])
  
  return (
    <div className="w-full">
      {/* Main Image with navigation */}
      <div className="relative mb-4 border border-gray-200 rounded-lg overflow-hidden h-80 flex items-center justify-center bg-white">
        <img 
          src={beUrl + selectedImage?.filePath} 
          alt={selectedImage?.fileName} 
          className="w-full h-full object-contain transition-all duration-300"
          onError={(e) => {
            e.target.src = "/images/no-image.png"
          }}
        />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="overflow-x-auto">
      <div className="flex gap-3 p-2">
        {otherImage.map((image, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 border rounded-lg overflow-hidden w-24 h-24 cursor-pointer transition-all duration-200 ${
              selectedImage?.id === image?.id
                ? "border-marine-blue ring-2 ring-marine-blue ring-opacity-50" 
                : "border-gray-200 hover:border-marine-blue"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={beUrl + image.filePath} 
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