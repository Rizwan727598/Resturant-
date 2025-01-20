import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "https://i.ibb.co/1mV7Csv/istockphoto-1829241109-1024x1024.jpg",
      alt: "Image 1",
    },
    {
      src: "https://i.ibb.co/wR5ybhv/istockphoto-660651380-1024x1024.jpg",
      alt: "Image 2",
    },
    {
      src: "https://i.ibb.co/vjVtf9n/istockphoto-1147399195-1024x1024.jpg",
      alt: "Image 3",
    },
    {
      src: "https://i.ibb.co/0nQQz8j/istockphoto-1200193815-1024x1024.jpg",
      alt: "Image 4",
    },
    {
      src: "https://i.ibb.co/VgRx7L7/istockphoto-1266564444-1024x1024.jpg",
      alt: "Image 5",
    },
    {
      src: "https://i.ibb.co/WDCjjLS/istockphoto-1338297359-1024x1024.jpg",
      alt: "Image 6",
    },
    {
      src: "https://i.ibb.co/JRWcdQP/istockphoto-1370267290-1024x1024.jpg",
      alt: "Image 7",
    },
    {
      src: "https://i.ibb.co/QrN3bL6/istockphoto-1436678991-1024x1024-1.jpg",
      alt: "Image 8",
    },
    {
      src: "https://i.ibb.co/2MNZv9b/istockphoto-1437482082-1024x1024.jpg",
      alt: "Image 9",
    },
    {
      src: "https://i.ibb.co/gZ9qbpC/istockphoto-1730931652-1024x1024.jpg",
      alt: "Image 10",
    },
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900">
      {/* Page Title */}
      <div className="flex justify-center items-center h-64 bg-gray-700 text-white">
        <h1 className="text-5xl font-bold tracking-wide">Gallery</h1>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-lg font-semibold">View Image</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({ src: img.src }))}
        index={currentImageIndex}
      />
    </div>
  );
};

export default Gallery;
