import React from "react";

interface Props {
  value: number;
}

const TrafficAccident: React.FC<Props> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-xs font-bold">Traffic Accident</div>
      <div className="text-4xl font-black text-black leading-none">{value}</div>
      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-xs font-bold">▼ 1</span>
          <span className="text-[8px] text-green-500">Decreased vs.</span>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold">3</span>
          <span className="text-[8px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficAccident;
