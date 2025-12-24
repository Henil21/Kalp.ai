import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("PASSWORD");

  const { login, requestOtp } = useAuth();
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleOtpRequest = async () => {
    if (!email) return setError("Enter email first");
    await requestOtp(email);
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background-light px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border p-10 text-center space-y-8">

        <h2 className="text-4xl font-serif italic">Welcome Back</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {mode === "PASSWORD" ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Institutional Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-6 rounded-full border"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-6 rounded-full border"
            />

            <button className="w-full h-12 rounded-full bg-text-main text-white font-semibold">
              Login
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Institutional Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-6 rounded-full border"
            />

            <button
              onClick={handleOtpRequest}
              className="w-full h-12 rounded-full bg-text-main text-white font-semibold"
            >
              Send OTP
            </button>
          </div>
        )}

        <button
          onClick={() =>
            setMode(mode === "PASSWORD" ? "OTP" : "PASSWORD")
          }
          className="text-sm underline text-text-muted"
        >
          {mode === "PASSWORD"
            ? "Login with OTP instead"
            : "Login with password instead"}
        </button>

        <p className="text-sm text-text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
