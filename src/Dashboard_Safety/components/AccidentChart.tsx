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
import type { ChartConfig } from "../config/accidentTypes";

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

interface AccidentChartProps {
  config: ChartConfig;
  selectedPlant: 'all' | 'fajar' | 'bekasi';
}

const AccidentChart: React.FC<AccidentChartProps> = ({ config, selectedPlant }) => {
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

  const { title, thData, ptData, electData, targetData } = config;

  // Filter datasets based on selected plant
  const getVisibleDatasets = () => {
    if (selectedPlant === 'bekasi') {
      // Bekasi Plant = TH only
      return [
        {
          type: "bar" as const,
          label: "TH",
          data: thData,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          stack: "stack1",
          yAxisID: "y",
        }
      ];
    } else if (selectedPlant === 'fajar') {
      // Fajar Plant = PT + Elect only
      return [
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
        }
      ];
    } else {
      // All Plants = TH + PT + Elect
      return [
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
        }
      ];
    }
  };

  // HITUNG ACCUMULATION (kumulatif naik terus, tidak boleh turun) based on filtered data
  const accumulationData: number[] = [];
  months.forEach((_, index) => {
    let currentMonthTotal = 0;
    
    // Calculate total based on selected plant
    if (selectedPlant === 'bekasi') {
      currentMonthTotal = thData[index];
    } else if (selectedPlant === 'fajar') {
      currentMonthTotal = ptData[index] + electData[index];
    } else {
      currentMonthTotal = ptData[index] + thData[index] + electData[index];
    }
    
    // Accumulation = total bulan sebelumnya + total bulan ini
    if (index === 0) {
      accumulationData.push(currentMonthTotal); // Bulan pertama
    } else {
      accumulationData.push(accumulationData[index - 1] + currentMonthTotal); // Kumulatif
    }
  });

  const visibleDatasets = getVisibleDatasets();

  const chartData = {
    labels: months,
    datasets: [
      ...visibleDatasets,
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
        label: "Accumulation",
        data: accumulationData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        yAxisID: "y1",
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
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-1">
          <button className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition border border-black">
            <X size={10} className="text-black" />
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
        {/* Show TH only for All or Bekasi */}
        {(selectedPlant === 'all' || selectedPlant === 'bekasi') && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded"></div>
            <span className="font-medium">TH</span>
          </div>
        )}
        
        {/* Show PT only for All or Fajar */}
        {(selectedPlant === 'all' || selectedPlant === 'fajar') && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded"></div>
            <span className="font-medium">PT</span>
          </div>
        )}
        
        {/* Show Elect only for All or Fajar */}
        {(selectedPlant === 'all' || selectedPlant === 'fajar') && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded"></div>
            <span className="font-medium">Elect.</span>
          </div>
        )}
        
        {/* Target & Accumulation always visible */}
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
          <span className="font-medium">Accumulation</span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AccidentChart;
