import { useState } from "react";

export default function ProjectGallery() {
  // Data gambar kapal
  const shipImages = [
    "https://ashdaq.com/wp-content/uploads/elementor/thumbs/PHOTO-2024-09-03-17-51-54-r1hglxwtvqvwfc0exqob6vf3mi9n4l21o6it4fcc68.jpg",
    "https://ashdaq.com/wp-content/uploads/2025/02/Ashdaq-Paint-Image-Marine-1024x927.webp",
    "https://ashdaq.com/wp-content/uploads/elementor/thumbs/PHOTO-2024-09-03-17-51-54-r1hglxwtvqvwfc0exqob6vf3mi9n4l21o6it4fcc68.jpg",
    "https://ashdaq.com/wp-content/uploads/elementor/thumbs/PHOTO-2024-09-03-17-51-54-r1hglxwtvqvwfc0exqob6vf3mi9n4l21o6it4fcc68.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(shipImages[0]);

  return (
    <div className="min-h-screen bg-blue-800 text-white">
      <div className="container mx-auto py-8 px-4 md:px-14">
        {/* Header Section */}
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">BG GANDASARI 26</h1>
          <p className="mt-2">
            We are ready to work on a project of any complexity, whether it's
            ship or commercial.
          </p>
          <button className="mt-4 bg-white text-blue-800 px-4 py-2 text-sm font-medium rounded">
            Industrial Works
          </button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Left Section - Gallery */}
            <div className="w-full lg:w-2/3">
              {/* Main Image */}
              <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedImage}
                  alt="BG GANDASARI 26"
                  className="w-full max-h-[500px] object-cover"
                />
              </div>

              {/* Scrollable Thumbnails */}
              <div className="overflow-x-auto">
                <div className="flex gap-3 p-2">
                  {shipImages.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
                        selectedImage === image ? "ring-1 ring-white" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`BG GANDASARI 26 View ${index + 1}`}
                        className="w-32 h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium quisquam possimus quam magni, facere eveniet magnam dicta at, rem libero accusamus officiis aperiam saepe. Repudiandae debitis eligendi asperiores voluptatum officia.!</p>
              </div>
            </div>

            {/* Right Section - Contact Info */}
            <div className="lg:sticky lg:top-8 w-full lg:w-1/3 bg-white text-black p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full mr-3"></div>
                <h2 className="text-lg font-bold">Ashdaq Paint</h2>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <address className="not-italic">
                  <p className="mb-2">
                    Agung Perkasa Street 8 K1, Kav. Numb. 41, RT10/RW 11 | 14350
                    South Jakarta
                  </p>
                  <p className="mb-2">+62 857-1645-7503</p>
                  <p className="text-blue-600">admin@ashdaq.com</p>
                </address>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
