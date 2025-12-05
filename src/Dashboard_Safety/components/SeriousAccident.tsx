import React from "react";

interface Props {
  value: number;
}

const SeriousAccident: React.FC<Props> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-sm font-bold">Accident</div>
      <div className="text-6xl font-black text-black leading-none">{value}</div>
      {/* Bagian bawah biarkan hardcode atau sesuaikan nanti */}
      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="flex flex-col items-center">
          <span className="text-red-500 text-xs font-bold border border-red-500 text-red-500 px-2 py-1 rounded bg-transparent">▲ 2</span>
          <span className="text-[8px] text-red-500">Increased vs.</span>
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

export default SeriousAccident;
