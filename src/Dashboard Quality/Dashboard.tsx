import React from "react";
import PlantWorkedCard from "./components/PlantWorkedCard";
import ClaimChart from "./components/ClaimChart";
import WarrantyClaim from "./components/WarrantyClaim";
import ClaimCard from "./components/ClaimCard";
import ClaimList from "./components/ClaimList";
import CriticalList from "./components/CriticalList";
import Calender from "./components/Calender";

interface DashboardProps {
  selectedPlants: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedPlants }) => {
  // Effective date untuk PlantWorkedCard (default: kemarin)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const effectiveDate = yesterday;

  // Data tanggal claim (dummy)
  const claimDates = ["2025-12-01", "2025-12-02"];

  // Data dummy untuk 3 ClaimChart
  const claimChartData = {
    chart1: {
      th: [1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2],
      pt: [1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 2, 1],
      elect: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    chart2: {
      th: [2, 1, 0, 1, 2, 1, 0, 2, 1, 0, 1, 1],
      pt: [0, 1, 2, 0, 1, 1, 2, 0, 1, 1, 0, 2],
      elect: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
      target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    chart3: {
      th: [0, 1, 2, 1, 0, 1, 1, 1, 2, 0, 1, 2],
      pt: [2, 1, 0, 1, 1, 0, 2, 1, 0, 2, 1, 0],
      elect: [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
      target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  };

  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-2 pb-4 grid grid-rows-[30fr_30fr_40fr] gap-2 min-h-0">
        
        {/* Row 1 */}
        <div className="grid grid-cols-13 gap-2 min-h-0">
          <div className="col-span-3 h-full overflow-hidden">
            <ClaimChart
              selectedPlants={selectedPlants}
              title="0KM Claim"
              dataOverride={claimChartData.chart1}
            />
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <ClaimChart
              selectedPlants={selectedPlants}
              title="Critical & Near-Miss"
              dataOverride={claimChartData.chart2}
            />
          </div>
          <div className="col-span-3 h-full overflow-hidden"> 
            <ClaimChart
              selectedPlants={selectedPlants}
              title="Warranty Claim"
              dataOverride={claimChartData.chart3}
            />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <PlantWorkedCard lastAccidentDate={effectiveDate} />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <Calender claimDates={claimDates} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <ClaimCard 
              title="0KM Claim (Official Count)" 
              value={0} 
              changeValue={2} 
              changeType="increase" 
              fiscalYearValue={0} 
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <ClaimCard 
              title="0KM Claim (No Count)" 
              value={5} 
              changeValue={1} 
              changeType="decrease" 
              fiscalYearValue={3} 
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <ClaimCard 
              title="Critical Quality" 
              value={12} 
              changeValue={4} 
              changeType="increase" 
              fiscalYearValue={8} 
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <ClaimCard 
              title="Near-Miss Problem" 
              value={7} 
              changeValue={3} 
              changeType="decrease" 
              fiscalYearValue={10} 
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <ClaimCard 
              title="Quality Cost Lost" 
              value={150000000} 
              changeValue={5} 
              changeType="increase" 
              fiscalYearValue={120000000}
              isCurrency={true}
              previousValue={145000000}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <WarrantyClaim />
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <ClaimList />
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <CriticalList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;