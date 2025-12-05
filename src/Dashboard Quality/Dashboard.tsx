import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import ClaimChart from "./components/ClaimChart";
import WarrantyClaim from "./components/WarrantyClaim";
import ClaimCard from "./components/ClaimCard";
import ClaimList from "./components/ClaimList";
// Calender nanti dulu
// import Calender from "./components/Calender";

const Dashboard: React.FC = () => {
  const safetyData = [
    { id: "accident", label: "Accident", value: 0, color: "#6366f1" },
    { id: "subcount", label: "Accdident Subcont", value: 2, color: "#EC4899" },
    { id: "nearmiss", label: "Near Miss Accident", value: 3, color: "#A855F7" },
    { id: "smoke", label: "Smoke", value: 2, color: "#647488" },
    { id: "fire", label: "Fire Accident", value: 1, color: "#22C55E" },
    { id: "traffic", label: "Traffic Accident", value: 2, color: "#EAB308" },
  ];

  const accidentCount = safetyData[0].value;
  let effectiveDate = new Date();

  if (accidentCount > 0) {
    effectiveDate = new Date();
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    effectiveDate = yesterday;
  }

  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-2 pb-4 grid grid-rows-[22fr_22fr_40fr_8fr] gap-2 min-h-0">
        
        {/* Row 1 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-2 h-full overflow-hidden">
            <ClaimChart />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <PlantWorkedCard lastAccidentDate={effectiveDate} />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            {/* Empty on purpose – keeps the grid structure */}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
            <div className="w-full h-full flex items-center justify-center">
              <ClaimCard value={safetyData[0].value} />
            </div>
          <div className="col-span-4 h-full overflow-hidden">
            {/* Spacer – keeps proportions */}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-3 h-full overflow-hidden">
            <ClaimList />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <WarrantyClaim />
          </div>
        </div>

        {/* Row 4 – kept for original grid structure (empty) */}
        <div className="grid grid-cols-7 gap-2 min-h-0"></div>
      </div>
    </div>
  );
};

export default Dashboard;