import PlanetScene from "./components/three/PlanetScene";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Research from "./pages/Research";
import About from "./pages/About";
import VerifyOtp from "./pages/VerifyOtp";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />


            <Route
              path="/research"
              element={
                <ProtectedRoute>
                  <Research />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>

                  <Home />
                </ProtectedRoute>
              }
            />
          <Route path="/about" element={<About />} />
          </Routes>


        </BrowserRouter>
      </AuthProvider>
      {/* 
      <div className="w-screen h-screen bg-black">
        <PlanetScene
          planets={[
            {
              texture: "/textures/2k_eris_fictional.jpg",
              size: 0.5,
              distance: 2.6,
              orbitSpeed: 0.05,     // 🔥 FAST
              rotationSpeed: 0.01,
              inclination: 0.45,   // yellow line style
            },
            {
              texture: "/textures/2k_haumea_fictional.jpg",
              size: 0.6,
              distance: 4,
              orbitSpeed: 0.035,
              rotationSpeed: 0.008,
              inclination: 0.6,    // different plane
            },
          ]}
        />
      </div>
      */}
    </>
  );
}
