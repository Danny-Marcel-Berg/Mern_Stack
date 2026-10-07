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
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl">
      {/* Top emergency and info bar */}
      <div className="bg-amber-500 text-slate-950 py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-slate-900" />
              Direct Line: <a href="tel:18005552739" className="font-bold underline hover:text-slate-800">1-800-555-APEX (2739)</a>
            </span>
            <span className="hidden md:inline text-slate-800">|</span>
            <span className="hidden md:inline">Licensed & Insured #GC-982341-CA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
              24/7 Emergency Response
            </span>
            <a href="#consultation" className="hidden sm:inline font-bold hover:underline">
              Book Site Assessment &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-amber-500 p-2.5 rounded-xl text-slate-950 group-hover:bg-amber-400 transition-colors shadow-md">
            <FaHardHat className="text-2xl" />
          </div>
          <div>
            <div className="font-black text-xl tracking-tight leading-none text-white flex items-center gap-1">
              APEX <span className="text-amber-400 font-extrabold">BUILD</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">
              Construction & Development Co.
            </div>
          </div>
        </Link>

        {/* Search Bar for Projects */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 border border-slate-700 p-1.5 rounded-lg flex items-center focus-within:border-amber-400 transition-colors w-full max-w-xs hidden sm:flex"
        >
          <input
            className="bg-transparent focus:outline-none text-xs text-white placeholder-slate-400 px-2 w-full"
            type="text"
            placeholder="Search projects, engineering..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search" className="bg-amber-500 p-1.5 rounded text-slate-950 hover:bg-amber-400 transition-colors">
            <FaSearch className="text-xs" />
          </button>
        </form>

        {/* Links & Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-amber-400 transition-colors py-1">
            Home
          </Link>
          <a href="#services" className="hidden md:inline hover:text-amber-400 transition-colors py-1">
            Services
          </a>
          <Link to="/search" className="hover:text-amber-400 transition-colors py-1">
            Portfolio
          </Link>
          <a href="#estimator" className="hidden lg:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors py-1">
            <FaCalculator className="text-xs" />
            Cost Estimator
          </a>
          <Link to="/about" className="hidden sm:inline hover:text-amber-400 transition-colors py-1">
            About Us
          </Link>

          <a
            href="#consultation"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-md hover:shadow-amber-500/20 text-xs sm:text-sm"
          >
            Get Free Quote
          </a>

          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-amber-400"
                src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt="profile"
              />
            ) : (
              <span className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors">
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
