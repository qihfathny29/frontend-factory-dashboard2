import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { X, ChevronUp, ChevronDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SafetyAccidentCard: React.FC = () => {
  const months = [
    "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
    "Oct", "Nov", "Dec", "Jan", "Feb", "Mar",
  ];

  // DATA ASLI dari setiap kategori
  const thData = [1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2];
  const ptData = [1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 2, 1];
  const electData = [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0];

  // HITUNG ACTUAL otomatis (jumlah PT + TH + ELECT per bulan)
  const actualData = months.map((_, index) => {
    return ptData[index] + thData[index] + electData[index];
  });

  // Target masih dummy dulu
  const targetData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const chartData = {
    labels: months,
    datasets: [
      {
        type: "bar" as const,
        label: "TH",
        data: thData,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        stack: "stack1",
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "PT",
        data: ptData,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        stack: "stack1",
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "Elect.",
        data: electData,
        backgroundColor: "rgba(168, 85, 247, 0.8)",
        stack: "stack1",
        yAxisID: "y",
      },
      {
        type: "line" as const,
        label: "Target",
        data: targetData,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: "y1",
      },
      {
        type: "line" as const,
        label: "Actual",
        data: actualData, // Sekarang otomatis dihitung!
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        yAxisID: "y", // Pakai sumbu kiri yang sama dengan bar!
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        beginAtZero: true,
        max: 6,
        title: {
          display: true,
          text: "Months",
        },
        ticks: {
          stepSize: 1,
        },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        beginAtZero: true,
        max: 120,
        title: {
          display: true,
          text: "Case accum",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-800">Safety Accident</h2>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition border-2 border-black">
            <X size={14} className="text-white" />
          </button>
          <button className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition">
            <ChevronUp size={14} className="text-blue-700" />
          </button>
          <button className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition">
            <ChevronDown size={14} className="text-blue-700" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="font-medium">TH</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="font-medium">PT</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="font-medium">Elect.</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <div className="w-2 h-0.5 bg-red-500"></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div className="w-2 h-0.5 bg-red-500"></div>
          </div>
          <span className="font-medium">Target</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <div className="w-2 h-0.5 bg-blue-500"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-0.5 bg-blue-500"></div>
          </div>
          <span className="font-medium">Actual</span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SafetyAccidentCard;