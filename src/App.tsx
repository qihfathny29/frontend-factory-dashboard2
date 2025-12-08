import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Header } from "./Components/Header";
import SafetyDashboard from "./Dashboard_Safety/Dashboard";
import QualityDashboard from "./Dashboard Quality/Dashboard";
import DeliveryDashboard from "./Dashboard Delivery/Dashboard";
import MfgDashboard from "./Dashboard mfg/Dashboard";

function App() {
  const [activeTab, setActiveTab] = useState("Safety");
  const [selectedPlants, setSelectedPlants] = useState<string[]>(["all"]);

  const renderDashboard = () => {
    switch (activeTab) {
      case "Safety":
        return <SafetyDashboard />;
      case "Quality":
        return <QualityDashboard selectedPlants={selectedPlants} />;
      case "Delivery":
        return <DeliveryDashboard />;
      case "Mfg.Capability":
        return <MfgDashboard />
      case "Management":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Management Dashboard
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <SafetyDashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        selectedPlants={selectedPlants}
        onPlantsChange={setSelectedPlants}
      />

      <Header activeTab={activeTab}/>
      <div className="flex-1 overflow-hidden relative">{renderDashboard()}</div>
    </div>
  );
}

export default App;
