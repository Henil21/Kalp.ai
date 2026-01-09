import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import SpaceCanvas from "../components/space/SpaceCanvas";
import { signupPlanets } from "../components/space/signupPlanet";

const AVATARS = [
  {
    name: "TARS",
    image:
      "https://ih1.redbubble.net/image.782884253.3467/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u10.jpg",
  },
  {
    name: "C3PO",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBn3__BFva1DI7u_ra821Zx_P_gagpn4P8w&s",
  },
  {
    name: "GROOT",
    image:
      "https://earthlycreations.in/wp-content/uploads/2023/09/Groot-Flower-Pot-1.jpg",
  },
  {
    name: "ULTRON",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcWVgT8ERrEWdGlKvgjgRpOVKPpgYSN-q4A&s",
  },
  {
    name: "WALL-E",
    image:
      "https://p.turbosquid.com/ts-thumb/vT/20PdV9/Jp/walle_r_01/png/1658160209/1920x1080/fit_q87/7a17cfb94b2fe577ef000ccf0d27642255b45a63/walle_r_01.jpg",
  },
];

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EXPLORER",
    avatar: AVATARS[0],
  });

  const [error, setError] = useState("");
  const { signup, requestOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form);
      await requestOtp(form.email);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch {
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* 🌌 INTERACTIVE 3D BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SpaceCanvas planets={signupPlanets} />
      </div>

      {/* 🧊 UI LAYER (click-through by default) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pointer-events-none">
        {/* 🔐 SIGNUP CARD */}
        <div
          className="pointer-events-auto w-full max-w-md rounded-3xl border p-10 text-center space-y-8 shadow-xl"
          style={{ backgroundColor: "#FDFDFC" }}
        >
          {/* Logo */}
          <img
            src="/kalp.png"
            alt="Kalp Lab"
            className="w-14 mx-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
          />

          <h2 className="text-4xl font-serif italic">
            Join Kalp Lab
          </h2>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Avatar Picker */}
          <div className="space-y-3">
            <p className="text-sm text-text-muted">
              Choose your AI Avatar
            </p>

            <div className="grid grid-cols-5 gap-4 justify-items-center">
              {AVATARS.map((avatar) => {
                const selected = form.avatar.name === avatar.name;

                return (
                  <button
                    key={avatar.name}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, avatar })
                    }
                    className={`flex flex-col items-center gap-1 transition ${
                      selected
                        ? "scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full border overflow-hidden flex items-center justify-center transition ${
                        selected
                          ? "border-text-main"
                          : "border-gray-300"
                      }`}
                    >
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-[11px] font-mono tracking-widest text-gray-700">
                      {avatar.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Full Name"
              required
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full h-12 px-6 rounded-full border"
            />

            <input
              type="email"
              placeholder="Institutional Email"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full h-12 px-6 rounded-full border"
            />

            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full h-12 px-6 rounded-full border"
            />

            <select
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full h-12 px-6 rounded-full border"
            >
              <option value="EXPLORER">Explorer</option>
              <option value="RESEARCHER">Researcher</option>
            </select>

            <button className="w-full h-12 rounded-full bg-text-main text-white font-semibold">
              Create Account
            </button>
          </form>

          <p className="text-sm text-text-muted">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
