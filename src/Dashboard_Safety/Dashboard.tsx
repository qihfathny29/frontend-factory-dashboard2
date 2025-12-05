import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import SafetyAccidentChart from "./components/SafetyAccidentChart";
import SafetyPatrol from "./components/SafetyPatrol";
import Calender from "./components/Calender";
import SeriousAccident from "./components/SeriousAccident";
import SeriousAccidentSubcont from "./components/SeriousAccidentSubcont";
import Smoke from "./components/Smoke";
import FireAccident from "./components/FireAccident";
import TrafficAccident from "./components/TrafficAccident";
import AccidentList from "./components/AccidentList";
import SafetyPatrolList from "./components/SafetyPatrolList";
import TrafficAccidentChart from "./components/TrafficAccidentChart";
import NearMissAccident from "./components/NearMissAcciden";
import Summary from "./components/Summary";
import FireAccidentChart from "./components/FireAccidentChart";

const Dashboard: React.FC = () => {
  const safetyData = [
    { id: "accident", label: "Accident", value: 0, color: "#6366f1" },
    { id: "subcount", label: "Accdident Subcont", value: 2, color: "#EC4899" },
    { id: "nearmiss", label: "Near Miss Accident", value: 3, color: "#A855F7" },
    { id: "smoke", label: "Smoke", value: 2, color: "#647488" },
    { id: "fire", label: "Fire Accident", value: 1, color: "#22C55E" },
    { id: "traffic", label: "Traffic Accident", value: 2, color: "#EAB308" },
  ];

  // LOGIKA BARU:
  const accidentCount = safetyData[0].value;
  let effectiveDate = new Date();

  if (accidentCount > 0) {
    // KASUS 1: Ada Accident Hari Ini -> 0 Days
    effectiveDate = new Date();
  } else {
    // KASUS 2: Tidak Ada Accident -> 1 Day (Mulai dari kemarin)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    effectiveDate = yesterday;
  }



  // DATA TANGGAL:
  // 1. Tanggal Merah (Accident)
  const accidentDates = ["2025-12-05"];

  // 2. Tanggal Kuning (Subcount, Near Miss, Smoke, Fire, Traffic)
  const warningDates = ["2025-12-12", "2025-12-18", "2025-12-25"];

  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-2 pb-4 grid grid-rows-[35fr_25fr_45fr_8fr] gap-2 min-h-0">
        {/* Top Section - Row 1 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <SafetyAccidentChart />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <FireAccidentChart />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <TrafficAccidentChart />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <PlantWorkedCard lastAccidentDate={effectiveDate} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <Calender
              accidentDates={accidentDates}
              warningDates={warningDates}
            />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccident value={safetyData[0].value} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <SeriousAccidentSubcont value={safetyData[1].value} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <NearMissAccident value={safetyData[2].value} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <Smoke value={safetyData[3].value} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <FireAccident value={safetyData[4].value} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <TrafficAccident value={safetyData[5].value} />
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
