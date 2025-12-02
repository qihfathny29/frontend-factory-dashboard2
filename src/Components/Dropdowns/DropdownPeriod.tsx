import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface DropdownPeriodProps {
  selectedPeriods: string[];
  onSelectionChange: (periods: string[]) => void;
  onApply: () => void;
}

const fiscalYears = [
  {
    year: "25",
    id: "fy25",
    periods: [
      { id: "fy25-yearly", label: "Yearly" },
      { id: "fy25-monthly", label: "Monthly" },
      { id: "fy25-weekly", label: "Weekly" },
      { id: "fy25-daily", label: "Daily" },
    ],
  },
  {
    year: "24",
    id: "fy24",
    periods: [{ id: "fy24-yearly", label: "Yearly" }],
  },
];

export const DropdownPeriod = ({
  selectedPeriods,
  onSelectionChange,
  onApply,
}: DropdownPeriodProps) => {
  const [expandedYears, setExpandedYears] = useState<string[]>(["fy25"]);

  const toggleYear = (yearId: string) => {
    setExpandedYears((prev) =>
      prev.includes(yearId) ? prev.filter((id) => id !== yearId) : [...prev, yearId]
    );
  };

  const handleToggle = (id: string) => {
    const newSelection = selectedPeriods.includes(id)
      ? selectedPeriods.filter((item) => item !== id)
      : [...selectedPeriods, id];
    onSelectionChange(newSelection);
  };

  const isChecked = (id: string) => selectedPeriods.includes(id);

  return (
    <div className="flex flex-col items-start gap-2 px-4 py-3 bg-greysblue-grey100 rounded-lg shadow-lg min-w-[180px] max-w-[220px]">
      {fiscalYears.map((fiscal, index) => (
        <div key={fiscal.id} className={`w-full ${index > 0 ? 'mt-1' : ''}`}>
          {/* Year Header */}
          <button
            onClick={() => toggleYear(fiscal.id)}
            className="flex items-center justify-between w-full hover:bg-gray-50 p-1.5 rounded transition-colors"
          >
            <span className="font-semibold text-black text-sm">
              Fiscal Year '{fiscal.year}
            </span>
            {expandedYears.includes(fiscal.id) ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#1864ab] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#1864ab] flex-shrink-0" />
            )}
          </button>

          {/* Period Options */}
          {expandedYears.includes(fiscal.id) && (
            <div className="flex flex-col gap-1 pl-2 mt-1">
              {fiscal.periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => handleToggle(period.id)}
                  className="flex items-center gap-2 w-full hover:bg-gray-50 p-1.5 rounded transition-colors"
                >
                  <div className="relative w-4 h-4 rounded border border-solid border-[#1864ab] flex-shrink-0">
                    {isChecked(period.id) && (
                      <div className="absolute inset-0 bg-[#1864ab] rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-normal text-greysblue-grey700 whitespace-nowrap">
                    {period.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={onApply}
        className="flex items-center justify-center w-full mt-1 px-4 py-2 bg-[#1864ab] rounded-lg hover:bg-[#1864ab]/90 transition-colors"
      >
        <span className="font-semibold text-white text-sm">Apply</span>
      </button>
    </div>
  );
};
