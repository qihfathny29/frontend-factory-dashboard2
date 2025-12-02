import { Check } from "lucide-react";

interface DropdownPeriodProps {
  selectedPeriods: string[];
  onSelectionChange: (periods: string[]) => void;
  onApply: () => void;
}

const periods = [
  { id: "all", label: "All" },
  { id: "yearly", label: "Yearly" },
  { id: "monthly", label: "Monthly" },
];

export const DropdownPeriod = ({
  selectedPeriods,
  onSelectionChange,
  onApply,
}: DropdownPeriodProps) => {
  const handleToggle = (id: string) => {
    if (id === "all") {
      onSelectionChange(selectedPeriods.length === periods.length ? [] : periods.map((p) => p.id));
    } else {
      const newSelection = selectedPeriods.includes(id)
        ? selectedPeriods.filter((item) => item !== id && item !== "all")
        : [...selectedPeriods.filter((item) => item !== "all"), id];
      onSelectionChange(newSelection);
    }
  };

  const isChecked = (id: string) => {
    if (id === "all") return selectedPeriods.length === periods.length;
    return selectedPeriods.includes(id);
  };

  return (
    <div className="flex flex-col items-start gap-2 px-4 py-3 bg-greysblue-grey100 rounded-lg shadow-lg min-w-[140px]">
      {periods.map((period) => (
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
          <span
            className={`text-sm whitespace-nowrap ${
              period.id === "all" ? "font-semibold text-black" : "font-normal text-greysblue-grey700"
            }`}
          >
            {period.label}
          </span>
        </button>
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
