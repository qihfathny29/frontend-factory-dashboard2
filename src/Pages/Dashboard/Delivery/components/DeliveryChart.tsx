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
import { ChevronUp, ChevronDown } from "lucide-react";
import AchievedIcon from "./../../../../Assets/Achieved.png";
import NotAchievedIcon from "./../../../../Assets/Notachieved.png";

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

const MONTHS = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
];

const CHART_CONFIG = {
  colors: {
    primary: "#A02B93",
    target: "rgb(239, 68, 68)",
    accumulation: "rgb(59, 130, 246)"
  }
} as const;

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

interface LegendItemProps {
  color: string;
  label: string;
  type?: "bar" | "line";
}

interface HeaderControlsProps {
  isAchieved: boolean;
}

interface IconProps {
  color: string;
}

const LineIcon: React.FC<IconProps> = ({ color }) => (
  <div className="flex items-center">
    <div className="w-1.5 h-0.5" style={{ backgroundColor: color }} />
    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <div className="w-1.5 h-0.5" style={{ backgroundColor: color }} />
  </div>
);

const BarIcon: React.FC<IconProps> = ({ color }) => (
  <div className="w-2 h-2 rounded" style={{ backgroundColor: color }} />
);

const LegendItem: React.FC<LegendItemProps> = ({ color, label, type = "bar" }) => {
  return (
    <div className="flex items-center gap-1">
      {type === "line" ? (
        <LineIcon color={color} />
      ) : (
        <BarIcon color={color} />
      )}
      <span className="font-medium">{label}</span>
    </div>
  );
};

const HeaderControls: React.FC<HeaderControlsProps> = ({ isAchieved }) => (
  <div className="flex items-center gap-1">
    <img
      src={isAchieved ? AchievedIcon : NotAchievedIcon}
      alt={isAchieved ? "Achieved" : "Not Achieved"}
      className="w-4 h-4 rounded-full border border-black"
    />
    <button
      className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition"
      aria-label="Expand chart"
    >
      <ChevronUp size={10} className="text-blue-700" />
    </button>
    <button
      className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition"
      aria-label="Collapse chart"
    >
      <ChevronDown size={10} className="text-blue-700" />
    </button>
  </div>
);

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

  // Calculate accumulation for quality chart
  const accumulatedData = useMemo(() => {
    if (isOntimeChart) return [];
    
    const result: number[] = [];
    let runningTotal = 0;

    data.forEach((value) => {
      runningTotal += value;
      result.push(runningTotal);
    });

    return result;
  }, [data, isOntimeChart]);

  // Check if achieved
  const isAchieved = useMemo(() => {
    if (isOntimeChart) {
      // For ontime ratio, check if average meets or exceeds average target
      const avgData = data.reduce((sum, val) => sum + val, 0) / data.length;
      const avgTarget = target.reduce((sum, val) => sum + val, 0) / target.length;
      return avgData >= avgTarget;
    } else {
      // For quality issues, check if total is at or below target
      const totalData = data.reduce((sum, val) => sum + val, 0);
      const totalTarget = target.reduce((sum, val) => sum + val, 0);
      return totalData <= totalTarget;
    }
  }, [data, target, isOntimeChart]);

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
      // Quality Issues Chart - both Y-axes
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

    // Main data (bar)
    datasets.push({
      type: "bar" as const,
      label: title,
      data: [...data],
      backgroundColor: CHART_CONFIG.colors.primary,
      yAxisID: "y"
    });

    // Target line
    datasets.push({
      type: "line" as const,
      label: "Target",
      data: [...target],
      borderColor: CHART_CONFIG.colors.target,
      backgroundColor: `${CHART_CONFIG.colors.target}1a`,
      borderWidth: 2,
      pointRadius: 0,
      yAxisID: isOntimeChart ? "y" : "y1"
    });

    // Accumulation line (only for quality chart)
    if (!isOntimeChart) {
      datasets.push({
        type: "line" as const,
        label: "Accumulation",
        data: accumulatedData,
        borderColor: CHART_CONFIG.colors.accumulation,
        backgroundColor: `${CHART_CONFIG.colors.accumulation}1a`,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: CHART_CONFIG.colors.accumulation,
        yAxisID: "y1"
      });
    }

    return {
      labels: [...MONTHS],
      datasets
    };
  }, [title, data, target, accumulatedData, isOntimeChart]);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        <HeaderControls isAchieved={isAchieved} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-1 text-[10px]">
        <LegendItem color={CHART_CONFIG.colors.primary} label={title} />
        <LegendItem color={CHART_CONFIG.colors.target} label="Target" type="line" />
        {!isOntimeChart && (
          <LegendItem color={CHART_CONFIG.colors.accumulation} label="Accumulation" type="line" />
        )}
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DeliveryChart;