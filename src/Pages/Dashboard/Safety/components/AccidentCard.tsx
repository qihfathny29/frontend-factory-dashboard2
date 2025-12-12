import React from "react";
import type { AccidentConfig } from "../config/accidentTypes";

interface AccidentCardProps {
  config: AccidentConfig;
  value: number;
}

const AccidentCard: React.FC<AccidentCardProps> = ({ config, value }) => {
  const { title, trendType, trendValue, fiscalYearValue } = config;

  // Render trend indicator based on type
  const renderTrend = () => {
    if (trendType === "stable") {
      return (
        <div className="flex flex-col items-center">
          <button className="border border-green-500 rounded px-2 py-1 flex items-center space-x-1 bg-transparent">
            <div className="flex flex-col items-center leading-none">
              <span className="text-green-500 text-[10px] font-bold">▲</span>
              <span className="text-green-500 text-[10px] font-bold">▼</span>
            </div>
            <span className="text-green-500 text-xs font-bold">{trendValue}</span>
          </button>
          <span className="text-[8px] text-green-500 mt-1">Stable vs.</span>
        </div>
      );
    }

    if (trendType === "increase") {
      return (
        <div className="flex flex-col items-center">
          <span className="text-red-500 text-xs font-bold border border-red-500 px-2 py-1 rounded bg-transparent">
            ▲ {trendValue}
          </span>
          <span className="text-[8px] text-red-500">Increased vs.</span>
        </div>
      );
    }

    if (trendType === "decrease") {
      return (
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-xs font-bold">▼ {trendValue}</span>
          <span className="text-[8px] text-green-500">Decreased vs.</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-sm font-bold">{title}</div>
      <div className="text-7xl font-black text-black leading-none">{value}</div>
      <div className="flex items-center justify-center space-x-2 w-full">
        {renderTrend()}
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold">{fiscalYearValue}</span>
          <span className="text-[8px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default AccidentCard;
