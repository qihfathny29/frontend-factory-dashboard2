import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import header from "./../assets/Header.png";
import backgroundImage from "./../assets/Background.png";
import { DropdownCompanies } from "./Dropdowns/DropdownCompanies";
import { DropdownPlant } from "./Dropdowns/DropdownPlant";
import { DropdownType } from "./Dropdowns/DropdownType";
import { DropdownPeriod } from "./Dropdowns/DropdownPeriod";

interface DropdownButtonProps {
  label: string;
  onClick: () => void;
}

const DropdownButton = ({ label, onClick }: DropdownButtonProps) => (
  <div
    className="min-w-[100px] sm:min-w-[120px] h-[36px] sm:h-[40px] px-2 sm:px-3 bg-white rounded-xl flex items-center justify-between gap-1 sm:gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    <span className="font-semibold text-[#374557] text-xs sm:text-sm">{label}</span>
    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#374557] flex-shrink-0" />
  </div>
);

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedPlants: string[];
  onPlantsChange: (plants: string[]) => void;
  showFilters?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
  showBackToLanding?: boolean;
  onBackToLanding?: () => void;
}

export const Navbar = ({ 
  activeTab, 
  onTabChange, 
  selectedPlants, 
  onPlantsChange,
  showFilters = true,
  showLogout = false,
  onLogout,
  showBackToLanding = false,
  onBackToLanding
}: NavbarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["all"]);
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
      className="relative w-full min-h-[70px] sm:min-h-[80px] px-3 sm:px-6 py-2 sm:py-3 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4 w-full h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            className="h-[40px] sm:h-[50px] w-auto object-contain"
            alt="DENSO Dashboard Management Header Logo"
            src={header}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 flex-wrap" role="tablist">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.label}
              aria-controls={`${tab.id}-panel`}
              onClick={() => onTabChange(tab.label)}
              className={`inline-flex items-center justify-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors font-semibold text-white text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                activeTab === tab.label ? "bg-[#81a1c1]" : "hover:bg-[#81a1c1]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          {showFilters && (
            <>
              {/* Company Dropdown */}
              <div className="relative">
                <DropdownButton label="COMPANY" onClick={() => toggleDropdown("company")} />
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
                <DropdownButton label="PLANT" onClick={() => toggleDropdown("plant")} />
                {openDropdown === "plant" && (
                  <div className="absolute top-full mt-2 left-0 z-50">
                    <DropdownPlant
                      selectedPlants={selectedPlants}
                      onSelectionChange={onPlantsChange}
                      onApply={closeDropdown}
                    />
                  </div>
                )}
              </div>

              {/* Type Dropdown */}
              <div className="relative">
                <DropdownButton label="TYPE" onClick={() => toggleDropdown("type")} />
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
                <DropdownButton label="PERIOD" onClick={() => toggleDropdown("period")} />
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
            </>
          )}
          
          {/* Logout Button */}
          {showLogout && onLogout && (
            <button
              onClick={onLogout}
              className="min-w-[100px] sm:min-w-[120px] h-[36px] sm:h-[40px] px-2 sm:px-3 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center gap-2 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span className="font-semibold text-white text-xs sm:text-sm">Logout</span>
            </button>
          )}
          
          {/* Back to Landing Page Button */}
          {showBackToLanding && onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#81a1c1] hover:bg-[#81a1c1]/80 transition-colors font-semibold text-white text-xs sm:text-sm whitespace-nowrap"
              aria-label="Back to Landing Page"
            >
              Landing Page
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};