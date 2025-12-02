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

// REGISTER Chart.js components (wajib!)
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
  // DATA DUMMY - Bulan dari Apr sampai Mar
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

  // DATA untuk chart
  const chartData = {
    labels: months,
    datasets: [
      // BAR 1: TH (Biru) - Stacked
      {
        type: "bar" as const,
        label: "TH",
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Cuma April ada 1
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Biru
        stack: "stack1", // Ditumpuk
        yAxisID: "y", // Pakai sumbu Y kiri
      },
      // BAR 2: PT (Hijau) - Stacked
      {
        type: "bar" as const,
        label: "PT",
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // April ada 1 (numpuk di atas TH)
        backgroundColor: "rgba(34, 197, 94, 0.8)", // Hijau
        stack: "stack1",
        yAxisID: "y",
      },
      // BAR 3: Elect. (Ungu) - Stacked
      {
        type: "bar" as const,
        label: "Elect.",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Kosong semua
        backgroundColor: "rgba(168, 85, 247, 0.8)", // Ungu
        stack: "stack1",
        yAxisID: "y",
      },
      // LINE 1: Target (Garis Merah)
      {
        type: "line" as const,
        label: "Target",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Flat 0
        borderColor: "rgb(239, 68, 68)", // Merah
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        pointRadius: 0, // Gak ada titik bulat
        yAxisID: "y1", // Pakai sumbu Y kanan
      },
      // LINE 2: Actual (Garis Biru)
      {
        type: "line" as const,
        label: "Actual",
        data: [1, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0], // 1 → 3 → 3 → 0
        borderColor: "rgb(59, 130, 246)", // Biru
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 4, // Ada titik bulat
        pointBackgroundColor: "rgb(59, 130, 246)",
        yAxisID: "y1",
      },
    ],
  };

  // OPTIONS untuk chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Legend dibuat manual di atas chart
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
      // SUMBU Y KIRI (untuk Bar Chart)
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
      // SUMBU Y KANAN (untuk Line Chart)
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
          drawOnChartArea: false, // Gak overlap sama grid kiri
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col max-w-xl w-full">
      {/* HEADER: Judul + Icon Buttons */}
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

      {/* LEGEND (Manual) */}
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

      {/* CHART */}
      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SafetyAccidentCard;
