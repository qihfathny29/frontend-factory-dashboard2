import { useState } from "react";
import { ChevronDown } from "lucide-react";
import header from "./../assets/Header.png";
import backgroundImage from "./../assets/Background.png";

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Safety");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const navigationTabs = [
    { id: "safety", label: "Safety" },
    { id: "quality", label: "Quality" },
    { id: "delivery", label: "Delivery" },
    { id: "capability", label: "Mfg.Capability" },
    { id: "management", label: "Management" },
  ];

  const dropdownFilters = [
    { id: "company", label: "COMPANY", value: selectedCompany, setter: setSelectedCompany },
    { id: "plant", label: "PLANT", value: selectedPlant, setter: setSelectedPlant },
    { id: "type", label: "TYPE", value: selectedType, setter: setSelectedType },
    { id: "period", label: "PERIOD", value: selectedPeriod, setter: setSelectedPeriod },
  ];

  return (
    <nav
      className="relative w-full h-[80px] px-6 py-3 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between gap-4 w-full h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            className="h-[50px] w-auto object-contain"
            alt="DENSO Dashboard Management Header Logo"
            src={header}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-3" role="tablist">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.label}
              aria-controls={`${tab.id}-panel`}
              onClick={() => setActiveTab(tab.label)}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl transition-colors font-semibold text-white text-base whitespace-nowrap ${
                activeTab === tab.label ? "bg-[#81a1c1]" : "hover:bg-[#81a1c1]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center justify-center gap-2">
          {dropdownFilters.map((filter) => (
            <div
              key={filter.id}
              className="min-w-[120px] h-[40px] px-3 bg-white rounded-xl flex items-center justify-between gap-2"
            >
              <label
                htmlFor={`${filter.id}-select`}
                className="flex items-center flex-1 min-w-0"
              >
                <span className="font-semibold text-[#374557] text-sm">
                  {filter.label}
                </span>
              </label>
              <button
                id={`${filter.id}-select`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-label={`Select ${filter.label.toLowerCase()}`}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-[#374557]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};