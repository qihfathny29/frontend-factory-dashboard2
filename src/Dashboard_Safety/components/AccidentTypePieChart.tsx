import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// DUMMY DATA - ini adalah data palsu untuk testing
const accidentData = [
  { name: "Accident", value: 0 },
  { name: "Accident Subcont", value: 32 },
  { name: "Near Miss Accident", value: 8 },
  { name: "Smoke", value:12 },
  { name: "Fire Accident", value: 15 },
  { name: "Traffic Accident", value: 55 },
];

// WARNA untuk pie chart
const COLORS = ["#5459AC", "#E83C91", "#9B5DE0","#f30000ff", "#08CB00", "#FFA500" ];

const AccidentTypeCard: React.FC = () => {
  // Data untuk chart
  const chartData = {
    labels: accidentData.map((item) => item.name),
    datasets: [
      {
        data: accidentData.map((item) => item.value),
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Options untuk chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Matikan legend bawaan chart
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      {/* HEADER - Judul card */}
      <h2 className="text-base font-bold text-gray-800 mb-2 text-center">
        Accident Type
      </h2>

      {/* CONTAINER UTAMA - Flex row untuk layout kiri-kanan */}
      <div className="flex gap-2 items-center justify-center flex-1 min-h-0 overflow-hidden">
        {/* BAGIAN KIRI - PIE CHART */}
        <div className="flex-1 h-full min-w-0 min-h-0 relative flex items-center justify-center">
          <div className="h-full w-full relative">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* BAGIAN KANAN - INFORMASI DETAIL */}
        <div className="flex flex-col justify-center gap-1 text-xs flex-shrink-0">
          {/* MAP = looping data accident untuk membuat setiap row info */}
          {accidentData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* KOTAK WARNA - warna persegi kecil sesuai pie chart */}
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              ></div>

              {/* TEXT INFORMASI */}
              <p className="font-medium text-gray-700 whitespace-nowrap">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccidentTypeCard;
