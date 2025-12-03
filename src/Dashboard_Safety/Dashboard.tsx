import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentTypeCard from "./components/AccidentTypePieChart";
import Calender from "./components/Calender";
import SeriousAccident from "./components/SeriousAccident";
import SeriousAccidentSubcont from "./components/SeriousAccidentSubcont";
import Grade1Accident from "./components/Grade1Accident";
import FireAccident from "./components/FireAccident";
import TrafficAccident from "./components/TrafficAccident";
import AccidentList from "./components/AccidentList";
import SafetyPatrolList from "./components/SafetyPatrolList";
import SafetyPatrolChart from "./components/SafetyPatrolChart";

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
          <div className="lg:col-span-1">
              <SafetyPatrolChart />
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

            {/* Serious Accident Subcont - 1 kolom */}
            <div className="lg:col-span-1">
              <SeriousAccidentSubcont />
            </div>

            {/* Sisanya 3 card kosong dulu (placeholder) */}
            <div className="lg:col-span-1">
              <Grade1Accident />
            </div>

            <div className="lg:col-span-1">
              <FireAccident />
            </div>
            <div className="lg:col-span-1">
              <TrafficAccident />
            </div>
          </div>
        </div>

        {/* Bottom Section - Row 3: Accident List + Safety Patrol List + Summary Card */}
        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {/* Accident List - 3 kolom (persegi panjang) */}
            <div className="lg:col-span-3">
              <AccidentList />
            </div>

            {/* Safety Patrol List - 3 kolom (persegi panjang, sama dengan Accident List) */}
            <div className="lg:col-span-3">
              <SafetyPatrolList />
            </div>

            {/* Summary Card - 1 kolom (persegi) */}
            <div className="lg:col-span-1">
              <SafetyPatrol />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
