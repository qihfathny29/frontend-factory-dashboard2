import React from "react";

interface Props {
  title: string;
  value: number;
  changeValue: number;
  changeType: "stable" | "unstable";
  fiscalYearValue: number;
}

const DeliveryCard: React.FC<Props> = ({
  title,
  value,
  changeValue,
  changeType,
  fiscalYearValue,
}) => {
  // Determine configuration based on changeType
  let arrow: string;
  let textLabel: string;
  let colorClass: string;

  if (changeType === "stable") {
    arrow = "▲";
    textLabel = "Stable vs.";
    colorClass = "text-[#34C759] border-[#34C759]";
  } else {
    arrow = "▼";
    textLabel = "Unstable vs.";
    colorClass = "text-red-500 border-red-500";
  }

  return (
    <div className="bg-white rounded-lg p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-xs font-bold">{title}</div>
      <div className="font-black text-black leading-none text-8xl">
        {value}
      </div>

      <div className="flex items-center justify-center space-x-2 w-full">
        {/* Change Section */}
        <div className="flex flex-col items-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 border-2 ${colorClass} bg-white rounded-md`}
          >
            <span className="text-2xs font-bold">
              {arrow} {changeValue}
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
            {fiscalYearValue}
          </span>
          <span className="text-[12px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;