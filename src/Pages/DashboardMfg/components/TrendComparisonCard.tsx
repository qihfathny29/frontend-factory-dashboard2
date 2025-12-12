import React from "react";
import type { TrendComparisonConfig } from "../config/componentTypes";

interface TrendComparisonCardProps {
  config: TrendComparisonConfig;
  current: number;
  change: number;
  yesterday: number;
}

const TrendComparisonCard: React.FC<TrendComparisonCardProps> = ({
  config,
  current,
  change,
  yesterday,
}) => {
  const { title, suffix, trendLogic } = config;

  const isIncreased = change > 0;
  const isDecreased = change < 0;

  // Determine color based on trend logic
  const getTrendColor = () => {
    if (trendLogic === "inverse") {
      // inverse: increase = bad (red), decrease = good (green)
      return isIncreased ? "red" : isDecreased ? "green" : "gray";
    } else {
      // normal: increase = good (green), decrease = bad (red)
      return isIncreased ? "green" : isDecreased ? "red" : "gray";
    }
  };

  const trendColor = getTrendColor();

  const colorClasses = {
    red: {
      border: "border-red-300",
      text: "text-red-600",
    },
    green: {
      border: "border-green-300",
      text: "text-green-600",
    },
    gray: {
      border: "border-gray-300",
      text: "text-gray-600",
    },
  };

  const currentColors = colorClasses[trendColor];

  return (
    <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="text-lg font-bold text-black mb-8">{title}</h3>

      {/* Current Value */}
      <div className="text-6xl font-bold text-black mb-7">
        {current.toLocaleString("id-ID")}
        {suffix}
      </div>

      {/* Comparison */}
      <div className="flex items-center gap-4">
        {/* Change Value */}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded border ${currentColors.border}`}
          >
            {isIncreased && (
              <span className={`font-bold ${currentColors.text}`}>▲</span>
            )}
            {isDecreased && (
              <span className={`font-bold ${currentColors.text}`}>▼</span>
            )}
            <span className={`text-sm font-bold ${currentColors.text}`}>
              {Math.abs(change).toLocaleString("id-ID")}
              {suffix}
            </span>
          </div>
          <div className={`text-xs font-medium ${currentColors.text}`}>
            {isIncreased
              ? "Increased vs."
              : isDecreased
              ? "Decreased vs."
              : "vs."}
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Yesterday Value */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold text-blue-600">
            {yesterday.toLocaleString("id-ID")}
            {suffix}
          </div>
          <div className="text-xs text-blue-600 font-medium">Yesterday</div>
        </div>
      </div>
    </div>
  );
};

export default TrendComparisonCard;
