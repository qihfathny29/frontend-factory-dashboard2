import React from "react";
import { motion } from "framer-motion";
import MetricCard from "../../../Components/Cards/MetricCard";
import DeliveryChart from "./components/DeliveryChart";
import DeliveryIssueList from "./components/DeliveryList";
import { InventoryPartsCard, InventoryFGCard } from "./components/DeliveryInventory";

const Dashboard: React.FC = () => {
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
        <div className="grid grid-cols-3 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden"> 
            <DeliveryChart
              title="Delv. Quality Issues"
              chartType="quality"
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden"> 
            <DeliveryChart
              title="OES Ontime Ratio"
              chartType="ontime"
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden"> 
            <DeliveryChart
              title="OEM Ontime Ratio"
              chartType="ontime"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Delay Delivery"
              value={12}
              trend={{ type: "unstable", value: 1 }}
              fiscalYear={{ value: 2 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="OES Delv. Quality Issues"
              value={8}
              trend={{ type: "stable", value: 2 }}
              fiscalYear={{ value: 1 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Yellow Lamp"
              value={15}
              trend={{ type: "stable", value: 0 }}
              fiscalYear={{ value: 3 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Red Lamp"
              value={5}
              trend={{ type: "unstable", value: 1 }}
              fiscalYear={{ value: 0 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <MetricCard
              title="Part/Box Shortage"
              value={0}
              trend={{ type: "stable", value: 1 }}
              fiscalYear={{ value: 2 }}
              formatting={{ valueSize: 'large' }}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-5 gap-2 min-h-0">
          <div className="col-span-3 h-full overflow-hidden">
            <DeliveryIssueList />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <InventoryPartsCard />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <InventoryFGCard />
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Dashboard;