import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import IntroVideo from "./components/IntroVideo";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Research from "./pages/Research";
import About from "./pages/About";
import VerifyOtp from "./pages/VerifyOtp";

/* =========================
   Auth Gate Wrapper
========================= */
function AppRoutes() {
  const { loading } = useAuth();

  // 🔒 Block routing until auth is resolved
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-text-muted">
        Loading…
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Default → Home (PUBLIC) */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 🌍 Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/research"
          element={
            <ProtectedRoute>
              <Research />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

/* =========================
   Main App
========================= */
export default function App() {
  const [showIntro, setShowIntro] = useState(
    !localStorage.getItem("introPlayed")
  );

  return (
    <AuthProvider>
      {showIntro ? (
        <IntroVideo
          onFinish={() => {
            localStorage.setItem("introPlayed", "true");
            setShowIntro(false);
          }}
        />
      ) : (
        <AppRoutes />
      )}
    </AuthProvider>
  );
}
