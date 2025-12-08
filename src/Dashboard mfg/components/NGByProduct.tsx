import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';

import type { TooltipItem } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NGByProduct = () => {
  const data = {
    labels: [
      'Product 6',
      'Product 13',
      'Product 7',
      'Product 4',
      'Product 5',
      'Product 1',
      'Product 11',
      'Product 8',
      'Product 9',
      'Product 3',
      'Product 10',
      'Product 12',
      'Product 2'
    ],
    datasets: [
      {
        data: [5.0, 4.0, 4.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 0.0],
        backgroundColor: '#6366f1',
        borderRadius: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            return 'NG Ratio: ' + context.parsed.y;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#e0e0e0',
        },
        ticks: {
          font: {
            size: 8
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          stepSize: 1,
          font: {
            size: 9
          }
        },
        grid: {
          display: true,
          color: '#e0e0e0',
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-base font-bold text-center mb-2">NG Ratio by Product</h2>
      
      <div className="flex-1 min-h-0">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default NGByProduct;