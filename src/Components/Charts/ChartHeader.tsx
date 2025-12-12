import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import AchievedIcon from "../../Assets/Achieved.png";
import NotAchievedIcon from "../../Assets/Notachieved.png";

/**
 * Shared chart header controls with achievement indicator
 */

interface ChartHeaderControlsProps {
  isAchieved: boolean;
}

/**
 * Header controls component displaying achievement status and expand/collapse buttons
 * Used in Quality and Delivery charts
 */
export const ChartHeaderControls: React.FC<ChartHeaderControlsProps> = ({ isAchieved }) => (
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
