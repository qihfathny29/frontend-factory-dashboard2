import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentTypeCard from "./components/AccidentTypePieChart";
import Calender from "./components/Calender";
import SeriousAccident from "./components/SeriousAccident";
import SeriousAccidentSubcont from "./components/SeriousAccidentSubcont";
import Smoke from "./components/Smoke";
import FireAccident from "./components/FireAccident";
import TrafficAccident from "./components/TrafficAccident";
import AccidentList from "./components/AccidentList";
import SafetyPatrolList from "./components/SafetyPatrolList";
import SafetyPatrolChart from "./components/SafetyPatrolChart";
import NearMissAccident from "./components/NearMissAcciden";
import Summary from "./components/Summary";

const Dashboard: React.FC = () => {
  // Example problem dates - bisa diganti dengan data dari API
  const problemDates = ["2025-12-05", "2025-12-12", "2025-12-18", "2025-12-25"];

  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-2 pb-4 grid grid-rows-[22fr_30fr_40fr_8fr] gap-2 min-h-0">
        {/* Top Section - Row 1 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <PlantWorkedCard />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccidentSubcont />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <NearMissAccident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <Smoke />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <FireAccident />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <TrafficAccident />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <Calender problemDates={problemDates} />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <SafetyAccidentChart />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <AccidentTypeCard />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <SafetyPatrolChart />
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

        {/* Footer Section - Row 4 */}
        <div className="grid grid-cols-1 min-h-0">
          <div className="h-full overflow-hidden">
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
