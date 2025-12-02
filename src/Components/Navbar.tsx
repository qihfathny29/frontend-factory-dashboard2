import { useState } from "react";
import { ChevronDown } from "lucide-react";
import header from "./../assets/Header.png";
import backgroundImage from "./../assets/Background.png";
import { DropdownCompanies } from "./Dropdowns/DropdownCompanies";
import { DropdownPlant } from "./Dropdowns/DropdownPlant";
import { DropdownType } from "./Dropdowns/DropdownType";
import { DropdownPeriod } from "./Dropdowns/DropdownPeriod";

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Safety");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["all"]);
  const [selectedPlants, setSelectedPlants] = useState<string[]>(["all"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["all"]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(["fy25-yearly"]);

  const navigationTabs = [
    { id: "safety", label: "Safety" },
    { id: "quality", label: "Quality" },
    { id: "delivery", label: "Delivery" },
    { id: "capability", label: "Mfg.Capability" },
    { id: "management", label: "Management" },
  ];

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

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
          {/* Company Dropdown */}
          <div className="relative">
            <div
              className="min-w-[120px] h-[40px] px-3 bg-white rounded-xl flex items-center justify-between gap-2 cursor-pointer"
              onClick={() => toggleDropdown("company")}
            >
              <span className="font-semibold text-[#374557] text-sm">COMPANY</span>
              <ChevronDown className="w-4 h-4 text-[#374557]" />
            </div>
            {openDropdown === "company" && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <DropdownCompanies
                  selectedCompanies={selectedCompanies}
                  onSelectionChange={setSelectedCompanies}
                  onApply={closeDropdown}
                />
              </div>
            )}
          </div>

          {/* Plant Dropdown */}
          <div className="relative">
            <div
              className="min-w-[120px] h-[40px] px-3 bg-white rounded-xl flex items-center justify-between gap-2 cursor-pointer"
              onClick={() => toggleDropdown("plant")}
            >
              <span className="font-semibold text-[#374557] text-sm">PLANT</span>
              <ChevronDown className="w-4 h-4 text-[#374557]" />
            </div>
            {openDropdown === "plant" && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <DropdownPlant
                  selectedPlants={selectedPlants}
                  onSelectionChange={setSelectedPlants}
                  onApply={closeDropdown}
                />
              </div>
            )}
          </div>

          {/* Type Dropdown */}
          <div className="relative">
            <div
              className="min-w-[120px] h-[40px] px-3 bg-white rounded-xl flex items-center justify-between gap-2 cursor-pointer"
              onClick={() => toggleDropdown("type")}
            >
              <span className="font-semibold text-[#374557] text-sm">TYPE</span>
              <ChevronDown className="w-4 h-4 text-[#374557]" />
            </div>
            {openDropdown === "type" && (
              <div className="absolute top-full mt-2 left-0 z-50">
                <DropdownType
                  selectedTypes={selectedTypes}
                  onSelectionChange={setSelectedTypes}
                  onApply={closeDropdown}
                />
              </div>
            )}
          </div>

          {/* Period Dropdown */}
          <div className="relative">
            <div
              className="min-w-[120px] h-[40px] px-3 bg-white rounded-xl flex items-center justify-between gap-2 cursor-pointer"
              onClick={() => toggleDropdown("period")}
            >
              <span className="font-semibold text-[#374557] text-sm">PERIOD</span>
              <ChevronDown className="w-4 h-4 text-[#374557]" />
            </div>
            {openDropdown === "period" && (
              <div className="absolute top-full mt-2 right-0 z-50">
                <DropdownPeriod
                  selectedPeriods={selectedPeriods}
                  onSelectionChange={setSelectedPeriods}
                  onApply={closeDropdown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};