import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RationProps {
  value: number; // contoh: 82.7
}

const NGRation: React.FC<RationProps> = ({ value }) => {
  const data = {
    labels: ["Operating", "Idle"],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#E3008C", "#637CEF"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%", // bikin donut chart
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        NG Ration
      </h2>

      <div className="relative w-48 h-48">
        <Pie data={data} options={options} />

        {/* TEXT DI TENGAH */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{value}%</span>
        </div>
      </div>
    </div>
  );
};

export default NGRation;
