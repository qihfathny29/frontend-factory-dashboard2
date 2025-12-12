import React, { useMemo } from "react";
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
  type ChartData,
} from "chart.js";
import { LegendItem } from "../../../../Components/Charts/ChartLegend";
import { ChartHeaderControls } from "../../../../Components/Charts/ChartHeader";
import { 
  calculateAccumulation,
  isQualityTargetAchieved,
  isOntimeTargetAchieved,
  FISCAL_MONTHS,
  CHART_COLORS
} from "../../../../Base/Utils/chartHelpers";

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

interface DeliveryChartProps {
  title: string;
  chartType: "quality" | "ontime";
  data?: number[];
  target?: number[];
}

// Dummy data for charts
const DUMMY_DATA = {
  "Delv. Quality Issues": {
    data: [1, 2, 1, 0, 1, 2, 1, 0, 1, 0, 0, 0],
    target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  "OES Ontime Ratio": {
    data: [100, 101, 102, 98, 104, 88, 105, 99, 103, 93, 106, 101],
    target: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  },
  "OEM Ontime Ratio": {
    data: [55, 91, 73, 98, 64, 88, 79, 99, 58, 93, 67, 95],
    target: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  }
} as const;


const DeliveryChart: React.FC<DeliveryChartProps> = ({ 
  title, 
  chartType,
  data: propData,
  target: propTarget
}) => {
  const isOntimeChart = chartType === "ontime";
  
  // Use prop data or fallback to dummy data
  const data = useMemo(() => {
    const dummyChartData = DUMMY_DATA[title as keyof typeof DUMMY_DATA];
    return propData || dummyChartData?.data || [];
  }, [propData, title]);

  const target = useMemo(() => {
    const dummyChartData = DUMMY_DATA[title as keyof typeof DUMMY_DATA];
    return propTarget || dummyChartData?.target || [];
  }, [propTarget, title]);

  // Calculate accumulation for quality chart using utility
  const accumulatedData = useMemo(() => {
    if (isOntimeChart) return [];
    return calculateAccumulation(data);
  }, [data, isOntimeChart]);

  // Check if achieved using utility functions
  const isAchieved = useMemo(() => {
    if (isOntimeChart) {
      return isOntimeTargetAchieved(data, target);
    } else {
      return isQualityTargetAchieved(accumulatedData, target);
    }
  }, [data, target, isOntimeChart, accumulatedData]);

  // Chart options
  const chartOptions = useMemo(() => {
    if (isOntimeChart) {
      // Ontime Ratio Chart
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index" as const,
            intersect: false,
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (context: any) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y + '%';
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            type: "linear" as const,
            position: "left" as const,
            beginAtZero: true,
            max: 120,
            title: {
              display: true,
              text: "Percentage (%)"
            },
            ticks: {
              stepSize: 20,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              callback: (value: any) => value + '%'
            }
          }
        }
      };
    } else {
      // Quality Issues Chart
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index" as const,
            intersect: false
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            type: "linear" as const,
            position: "left" as const,
            beginAtZero: true,
            max: 6,
            title: {
              display: true,
              text: "Issues"
            },
            ticks: {
              stepSize: 1
            }
          },
          y1: {
            type: "linear" as const,
            position: "right" as const,
            beginAtZero: true,
            max: 120,
            title: {
              display: true,
              text: "Accumulation"
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      };
    }
  }, [isOntimeChart]);

  // Chart data
  const chartData: ChartData<"line" | "bar", number[], string> = useMemo(() => {
    const datasets = [];

    // Main data
    datasets.push({
      type: "bar" as const,
      label: title,
      data: [...data],
      backgroundColor: CHART_COLORS.primary,
      yAxisID: "y"
    });

    // Target line
    datasets.push({
      type: "line" as const,
      label: "Target",
      data: [...target],
      borderColor: CHART_COLORS.target,
      backgroundColor: `${CHART_COLORS.target}1a`,
      borderWidth: 2,
      pointRadius: 0,
      yAxisID: isOntimeChart ? "y" : "y1"
    });

    // Accumulation line
    if (!isOntimeChart) {
      datasets.push({
        type: "line" as const,
        label: "Accumulation",
        data: accumulatedData,
        borderColor: CHART_COLORS.accumulation,
        backgroundColor: `${CHART_COLORS.accumulation}1a`,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.accumulation,
        yAxisID: "y1"
      });
    }

    return {
      labels: [...FISCAL_MONTHS],
      datasets
    };
  }, [title, data, target, accumulatedData, isOntimeChart]);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        <ChartHeaderControls isAchieved={isAchieved} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-1 text-[10px]">
        <LegendItem color={CHART_COLORS.primary} label={title} />
        <LegendItem color={CHART_COLORS.target} label="Target" type="line" />
        {!isOntimeChart && (
          <LegendItem color={CHART_COLORS.accumulation} label="Accumulation" type="line" />
        )}
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DeliveryChart;