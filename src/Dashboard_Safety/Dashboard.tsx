import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentTypeCard from "./components/AccidentTypePieChart";
import Calender from "./components/Calender";
import SeriousAccident from "./components/SeriousAccident";

const Dashboard: React.FC = () => {
  // Example problem dates - bisa diganti dengan data dari API
  const problemDates = ["2025-12-05", "2025-12-12", "2025-12-18", "2025-12-25"];

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

        {/* Middle Section - Row 2: 6 Cards Sejajar (Calendar + 5 Accident Cards) */}
        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Calendar Card - 1 kolom */}
            <div className="lg:col-span-1">
              <Calender problemDates={problemDates} />
            </div>

            {/* Serious Accident Card - 1 kolom */}
            <div className="lg:col-span-1">
              <SeriousAccident />
            </div>

            {/* Sisanya 4 card kosong dulu (placeholder) - masing-masing 1 kolom */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-3 h-full">
                <p className="text-center text-gray-400">Card 3</p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-3 h-full">
                <p className="text-center text-gray-400">Card 4</p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-3 h-full">
                <p className="text-center text-gray-400">Card 5</p>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-3 h-full">
                <p className="text-center text-gray-400">Card 6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
