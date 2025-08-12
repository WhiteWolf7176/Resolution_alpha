import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import PhotoPage from "./pages/PhotoPage";
import useAuthStore from "./store/useAuthStore";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;
