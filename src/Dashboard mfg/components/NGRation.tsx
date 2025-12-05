import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RationProps {
  value: number;
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
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false, // PENTING
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2 whitespace-nowrap">
        NG Ratio
      </h2>

      {/* Responsive Container */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl font-bold">{value}%</span>
        </div>
      </div>
    </div>
  );
};

export default NGRation;
