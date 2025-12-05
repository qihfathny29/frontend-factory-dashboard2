import React from "react";

interface Props {
  value: number;
}

const NearMissAccident: React.FC<Props> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-sm font-bold">Near Miss Accident</div>
      <div className="text-6xl font-black text-black leading-none">{value}</div>
      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="flex flex-col items-center">
          <button className="border border-green-500 rounded px-2 py-1 flex items-center space-x-1 bg-transparent">
            <div className="flex flex-col items-center leading-none">
                <span className="text-green-500 text-[10px] font-bold">▲</span>
                <span className="text-green-500 text-[10px] font-bold">▼</span>
            </div>
            <span className="text-green-500 text-xs font-bold">0</span>
          </button>
          <span className="text-[8px] text-green-500 mt-1">Stable vs.</span>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold">0</span>
          <span className="text-[8px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default NearMissAccident;
