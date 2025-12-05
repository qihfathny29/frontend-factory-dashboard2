import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OperatingRateProps {
  value: number;
}

const OperatingRate: React.FC<OperatingRateProps> = ({ value }) => {
  const data = {
    labels: ["Operating", "Idle"],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#637CEF", "#E3008C"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false, // PENTING: Agar chart menyesuaikan kotak, bukan sebaliknya
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2 whitespace-nowrap">
        Operating Rate
      </h2>

      {/* Ganti w-48 h-48 menjadi flex-1 w-full min-h-0 agar responsive */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl font-bold">{value}%</span>
        </div>
      </div>
    </div>
  );
};

export default OperatingRate;
