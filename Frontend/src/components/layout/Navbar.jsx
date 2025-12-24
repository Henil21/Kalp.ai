import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-center pt-6 px-6 z-50">
      <nav className="flex items-center justify-between w-full max-w-5xl bg-white/80 backdrop-blur-md border border-[#e6e6db] rounded-full px-6 py-3 shadow-sm">

        {/* ===== Logo ===== */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/kalp.png"
            alt="Kalp Labs logo"
            className="w-7 h-7 object-contain"
          />
          <h2 className="text-lg font-bold font-serif italic">
            Kalp Labs
          </h2>
        </Link>

        {/* ===== Nav Links ===== */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-text-muted"
          >
            Home
          </Link>
          <Link
            to="/research"
            className="text-sm font-medium hover:text-text-muted"
          >
            Research
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-text-muted"
          >
            About
          </Link>
        </div>

        {/* ===== Auth Actions ===== */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-sm font-medium hover:text-text-muted"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center justify-center h-9 px-5 rounded-full bg-primary font-bold hover:bg-yellow-300 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-sm text-text-muted">
                {user.name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:text-text-muted"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}
