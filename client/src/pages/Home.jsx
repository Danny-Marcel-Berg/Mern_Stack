import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHardHat,
  FaBuilding,
  FaHome,
  FaTools,
  FaWarehouse,
  FaDraftingCompass,
  FaCalculator,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaShieldAlt,
  FaCalendarAlt,
  FaRulerCombined,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaTimes,
  FaExchangeAlt,
} from "react-icons/fa";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Estimator State
  const [projectType, setProjectType] = useState("residential");
  const [sqft, setSqft] = useState(2500);
  const [finishLevel, setFinishLevel] = useState("premium");
  const [includeBlueprints, setIncludeBlueprints] = useState(true);
  const [includeSmartHome, setIncludeSmartHome] = useState(false);
  const [includeGreenBuild, setIncludeGreenBuild] = useState(true);

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Residential Custom Build",
    budget: "$250,000 - $500,000",
    startDate: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Apex Construction & Development Co. | General Contractor & Architectural Engineering";

    const fetchFeaturedProjects = async () => {
      try {
        const res = await fetch("/api/listing/get?limit=6");
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Estimator Logic
  const getBaseRate = () => {
    switch (projectType) {
      case "commercial":
        return 220;
      case "residential":
        return 280;
      case "renovation":
        return 130;
      case "kitchen_bath":
        return 90;
      case "industrial":
        return 160;
      default:
        return 200;
    }
  };

  const getFinishMultiplier = () => {
    switch (finishLevel) {
      case "standard":
        return 1.0;
      case "premium":
        return 1.35;
      case "luxury":
        return 1.75;
      default:
        return 1.0;
    }
  };

  const calculateEstimate = () => {
    const base = sqft * getBaseRate() * getFinishMultiplier();
    let addOns = 0;
    if (includeBlueprints) addOns += base * 0.08;
    if (includeSmartHome) addOns += base * 0.05;
    if (includeGreenBuild) addOns += base * 0.07;
    const total = base + addOns;
    return {
      min: Math.round(total * 0.92),
      max: Math.round(total * 1.08),
    };
  };

  const estimate = calculateEstimate();

  const handleApplyEstimate = () => {
    setFormData((prev) => ({
      ...prev,
      serviceType:
        projectType === "commercial"
          ? "Commercial Construction"
          : projectType === "residential"
          ? "Residential Custom Build"
          : projectType === "renovation"
          ? "Complete Renovation"
          : projectType === "industrial"
          ? "Industrial Facility"
          : "Kitchen & Bath Remodel",
      budget: `$${estimate.min.toLocaleString()} - $${estimate.max.toLocaleString()}`,
      message: `Calculated estimate for ${sqft.toLocaleString()} sq ft with ${finishLevel} finish level. Add-ons included: ${
        [
          includeBlueprints && "Blueprints & Engineering",
          includeSmartHome && "Smart Automation",
          includeGreenBuild && "LEED Green Materials",
        ]
          .filter(Boolean)
          .join(", ") || "None"
      }.`,
    }));

    const elem = document.getElementById("consultation");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Filtered project list
  const filteredProjects =
    activeFilter === "all"
      ? offerListings
      : offerListings.filter((p) => p.type === activeFilter);

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-7/12 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">
              <FaHardHat /> Premier General Contractor & Architectural Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Rebuilding & Constructing With <span className="text-amber-400">Precision</span> & <span className="text-amber-400">Innovation</span>.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              From high-rise commercial headquarters and industrial complexes to custom luxury residences and architectural redesigns. Apex Build delivers superior craftsmanship, on-time execution, and transparent cost estimates.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#estimator"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <FaCalculator /> Instant Cost Estimator
              </a>
              <Link
                to="/search"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                Explore Projects <FaArrowRight className="text-amber-400" />
              </Link>
            </div>

            {/* Key Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">250+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">18+ Yrs</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Industry Proven</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">99.8%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-medium">On-Time Completion</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-medium">OSHA Certified</div>
              </div>
            </div>
          </div>

          {/* Quick Hero Feature Card */}
          <div className="lg:w-5/12 w-full">
            <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaShieldAlt className="text-amber-400" /> Why Industry Leaders Choose Apex
                </h3>
                <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20">
                  Licensed #GC-982341
                </span>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-amber-400 text-lg shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Full Turnkey Execution:</strong>
                    From architectural permitting and 3D BIM design to heavy structural framing and finishing.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-amber-400 text-lg shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Fixed-Price Price Guarantee:</strong>
                    Transparent, itemized budget breakdowns with zero hidden change-order surprises.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-amber-400 text-lg shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Sustainable & LEED Gold Standards:</strong>
                    Energy-efficient materials, green building options, and smart HVAC integration.
                  </div>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Ready to discuss your site?</div>
                  <div className="text-white font-bold text-sm">Consultation is 100% Free</div>
                </div>
                <a
                  href="#consultation"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs"
                >
                  Book Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <FaTools /> Engineering & Construction Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Comprehensive Building & Remodeling Solutions
          </h2>
          <p className="text-slate-600 text-base">
            We provide end-to-end general contracting, structural engineering, and architectural redesign tailored to your specific project scope and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaBuilding />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Commercial Construction</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized in multi-story office towers, corporate headquarters, retail centers, and hospitality developments built to strict commercial codes and safety standards.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Steel & Concrete Structural Framing</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Commercial HVAC & Elevator Integration</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> ADA Compliance & Code Inspection</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Request Commercial Quote &rarr;
            </a>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaHome />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Custom Residential Homes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Building bespoke luxury homes from the ground up. We work closely with architects and homeowners to craft unique floor plans, premium finishes, and smart living spaces.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Custom Architectural Floorplans</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> High-End Millwork & Kitchen Crafting</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Energy-Efficient Heat Pumps & Solar</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Request Custom Home Quote &rarr;
            </a>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaExchangeAlt />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Structural Renovation & Rebuilds</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Transforming outdated, underperforming structures into modern, space-efficient properties. Includes load-bearing wall removal, seismic retrofitting, and facade revamps.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Historic Brick & Timber Preservation</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Open-Concept Floorplan Expansion</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Complete Mechanical & Plumbing Upgrade</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Request Renovation Assessment &rarr;
            </a>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaWarehouse />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Industrial & Distribution Logistics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                High-capacity industrial facilities, distribution centers, cold storage warehouses, and tech manufacturing parks designed for optimal supply-chain performance.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Heavy-Load Concrete Slabs</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> High-Clearance Automated Docks</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Industrial Power Grid Distribution</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Request Industrial Quote &rarr;
            </a>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaDraftingCompass />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Architectural Design & 3D BIM</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Leveraging Building Information Modeling (BIM) and 3D architectural rendering to visualize every angle, avoid spatial conflicts, and refine structural plans prior to break-ground.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Photorealistic 3D Walkthroughs</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Structural Clash Detection</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Municipal Blueprint Expediting</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Explore Design Packages &rarr;
            </a>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Project Management & Consulting</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Independent construction management, quality control audits, site supervision, and permit management to keep your construction project strictly on schedule and within budget.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Subcontractor Supervision</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Material Sourcing & Cost Audits</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-amber-500" /> Daily Site Safety Inspections</li>
              </ul>
            </div>
            <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              Speak With Project Manager &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* INTERACTIVE INSTANT COST ESTIMATOR */}
      <section id="estimator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="bg-amber-500/20 text-amber-400 font-bold text-xs uppercase px-3 py-1 rounded-full border border-amber-500/30">
              <FaCalculator className="inline mr-1" /> Interactive Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Instant Project Cost Calculator
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Calculate an immediate, itemized estimate for your upcoming construction, build, or renovation project in real time.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Project Type */}
              <div>
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                  1. Select Construction Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: "residential", name: "Custom Home", icon: FaHome },
                    { id: "commercial", name: "Commercial Tower", icon: FaBuilding },
                    { id: "renovation", name: "Full Renovation", icon: FaExchangeAlt },
                    { id: "industrial", name: "Industrial Hub", icon: FaWarehouse },
                    { id: "kitchen_bath", name: "Kitchen & Bath", icon: FaTools },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setProjectType(item.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2 text-xs font-bold ${
                          projectType === item.id
                            ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md"
                            : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <Icon className="text-base shrink-0" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Square Footage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    2. Estimated Area (Sq. Ft.)
                  </label>
                  <span className="text-amber-400 font-extrabold text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    {sqft.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>500 sq ft</span>
                  <span>10,000 sq ft</span>
                  <span>25,000 sq ft</span>
                </div>
              </div>

              {/* Step 3: Finish Level */}
              <div>
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                  3. Quality & Material Grade
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "standard", name: "Standard Grade", desc: "Reliable contractor grade materials" },
                    { id: "premium", name: "Executive Premium", desc: "High-durability architectural materials" },
                    { id: "luxury", name: "Ultra Luxury Custom", desc: "Bespoke stone, smart home & imported finishes" },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFinishLevel(level.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        finishLevel === level.id
                          ? "bg-amber-500/10 border-amber-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-0.5">{level.name}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Add-ons */}
              <div>
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                  4. Add-On Engineering Features
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <FaDraftingCompass className="text-amber-400" /> Architectural Blueprints & 3D BIM Modeling (+8%)
                    </span>
                    <input
                      type="checkbox"
                      checked={includeBlueprints}
                      onChange={(e) => setIncludeBlueprints(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <FaTools className="text-amber-400" /> Integrated Smart Automation & Security (+5%)
                    </span>
                    <input
                      type="checkbox"
                      checked={includeSmartHome}
                      onChange={(e) => setIncludeSmartHome(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <FaShieldAlt className="text-amber-400" /> LEED Gold Eco Materials & Solar Array (+7%)
                    </span>
                    <input
                      type="checkbox"
                      checked={includeGreenBuild}
                      onChange={(e) => setIncludeGreenBuild(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Estimated Output Panel */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>Estimated Total Budget</span>
                  <span className="text-amber-400 font-normal">Real-Time Calculation</span>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 text-center space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Cost Range</div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400">
                    ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Includes estimated labor, framing, materials & permit management.
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Target Area:</span>
                    <span className="font-bold text-white">{sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Avg Cost / Sq. Ft.:</span>
                    <span className="font-bold text-white">
                      ${Math.round((estimate.min + estimate.max) / 2 / sqft)} / sq ft
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Material Standard:</span>
                    <span className="font-bold text-amber-400 capitalize">{finishLevel} Grade</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2"
                >
                  <FaCheckCircle /> Transfer Estimate To Consultation Request &rarr;
                </button>
                <div className="text-[11px] text-slate-400 text-center">
                  *Disclaimer: Final engineering estimates are subject to site survey and blueprint inspection.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS & PORTFOLIO SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <FaBuilding /> Our Work & Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Featured Construction & Rebuild Projects
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our recent commercial, residential, and structural renovation developments.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "commercial", label: "Commercial" },
              { id: "residential", label: "Residential" },
              { id: "renovation", label: "Renovations" },
              { id: "industrial", label: "Industrial" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === btn.id
                    ? "bg-slate-900 text-amber-400 shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.imageUrls?.[0] || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.type}
                    </div>
                    {project.offer && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full">
                        Featured Project
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                      <FaRulerCombined className="text-amber-500" />
                      <span>{project.address}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Project Value</div>
                    <div className="text-base font-extrabold text-slate-900">
                      ${project.regularPrice?.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-3 text-center py-10">No projects found for this category.</p>
          )}
        </div>
      </section>

      {/* OUR APPROACH TO WEBSITE & REDESIGN PROJECTS */}
      <section id="approach" className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              <FaDraftingCompass /> Professional Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Methodology For Rebuilding & Redesigning Existing Websites
            </h2>
            <p className="text-slate-600 text-base">
              Whether rebuilding an architectural physical property or transforming an existing digital web platform, Apex applies a rigorous 5-stage engineering blueprint.
            </p>
          </div>

          {/* 5-Step Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {[
              {
                step: "01",
                title: "Structural Audit & Discovery",
                desc: "We analyze legacy website code, UI bottlenecks, mobile responsiveness, and client goals.",
              },
              {
                step: "02",
                title: "Architectural & UX Redesign",
                desc: "Designing clean React component hierarchies, responsive layouts, and interactive conversion tools.",
              },
              {
                step: "03",
                title: "Precision Rebuilding & Testing",
                desc: "Developing fast modular components, robust API endpoints, and clean CSS styling.",
              },
              {
                step: "04",
                title: "Quality Assurance & QA",
                desc: "Conducting cross-browser verification, performance profiling, and accessibility testing.",
              },
              {
                step: "05",
                title: "Deployment & Growth Support",
                desc: "Launching the upgraded platform with continuous monitoring and instant customer engagement.",
              },
            ].map((st) => (
              <div key={st.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
                <div className="text-3xl font-black text-amber-500/30">{st.step}</div>
                <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Before & After Case Studies */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Relevant Examples: Redesign & Rebuilding Case Studies
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Real results from our website & architectural modernization projects.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Case 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-md inline-block uppercase">
                  Website & Digital Rebuild
                </div>
                <h4 className="text-base font-bold text-slate-900">Legacy Real Estate to Modern Construction Hub</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <strong>Before:</strong> Cluttered generic template, poor mobile experience, slow response times.
                  </div>
                  <div className="p-2.5 bg-green-50 text-green-800 rounded-lg border border-green-200">
                    <strong>After:</strong> High-performance React app with instant quote estimator & rich project portfolio.
                  </div>
                </div>
                <div className="pt-2 text-xs font-bold text-slate-800 flex items-center justify-between border-t border-slate-200">
                  <span>Client Lead Engagement:</span>
                  <span className="text-amber-600 font-extrabold">+240% Growth</span>
                </div>
              </div>

              {/* Case 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-md inline-block uppercase">
                  Commercial Facility Overhaul
                </div>
                <h4 className="text-base font-bold text-slate-900">Historic Headquarters Modernization</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <strong>Before:</strong> High energy losses, outdated floor plan, decaying masonry facade.
                  </div>
                  <div className="p-2.5 bg-green-50 text-green-800 rounded-lg border border-green-200">
                    <strong>After:</strong> Seismic retrofitting, glass curtain wall facade, and LEED Gold certification.
                  </div>
                </div>
                <div className="pt-2 text-xs font-bold text-slate-800 flex items-center justify-between border-t border-slate-200">
                  <span>Energy Savings:</span>
                  <span className="text-amber-600 font-extrabold">-42% Utility Cost</span>
                </div>
              </div>

              {/* Case 3 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-md inline-block uppercase">
                  Residential Eco-Remodel
                </div>
                <h4 className="text-base font-bold text-slate-900">Malibu Cliffside Residence Rebuild</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    <strong>Before:</strong> Aging wood frame structure susceptible to coastal erosion.
                  </div>
                  <div className="p-2.5 bg-green-50 text-green-800 rounded-lg border border-green-200">
                    <strong>After:</strong> Cantilevered concrete foundation, smart glass walls, and infinity deck.
                  </div>
                </div>
                <div className="pt-2 text-xs font-bold text-slate-800 flex items-center justify-between border-t border-slate-200">
                  <span>Property Value Increase:</span>
                  <span className="text-amber-600 font-extrabold">+185% Appraised Value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <FaStar className="text-amber-500" /> Client Recommendations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Trusted By Property Owners & Developers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Apex Build completely transformed our commercial headquarters. Their transparent cost estimates and daily site reports made the entire process seamless.",
              author: "Marcus Vance",
              role: "CEO, Horizon Commercial Group",
              rating: 5,
            },
            {
              quote:
                "Rebuilding our coastal residence required complex engineering. Apex delivered on time and within budget. The structural quality is unmatched.",
              author: "Elena Rostova",
              role: "Homeowner, Malibu CA",
              rating: 5,
            },
            {
              quote:
                "The redesign of our web platform and property portal surpassed all expectations. Client inquiries doubled within the first month!",
              author: "David Chen",
              role: "Director of Development, Metro Properties",
              rating: 5,
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-500 text-sm">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                <div className="text-xs text-amber-600 font-semibold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONSULTATION & BOOKING FORM */}
      <section id="consultation" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="bg-amber-500/20 text-amber-400 font-bold text-xs uppercase px-3 py-1 rounded-full border border-amber-500/30">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Ready to Start Your Construction or Redesign Project?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule a free on-site consultation or request a custom engineering proposal. Our senior project team will review your specifications and get back to you within 24 hours.
            </p>

            <div className="space-y-4 text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-bold">
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Hotline:</div>
                  <div className="text-white font-bold text-base">1-800-555-APEX (2739)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-bold">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Inquiry Email:</div>
                  <div className="text-white font-bold text-base">estimates@apexbuild.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Consultation Request Received!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-amber-400">{formData.name}</strong>. Our chief estimator has received your details and will contact you shortly to schedule your site assessment.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2 border-b border-slate-800 pb-3">
                  Request Free On-Site Consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Project Category</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>Commercial Construction</option>
                      <option>Residential Custom Build</option>
                      <option>Complete Renovation</option>
                      <option>Industrial Facility</option>
                      <option>Kitchen & Bath Remodel</option>
                      <option>Website & Digital Rebuild</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Budget Expectation</label>
                    <input
                      type="text"
                      placeholder="e.g. $250,000 - $500,000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Target Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Project Scope / Blueprint Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Provide details about your project location, square footage, requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
                >
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-slate-900 text-white p-2 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-colors z-10"
            >
              <FaTimes />
            </button>

            <img
              src={selectedProject.imageUrls?.[0]}
              alt={selectedProject.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {selectedProject.type}
                </span>
                <span className="text-lg font-black text-slate-900">
                  Valuation: ${selectedProject.regularPrice?.toLocaleString()}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">{selectedProject.name}</h3>

              <p className="text-sm text-slate-600 leading-relaxed">{selectedProject.description}</p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800">Key Engineering Highlights:</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• Structural Steel & Reinforced Concrete Foundation</li>
                  <li>• High-efficiency Glass Facade & Smart Energy Controls</li>
                  <li>• Delivered On-Schedule with Full OSHA Compliance</li>
                  <li>• Location: {selectedProject.address}</li>
                </ul>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="#consultation"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-center text-xs"
                >
                  Inquire For Similar Build
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-3 rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
