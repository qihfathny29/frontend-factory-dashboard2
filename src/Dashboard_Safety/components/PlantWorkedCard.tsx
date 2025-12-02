import React from "react";

const PlantWorkedCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full h-full flex flex-col items-center justify-center text-center">
      {/* Header Text - Bold sedang */}
      <div className="text-gray-700 text-lg font-bold mb-2">
        This Plant has Worked
      </div>

      {/* Main Number - PALING TEBAL */}
      <div className="text-7xl font-black text-black leading-none mb-1">
        226
      </div>

      {/* Subtitle - Normal/biasa aja */}
      <div className="text-gray-700 text-lg font-bold mb-6">Days</div>

      {/* Description - Bold sedang */}
      <div className="text-gray-700 text-lg font-bold mb-4">
        Without an Accident
      </div>

      {/* Footer Section */}
      <div className="space-y-2">
        {/* Text italic tipis */}
        <div className="text-red-500 text-sm italic font-normal">
          Last accident occurred on
        </div>
        {/* Kotak tanggal - bold sedang */}
        <div className="inline-block border-2 border-red-500 text-red-500 px-4 py-1 rounded text-sm font-bold">
          2 April 2025
        </div>
      </div>
    </div>
  );
};

export default PlantWorkedCard;
