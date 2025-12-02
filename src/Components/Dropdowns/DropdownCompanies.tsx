import { Check } from "lucide-react";

interface DropdownCompaniesProps {
  selectedCompanies: string[];
  onSelectionChange: (companies: string[]) => void;
  onApply: () => void;
}

const companies = [
  { id: "all", label: "All" },
  { id: "dnia", label: "PT Denso Indonesia (DNIA)" },
  { id: "dmia", label: "PT Denso Manufacturing Indonesia (DMIA)" },
  { id: "hamaden", label: "PT Hamaden Indonesia Manufacturing" },
  { id: "taci", label: "PT TD Automotive Compressor Indonesia (TACI)" },
];

export const DropdownCompanies = ({
  selectedCompanies,
  onSelectionChange,
  onApply,
}: DropdownCompaniesProps) => {
  const handleToggle = (id: string) => {
    if (id === "all") {
      onSelectionChange(selectedCompanies.length === companies.length ? [] : companies.map((c) => c.id));
    } else {
      const newSelection = selectedCompanies.includes(id)
        ? selectedCompanies.filter((item) => item !== id && item !== "all")
        : [...selectedCompanies.filter((item) => item !== "all"), id];
      onSelectionChange(newSelection);
    }
  };

  const isChecked = (id: string) => {
    if (id === "all") return selectedCompanies.length === companies.length;
    return selectedCompanies.includes(id);
  };

  return (
    <div className="flex flex-col items-start gap-2 px-4 py-3 bg-greysblue-grey100 rounded-lg shadow-lg min-w-[200px]">
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => handleToggle(company.id)}
          className="flex items-center gap-2 w-full hover:bg-gray-50 p-1.5 rounded transition-colors"
        >
          <div className="relative w-4 h-4 rounded border border-solid border-[#1864ab] flex-shrink-0">
            {isChecked(company.id) && (
              <div className="absolute inset-0 bg-[#1864ab] rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <span
            className={`text-sm whitespace-nowrap ${
              company.id === "all" ? "font-semibold text-black" : "font-normal text-greysblue-grey700"
            }`}
          >
            {company.label}
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
