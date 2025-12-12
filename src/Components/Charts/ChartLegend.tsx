import React from "react";

/**
 * Shared chart legend components for all dashboard charts
 * Includes LineIcon, BarIcon, and LegendItem
 */

interface IconProps {
  color: string;
}

/**
 * Line icon component for line chart legend items
 */
export const LineIcon: React.FC<IconProps> = ({ color }) => (
  <div className="flex items-center">
    <div className="w-1.5 h-0.5" style={{ backgroundColor: color }} />
    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <div className="w-1.5 h-0.5" style={{ backgroundColor: color }} />
  </div>
);

/**
 * Bar icon component for bar chart legend items
 */
export const BarIcon: React.FC<IconProps> = ({ color }) => (
  <div className="w-2 h-2 rounded" style={{ backgroundColor: color }} />
);

interface LegendItemProps {
  color: string;
  label: string;
  type?: "bar" | "line";
}

/**
 * Generic legend item component that displays either a bar or line icon with a label
 */
export const LegendItem: React.FC<LegendItemProps> = ({ 
  color, 
  label, 
  type = "bar" 
}) => {
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
