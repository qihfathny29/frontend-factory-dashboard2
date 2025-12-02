import React from "react";

const SeriousAccidentSubcont: React.FC = () => {
  // Data dummy - nanti bisa diganti dari API
  const currentCount = 0;
  const stableCount = 0;
  const fiscalYearCount = 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-base font-bold text-center mb-3">
        Serious Accident Subcont
      </h2>

      {/* Main Number */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-7xl font-bold">{currentCount}</span>
      </div>

      {/* Bottom Info */}
      <div className="flex items-center justify-center gap-4 pt-3">
        {/* Stable vs - Button with 2 arrows */}
       <div className="flex flex-col items-center gap-1">
        <button className="flex items-center gap-2 border-2 border-green-500 text-green-500 px-3 py-2 rounded hover:bg-green-50 transition-colors">
            <div className="flex flex-col items-center gap-0">
            <span className="text-base leading-none">▲</span>
            <span className="text-base leading-none">▼</span>
            </div>
            <span className="text-lg font-bold">{stableCount}</span>
        </button>
        <span className="text-xs text-green-500 font-semibold">
            Stable vs.
        </span>
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

export default SeriousAccidentSubcont;
