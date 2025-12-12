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
import { LegendItem } from "../../../../Components/Charts/ChartLegend";
import { 
  calculateAccumulationByPlant, 
  getVisibleDatasetsByPlant, 
  FISCAL_MONTHS,
  CHART_COLORS,
  type PlantSelection 
} from "../../../../Base/Utils/chartHelpers";
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
  const { title, thData, ptData, electData, targetData } = config;

  // Determine which datasets to show based on plant selection
  const { showTH, showPT, showElect } = getVisibleDatasetsByPlant(selectedPlant as PlantSelection);

  // Build visible datasets
  const getVisibleDatasets = () => {
    const datasets = [];
    
    if (showTH) {
      datasets.push({
        type: "bar" as const,
        label: "TH",
        data: thData,
        backgroundColor: CHART_COLORS.th,
        stack: "stack1",
        yAxisID: "y",
      });
    }
    
    if (showPT) {
      datasets.push({
        type: "bar" as const,
        label: "PT",
        data: ptData,
        backgroundColor: CHART_COLORS.pt,
        stack: "stack1",
        yAxisID: "y",
      });
    }
    
    if (showElect) {
      datasets.push({
        type: "bar" as const,
        label: "Elect.",
        data: electData,
        backgroundColor: CHART_COLORS.elect,
        stack: "stack1",
        yAxisID: "y",
      });
    }
    
    return datasets;
  };

  // Calculate accumulation based on plant selection using utility
  const accumulationData = calculateAccumulationByPlant(
    { th: thData, pt: ptData, elect: electData },
    selectedPlant as PlantSelection
  );

  const visibleDatasets = getVisibleDatasets();

  const chartData = {
    labels: [...FISCAL_MONTHS],
    datasets: [
      ...visibleDatasets,
      {
        type: "line" as const,
        label: "Target",
        data: targetData,
        borderColor: CHART_COLORS.target,
        backgroundColor: `${CHART_COLORS.target}1a`,
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: "y1",
      },
      {
        type: "line" as const,
        label: "Accumulation",
        data: accumulationData,
        borderColor: CHART_COLORS.accumulation,
        backgroundColor: `${CHART_COLORS.accumulation}1a`,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.accumulation,
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
        {showTH && <LegendItem color="#3b82f6" label="TH" />}
        {showPT && <LegendItem color="#22c55e" label="PT" />}
        {showElect && <LegendItem color="#a855f7" label="Elect." />}
        <LegendItem color="#ef4444" label="Target" type="line" />
        <LegendItem color="#3b82f6" label="Accumulation" type="line" />
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AccidentChart;
