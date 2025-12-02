import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentTypeCard from "./components/AccidentTypePieChart";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EEE9E5]">
      {/* Main Content Area */}
      <div className="p-6">
        {/* Top Section - Row 1: Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* PlantWorkedCard - 1 kolom */}
          <div className="lg:col-span-1">
            <PlantWorkedCard />
          </div>

          {/* SafetyAccidentChart - 2 kolom */}
          <div className="lg:col-span-2">
            <SafetyAccidentChart />
          </div>

          {/* AccidentTypeCard - 2 kolom */}
          <div className="lg:col-span-2">
            <AccidentTypeCard />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="mb-6">
          {/* Nanti tambah calendar dan accident cards */}
        </div>

        {/* Bottom Section - Row 3 */}
        <div className="mb-6">
          <SafetyPatrol />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;