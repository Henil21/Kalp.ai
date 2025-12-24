import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();

  const email = state?.email;

  const handleVerify = async () => {
    try {
      await verifyOtp(email, otp);
      navigate("/");
    } catch {
      setError("Invalid or expired OTP");
    }
  };

  if (!email) {
    return <p className="text-center mt-20">Invalid request</p>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border p-10 text-center space-y-6">

        <h2 className="text-3xl font-serif italic">
          Verify OTP
        </h2>

        <p className="text-sm text-text-muted">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

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
      </div>
    </section>
  );
}
