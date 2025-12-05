import React from "react";
import OperatingRate from "./components/OperatingRate";
import NGRation from "./components/NGRation";
import KPSProgress from "./components/KPSprogress";
import KPSProgressKedua from "./components/KPSProgressdua";

const DashboardMfg: React.FC = () => {
  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden p-2 pb-6">
      <div className="flex-1 grid grid-rows-[40fr_35fr_45fr] gap-2 min-h-0">
        {/* --- ROW 1 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          {/* Card 1: Operating Rate */}

          <div className="col-span-1 h-full min-h-0">
            <OperatingRate value={82.7} />
          </div>

          {/* Card 2: Placeholder (tetap pakai style card karena belum ada komponennya) */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <h1 className="font-bold text-center">
              Row 1 - Card 2<br />
              (2 Cols)
            </h1>
          </div>

          {/* Card 3: NG Ration */}

          <div className="col-span-1 h-full min-h-0">
            <NGRation value={2.54} />
          </div>

          {/* Card 4 */}
          <div className="col-span-2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <h1 className="font-bold text-center">
              Row 1 - Card 4<br />
              (2 Cols)
            </h1>
          </div>
        </div>

        {/* --- ROW 2 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C1</h1>
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C2</h1>
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C3</h1>
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C4</h1>
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C5</h1>
          </div>
          <div className="col-span-1 bg-white rounded-lg shadow p-2 flex items-center justify-center">
            <h1 className="font-bold text-sm">R2-C6</h1>
          </div>
        </div>

        {/* --- ROW 3 --- */}
        <div className="grid grid-cols-6 gap-2 min-h-0">
          <div className="col-span-2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <h1 className="font-bold text-center">Row 3 - Card 1</h1>
          </div>
          <div className="col-span-1 h-full min-h-0">
            <KPSProgress open={5} closed={15} />
          </div>
          <div className="col-span-2 bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <h1 className="font-bold text-center">Row 3 - Card 3</h1>
          </div>
          <div className="col-span-1 h-full min-h-0">
            <KPSProgressKedua open={5} closed={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMfg;
