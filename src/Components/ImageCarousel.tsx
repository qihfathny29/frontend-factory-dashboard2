import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface ImageCarouselProps {
  images: ImageFile[];
  onRemove: (index: number) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleRemove = () => {
    onRemove(currentIndex);
    if (currentIndex >= images.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="relative">
        {/* Image Display */}
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={images[currentIndex].preview}
            alt={`Preview ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Image Counter & Info */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-gray-600 font-semibold">
          Image {currentIndex + 1} of {images.length}
        </span>
        <span className="text-gray-500 truncate max-w-xs">
          {images[currentIndex].name}
        </span>
      </div>
    </div>
  );
};
