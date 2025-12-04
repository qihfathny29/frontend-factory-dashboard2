import React from "react";

const Summary: React.FC = () => {
  return (
    <div className="h-full w-full bg-white rounded-lg shadow-md p-2 flex flex-col justify-center items-center text-center">
      <h3 className="text-sm font-bold text-gray-800 mb-1">Key Points</h3>
      <p className="text-xs text-gray-600 leading-tight">
        While Serious Accidents saw a light increase to 2 cases, the plant successfully reduced in both Fire and Traffic Categories compared to the previous year. All other Categories remain stable at zero.
      </p>
    </div>
  );
};

export default Summary;
