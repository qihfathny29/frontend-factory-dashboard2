import React from "react";

/**
 * Trend configuration for metric cards
 */
export interface TrendConfig {
  type: "increase" | "decrease" | "stable" | "unstable";
  value: number;
  label?: string; // Custom label, defaults based on type
}

/**
 * Comparison configuration 
 */
export interface ComparisonConfig {
  value: number;
  label?: string; // Default
}

/**
 * @deprecated Use ComparisonConfig instead. Kept for backward compatibility.
 */
export type FiscalYearConfig = ComparisonConfig;

/**
 * Formatting options for the metric display
 */
export interface MetricFormatting {
  isCurrency?: boolean; // Format as currency
  valueSize?: "small" | "medium" | "large"; // text-6xl, text-7xl, text-8xl
  showPercentage?: boolean; // Show % change for currency
  previousValue?: number; // For percentage calculation
  suffix?: string; // Suffix for value display
}

export interface MetricCardProps {
  title: string;
  value: number;
  trend: TrendConfig;
  fiscalYear: ComparisonConfig;
  formatting?: MetricFormatting;
}

/**
 * Format number as currency with abbreviation
 */
const formatCurrency = (value: number): string => {
  const absValue = Math.abs(value);

  if (absValue >= 1_000_000_000_000) {
    return `Rp${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (absValue >= 1_000_000_000) {
    return `Rp${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    return `Rp${(value / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `Rp${(value / 1_000).toFixed(2)}k`;
  } else {
    return `Rp${value.toFixed(2)}`;
  }
};

/**
 * Get trend configuration
 */
const getTrendConfig = (trendType: string, customLabel?: string) => {
  const configs = {
    increase: {
      arrow: "▲",
      defaultLabel: "Increased vs.",
      colorClass: "text-red-500 border-red-500",
      isStable: false,
    },
    decrease: {
      arrow: "▼",
      defaultLabel: "Decreased vs.",
      colorClass: "text-[#34C759] border-[#34C759]",
      isStable: false,
    },
    stable: {
      arrow: "▲▼",
      defaultLabel: "Stable vs.",
      colorClass: "text-[#34C759] border-[#34C759]",
      isStable: true,
    },
    unstable: {
      arrow: "▼",
      defaultLabel: "Unstable vs.",
      colorClass: "text-red-500 border-red-500",
      isStable: false,
    },
  };

  const config = configs[trendType as keyof typeof configs] || configs.stable;
  return {
    ...config,
    label: customLabel || config.defaultLabel,
  };
};

/**
 * Get value size class
 */
const getValueSizeClass = (size?: string): string => {
  const sizes = {
    small: "text-6xl",
    medium: "text-7xl",
    large: "text-8xl",
  };
  return sizes[size as keyof typeof sizes] || sizes.large;
};

/**
 * Generic Metric Card Component
 * Unified card for displaying metrics across Safety, Quality, Delivery, and Mfg dashboards
 */
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  fiscalYear,
  formatting,
}) => {
  const {
    isCurrency = false,
    valueSize,
    showPercentage = false,
    previousValue,
    suffix = "",
  } = formatting || {};

  // Get trend configuration
  const trendConfig = getTrendConfig(trend.type, trend.label);

  // Calculate percentage change if needed
  const percentageChange =
    isCurrency && showPercentage && previousValue && previousValue !== 0
      ? Math.abs(((value - previousValue) / previousValue) * 100).toFixed(2)
      : null;

  // Format display values
  const displayValue = isCurrency 
    ? formatCurrency(value) 
    : `${value.toLocaleString("id-ID")}${suffix}`;
  const displayTrendValue =
    isCurrency && percentageChange 
      ? `${percentageChange}%` 
      : `${Math.abs(trend.value).toLocaleString("id-ID")}${suffix}`;
  const displayFiscalValue = isCurrency
    ? formatCurrency(fiscalYear.value)
    : `${fiscalYear.value.toLocaleString("id-ID")}${suffix}`;

  // Get value size class
  const valueSizeClass = getValueSizeClass(
    isCurrency && !valueSize ? "small" : valueSize
  );

  return (
    <div className="bg-white rounded-lg p-2 w-full h-full flex flex-col items-center justify-between text-center">
      {/* Title */}
      <div className="text-black text-xs font-bold">{title}</div>

      {/* Main Value */}
      <div className={`font-black text-black leading-none ${valueSizeClass}`}>
        {displayValue}
      </div>

      {/* Trend and Fiscal Year Section */}
      <div className="flex items-center justify-center space-x-2 w-full">
        {/* Trend Section */}
        <div className="flex flex-col items-center">
          {trendConfig.isStable ? (
            // Stable indicator with both arrows
            <button
              className={`border-2 rounded px-2 py-1 flex items-center space-x-1 bg-transparent ${trendConfig.colorClass}`}
            >
              <div className="flex flex-col items-center leading-none">
                <span className={`text-[10px] font-bold ${trendConfig.colorClass.split(" ")[0]}`}>
                  ▲
                </span>
                <span className={`text-[10px] font-bold ${trendConfig.colorClass.split(" ")[0]}`}>
                  ▼
                </span>
              </div>
              <span className={`text-xs font-bold ${trendConfig.colorClass.split(" ")[0]}`}>
                {displayTrendValue}
              </span>
            </button>
          ) : (
            // Regular trend indicator
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 border-2 ${trendConfig.colorClass} bg-white rounded-md`}
            >
              <span className="text-2xs font-bold">
                {trendConfig.arrow} {displayTrendValue}
              </span>
            </div>
          )}
          <span className={`text-[10px] mt-1 ${trendConfig.colorClass.split(" ")[0]}`}>
            {trendConfig.label}
          </span>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Fiscal Year Section */}
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-2xs font-bold">{displayFiscalValue}</span>
          <span className="text-[12px] text-blue-500">
            {fiscalYear.label || "Fiscal Year '24"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
