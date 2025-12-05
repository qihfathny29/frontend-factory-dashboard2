import React from "react";

import OperatingRate from "./components/OperatingRate";


const DashboardMfg: React.FC = () => {
  
  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-2 pb-4 grid grid-rows-[35fr_25fr_45fr] gap-2 min-h-0">
        {/* Top Section - Row 1 */}
        <div className="grid grid-cols-4 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <OperatingRate value={82.7} />
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <h1>judul card</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>Judul card 3</h1>
          </div>
          <div className="col-span-2 h-full overflow-hidden">
            <h1>Judul card 4</h1>
          </div>
        </div>

        {/* Middle Section - Row 2 */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
        </div>

        {/* Bottom Section - Row 3 */}
        <div className="grid grid-cols-4 gap-2 min-h-0">
          <div className="col-span-3 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
          <div className="col-span-1 h-full overflow-hidden">
            <h1>judul</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMfg;
