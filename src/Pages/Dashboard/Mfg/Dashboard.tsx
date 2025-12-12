import React from "react";
import { motion } from "framer-motion";
import NGByProduct from "./components/NGByProduct";
import LossTimeBreakdown from "./components/LossTimeBreakdown";
import PieChartCard from "./components/PieChartCard";
import ShiftComparisonCard from "./components/ShiftComparisonCard";
import MetricCard from "../../../Components/Cards/MetricCard";
import KaizenTable, { type KaizenData } from "./components/KaizenTable";
import KPSProgressCard from "./components/KPSProgressCard";
import {
  PIE_CHART_TYPES,
  SHIFT_COMPARISON_TYPES,
  KAIZEN_TABLE_TYPES,
  KPS_PROGRESS_TYPES,
} from "./config/componentTypes";

const DashboardMfg: React.FC = () => {
  // Dummy Kaizen Data
  const kaizenData: KaizenData[] = [
    {
      date: "17/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 2",
      category: "Loss",
      item: "BM",
      mc: "ICC 2 (2 BOX)",
      problemAnalysis:
        "NO Step 420 Model Kawasaki P/NO 6192, Action: Change VO",
      progress: "Open",
    },
    {
      date: "17/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 2",
      category: "Loss",
      item: "BM",
      mc: "ICC 2 (2 BOX)",
      problemAnalysis:
        "NO Step 420 Model Kawasaki P/NO 6192, Action: Change VO",
      progress: "Open",
    },
    {
      date: "17/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 2",
      category: "Loss",
      item: "BM",
      mc: "ICC 2 (2 BOX)",
      problemAnalysis:
        "NO Step 420 Model Kawasaki P/NO 6192, Action: Change VO",
      progress: "Open",
    },
    {
      date: "17/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 2",
      category: "Loss",
      item: "BM",
      mc: "ICC 2 (2 BOX)",
      problemAnalysis:
        "NO Step 420 Model Kawasaki P/NO 6192, Action: Change VO",
      progress: "Closed",
    },
    {
      date: "17/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 2",
      category: "Loss",
      item: "BM",
      mc: "ICC 2 (2 BOX)",
      problemAnalysis:
        "NO Step 420 Model Kawasaki P/NO 6192, Action: Change VO",
      progress: "Closed",
    },
    {
      date: "18/11/2025",
      shift: "Night",
      detail: "ECU 2W-ASSY 3",
      category: "Quality",
      item: "NG",
      mc: "ICC 3 (1 BOX)",
      problemAnalysis: "Defect found in assembly line, Action: Replace part",
      progress: "Open",
    },
    {
      date: "18/11/2025",
      shift: "Day",
      detail: "ECU 2W-ASSY 1",
      category: "Loss",
      item: "BM",
      mc: "ICC 1 (3 BOX)",
      problemAnalysis: "Machine breakdown, Action: Maintenance",
      progress: "Closed",
    },
  ];

  return (
    <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }} 
          className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden"
          >
          <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden p-2 pb-6">
      <div className="flex-1 grid grid-rows-[40fr_35fr_45fr] gap-2 min-h-0">
        {/* --- ROW 1 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          {/* Card 1: Operating Rate */}
          <div className="col-span-1 h-full min-h-0">
            <PieChartCard config={PIE_CHART_TYPES.OPERATING_RATE} value={82.7} />
          </div>

          {/* Card 2: Loss Time Breakdown - UBAH INI ❌→✅ */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 h-full overflow-hidden flex flex-col">
            <LossTimeBreakdown />
          </div>

          {/* Card 3: NG Ratio */}
          <div className="col-span-1 h-full min-h-0">
            <PieChartCard config={PIE_CHART_TYPES.NG_RATIO} value={2.54} />
          </div>

          {/* Card 4: NG By Product - UBAH INI ❌→✅ */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 h-full overflow-hidden flex flex-col">
            <NGByProduct />
          </div>
        </div>

        {/* --- ROW 2 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <ShiftComparisonCard
              config={SHIFT_COMPARISON_TYPES.PRODUCTION}
              total={4.134}
              dayShift={2.13}
              nightShift={2.004}
            />
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <ShiftComparisonCard
              config={SHIFT_COMPARISON_TYPES.MANPOWER}
              total={916}
              dayShift={516}
              nightShift={400}
            />
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <ShiftComparisonCard
              config={SHIFT_COMPARISON_TYPES.OVERTIME}
              total={4.29}
              dayShift={4.2}
              nightShift={4.4}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Loss Time (hr)"
              value={4}
              trend={{ type: "unstable", value: 1 }}
              fiscalYear={{ value: 3, label: "Yesterday" }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="NG Scrap Ratio"
              value={1.8}
              trend={{ type: "decrease", value: 0.2 }}
              fiscalYear={{ value: 2.0, label: "Yesterday" }}
              formatting={{ valueSize: 'large', suffix: '%' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="NG Rework Ratio"
              value={2.5}
              trend={{ type: "increase", value: 0.3 }}
              fiscalYear={{ value: 2.2, label: "Yesterday" }}
              formatting={{ valueSize: 'large', suffix: '%' }}
            />
          </div>
        </div>

        {/* --- ROW 3 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          {/* Kaizen Table 1 - UBAH INI ❌→✅ */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 h-full overflow-hidden flex flex-col">
            <KaizenTable
              config={KAIZEN_TABLE_TYPES.OR_ISSUE}
              data={kaizenData}
            />
          </div>
          <div className="col-span-1 h-full min-h-0">
            <KPSProgressCard
              config={KPS_PROGRESS_TYPES.OR_ISSUE}
              open={5}
              closed={15}
            />
          </div>
          {/* Kaizen Table 2 - UBAH INI ❌→✅ */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 h-full overflow-hidden flex flex-col">
            <KaizenTable
              config={KAIZEN_TABLE_TYPES.NG_LOSS_TIME}
              data={kaizenData}
            />
          </div>
          <div className="col-span-1 h-full min-h-0">
            <KPSProgressCard
              config={KPS_PROGRESS_TYPES.NG_ISSUE}
              open={5}
              closed={15}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export default DashboardMfg;
