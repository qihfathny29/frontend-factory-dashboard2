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
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full flex flex-col items-center">
      
      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-3 text-center">
        O/R Issue KPS Progress
      </h2>

      {/* DONUT CHART */}
      <div className="relative w-60 h-60">
        <Doughnut data={data} options={options} />
      </div>

      {/* NUMBERS BELOW */}
      <div className="flex justify-center items-center gap-10 mt-4">

        {/* Open */}
        <div className="text-center">
          <p className="text-xl font-bold text-blue-600">{open}</p>
          <p className="text-sm text-blue-600">Open</p>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-gray-400"></div>

        {/* Closed */}
        <div className="text-center">
          <p className="text-xl font-bold text-blue-600">{closed}</p>
          <p className="text-sm text-blue-600">Closed</p>
        </div>

      </div>
    </div>
  );
};

export default KPSProgress;
