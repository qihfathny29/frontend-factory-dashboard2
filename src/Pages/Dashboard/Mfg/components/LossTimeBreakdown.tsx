import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import type { Chart as ChartJSType, ChartDataset } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LossTimeBreakdown = () => {
  // Custom plugin untuk display angka di atas titik - HANYA UNTUK CHART INI
  const dataLabelPlugin = {
    id: 'customDataLabels',
    afterDatasetsDraw(chart: ChartJSType) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset: ChartDataset, datasetIndex: number) => {
        if (dataset.type === 'line') {
          const meta = chart.getDatasetMeta(datasetIndex);

          meta.data.forEach((point: any, index: number) => {
            const value = dataset.data[index] as number;
            const isTarget = dataset.label === 'OR Target';

            ctx.save();
            ctx.font = 'bold 8px sans-serif';
            ctx.fillStyle = isTarget ? '#1e40af' : '#f97316';
            ctx.textAlign = 'center';

            const yOffset = isTarget ? -8 : 12;
            ctx.fillText(value.toFixed(1), point.x, point.y + yOffset);
            ctx.restore();
          });
        }
      });
    }
  };

  const data = {
    labels: [
      'ALTERNATOR - ROTOR',
      'VCT (VARIABLE CAM TIMING) - ASSY LINE 2 PLANT',
      'PACKING LINE 3RD INSPECTION 1',
      'EFI ECU - ASSY COMBINE',
      'SPARK PLUG IRIDIUM ACCS - ASSY LINE',
      'STATOR 3 ASSY',
      'ALTERNATOR - ASSEMBLING',
      'HEATER CLUSTER - ASSY LINE 1',
      'ACCS - STATOR 3 ASSY',
      'ALTERNATOR - REGULATOR'
    ],
    datasets: [
      // Stacked Bars
      {
        type: 'bar' as const,
        label: 'NG Loss',
        data: [1.5, 0.5, 0.8, 0, 0, 0.3, 0, 0, 0, 0],
        backgroundColor: '#2d5016',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'BM',
        data: [10.5, 11, 9, 9, 9, 7.5, 5, 2, 5, 3],
        backgroundColor: '#4fb3d9',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Chokotei',
        data: [5, 1, 2, 2, 1.5, 1.5, 0, 3.5, 1, 1],
        backgroundColor: '#d946ef',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Speed Loss',
        data: [3.5, 6, 1.5, 0.5, 0.5, 1.5, 0, 0.5, 0, 0],
        backgroundColor: '#84cc16',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Prepare',
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0.5],
        backgroundColor: '#1e293b',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'QC Check',
        data: [0.5, 0.5, 0.2, 0, 0, 0, 0.2, 0, 0, 0.3],
        backgroundColor: '#92400e',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Dandori',
        data: [0, 0, 0.5, 0, 0, 0, 0.3, 0, 0, 0],
        backgroundColor: '#166534',
        stack: 'stack1',
        yAxisID: 'y'
      },
      {
        type: 'bar' as const,
        label: 'Other',
        data: [0.5, 0, 0, 0, 0, 0, 1, 0.5, 0, 0.2],
        backgroundColor: '#1e40af',
        stack: 'stack1',
        yAxisID: 'y'
      },
      // Line Charts
      {
        type: 'line' as const,
        label: 'OR Target',
        data: [90.5, 90.0, 93.0, 89.0, 89.0, 85.0, 90.5, 88.0, 90.0, 90.5],
        borderColor: '#1e40af',
        backgroundColor: '#1e40af',
        pointRadius: 4,
        pointHoverRadius: 5,
        yAxisID: 'y1',
        tension: 0
      },
      {
        type: 'line' as const,
        label: 'OR Actual',
        data: [68.3, 70.8, 78.5, 77.4, 77.6, 74.3, 83.7, 81.2, 83.8, 84.9],
        borderColor: '#f97316',
        backgroundColor: '#f97316',
        pointRadius: 4,
        pointHoverRadius: 5,
        yAxisID: 'y1',
        tension: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 15
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 6,
          font: {
            size: 7
          },
          usePointStyle: false,
          generateLabels: (chart: ChartJSType) => {
            const datasets = chart.data.datasets;
            return datasets.map((dataset: ChartDataset, i: number) => ({
              text: dataset.label || '',
              fillStyle: dataset.backgroundColor as string,
              strokeStyle: dataset.borderColor as string,
              lineWidth: dataset.type === 'line' ? 2 : 0,
              hidden: !chart.isDatasetVisible(i),
              index: i,
              pointStyle: dataset.type === 'line' ? 'circle' : 'rect'
            }));
          }
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 7
          },
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false
        }
      },
      y: {
        stacked: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Loss Time (Minute)',
          font: {
            size: 8
          }
        },
        beginAtZero: true,
        max: 25,
        ticks: {
          stepSize: 5,
          font: {
            size: 7
          }
        },
        grid: {
          color: '#e5e7eb'
        }
      },
      y1: {
        position: 'right' as const,
        title: {
          display: true,
          text: 'OEE (%)',
          font: {
            size: 8
          }
        },
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          font: {
            size: 7
          }
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xs font-bold text-center mb-1">
        Loss Time Breakdown
      </h2>
      
      <div className="flex-1 min-h-0">
        <Chart type='bar' data={data} options={options} plugins={[dataLabelPlugin]} />
      </div>
    </div>
  );
};

export default LossTimeBreakdown;