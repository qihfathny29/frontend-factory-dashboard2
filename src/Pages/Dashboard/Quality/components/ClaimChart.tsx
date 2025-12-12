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

const INITIAL_DATA = {
  th: [1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2],
  pt: [1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 2, 1],
  elect: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
} as const;

const CHART_CONFIG = {
  colors: {
    th: "rgba(59, 130, 246, 0.8)",
    pt: "rgba(34, 197, 94, 0.8)",
    elect: "rgba(168, 85, 247, 0.8)",
    target: "rgb(239, 68, 68)",
    accumulation: "rgb(59, 130, 246)"
  },
  scales: {
    y: { max: 6, title: "Months" },
    y1: { max: 120, title: "Case accum" }
  }
} as const;

const CHART_OPTIONS = {
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
      max: CHART_CONFIG.scales.y.max,
      title: {
        display: true,
        text: CHART_CONFIG.scales.y.title
      },
      ticks: {
        stepSize: 1
      }
    },
    y1: {
      type: "linear" as const,
      position: "right" as const,
      beginAtZero: true,
      max: CHART_CONFIG.scales.y1.max,
      title: {
        display: true,
        text: CHART_CONFIG.scales.y1.title
      },
      grid: {
        drawOnChartArea: false
      }
    }
  }
} as const;

interface ClaimChartProps {
  selectedPlants: string[];
  title: string;
  dataOverride?: {
    th: number[];
    pt: number[];
    elect: number[];
    target: number[];
  };
}

interface DatasetConfig {
  id: string;
  label: string;
  data: number[];
  color: string;
}

interface LegendItemProps {
  color: string;
  label: string;
  type?: "bar" | "line";
}

interface HeaderControlsProps {
  isAchieved: boolean;
}

// Components for LegendItem icons (moved outside)
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

const BAR_DATASETS_CONFIG: DatasetConfig[] = [
  { id: "th", label: "TH", data: [...INITIAL_DATA.th], color: CHART_CONFIG.colors.th },
  { id: "pt", label: "PT", data: [...INITIAL_DATA.pt], color: CHART_CONFIG.colors.pt },
  { id: "elect", label: "Elect.", data: [...INITIAL_DATA.elect], color: CHART_CONFIG.colors.elect }
];

const SafetyAccidentCard: React.FC<ClaimChartProps> = ({ 
  selectedPlants, 
  title, 
  dataOverride 
}) => {
  const chartDataSource = dataOverride || INITIAL_DATA;

  const { showTH, showPT, showElect } = useMemo(() => {
    const isAllSelected = selectedPlants.includes("all");
    const isFajarSelected = selectedPlants.includes("fajar");
    const isBekasiSelected = selectedPlants.includes("bekasi");

    return {
      showTH: isAllSelected || isBekasiSelected || (isFajarSelected && isBekasiSelected),
      showPT: isAllSelected || isFajarSelected || (isFajarSelected && isBekasiSelected),
      showElect: isAllSelected || isFajarSelected || (isFajarSelected && isBekasiSelected)
    };
  }, [selectedPlants]);

  const accumulatedData = useMemo(() => {
    const result: number[] = [];
    let runningTotal = 0;

    MONTHS.forEach((_, index) => {
      let monthTotal = 0;
      if (showTH) monthTotal += chartDataSource.th[index];
      if (showPT) monthTotal += chartDataSource.pt[index];
      if (showElect) monthTotal += chartDataSource.elect[index];
      
      runningTotal += monthTotal;
      result.push(runningTotal);
    });

    return result;
  }, [showTH, showPT, showElect, chartDataSource]);

  const isAchieved = useMemo(() => {
    const totalAccumulation = accumulatedData[accumulatedData.length - 1] || 0;
    const totalTarget = chartDataSource.target.reduce((sum, value) => sum + value, 0);
    return totalAccumulation <= totalTarget;
  }, [accumulatedData, chartDataSource]);

  const chartData: ChartData<"line" | "bar", number[], string> = useMemo(() => {
    const datasets = [];

    BAR_DATASETS_CONFIG.forEach(({ id, label, color }) => {
      const shouldShow = (id === "th" && showTH) || (id === "pt" && showPT) || (id === "elect" && showElect);
      
      if (shouldShow) {
        datasets.push({
          type: "bar" as const,
          label,
          data: [...chartDataSource[id as keyof typeof chartDataSource] as number[]],
          backgroundColor: color,
          stack: "stack1",
          yAxisID: "y"
        });
      }
    });

    datasets.push(
      {
        type: "line" as const,
        label: "Target",
        data: [...chartDataSource.target],
        borderColor: CHART_CONFIG.colors.target,
        backgroundColor: `${CHART_CONFIG.colors.target}1a`,
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: "y1"
      },
      {
        type: "line" as const,
        label: "Acumulation",
        data: accumulatedData,
        borderColor: CHART_CONFIG.colors.accumulation,
        backgroundColor: `${CHART_CONFIG.colors.accumulation}1a`,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: CHART_CONFIG.colors.accumulation,
        yAxisID: "y1"
      }
    );

    return {
      labels: [...MONTHS],
      datasets
    };
  }, [showTH, showPT, showElect, accumulatedData, chartDataSource]);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        <HeaderControls isAchieved={isAchieved} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-1 text-[10px]">
        {showTH && <LegendItem color="#3b82f6" label="TH" />}
        {showPT && <LegendItem color="#22c55e" label="PT" />}
        {showElect && <LegendItem color="#a855f7" label="Elect." />}
        <LegendItem color="#ef4444" label="Target" type="line" />
        <LegendItem color="#3b82f6" label="Acumulation" type="line" />
      </div>

      <div className="flex-1 min-h-0">
        <Chart type="line" data={chartData} options={CHART_OPTIONS} />
      </div>
    </div>
  );
};

export default SafetyAccidentCard;