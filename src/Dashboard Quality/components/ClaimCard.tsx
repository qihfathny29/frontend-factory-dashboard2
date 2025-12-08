import React from "react";

interface Props {
  title: string;
  value: number;
  changeValue: number;
  changeType: "increase" | "decrease";
  fiscalYearValue: number;
  isCurrency?: boolean;
  previousValue?: number;
}

/**
 * Format number menjadi format currency dengan singkatan
 * 1,000 = Rp1.00k
 * 1,000,000 = Rp1.00M
 * 1,000,000,000 = Rp1.00B
 * 1,000,000,000,000 = Rp1.00T
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

const CHANGE_TYPE_CONFIG = {
  increase: {
    arrow: "▲",
    textLabel: "Increased vs.",
    colorClass: "text-red-500 border-red-500",
  },
  decrease: {
    arrow: "▼",
    textLabel: "Decreased vs.",
    colorClass: "text-[#34C759] border-[#34C759]",
  },
} as const;

const ClaimCard: React.FC<Props> = ({
  title,
  value,
  changeValue,
  changeType,
  fiscalYearValue,
  isCurrency = false,
  previousValue,
}) => {
  const { arrow, textLabel, colorClass } = CHANGE_TYPE_CONFIG[changeType];

  // Hitung persentase jika previousValue tersedia
  const percentageChange = previousValue && previousValue !== 0 
    ? Math.abs(((value - previousValue) / previousValue) * 100).toFixed(2)
    : null;

  // Format display value
  const displayValue = isCurrency ? formatCurrency(value) : value;
  const displayChangeValue = isCurrency && percentageChange 
    ? `${percentageChange}%` 
    : changeValue;
  const displayFiscalValue = isCurrency ? formatCurrency(fiscalYearValue) : fiscalYearValue;

  return (
    <div className="bg-white rounded-lg p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-xs font-bold">{title}</div>
      <div className={`font-black text-black leading-none ${isCurrency ? 'text-6xl' : 'text-8xl'}`}>
        {displayValue}
      </div>

      <div className="flex items-center justify-center space-x-2 w-full">
        {/* Change Section */}
        <div className="flex flex-col items-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 border-2 ${colorClass} bg-white rounded-md`}
          >
            <span className="text-2xs font-bold">
              {arrow} {displayChangeValue}
            </span>
          </div>
          <span className={`text-[10px] mt-1 ${colorClass.split(" ")[0]}`}>
            {textLabel}
          </span>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Fiscal Year Section */}
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-2xs font-bold">
            {displayFiscalValue}
          </span>
          <span className="text-[12px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;