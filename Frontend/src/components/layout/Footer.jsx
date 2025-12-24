export default function Footer() {
  return (
    <footer className="w-full px-6 py-32 bg-white border-t border-[#e6e6db]">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Icon */}
        <div className="size-14 bg-primary rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-xl text-text-main">
            science
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif italic leading-[1.2] text-text-main">
          Join the next generation of <br />
          scientific discourse.
        </h2>

        {/* Subtext */}
        <p className="text-text-muted text-base md:text-lg max-w-md leading-relaxed">
          Request early access to the Researcher Space and contribute to the
          Kalp Lab editorial board.
        </p>

        {/* Form */}
        <form className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mt-4">
          <input
            type="email"
            placeholder="Institutional Email"
            className="flex-1 h-12 px-6 rounded-full bg-[#fafaf7] border border-[#e6e6db] text-text-main placeholder:text-stone-400 focus:outline-none focus:border-text-main transition"
          />
          <button
            type="button"
            className="h-12 px-8 rounded-full bg-text-main text-white font-semibold hover:bg-stone-800 transition-colors"
          >
            Request Access
          </button>
        </form>

        {/* Links */}
        <div className="flex gap-10 mt-12 text-sm text-text-muted font-medium">
          <a href="#" className="hover:text-text-main transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-text-main transition">
            Terms of Research
          </a>
          <a href="#" className="hover:text-text-main transition">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-stone-300 mt-6">
          © 2024 Kalp Lab. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
