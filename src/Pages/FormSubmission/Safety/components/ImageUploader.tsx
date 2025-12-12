import React from "react";
import { ImageCarousel } from "../../../../Components/ImageCarousel";
import type { ImageFile } from "../types";

interface ImageUploaderProps {
  uploadedImages: ImageFile[];
  onImageUpload: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    onImageUpload(fileArray);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onImageUpload(fileArray);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
    <>
      {/* Upload Images Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload Images
        </label>
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group bg-gray-50"
        >
          <div className="space-y-1 text-center w-full">
            {/* Cloud Icon */}
            <svg
              className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <div className="flex text-sm text-gray-600 justify-center items-center">
              <span className="font-medium text-blue-600">Click to upload</span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              JPG, JPEG, PNG up to 2MB (Max 5 images)
            </p>
          </div>
        </div>
        {/* Hidden File Input */}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Image Carousel Preview */}
      {uploadedImages.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image Preview ({uploadedImages.length}/5)
          </label>
          <ImageCarousel
            images={uploadedImages}
            onRemove={onRemoveImage}
          />
        </div>
      )}
    </>
  );
};
