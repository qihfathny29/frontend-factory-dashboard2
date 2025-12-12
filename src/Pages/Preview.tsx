import { useState } from "react";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import { ConfirmationModal } from "../Components/ConfirmationModal";
import header from "./../assets/Header.png";
import backgroundImage from "./../assets/Background.png";

interface PreviewProps {
  onNavigate: (page: "dashboard" | "submission") => void;
  onLogout: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ onNavigate, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="h-screen bg-[#EEE9E5] flex flex-col">
      {/* Navbar */}
      <nav
        className="relative w-full min-h-[70px] sm:min-h-[80px] px-3 sm:px-6 py-2 sm:py-3 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-[40px] sm:h-[50px] w-auto object-contain"
              alt="DENSO Dashboard Management Header Logo"
              src={header}
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="min-w-[100px] sm:min-w-[120px] h-[36px] sm:h-[40px] px-2 sm:px-3 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center gap-2 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4 text-white" />
            <span className="font-semibold text-white text-xs sm:text-sm">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1864ab] mb-3 sm:mb-4">
            Welcome to DENSO
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Safety Management System Dashboard
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Monitor and manage safety operations across all facilities
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
          {/* Dashboard Card */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="group bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
              <LayoutDashboard className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              Dashboard
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              View safety metrics, analytics, and performance indicators across all departments
            </p>
          </button>

          {/* Submission Card */}
          <button
            onClick={() => onNavigate("submission")}
            className="group bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6 group-hover:bg-green-200 transition-colors">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              Submission
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Submit safety reports, incident forms, and compliance documentation
            </p>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access the system."
        confirmText="Logout"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};
