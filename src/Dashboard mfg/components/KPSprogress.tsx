import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface KPSProgressProps {
  open: number;   // contoh: 5
  closed: number; // contoh: 15
}

const KPSProgress: React.FC<KPSProgressProps> = ({ open, closed }) => {
  const data = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [open, closed],
        backgroundColor: ["#E5007E", "#5B7BFF"], // pink & blue
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-full  flex flex-col items-center">
      
      {/* TITLE */}
      <h2 className="text-sm font-semibold mb-3 text-center">
        O/R Issue KPS Progress
      </h2>

      {/* DONUT CHART */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center py-1">
        <Doughnut data={data} options={options} />
      </div>

      {/* NUMBERS BELOW */}
      <div className="flex justify-center items-center gap-4 mt-1">

        {/* Open */}
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">{open}</p>
          <p className="text-xs text-blue-600">Open</p>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-gray-300"></div>

        {/* Closed */}
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600 loading-none">{closed}</p>
          <p className="text-xs text-blue-600">Closed</p>
        </div>

      </div>
    </div>
  );
};

export default KPSProgress;
