import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Header } from "./Components/Header";
import SafetyDashboard from "./Dashboard_Safety/Dashboard";
import QualityDashboard from "./Dashboard Quality/Dashboard";

function App() {
  const [activeTab, setActiveTab] = useState("Safety");

  const renderDashboard = () => {
    switch (activeTab) {
      case "Safety":
        return <SafetyDashboard />;
      case "Quality":
        return <QualityDashboard />;
      case "Delivery":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">Delivery Dashboard</h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case "Mfg.Capability":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">Manufacturing Capability Dashboard</h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case "Management":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">Management Dashboard</h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <SafetyDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <Header />
      {renderDashboard()}
    </div>
  );
}

export default App;
