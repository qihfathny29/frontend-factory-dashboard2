import { ReactNode } from "react";
import { Navbar } from "../../Components/Navbar";
import { Header } from "../../Components/Header";
import type { TabType } from "../Types";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  selectedPlants: string[];
  onPlantsChange: (plants: string[]) => void;
  showPlantFilter: boolean;
  onBackToPreview: () => void;
}

export const DashboardLayout = ({
  children,
  activeTab,
  onTabChange,
  selectedPlants,
  onPlantsChange,
  showPlantFilter,
  onBackToPreview,
}: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Navbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        selectedPlants={selectedPlants}
        onPlantsChange={onPlantsChange}
        showFilters={showPlantFilter}
        showBackToLanding={true}
        onBackToLanding={onBackToPreview}
      />
      <Header activeTab={activeTab} />
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </div>
  );
};