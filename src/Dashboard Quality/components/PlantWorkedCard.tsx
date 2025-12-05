import React from "react";

interface Props {
  lastAccidentDate: Date;
}

const PlantWorkedCard: React.FC<Props> = ({ lastAccidentDate }) => {
  const today = new Date();

  // Hitung selisih hari
  const diffTime = Math.abs(today.getTime() - lastAccidentDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = lastAccidentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-center text-center">
      {/* Header Text - Dikecilkan sedikit ke text-xs agar lebih lega */}
      <div className="text-black text-xs font-bold mb-1">
        This Plant has Worked
      </div>

      {/* Main Number - Dikecilkan dari 5xl ke 4xl agar tidak makan tempat */}
      <div className="text-4xl font-black text-black leading-none mb-1">
        {diffDays}
      </div>

      {/* Subtitle - Margin dikurangi jadi mb-1 */}
      <div className="text-black text-sm font-bold mb-1">Days</div>

      {/* Description - Dikecilkan ke text-xs dan margin dikurangi */}
      <div className="text-black text-xs font-bold mb-2">
        Without an 0KM Claim
      </div>

      {/* Footer Section */}
      <div className="space-y-0.5">
        {/* Text italic tipis - Dikecilkan fontnya */}
        <div className="text-red-500 text-[10px] italic font-normal">
          Last accident occurred on
        </div>
        {/* Kotak tanggal */}
        <div className="inline-block border border-red-500 text-red-500 px-2 py-0.5 rounded text-xs font-bold">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default PlantWorkedCard;
