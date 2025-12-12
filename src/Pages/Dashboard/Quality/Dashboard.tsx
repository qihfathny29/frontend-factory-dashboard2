import React from "react";
import { motion } from "framer-motion";
import PlantWorkedCard from "../../../Components/PlantWorkedCard";
import DashboardCalendar, { type CalendarEvent } from "../../../Components/Calendar/DashboardCalendar";
import MetricCard from "../../../Components/Cards/MetricCard";
import ClaimChart from "./components/ClaimChart";
import WarrantyClaim from "./components/WarrantyClaim";
import ClaimList from "./components/ClaimList";
import CriticalList from "./components/CriticalList";

interface DashboardProps {
  selectedPlants: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedPlants }) => {
  // Effective date untuk PlantWorkedCard (default: kemarin)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const effectiveDate = yesterday;

  // Data tanggal claim
  const claimDates = ["2025-12-01", "2025-12-05", "2025-12-10"];

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
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden"
      >

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
            <PlantWorkedCard 
              lastAccidentDate={effectiveDate} 
              contextText="an 0KM Claim"
            />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <DashboardCalendar
              events={claimDates.map((date): CalendarEvent => ({ date, type: 'critical' }))}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="0KM Claim (Official Count)"
              value={0}
              trend={{ type: "increase", value: 2 }}
              fiscalYear={{ value: 0 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="0KM Claim (No Count)"
              value={5}
              trend={{ type: "decrease", value: 1 }}
              fiscalYear={{ value: 3 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Critical Quality"
              value={12}
              trend={{ type: "increase", value: 4 }}
              fiscalYear={{ value: 8 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Near-Miss Problem"
              value={7}
              trend={{ type: "decrease", value: 3 }}
              fiscalYear={{ value: 10 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Quality Cost Lost"
              value={150000000}
              trend={{ type: "increase", value: 5 }}
              fiscalYear={{ value: 120000000 }}
              formatting={{ 
                isCurrency: true, 
                valueSize: 'small',
                showPercentage: true,
                previousValue: 145000000
              }}
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
    </motion.div>
  );
};

export default Dashboard;