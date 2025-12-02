import React from "react";

const TrafficAccident: React.FC = () => {
  // Data dummy - nanti bisa diganti dari API
  const currentCount = 2;
  const increaseCount = 1;
  const fiscalYearCount = 3;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-base font-bold text-center mb-3">
        Serious Accident
      </h2>

      {/* Main Number */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-7xl font-bold">{currentCount}</span>
      </div>

      {/* Bottom Info */}
      <div className="flex items-center justify-center gap-4 pt-3">
        {/* Increased vs */}
        <div className="flex flex-col items-center gap-1">
          <button className="flex item-center gap-1 border-2 border-green-500 text-green-500 px-3 py-1 rounded hover:bg-red-50 transition-colors">
            <span className="text-lg font-bold">▼</span>
            <span className="text-lg font-bold">{increaseCount}</span>
          </button>
          <span className="text-semibold text-green-500">Decreased vs.</span>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-black"></div>


        {/* Fiscal Year */}
        <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1  text-blue-600 px-3 py-1 rounded">
            <span className="text-2xl font-bold">{fiscalYearCount}</span>
        </div>
        <span className="text-xs text-blue-600">Fiscal Year '24</span>
        </div>

      </div>
    </div>
  );
};  

export default TrafficAccident;
