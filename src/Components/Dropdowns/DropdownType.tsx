import { Check } from "lucide-react";

interface DropdownTypeProps {
  selectedTypes: string[];
  onSelectionChange: (types: string[]) => void;
  onApply: () => void;
}

const types = [
  { id: "all", label: "All" },
  { id: "asaichi", label: "ASAICHI" },
  { id: "cmm", label: "CMM" },
  { id: "gmm", label: "GMM" },
];

export const DropdownType = ({
  selectedTypes,
  onSelectionChange,
  onApply,
}: DropdownTypeProps) => {
  const handleToggle = (id: string) => {
    if (id === "all") {
      onSelectionChange(selectedTypes.length === types.length ? [] : types.map((t) => t.id));
    } else {
      const newSelection = selectedTypes.includes(id)
        ? selectedTypes.filter((item) => item !== id && item !== "all")
        : [...selectedTypes.filter((item) => item !== "all"), id];
      onSelectionChange(newSelection);
    }
  };

  const isChecked = (id: string) => {
    if (id === "all") return selectedTypes.length === types.length;
    return selectedTypes.includes(id);
  };

  return (
    <div className="flex flex-col items-start gap-2 px-4 py-3 bg-greysblue-grey100 rounded-lg shadow-lg min-w-[140px]">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => handleToggle(type.id)}
          className="flex items-center gap-2 w-full hover:bg-gray-50 p-1.5 rounded transition-colors"
        >
          <div className="relative w-4 h-4 rounded border border-solid border-[#1864ab] flex-shrink-0">
            {isChecked(type.id) && (
              <div className="absolute inset-0 bg-[#1864ab] rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <span
            className={`text-sm whitespace-nowrap ${
              type.id === "all" ? "font-semibold text-black" : "font-normal text-greysblue-grey700"
            }`}
          >
            {type.label}
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
