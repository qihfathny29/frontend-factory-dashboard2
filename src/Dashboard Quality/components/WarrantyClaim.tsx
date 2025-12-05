import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Plugin teks di tengah donut
const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const dataset = chart.data.datasets[0];
    if (!dataset?.data?.length) return;

    const total = dataset.data.reduce<number>((sum, val) => {
      return sum + (typeof val === "number" ? val : 0);
    }, 0);

    const centerX = chartArea.left + chartArea.width / 2;
    const centerY = chartArea.top + chartArea.height / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Total besar
    ctx.font = "bold 32px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#111827";
    ctx.fillText(total.toString(), centerX, centerY - 8);

    // Label kecil
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("Total Claims", centerX, centerY + 14);

    ctx.restore();
  },
};

const WarrantyClaimDonutChart: React.FC = () => {
  const data = {
    labels: ["Thermal", "Power Train", "Electronic"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#637CEF", "#E3008C", "#2AA0A4"],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 12,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label(context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-800 text-center mb-4">
        Warranty Claim by BU
      </h3>

      <div className="flex-1 relative min-h-0">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
};

export default WarrantyClaimDonutChart;