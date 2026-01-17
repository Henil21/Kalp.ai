import { useState, useEffect } from "react";
import SpaceCanvas from "../../components/space/SpaceCanvas";
import { footerPlanets } from "../../components/space/footerPlanets";

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "5c39e495-f286-4516-9fc3-4ff46e83aafd", // web3forms access key
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "Footer Inquiry - Kalp Lab",
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error("Submission failed");

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="relative w-full px-6 py-32 border-t border-[#e6e6db] overflow-hidden"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* 🌌 BACKGROUND PLANETS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceCanvas planets={footerPlanets} />
      </div>

      {/* 🧊 CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Icon */}
        <div className="size-14 bg-primary rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-xl text-text-main">
            mail
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif italic text-text-main">
          Let’s connect.
        </h2>

        {/* Subtext */}
        <p className="text-text-muted max-w-md">
          Have a question or idea? Send us a quick inquiry.
        </p>

        {/* ✅ FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="h-12 px-6 rounded-full bg-[#fafaf7] border border-[#e6e6db] text-text-main placeholder:text-stone-400 focus:outline-none focus:border-text-main transition"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="h-12 px-6 rounded-full bg-[#fafaf7] border border-[#e6e6db] text-text-main placeholder:text-stone-400 focus:outline-none focus:border-text-main transition"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="px-6 py-4 rounded-xl bg-[#fafaf7] border border-[#e6e6db] text-text-main placeholder:text-stone-400 focus:outline-none focus:border-text-main transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 px-8 rounded-full bg-text-main text-white font-semibold hover:bg-stone-800 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>

          {/* ✅ SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 text-sm text-center mt-2">
              ✔ Inquiry sent successfully. I’ll get back to you soon!
            </p>
          )}

          {/* ❌ ERROR MESSAGE */}
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">
              ✖ Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* Footer Bottom */}
        <div className="text-xs text-stone-300 mt-6">
          © 2024 Kalp Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
