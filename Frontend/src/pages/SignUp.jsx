import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EXPLORER",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    navigate("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background-light px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border p-10 text-center space-y-8">

        <h2 className="text-4xl font-serif italic">Join Kalp Lab</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full h-12 px-6 rounded-full border"
          />

          <input
            type="email"
            placeholder="Institutional Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-12 px-6 rounded-full border"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full h-12 px-6 rounded-full border"
          />

          <select
            onChange={(e) => setForm({ ...form, role: e.target.value })}
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
    </section>
  );
}
