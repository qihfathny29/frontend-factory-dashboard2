import { useState } from "react";
import { toast } from "react-toastify";
import { Login } from "./Pages/Auth/Login";
import { Preview } from "./Pages/Preview";
import { DashboardLayout } from "./Base/Layouts/DashboardLayout";
import { ProtectedRoute } from "./Base/Routes/ProtectedRoutes";
import SafetyDashboard from "./Pages/Dashboard/Safety/Dashboard";
import QualityDashboard from "./Pages/Dashboard/Quality/Dashboard";
import DeliveryDashboard from "./Pages/Dashboard/Delivery/Dashboard";
import MfgDashboard from "./Pages/Dashboard/Mfg/Dashboard";
import { SafetyForm } from "./Pages/FormSubmission/Safety/Form";
import { logout } from "./Base/Utils/auth";
import type { AppPage, TabType } from "./Base/Types";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("login");
  const [activeTab, setActiveTab] = useState<TabType>("Safety");
  const [selectedPlants, setSelectedPlants] = useState<string[]>(["all"]);

  const handleLogin = () => setCurrentPage("preview");

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setCurrentPage("login");
  };

  const goToPreview = () => setCurrentPage("preview");

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "Safety":
        return <SafetyDashboard selectedPlants={selectedPlants} />;
      case "Quality":
        return <QualityDashboard selectedPlants={selectedPlants} />;
      case "Delivery":
        return <DeliveryDashboard />;
      case "Mfg.Capability":
        return <MfgDashboard />;
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
        return <SafetyDashboard selectedPlants={selectedPlants} />;
    }
  };

  const renderSubmissionContent = () => {
    if (activeTab === "Safety") {
      return <SafetyForm />;
    }
    
    const formTitle = activeTab === "Mfg.Capability" ? "Mfg. Capability" : activeTab;
    return (
      <div className="min-h-screen bg-[#EEE9E5] p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1864ab] mb-4">
            {formTitle} Submission Form
          </h1>
          <p className="text-gray-600 text-lg">Coming soon...</p>
        </div>
      </div>
    );
  };

  // Login Page
  if (currentPage === "login") {
    return <Login onLogin={handleLogin} onGoToPreview={goToPreview} />;
  }

  // Landing Page
  if (currentPage === "preview") {
    return (
      <ProtectedRoute>
        <Preview onNavigate={(page) => setCurrentPage(page)} onLogout={handleLogout} />
      </ProtectedRoute>
    );
  }

  // Dashboard Page
  if (currentPage === "dashboard") {
    return (
      <ProtectedRoute>
        <DashboardLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedPlants={selectedPlants}
          onPlantsChange={setSelectedPlants}
          showPlantFilter={true}
          onBackToPreview={goToPreview}
        >
          {renderDashboardContent()}
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  // Submission Page
  if (currentPage === "submission") {
    return (
      <ProtectedRoute>
        <DashboardLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedPlants={selectedPlants}
          onPlantsChange={setSelectedPlants}
          showPlantFilter={false}
          onBackToPreview={goToPreview}
        >
          {renderSubmissionContent()}
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return null;
}

export default App;
