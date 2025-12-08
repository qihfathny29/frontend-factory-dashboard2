import React from "react";
import DeliveryChart from "./components/DeliveryChart";
import DeliveryCard from "./components/DeliveryCard";
import DeliveryIssueList from "./components/DeliveryList";
import { InventoryPartsCard, InventoryFGCard } from "./components/DeliveryInventory";

const Dashboard: React.FC = () => {
  return (
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
            <DeliveryCard
              key="delay-delivery"
              title="Delay Delivery"
              value={12}
              changeValue={1}
              changeType="unstable"
              fiscalYearValue={2}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <DeliveryCard
              key="oes-quality"
              title="OES Delv. Quality Issues"
              value={8}
              changeValue={2}
              changeType="stable"
              fiscalYearValue={1}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <DeliveryCard
              key="yellow-lamp"
              title="Yellow Lamp"
              value={15}
              changeValue={0}
              changeType="stable"
              fiscalYearValue={3}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <DeliveryCard
              key="red-lamp"
              title="Red Lamp"
              value={5}
              changeValue={1}
              changeType="unstable"
              fiscalYearValue={0}
            />
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <DeliveryCard
              key="part-shortage"
              title="Part/Box Shortage"
              value={0}
              changeValue={1}
              changeType="stable"
              fiscalYearValue={2}
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
  );
};

export default Dashboard;