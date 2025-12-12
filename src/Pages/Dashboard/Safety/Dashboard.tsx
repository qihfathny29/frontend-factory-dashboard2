import React from "react";
import { motion } from "framer-motion";
import PlantWorkedCard from "../../../Components/PlantWorkedCard";
import DashboardCalendar, { type CalendarEvent } from "../../../Components/Calendar/DashboardCalendar";
import MetricCard from "../../../Components/Cards/MetricCard";
import SafetyPatrol from "./components/SafetyPatrol";
import AccidentList from "./components/AccidentList";
import SafetyPatrolList from "./components/SafetyPatrolList";
import Summary from "./components/Summary";
import AccidentChart from "./components/AccidentChart";
import { ACCIDENT_TYPES, CHART_TYPES } from "./config/accidentTypes";

interface DashboardProps {
  selectedPlants: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedPlants }) => {
  const selectedPlant: 'all' | 'fajar' | 'bekasi' = 
    selectedPlants.includes('all') || selectedPlants.length === 0 
      ? 'all' 
      : selectedPlants.includes('fajar') 
        ? 'fajar' 
        : selectedPlants.includes('bekasi')
          ? 'bekasi'
          : 'all';
  const safetyData = [
    { id: "accident", label: "Accident", value: 1, color: "#6366f1" },
    { id: "subcount", label: "Accdident Subcont", value: 2, color: "#EC4899" },
    { id: "nearmiss", label: "Near Miss Accident", value: 3, color: "#A855F7" },
    { id: "smoke", label: "Smoke", value: 2, color: "#647488" },
    { id: "fire", label: "Fire Accident", value: 1, color: "#22C55E" },
    { id: "traffic", label: "Traffic Accident", value: 2, color: "#EAB308" },
  ];

  const accidentCount = safetyData[0].value;
  let effectiveDate = new Date();

  if (accidentCount > 0) {
    // KASUS 1: Ada Accident Hari Ini -> 0 Days
    effectiveDate = new Date();
  } else {
    // KASUS 2: Tidak Ada Accident -> 1 Day
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    effectiveDate = yesterday;
  }



  // DATA TANGGAL:
  // 1. Tanggal Merah (Accident)
  const accidentDates = ["2025-12-05"];

  // 2. Tanggal Kuning (Subcount, Near Miss, Smoke, Fire, Traffic)
  const warningDates = ["2025-12-08", "2025-12-10", "2025-12-12"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden"
    >
      <div className="flex-1 p-2 pb-4 grid grid-rows-[35fr_35fr_45fr_8fr] gap-2 min-h-0">
        {/* Top Section - Row 1 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <AccidentChart config={CHART_TYPES.SAFETY} selectedPlant={selectedPlant} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <AccidentChart config={CHART_TYPES.FIRE} selectedPlant={selectedPlant} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <AccidentChart config={CHART_TYPES.TRAFFIC} selectedPlant={selectedPlant} />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <PlantWorkedCard 
              lastAccidentDate={effectiveDate} 
              contextText="an Accident"
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <DashboardCalendar
              events={[
                ...accidentDates.map((date): CalendarEvent => ({ date, type: 'critical' })),
                ...warningDates.map((date): CalendarEvent => ({ date, type: 'warning' }))
              ]}
            />
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.ACCIDENT.title}
              value={safetyData[0].value}
              trend={{
                type: ACCIDENT_TYPES.ACCIDENT.trendType,
                value: ACCIDENT_TYPES.ACCIDENT.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.ACCIDENT.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.SUBCOUNT.title}
              value={safetyData[1].value}
              trend={{
                type: ACCIDENT_TYPES.SUBCOUNT.trendType,
                value: ACCIDENT_TYPES.SUBCOUNT.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.SUBCOUNT.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.NEAR_MISS.title}
              value={safetyData[2].value}
              trend={{
                type: ACCIDENT_TYPES.NEAR_MISS.trendType,
                value: ACCIDENT_TYPES.NEAR_MISS.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.NEAR_MISS.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.SMOKE.title}
              value={safetyData[3].value}
              trend={{
                type: ACCIDENT_TYPES.SMOKE.trendType,
                value: ACCIDENT_TYPES.SMOKE.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.SMOKE.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.FIRE.title}
              value={safetyData[4].value}
              trend={{
                type: ACCIDENT_TYPES.FIRE.trendType,
                value: ACCIDENT_TYPES.FIRE.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.FIRE.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title={ACCIDENT_TYPES.TRAFFIC.title}
              value={safetyData[5].value}
              trend={{
                type: ACCIDENT_TYPES.TRAFFIC.trendType,
                value: ACCIDENT_TYPES.TRAFFIC.trendValue
              }}
              fiscalYear={{ value: ACCIDENT_TYPES.TRAFFIC.fiscalYearValue }}
              formatting={{ valueSize: 'large' }}
            />
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
    </motion.div>
  );
};

export default Dashboard;
