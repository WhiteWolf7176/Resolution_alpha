import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
} 