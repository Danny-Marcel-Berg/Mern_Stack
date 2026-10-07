import { FaHardHat, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaAward } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 pt-16 pb-8 border-t-8 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2.5 rounded-2xl text-slate-950 font-black shadow-md">
              <FaHardHat className="text-2xl" />
            </div>
            <div>
              <div className="font-black text-2xl tracking-tight text-white">
                APEX <span className="text-amber-400">BUILD</span>
              </div>
              <div className="text-[10px] text-amber-400 font-extrabold tracking-widest uppercase">
                Construction & Development Co.
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Premier general contracting & architectural engineering firm. Building high-performance commercial towers, custom luxury homes, and complete structural redesigns with zero compromise on quality and safety.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-amber-400 font-bold">
            <span className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
              <FaShieldAlt /> OSHA 30 Certified
            </span>
            <span className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
              <FaAward /> LEED Accredited
            </span>
          </div>
        </div>

        {/* Construction Services */}
        <div>
          <h4 className="text-amber-400 font-black text-base mb-4 border-l-4 border-amber-400 pl-3 uppercase tracking-wider">
            Our Core Services
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-semibold">
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Commercial High-Rise Building</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Custom Residential Homes</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Structural Renovation & Rebuilds</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Industrial Warehouses & Logistics</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Architectural 3D BIM Design</li>
            <li className="hover:text-amber-400 transition-colors cursor-pointer">Project Management & Permits</li>
          </ul>
        </div>

        {/* Navigation & Resources */}
        <div>
          <h4 className="text-amber-400 font-black text-base mb-4 border-l-4 border-amber-400 pl-3 uppercase tracking-wider">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-semibold">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-amber-400 transition-colors">Featured Project Portfolio</Link>
            </li>
            <li>
              <a href="#estimator" className="hover:text-amber-400 transition-colors">Instant Project Cost Calculator</a>
            </li>
            <li>
              <a href="#approach" className="hover:text-amber-400 transition-colors">Redesign & Building Methodology</a>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">Leadership & Safety Compliance</Link>
            </li>
            <li>
              <a href="#consultation" className="hover:text-amber-400 transition-colors">Book Free On-Site Assessment</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-amber-400 font-black text-base mb-4 border-l-4 border-amber-400 pl-3 uppercase tracking-wider">
            Headquarters & Support
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-400 text-lg mt-0.5 shrink-0" />
              <span>742 Construction Parkway, Suite 500, Los Angeles, CA 90012</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400 shrink-0" />
              <a href="tel:18005552739" className="hover:text-amber-400 font-extrabold text-white text-base">1-800-555-APEX (2739)</a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400 shrink-0" />
              <a href="mailto:info@apexbuild.com" className="hover:text-amber-400 font-semibold">info@apexbuild.com</a>
            </li>
            <li className="bg-amber-400 text-slate-950 p-3 rounded-xl font-bold text-xs shadow-md mt-2">
              <div className="font-extrabold text-slate-950 uppercase tracking-wide">Operating Hours:</div>
              <div>Mon - Fri: 7:00 AM - 6:00 PM</div>
              <div>24/7 Emergency Dispatch Available</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-semibold gap-4">
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
