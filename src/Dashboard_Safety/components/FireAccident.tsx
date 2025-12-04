import React from "react";

// Definisikan tipe props
interface FireAccidentProps {
  value: number; // Menerima angka dari parent
}

const FireAccident: React.FC<FireAccidentProps> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-xs font-bold">Fire Accident</div>

      {/* Gunakan props value disini */}
      <div className="text-4xl font-black text-black leading-none">{value}</div>

      {/* Bagian bawah statis (hardcode) atau bisa dibuat props juga kalau mau */}
      <div className="flex items-center justify-center space-x-2 w-full">
        {/* ...existing code for stats... */}
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-xs font-bold">▼ 1</span>
          <span className="text-[8px] text-green-500">Decreased vs.</span>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold">2</span>
          <span className="text-[8px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default FireAccident;
