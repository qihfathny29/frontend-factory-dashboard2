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
  getVisibleDatasetsByPlants,
  isQualityTargetAchieved,
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

const INITIAL_DATA = {
  th: [1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2],
  pt: [1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 2, 1],
  elect: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
} as const;

const CHART_CONFIG = {
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


const BAR_DATASETS_CONFIG: DatasetConfig[] = [
  { id: "th", label: "TH", data: [...INITIAL_DATA.th], color: CHART_COLORS.th },
  { id: "pt", label: "PT", data: [...INITIAL_DATA.pt], color: CHART_COLORS.pt },
  { id: "elect", label: "Elect.", data: [...INITIAL_DATA.elect], color: CHART_COLORS.elect }
];

const SafetyAccidentCard: React.FC<ClaimChartProps> = ({ 
  selectedPlants, 
  title, 
  dataOverride 
}) => {
  const chartDataSource = dataOverride || INITIAL_DATA;

  const { showTH, showPT, showElect } = useMemo(() => 
    getVisibleDatasetsByPlants(selectedPlants), 
    [selectedPlants]
  );

  const accumulatedData = useMemo(() => {
    const monthlyTotals = FISCAL_MONTHS.map((_, index) => {
      let monthTotal = 0;
      if (showTH) monthTotal += chartDataSource.th[index];
      if (showPT) monthTotal += chartDataSource.pt[index];
      if (showElect) monthTotal += chartDataSource.elect[index];
      return monthTotal;
    });
    return calculateAccumulation(monthlyTotals);
  }, [showTH, showPT, showElect, chartDataSource]);

  const isAchieved = useMemo(() => 
    isQualityTargetAchieved(accumulatedData, chartDataSource.target),
    [accumulatedData, chartDataSource]
  );

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
        borderColor: CHART_COLORS.target,
        backgroundColor: `${CHART_COLORS.target}1a`,
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: "y1"
      },
      {
        type: "line" as const,
        label: "Acumulation",
        data: accumulatedData,
        borderColor: CHART_COLORS.accumulation,
        backgroundColor: `${CHART_COLORS.accumulation}1a`,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.accumulation,
        yAxisID: "y1"
      }
    );

    return {
      labels: [...FISCAL_MONTHS],
      datasets
    };
  }, [showTH, showPT, showElect, accumulatedData, chartDataSource]);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        <ChartHeaderControls isAchieved={isAchieved} />
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