import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AccidentData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface Props {
  data?: AccidentData[];
}

const AccidentTypePieChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="p-2 text-center text-xs">No Data Available</div>;
  }

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 1,
        // pointStyle disini dihapus saja, kita pindah ke options
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 10 },

          // INI SOLUSINYA: Kita generate label secara manual
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const ds = data.datasets[0];

                return {
                  text: label,
                  fillStyle: ds.backgroundColor[i], // Ambil warna sesuai data
                  strokeStyle: ds.backgroundColor[i],
                  lineWidth: 0,
                  hidden: !chart.getDataVisibility(i),
                  index: i,

                  // LOGIKA BENTUK YANG PASTI JALAN:
                  // Kalau labelnya 'Accident' -> 'triangle'
                  // Sisanya -> 'rect' (persegi)
                  pointStyle: label === "Accident" ? "triangle" : "rect",
                  rotation: 0,
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-800 mb-2">Accident Type</h3>
      <div className="flex-1 min-h-0 relative">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AccidentTypePieChart;
