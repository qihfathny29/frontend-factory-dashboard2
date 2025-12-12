import React from "react";
import type { ShiftComparisonConfig } from "../config/componentTypes";

interface ShiftComparisonCardProps {
  config: ShiftComparisonConfig;
  total: number;
  dayShift: number;
  nightShift: number;
}

const ShiftComparisonCard: React.FC<ShiftComparisonCardProps> = ({
  config,
  total,
  dayShift,
  nightShift,
}) => {
  const { title, formatType } = config;

  const formatNumber = (num: number): string => {
    switch (formatType) {
      case "decimal":
        return num.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        });
      case "number":
        return num.toLocaleString("en-US");
      case "locale":
        return num.toLocaleString("id-ID");
      default:
        return num.toString();
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="text-lg font-bold text-black mb-8">{title}</h3>

      {/* Total Number */}
      <div className="text-6xl font-bold text-black mb-7">
        {formatNumber(total)}
      </div>

      {/* Day Shift and Night Shift */}
      <div className="flex items-center gap-3">
        {/* Day Shift */}
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-blue-600">
            {formatNumber(dayShift)}
          </div>
          <div className="text-[14px] text-blue-600 font-medium">Day Shift</div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Night Shift */}
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-blue-600">
            {formatNumber(nightShift)}
          </div>
          <div className="text-[14px] text-blue-600 font-medium">
            Night Shift
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftComparisonCard;
