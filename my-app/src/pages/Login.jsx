import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
  const { user, loginWithGoogle, loading } = useAuthStore();
  const location = useLocation();

  // Redirect to intended page or dashboard if already authenticated
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      window.location.href = from;
    }
  }, [user, location]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // If already authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to access your account
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-600 mr-2"></div>
                Signing in...
              </div>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
        
        <div className="text-center text-xs sm:text-sm text-gray-600">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
} 