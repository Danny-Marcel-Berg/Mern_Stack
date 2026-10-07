import { useEffect } from "react";
import { FaHardHat, FaShieldAlt, FaAward, FaCheckCircle, FaDraftingCompass, FaUsers } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Apex Construction & Development Co.";
  }, []);

  return (
    <div className="w-full bg-amber-50/40 text-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-sm border border-slate-950">
            <FaHardHat /> About Apex Build
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 leading-tight">
            Building Excellence, Engineering Trust.
          </h1>
          <p className="text-slate-800 font-semibold text-base sm:text-lg leading-relaxed">
            Apex Construction & Development Co. is a full-service general contracting and architectural engineering firm headquartered in California. We specialize in high-impact commercial skyscrapers, custom luxury homes, industrial logistics facilities, and comprehensive structural redesigns.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-md space-y-4 text-center">
            <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center text-3xl mx-auto font-black shadow">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-black text-slate-950">Uncompromising Safety</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Every job site adheres to strict OSHA 30 standards, comprehensive site hazard mitigation, and zero-compromise safety protocols to protect workers and clients.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-md space-y-4 text-center">
            <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center text-3xl mx-auto font-black shadow">
              <FaAward />
            </div>
            <h3 className="text-xl font-black text-slate-950">LEED Gold Sustainability</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              We integrate energy-efficient HVAC, solar grid integration, eco-friendly concrete mixes, and sustainable timber to build green futures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-md space-y-4 text-center">
            <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center text-3xl mx-auto font-black shadow">
              <FaDraftingCompass />
            </div>
            <h3 className="text-xl font-black text-slate-950">Precision 3D BIM Engineering</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Our architectural team utilizes advanced 3D BIM modeling and clash detection to ensure blueprints execute with zero structural error.
            </p>
          </div>
        </div>

        {/* Company Leadership & Credentials */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 rounded-3xl p-8 sm:p-12 border-2 border-slate-950 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="bg-slate-950 text-amber-300 font-extrabold text-xs uppercase px-3 py-1 rounded-full">
              State Licensing & Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Fully Licensed, Bonded & Insured General Contractor
            </h2>
            <p className="text-slate-900 font-semibold text-sm leading-relaxed">
              Apex Construction operates under Class A General Engineering License #GC-982341-CA. With $20M in commercial liability insurance and full workers' compensation coverage, property owners and commercial developers can build with absolute peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-black text-slate-950 pt-2">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-slate-950" /> California Contractor License
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-slate-950" /> Associated General Contractors Member
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-slate-950" /> US Green Building Council
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-slate-950" /> National Association of Home Builders
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-950 space-y-4 shadow-md">
            <h3 className="text-lg font-black text-slate-950 border-b-2 border-slate-200 pb-3 flex items-center gap-2">
              <FaUsers className="text-amber-500" /> Executive Leadership
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black rounded-full flex items-center justify-center text-sm border border-slate-950">
                  AR
                </div>
                <div>
                  <div className="text-sm font-black text-slate-950">Arthur Reynolds, PE</div>
                  <div className="text-xs text-amber-700 font-extrabold">Chief Executive Officer & Structural Engineer</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black rounded-full flex items-center justify-center text-sm border border-slate-950">
                  SJ
                </div>
                <div>
                  <div className="text-sm font-black text-slate-950">Sarah Jenkins, AIA</div>
                  <div className="text-xs text-amber-700 font-extrabold">VP of Architectural Design & Urban Planning</div>
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
