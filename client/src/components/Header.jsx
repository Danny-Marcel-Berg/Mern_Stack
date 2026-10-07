import { FaSearch, FaHardHat, FaPhoneAlt, FaCalculator } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 shadow-lg border-b border-amber-400">
      {/* Top bright yellow accent bar */}
      <div className="bg-amber-400 text-slate-950 py-1.5 px-4 text-xs font-bold border-b border-amber-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-slate-900" />
              Direct Line: <a href="tel:18005552739" className="underline hover:text-blue-900">1-800-555-APEX (2739)</a>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline">Licensed & Insured #GC-982341-CA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
              ⚡ 24/7 Emergency Service
            </span>
            <a href="#consultation" className="hidden sm:inline font-extrabold text-slate-900 hover:text-blue-900 underline">
              Book Site Assessment &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-amber-500 text-slate-950 p-2.5 rounded-2xl shadow-md group-hover:bg-amber-400 group-hover:scale-105 transition-all">
            <FaHardHat className="text-2xl" />
          </div>
          <div>
            <div className="font-black text-2xl tracking-tight leading-none text-slate-950 flex items-center gap-1">
              APEX <span className="text-amber-500 font-extrabold">BUILD</span>
            </div>
            <div className="text-[10px] text-amber-600 font-extrabold tracking-widest uppercase mt-0.5">
              Construction & Development Co.
            </div>
          </div>
        </Link>

        {/* Bright Search Bar for Projects */}
        <form
          onSubmit={handleSubmit}
          className="bg-amber-50 border-2 border-amber-300 p-1.5 rounded-xl flex items-center focus-within:border-amber-500 focus-within:bg-white transition-all w-full max-w-xs hidden sm:flex shadow-inner"
        >
          <input
            className="bg-transparent focus:outline-none text-xs text-slate-900 font-medium placeholder-slate-500 px-2 w-full"
            type="text"
            placeholder="Search projects, blueprints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search" className="bg-amber-500 text-slate-950 p-2 rounded-lg font-bold hover:bg-amber-400 transition-colors shadow">
            <FaSearch className="text-xs" />
          </button>
        </form>

        {/* Links & Navigation */}
        <nav className="flex items-center gap-6 text-sm font-extrabold text-slate-800">
          <Link to="/" className="hover:text-amber-600 transition-colors py-1">
            Home
          </Link>
          <a href="#services" className="hidden md:inline hover:text-amber-600 transition-colors py-1">
            Services
          </a>
          <Link to="/search" className="hover:text-amber-600 transition-colors py-1">
            Portfolio
          </Link>
          <a href="#estimator" className="hidden lg:flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-black transition-colors py-1 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
            <FaCalculator className="text-xs text-amber-600" />
            Cost Estimator
          </a>
          <Link to="/about" className="hidden sm:inline hover:text-amber-600 transition-colors py-1">
            About Us
          </Link>

          <a
            href="#consultation"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-amber-500/30 text-xs sm:text-sm uppercase tracking-wider"
          >
            Get Free Quote
          </a>

          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-amber-500"
                src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt="profile"
              />
            ) : (
              <span className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors">
                Sign In
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
