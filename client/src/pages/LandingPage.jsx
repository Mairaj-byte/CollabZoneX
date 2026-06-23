import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import hero from '../assets/hero_img.png';
import { useNavigate } from "react-router-dom";
import { Sparkles, Layers, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token, identity } = useContext(ShopContext);

  const handleGetStarted = () => {
    if (!token) {
      navigate("/signinpage");
      return;
    }

    if (identity === "brand") {
      navigate("/influlist");
    } else if (identity === "creator") {
      navigate("/brandlist");
    }
  };

  return (
    // Generous top padding to offset the floating capsule fixed navbar cleanly
    <div className="bg-[#f8fafc] text-slate-900 pt-32 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-24 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* Subtle dynamic backdrop glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {/* Micro-badge hook */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-6">
            <Sparkles size={14} className="text-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">The Next-Gen Collab Hub</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Connect Brands with <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Creators</span> That Convert
          </h2>
          
          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
            Discover verified talent, orchestrate automated contracts, and scale cross-platform marketing initiatives through single-pane metrics dashboarding.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              onClick={handleGetStarted} 
              className="relative group overflow-hidden px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              For Brands
            </button>
            <button 
              onClick={handleGetStarted} 
              className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-base hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all duration-200 cursor-pointer"
            >
              For Creators
            </button>
          </div>
        </div>

        {/* Hero Visual Container */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative p-4 bg-white border border-slate-200/50 shadow-2xl rounded-3xl max-w-md lg:max-w-full transition-transform duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-3xl pointer-events-none"></div>
            <img src={hero} alt="CollabZoneX Dashboard Visual Mockup" className="w-full h-auto rounded-2xl relative z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-slate-100 py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why CollabZoneX?</h3>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Engineered from scratch to support native performance tracking metrics.
          </p>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-blue-600" size={22} />,
                title: "Smart Network Match",
                desc: "AI-driven algorithmic exploration vectors contextual data parameters straight to targeted niche channels.",
              },
              {
                icon: <Layers className="text-indigo-600" size={22} />,
                title: "Unified Ledger Pipeline",
                desc: "Handle escrowed funds distribution mechanisms, digital rights assignment, and creative signoffs instantly.",
              },
              {
                icon: <BarChart3 className="text-purple-600" size={22} />,
                title: "Real-Time Tracking Engine",
                desc: "Ingest downstream conversion metrics, dynamic asset conversions, and structural ROI reports in real time.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-[#f8fafc] border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 text-left flex flex-col"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workings Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 text-center tracking-tight">Engineered Simplicity</h3>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-center text-sm sm:text-base mb-16">
          Launch cross-platform campaigns inside three atomic interactions.
        </p>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {[
            { step: "01", title: "Configure Parameters", desc: "Construct target budget rules, design parameters, and tracking definitions inside our intuitive brief wizard." },
            { step: "02", title: "Automate Synergies", desc: "Establish direct linkages alongside top content producers with instant contract generation and escrow security structures." },
            { step: "03", title: "Measure Returns", desc: "Monitor raw processing metrics directly down to target conversions through real-time telemetry systems." }
          ].map((item, idx) => (
            <div key={idx} className="relative group text-center md:text-left">
              <div className="text-6xl font-black bg-gradient-to-br from-slate-200 to-slate-100 bg-clip-text text-transparent select-none mb-4 group-hover:from-blue-100 group-hover:to-blue-50 transition-colors duration-300">
                {item.step}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2 tracking-tight flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 size={16} className="text-blue-500" /> {item.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="mx-4 sm:mx-8 mb-16 max-w-7xl xl:mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 px-8 text-center text-white shadow-xl shadow-indigo-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)]"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Scale with Performance Influence?
          </h3>
          <p className="mt-4 text-sm sm:text-base opacity-85 leading-relaxed">
            Join thousands of fast-growing operations orchestrating automated content deployments natively on CollabZoneX.
          </p>
          <button 
            onClick={handleGetStarted}
            className="mt-8 bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:bg-slate-50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 mx-auto cursor-pointer"
          >
            Start Free Today <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;