import { useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import header from "./../../assets/Header.png";
import backgroundImage from "./../../assets/Background.png";

interface LoginProps {
  onLogin: () => void;
  onGoToPreview: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onGoToPreview }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlreadyLoggedInModal, setShowAlreadyLoggedInModal] = useState(false);
  
  // Check session on mount
  const checkSession = () => {
    const session = localStorage.getItem("user_sessions");
    if (session) {
      try {
        const { isLoggedIn, loginTime } = JSON.parse(session);
        const now = new Date().getTime();
        const sessionTime = new Date(loginTime).getTime();
        const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);
        
        if (isLoggedIn && hoursDiff < 24) {
          return true;
        } else {
          localStorage.removeItem("user_sessions");
        }
      } catch {
        localStorage.removeItem("user_sessions");
      }
    }
    return false;
  };

  const hasSession = checkSession();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if already logged in
    if (hasSession) {
      setShowAlreadyLoggedInModal(true);
      return;
    }

    // Validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    // Simulate API call with dummy authentication
    setTimeout(() => {
      // Create session
      const sessionData = {
        isLoggedIn: true,
        username: email,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("user_sessions", JSON.stringify(sessionData));
      
      toast.success("Login successful!");
      setIsLoading(false);
      onLogin();
    }, 1000);
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

          {/* Landing Page Button - Only show if session exists */}
          {hasSession && (
            <button
              onClick={onGoToPreview}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#81a1c1] hover:bg-[#81a1c1]/80 transition-colors font-semibold text-white text-xs sm:text-sm whitespace-nowrap"
            >
              Landing Page
            </button>
          )}
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1864ab] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Login to access DENSO Safety Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email / Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            This is a dummy login. Enter any credentials to proceed.
          </p>
        </div>
      </div>

      {/* Already Logged In Modal */}
      {showAlreadyLoggedInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-lg font-bold text-gray-800">Already Logged In</h3>
              <button 
                onClick={() => setShowAlreadyLoggedInModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm text-gray-600">
                You are already logged in. Would you like to go to the landing page?
              </p>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-lg">
              <button
                onClick={() => {
                  setShowAlreadyLoggedInModal(false);
                  onGoToPreview();
                }}
                className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm"
              >
                Go to Landing Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
