import { FaHardHat, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaAward, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2.5 rounded-xl text-slate-950">
              <FaHardHat className="text-2xl" />
            </div>
            <div>
              <div className="font-black text-xl tracking-tight text-white">
                APEX <span className="text-amber-400">BUILD</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Construction & Development Co.
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Leading general contracting & architectural engineering company. Delivering high-performance commercial towers, luxury residential homes, and structural renovations with zero compromise on safety and quality.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-amber-400 font-semibold">
            <span className="flex items-center gap-1">
              <FaShieldAlt /> OSHA 30 Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaAward /> LEED Accredited
            </span>
          </div>
        </div>

        {/* Construction Services */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-2 border-amber-500 pl-3 uppercase tracking-wider">
            Our Core Services
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Commercial Building & High-Rises</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Custom Luxury Residential Homes</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Structural Renovation & Rebuilds</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Industrial Warehouses & Logistics</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Architectural Design & 3D BIM</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Project Management & Permitting</li>
          </ul>
        </div>

        {/* Navigation & Resources */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-2 border-amber-500 pl-3 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-amber-400 transition-colors">Featured Portfolio & Projects</Link>
            </li>
            <li>
              <a href="#estimator" className="hover:text-amber-400 transition-colors">Instant Project Cost Calculator</a>
            </li>
            <li>
              <a href="#approach" className="hover:text-amber-400 transition-colors">Website & Redesign Approach</a>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">Company Leadership & Safety</Link>
            </li>
            <li>
              <a href="#consultation" className="hover:text-amber-400 transition-colors">Book Free On-Site Assessment</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-2 border-amber-500 pl-3 uppercase tracking-wider">
            Headquarters & Support
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-400 text-lg mt-0.5 shrink-0" />
              <span>742 Construction Parkway, Suite 500, Los Angeles, CA 90012</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400 shrink-0" />
              <a href="tel:18005552739" className="hover:text-amber-400 font-semibold text-white">1-800-555-APEX (2739)</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400 shrink-0" />
              <a href="mailto:info@apexbuild.com" className="hover:text-amber-400">info@apexbuild.com</a>
            </li>
            <li className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 mt-2">
              <div className="font-bold text-amber-400">Operating Hours:</div>
              <div>Mon - Fri: 7:00 AM - 6:00 PM</div>
              <div>24/7 Emergency Dispatch Available</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Apex Construction & Development Co. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Safety Guidelines</span>
          <span className="hover:underline cursor-pointer">State License #GC-982341</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
