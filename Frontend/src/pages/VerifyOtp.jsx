import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, requestOtp } = useAuth();

  const email = state?.email;
  const redirectTo = state?.from || "/home"; // ✅ IMPORTANT

  // ⏳ Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!email) {
    return (
      <p className="text-center mt-20 text-text-muted">
        Invalid request
      </p>
    );
  }

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    setError("");
    try {
      await verifyOtp({ email, otp });
      navigate(redirectTo, { replace: true }); // ✅ FIX
    } catch {
      setError("Invalid or expired OTP");
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    setError("");
    try {
      await requestOtp(email);
      setCooldown(30);
    } catch {
      setError("Failed to resend OTP");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border p-10 text-center space-y-6">

        <h2 className="text-3xl font-serif italic">
          Verify OTP
        </h2>

        <p className="text-sm text-text-muted">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full h-12 px-6 rounded-full border text-center tracking-widest"
        />

        <button
          onClick={handleVerify}
          className="w-full h-12 rounded-full bg-text-main text-white font-semibold"
        >
          Verify & Login
        </button>

        {/* 🔁 Resend */}
        <button
          onClick={handleResend}
          disabled={cooldown > 0}
          className={`text-sm underline ${
            cooldown > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-text-muted"
          }`}
        >
          {cooldown > 0
            ? `Resend OTP in ${cooldown}s`
            : "Resend OTP"}
        </button>

      </div>
    </section>
  );
}
