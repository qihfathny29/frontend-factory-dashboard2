import React from "react";

const PlantWorkedCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-center text-center">
      {/* Header Text - Bold sedang */}
      <div className="text-black text-sm font-bold mb-1">
        This Plant has Worked
      </div>

      {/* Main Number - PALING TEBAL */}
      <div className="text-5xl font-black text-black leading-none mb-1">
        226
      </div>

      {/* Subtitle - Normal/biasa aja */}
      <div className="text-black text-sm font-bold mb-2">Days</div>

      {/* Description - Bold sedang */}
      <div className="text-black text-sm font-bold mb-2">
        Without an Accident
      </div>

      {/* Footer Section */}
      <div className="space-y-1">
        {/* Text italic tipis */}
        <div className="text-red-500 text-xs italic font-normal">
          Last accident occurred on
        </div>
        {/* Kotak tanggal - bold sedang */}
        <div className="inline-block border border-red-500 text-red-500 px-2 py-0.5 rounded text-xs font-bold">
          2 April 2025
        </div>
      </div>
    </div>
  );
};

export default PlantWorkedCard;
