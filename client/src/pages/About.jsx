import { useEffect } from "react";
import { FaHardHat, FaShieldAlt, FaAward, FaBuilding, FaUsers, FaCheckCircle, FaDraftingCompass } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Apex Construction & Development Co.";
  }, []);

  return (
    <div className="w-full bg-slate-50 text-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-600 font-bold text-xs uppercase px-3 py-1.5 rounded-full">
            <FaHardHat /> About Apex Build
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Building Excellence, Engineering Trust.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Apex Construction & Development Co. is a full-service general contracting and architectural engineering firm headquartered in California. We specialize in high-impact commercial skyscrapers, custom luxury homes, industrial logistics facilities, and comprehensive structural redesigns.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto font-bold">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Uncompromising Safety</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every job site adheres to strict OSHA 30 standards, comprehensive site hazard mitigation, and zero-compromise safety protocols to protect workers and clients.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto font-bold">
              <FaAward />
            </div>
            <h3 className="text-xl font-bold text-slate-900">LEED Gold Sustainability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We integrate energy-efficient HVAC, solar grid integration, eco-friendly concrete mixes, and sustainable timber to build green futures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto font-bold">
              <FaDraftingCompass />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Precision 3D BIM Engineering</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our architectural team utilizes advanced 3D BIM modeling and clash detection to ensure blueprints execute with zero structural error.
            </p>
          </div>
        </div>

        {/* Company Leadership & Credentials */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              State Licensing & Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Fully Licensed, Bonded & Insured General Contractor
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Apex Construction operates under Class A General Engineering License #GC-982341-CA. With $20M in commercial liability insurance and full workers' compensation coverage, property owners and commercial developers can build with absolute peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-amber-400 pt-2">
              <div className="flex items-center gap-2">
                <FaCheckCircle /> California Contractor License
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle /> Associated General Contractors Member
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle /> US Green Building Council
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle /> National Association of Home Builders
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FaUsers className="text-amber-400" /> Executive Leadership
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-sm">
                  AR
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Arthur Reynolds, PE</div>
                  <div className="text-xs text-amber-400">Chief Executive Officer & Structural Engineer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 font-black rounded-full flex items-center justify-center text-sm">
                  SJ
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Sarah Jenkins, AIA</div>
                  <div className="text-xs text-amber-400">VP of Architectural Design & Urban Planning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
