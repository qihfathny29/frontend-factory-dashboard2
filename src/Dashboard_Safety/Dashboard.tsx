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
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      {/* Main Content Area - Grid Layout for 3 Rows */}
      <div className="flex-1 p-2 pb-4 grid grid-rows-[35%_25%_40%] gap-2 min-h-0">
        {/* Top Section - Row 1 */}
        <div className="grid grid-cols-4 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <PlantWorkedCard />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SafetyAccidentChart />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <AccidentTypeCard />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SafetyPatrolChart />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <Calender problemDates={problemDates} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccidentSubcont />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <Grade1Accident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <FireAccident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <TrafficAccident />
          </div>
        </div>

        {/* Bottom Section - Row 3 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-3 h-full overflow-hidden">
            <AccidentList />
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <SafetyPatrolList />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SafetyPatrol />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
