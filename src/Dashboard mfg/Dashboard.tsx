import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EEE9E5]">
      {/* Main Content Area */}
      <div className="p-6">
        {/* Placeholder for Quality Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#1864ab] mb-4">
            MFG Dashboard
          </h1>
          <p className="text-gray-600">
            MFG dashboard content will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
