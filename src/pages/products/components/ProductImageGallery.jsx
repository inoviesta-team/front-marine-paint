import { productApiStatic } from "@features/products/api/productApiStatic";
import { beUrl } from "@utils/url";
import { useEffect, useState } from "react";

export default function ProductImageGallery({ productId, productImages = [] }) {
  // return null;
  const [selectedImage, setSelectedImage] = useState({});
  const [otherImage, setOtherImage] = useState([]);

  const getImages = async () => {
    const response = await productApiStatic.getImages(productId);
    const images = response.data;
    console.log("images: ", images);

    setSelectedImage((images && images.find((img) => img.isMain)) || images[0]);
    // setSelectedImage(null);
    setOtherImage(images);
  };

  useEffect(() => {
    getImages();
  }, []);

  console.log("selectedImage: " , selectedImage);
  

  return (
    <div className="w-full">
      {/* Main Image with navigation */}
      <div className="relative mb-4 border border-gray-200 rounded-lg overflow-hidden h-80 sm:h-96 flex items-center justify-center bg-white">
        {
          selectedImage.mediaType === "IMAGE" ? (
            <img
          src={
            selectedImage
              ? beUrl + selectedImage?.filePath
              : "/images/no-image.png"
          }
          alt={selectedImage?.fileName}
          className="w-full h-full object-contain transition-all duration-300"
        />
          ) : (
            <video
            src={
              selectedImage
                ? beUrl + selectedImage?.filePath
                : "/images/no-image.png"
            }
            alt={selectedImage?.fileName}
            className="w-full h-full object-contain transition-all duration-300"
            controls
          />
          )
        }
      </div>

      {/* Thumbnail Gallery */}
      <div className="overflow-x-auto">
        <div className="flex gap-3 p-2">
          {otherImage.map((image, index) => (
            <div
              key={`product-image-${index}`}
              className={`flex-shrink-0 border rounded-lg overflow-hidden w-24 h-24 cursor-pointer transition-all duration-200 ${
                selectedImage?.id === image?.id
                  ? "border-marine-blue ring-2 ring-marine-blue/5"
                  : "border-gray-200 hover:border-marine-blue opacity-55"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              {
                image.mediaType === "IMAGE" ? (
                  <img
                src={beUrl + image.filePath}
                alt={`Product image ${image.fileName}`}
                className="w-full h-full object-cover"
              />
                ) : (
                  <video
                  src={beUrl + image.filePath}
                  alt={`Product video ${image.fileName}`}
                  className="w-full h-full object-cover"
                  controls={false}
                />
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
