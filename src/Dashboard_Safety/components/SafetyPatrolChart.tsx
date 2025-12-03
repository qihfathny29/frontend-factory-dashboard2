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

const SafetyPatrolChart: React.FC = () => {
  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];

  // DATA ASLI dari setiap kategori - dengan data yang bervariasi
  const thData = [2, 1, 2, 0, 1, 2, 1, 3, 1, 0, 2, 1];
  const ptData = [1, 2, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2];
  const electData = [1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1];

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
        data: actualData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        yAxisID: "y",
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
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-800">Safety Patrol</h2>
        <div className="flex items-center gap-1">
          <button className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition border border-black">
            <X size={10} className="text-white" />
          </button>
          <button className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition">
            <ChevronUp size={10} className="text-blue-700" />
          </button>
          <button className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition">
            <ChevronDown size={10} className="text-blue-700" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-1 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded"></div>
          <span className="font-medium">TH</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded"></div>
          <span className="font-medium">PT</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded"></div>
          <span className="font-medium">Elect.</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <div className="w-1.5 h-0.5 bg-red-500"></div>
            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            <div className="w-1.5 h-0.5 bg-red-500"></div>
          </div>
          <span className="font-medium">Target</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <div className="w-1.5 h-0.5 bg-blue-500"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-1.5 h-0.5 bg-blue-500"></div>
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

export default SafetyPatrolChart;
