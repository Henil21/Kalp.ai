import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import { useLoader } from "./context/LoaderContext";
import TopLoader from "./components/TopLoader";
import RouteLoader from "./components/RouteLoader";

import IntroVideo from "./components/IntroVideo";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Research from "./pages/Research";
import About from "./pages/About";
import VerifyOtp from "./pages/VerifyOtp";

/* =========================
   Routes
========================= */
function AppRoutes() {
  const { loading: authLoading } = useAuth();

  // 🔒 Wait for auth to resolve
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-text-muted">
        Loading…
      </div>
    );
  }

  return (
    <Routes>
      {/* 🌍 Default */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 🌍 Public routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* 🔒 Protected */}
      <Route
        path="/research"
        element={
          <ProtectedRoute>
            <Research />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

/* =========================
   Main App
========================= */
export default function App() {
  const [showIntro, setShowIntro] = useState(
    !localStorage.getItem("introPlayed")
  );

  const { loading } = useLoader(); // 🌍 GLOBAL loader

  return (
    <>
      {/* 🔝 Top Progress Loader */}
      {loading && <TopLoader />}

      {/* 🔄 Route change loader */}
      <RouteLoader />

      {/* 🎬 Intro Video */}
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
    </>
  );
}
