import { ReactNode } from "react";
import { toast } from "react-toastify";
import { isAuthenticated, logout } from "../Utils/auth";
import { Login } from "../../Pages/Auth/Login";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectToLogin?: boolean;
}

export const ProtectedRoute = ({ children, redirectToLogin = true }: ProtectedRouteProps) => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    toast.error("Session expired. Please login again.");
    logout();
    return redirectToLogin ? <Login onLogin={() => window.location.reload()} /> : null;
  }

  return <>{children}</>;
};