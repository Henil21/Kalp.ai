import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import SpaceCanvas from "../components/space/SpaceCanvas";
import { loginPlanets } from "../components/space/loginPlanets";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("PASSWORD");

  const { login, requestOtp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 where user should go after login
  const redirectTo = location.state?.from || "/home";

  // ✅ already logged in
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleOtpRequest = async () => {
    if (!email) return setError("Enter email first");
    try {
      await requestOtp(email);
      navigate("/verify-otp", {
        state: { email, from: redirectTo },
      });
    } catch {
      setError("Failed to send OTP");
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* 🌌 INTERACTIVE 3D BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SpaceCanvas planets={loginPlanets} />
      </div>

      {/* 🧊 UI LAYER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md rounded-3xl border p-10 text-center space-y-8 shadow-xl"
          style={{ backgroundColor: "#FDFDFC" }}
        >
          <h2 className="text-4xl font-serif italic">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {mode === "PASSWORD" ? (
            <form
              onSubmit={handlePasswordLogin}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Institutional Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 rounded-full border"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-6 rounded-full border"
                required
              />

              <button className="w-full h-12 rounded-full bg-black text-white font-semibold">
                Login
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Institutional Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 rounded-full border"
                required
              />

              <button
                onClick={handleOtpRequest}
                className="w-full h-12 rounded-full bg-black text-white font-semibold"
              >
                Send OTP
              </button>
            </div>
          )}

          <button
            onClick={() =>
              setMode(mode === "PASSWORD" ? "OTP" : "PASSWORD")
            }
            className="text-sm underline text-gray-500"
          >
            {mode === "PASSWORD"
              ? "Login with OTP instead"
              : "Login with password instead"}
          </button>

          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
