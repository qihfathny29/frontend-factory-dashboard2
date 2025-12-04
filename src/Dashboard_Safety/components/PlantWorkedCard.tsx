import React from "react";

const PlantWorkedCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-center text-center">
      {/* Header Text - Dikecilkan sedikit ke text-xs agar lebih lega */}
      <div className="text-black text-xs font-bold mb-1">
        This Plant has Worked
      </div>

      {/* Main Number - Dikecilkan dari 5xl ke 4xl agar tidak makan tempat */}
      <div className="text-4xl font-black text-black leading-none mb-1">
        226
      </div>

      {/* Subtitle - Margin dikurangi jadi mb-1 */}
      <div className="text-black text-sm font-bold mb-1">Days</div>

      {/* Description - Dikecilkan ke text-xs dan margin dikurangi */}
      <div className="text-black text-xs font-bold mb-2">
        Without an Accident
      </div>

      {/* Footer Section */}
      <div className="space-y-0.5">
        {/* Text italic tipis - Dikecilkan fontnya */}
        <div className="text-red-500 text-[10px] italic font-normal">
          Last accident occurred on
        </div>
        {/* Kotak tanggal */}
        <div className="inline-block border border-red-500 text-red-500 px-2 py-0.5 rounded text-xs font-bold">
          2 April 2025
        </div>
      </div>
    </div>
  );
};

export default PlantWorkedCard;
