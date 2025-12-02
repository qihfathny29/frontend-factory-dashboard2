import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentTypeCard from "./components/AccidentTypePieChart";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EEE9E5]">
      {/* Main Content Area */}
      <div className="px-6 pt-1 pb-6">
        {/* Top Section - Row 1: 4 Card Sejajar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* PlantWorkedCard - 1 kolom */}
          <div className="lg:col-span-1 max-h-[350px]">
            <PlantWorkedCard />
          </div>

          {/* SafetyAccidentChart - 1 kolom */}
          <div className="lg:col-span-1 max-h-[350px]">
            <SafetyAccidentChart />
          </div>

          {/* AccidentTypeCard - 1 kolom */}
          <div className="lg:col-span-1 max-h-[350px]">
            <AccidentTypeCard />
          </div>

          {/* SafetyPatrol - 1 kolom */}
          <div className="lg:col-span-1 max-h-[350px]">
            <SafetyPatrol />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="mb-6">
          {/* Nanti tambah calendar dan accident cards */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;