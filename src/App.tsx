import { useState } from "react";
import { toast } from "react-toastify";
import { Navbar } from "./Components/Navbar";
import { Header } from "./Components/Header";
import { Login } from "./Pages/Auth/Login";
import { Preview } from "./Pages/Preview";
import SafetyDashboard from "./Pages/Dashboard/Safety/Dashboard";
import QualityDashboard from "./Pages/Dashboard/Quality/Dashboard";
import DeliveryDashboard from "./Pages/Dashboard/Delivery/Dashboard";
import MfgDashboard from "./Pages/Dashboard/Mfg/Dashboard";
import { SafetyForm } from "./Pages/FormSubmission/Safety/Form";

type PageType = "login" | "preview" | "dashboard" | "submission";

function App() {
  // Always start with login page as initial route
  const [currentPage, setCurrentPage] = useState<PageType>("login");
  const [activeTab, setActiveTab] = useState("Safety");
  const [activeSubmissionTab, setActiveSubmissionTab] = useState("Safety");
  const [selectedPlants, setSelectedPlants] = useState<string[]>(["all"]);

  // Check session validity before accessing protected pages
  const isAuthenticated = (): boolean => {
    const session = localStorage.getItem("user_sessions");
    if (!session) return false;

    try {
      const { isLoggedIn, loginTime } = JSON.parse(session);
      const now = new Date().getTime();
      const sessionTime = new Date(loginTime).getTime();
      const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);

      if (isLoggedIn && hoursDiff < 24) {
        return true;
      } else {
        localStorage.removeItem("user_sessions");
        return false;
      }
    } catch {
      localStorage.removeItem("user_sessions");
      return false;
    }
  };

  // Handle Login
  const handleLogin = () => {
    setCurrentPage("preview");
  };

  // Handle Navigation from Preview
  const handleNavigateFromPreview = (page: "dashboard" | "submission") => {
    if (!isAuthenticated()) {
      toast.error("Session expired. Please login again.");
      setCurrentPage("login");
      return;
    }
    setCurrentPage(page);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user_sessions");
    toast.success("Logged out successfully!");
    setCurrentPage("login");
  };

  // Render Dashboard based on active tab
  const renderDashboard = () => {
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
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Management Dashboard
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <SafetyDashboard selectedPlants={selectedPlants} />;
    }
  };

  // LOGIN PAGE
  if (currentPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onGoToPreview={() => {
          if (isAuthenticated()) {
            setCurrentPage("preview");
          }
        }}
      />
    );
  }

  // PREVIEW/LANDING PAGE
  if (currentPage === "preview") {
    if (!isAuthenticated()) {
      toast.error("Please login first.");
      setCurrentPage("login");
      return null;
    }
    return <Preview onNavigate={handleNavigateFromPreview} onLogout={handleLogout} />;
  }

  // DASHBOARD PAGE
  if (currentPage === "dashboard") {
    if (!isAuthenticated()) {
      toast.error("Please login first.");
      setCurrentPage("login");
      return null;
    }
    return (
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedPlants={selectedPlants}
          onPlantsChange={setSelectedPlants}
          showFilters={true}
          showBackToLanding={true}
          onBackToLanding={() => setCurrentPage("preview")}
        />
        <Header activeTab={activeTab} />
        <div className="flex-1 overflow-hidden relative">{renderDashboard()}</div>
      </div>
    );
  }

  // Render Form Submission based on active submission tab
  const renderSubmissionForm = () => {
    switch (activeSubmissionTab) {
      case "Safety":
        return <SafetyForm />;
      case "Quality":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Quality Submission Form
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case "Delivery":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Delivery Submission Form
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case "Mfg.Capability":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Mfg.Capability Submission Form
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      case "Management":
        return (
          <div className="min-h-screen bg-[#EEE9E5] p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-[#1864ab]">
                Management Submission Form
              </h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <SafetyForm />;
    }
  };

  // SUBMISSION PAGE
  if (currentPage === "submission") {
    if (!isAuthenticated()) {
      toast.error("Please login first.");
      setCurrentPage("login");
      return null;
    }
    return (
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <Navbar
          activeTab={activeSubmissionTab}
          onTabChange={setActiveSubmissionTab}
          selectedPlants={selectedPlants}
          onPlantsChange={setSelectedPlants}
          showFilters={false}
          showBackToLanding={true}
          onBackToLanding={() => setCurrentPage("preview")}
        />
        <div className="flex-1 overflow-hidden relative">{renderSubmissionForm()}</div>
      </div>
    );
  }

  return null;
}

export default App;
