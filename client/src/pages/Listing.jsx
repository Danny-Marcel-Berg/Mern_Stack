import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHardHat,
  FaBuilding,
  FaMapMarkerAlt,
  FaShare,
  FaShieldAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaRulerCombined,
  FaHammer,
  FaCalendarAlt,
} from "react-icons/fa";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        document.title = `${data.name} | Apex Construction`;
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="max-w-6xl mx-auto p-4 my-8 text-slate-800">
      {loading && (
        <p className="text-center my-12 text-2xl font-bold text-slate-600">
          Loading Construction Specifications...
        </p>
      )}
      {error && (
        <div className="text-center my-12 bg-red-50 text-red-600 p-8 rounded-2xl border border-red-200">
          <p className="text-xl font-bold">Project details could not be loaded!</p>
          <Link to="/search" className="text-xs font-bold underline mt-2 inline-block">
            Return to Portfolio
          </Link>
        </div>
      )}
      {listing && !loading && !error && (
        <div className="space-y-8">
          {/* Top Banner & Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
              <img
                src={listing.imageUrls?.[activeImageIndex] || listing.imageUrls?.[0]}
                alt={listing.name}
                className="w-full h-[450px] object-cover"
              />
              <div
                className="absolute top-4 right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-900/80 text-white cursor-pointer shadow-lg hover:bg-amber-500 hover:text-slate-950 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              >
                <FaShare />
              </div>
              {copied && (
                <p className="absolute top-18 right-4 z-10 rounded-xl bg-slate-900 text-amber-400 font-bold px-3 py-1 text-xs shadow-md border border-slate-700">
                  Project Link Copied!
                </p>
              )}
            </div>

            {/* Thumbnail selector */}
            {listing.imageUrls && listing.imageUrls.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {listing.imageUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all w-28 h-20 shrink-0 ${
                      activeImageIndex === idx ? "border-amber-500 scale-105 shadow-md" : "border-slate-200 opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">
                    {listing.type || "Construction Build"}
                  </span>
                  <span className="bg-slate-900 text-amber-400 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <FaShieldAlt /> OSHA 30 Certified
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  {listing.name}
                </h1>
                <p className="flex items-center gap-1.5 text-slate-600 text-sm mt-2 font-medium">
                  <FaMapMarkerAlt className="text-amber-500" />
                  {listing.address}
                </p>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <FaHammer className="text-amber-500" /> Architectural Scope & Engineering Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Project Specs Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-bold uppercase">Estimated Valuation</div>
                  <div className="text-base font-black text-slate-900">${listing.regularPrice?.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-bold uppercase">Contract Status</div>
                  <div className="text-base font-bold text-amber-600">Turnkey Handover</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-bold uppercase">Engineering Grade</div>
                  <div className="text-base font-bold text-slate-900">Commercial / LEED</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-bold uppercase">Warranty Included</div>
                  <div className="text-base font-bold text-green-700">10-Yr Structural</div>
                </div>
              </div>
            </div>

            {/* Sidebar Inquiry Card */}
            <div className="lg:col-span-4 bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6 h-fit">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <div className="text-xs text-amber-400 font-bold uppercase">General Contractor Contact</div>
                <h3 className="text-xl font-black text-white">Inquire About This Build</h3>
                <p className="text-xs text-slate-400">
                  Request custom floor plans, architectural blueprints, or site assessment for a similar project.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-amber-400" />
                  <a href="tel:18005552739" className="font-bold text-white hover:text-amber-400">
                    1-800-555-APEX (2739)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-amber-400" />
                  <span>estimates@apexbuild.com</span>
                </div>
              </div>

              <Link
                to="/#consultation"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-colors text-center text-xs uppercase tracking-wider block"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
