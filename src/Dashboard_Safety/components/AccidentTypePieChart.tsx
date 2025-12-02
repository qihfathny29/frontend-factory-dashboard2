import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// DUMMY DATA - ini adalah data palsu untuk testing
const accidentData = [
  { name: "Serious Accident", value: 0 },
  { name: "Serious Accident Subcont", value: 32 },
  { name: "Grade 1 Accident", value: 28 },
  { name: "Fire Accident", value: 15 },
  { name: "Traffic Accident", value: 55 },  
];

// WARNA untuk pie chart
const COLORS = ["#5459AC", "#E83C91", "#73AF6F", "#9B5DE0", "#08CB00"];

const AccidentTypeCard: React.FC = () => {
  // Data untuk chart
  const chartData = {
    labels: accidentData.map(item => item.name),
    datasets: [
      {
        data: accidentData.map(item => item.value),
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
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      {/* HEADER - Judul card */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Accident Type</h2>

      {/* CONTAINER UTAMA - Flex row untuk layout kiri-kanan */}
      <div className="flex gap-8 justify-center items-center">
        
        {/* BAGIAN KIRI - PIE CHART */}
        <div className="flex-1 min-w-0 flex justify-center">
          <div style={{ height: "250px" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* BAGIAN KANAN - INFORMASI DETAIL */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          {/* MAP = looping data accident untuk membuat setiap row info */}
          {accidentData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* KOTAK WARNA - warna persegi kecil sesuai pie chart */}
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              
              {/* TEXT INFORMASI */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
              </div>
              
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccidentTypeCard;