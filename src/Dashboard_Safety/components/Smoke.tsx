import React from "react";

const Grade1Accident: React.FC = () => {
  // Data dummy - nanti bisa diganti dari API
  const currentCount = 0;
  const stableCount = 0;
  const fiscalYearCount = 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-sm font-bold text-center mb-1">Smoke</h2>

      {/* Main Number */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-5xl font-bold">{currentCount}</span>
      </div>

      {/* Bottom Info */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {/* Stable vs - Button with 2 arrows */}
        <div className="flex flex-col items-center gap-0.5">
          <button className="flex items-center gap-1 border border-green-500 text-green-500 px-2 py-0.5 rounded hover:bg-green-50 transition-colors">
            <div className="flex flex-col items-center gap-0">
              <span className="text-xs leading-none">▲</span>
              <span className="text-xs leading-none">▼</span>
            </div>
            <span className="text-sm font-bold">{stableCount}</span>
          </button>
          <span className="text-[10px] text-green-500 font-semibold">
            Stable vs.
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-black"></div>

        {/* Fiscal Year */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1 text-blue-600 px-2 py-0.5 rounded">
            <span className="text-xl font-bold">{fiscalYearCount}</span>
          </div>
          <span className="text-[10px] text-blue-600">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default Grade1Accident;
