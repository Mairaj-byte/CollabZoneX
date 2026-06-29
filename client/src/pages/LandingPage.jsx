import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import hero from '../assets/hero_img.png';
import { useNavigate } from "react-router-dom";
import { Sparkles, Layers, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";

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
    <div className="bg-[#f8fafc] text-slate-900 pt-24 overflow-x-hidden min-h-screen font-sans">
      
     
      <section className="relative max-w-5xl mx-auto px-6 pt-12 pb-20 text-center z-10">
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/20 to-purple-400/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      
        <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-md border border-blue-100 rounded-full px-4 py-1.5 mb-8 transform hover:scale-105 transition-transform duration-300">
          <Sparkles size={13} className="text-blue-600 animate-pulse" />
          <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-widest">The Next-Gen Collab Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Connect Brands with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Creators That Convert
          </span>
        </h1>
        
       
        <p className="mt-6 text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Discover verified talent, orchestrate automated contracts, and scale cross-platform marketing initiatives through a single-pane metrics dashboard.
        </p>
        
       
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto px-4">
          <button 
            onClick={handleGetStarted} 
            className="w-full sm:w-auto relative group overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-base shadow-xl shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer text-center"
          >
            For Brands
          </button>
          <button 
            onClick={handleGetStarted} 
            className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-base hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all duration-300 cursor-pointer text-center"
          >
            For Creators
          </button>
        </div>

       
        <div className="mt-16 relative mx-auto max-w-2xl px-2 sm:px-4">
          <img 
              src={hero} 
              alt="CollabZoneX Dashboard Visual Mockup" 
              className="w-full h-auto" 
            />
        </div>

      </section>

      
      <section className="bg-white border-t border-slate-100 py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why CollabZoneX?</h2>
              <p className="mt-3 text-slate-500 text-base">
                Engineered from scratch to support native performance tracking metrics out of the box.
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
           
            <div className="lg:col-span-1 group bg-[#f8fafc] border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="text-blue-600" size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Smart Network Match</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  AI-driven algorithmic exploration vectors contextual data parameters straight to targeted niche channels perfectly.
                </p>
              </div>
            </div>

          
            <div className="lg:col-span-1 group bg-[#f8fafc] border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="text-indigo-600" size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Unified Ledger Pipeline</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Handle escrowed funds distribution mechanisms, digital rights assignment, and creative signoffs instantly.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1 group bg-[#f8fafc] border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="text-purple-600" size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Real-Time Tracking Engine</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Ingest downstream conversion metrics, dynamic asset conversions, and structural ROI reports in real time.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Engineered Simplicity</h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Launch cross-platform campaigns inside three atomic interactions.
            </p>
          </div>

          <div className="relative space-y-12">
           
            <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-slate-200 hidden md:block"></div>

            {[
              { step: "01", title: "Configure Parameters", desc: "Construct target budget rules, design parameters, and tracking definitions inside our intuitive brief wizard." },
              { step: "02", title: "Automate Synergies", desc: "Establish direct linkages alongside top content producers with instant contract generation and escrow security structures." },
              { step: "03", title: "Measure Returns", desc: "Monitor raw processing metrics directly down to target conversions through real-time telemetry systems." }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row items-start gap-6 md:gap-12 group bg-white md:bg-transparent p-6 md:p-0 rounded-2xl border border-slate-100 md:border-none shadow-sm md:shadow-none">
                
                
                <div className="z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 text-xl font-black text-slate-800 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-300 shrink-0">
                  {item.step}
                </div>

                
                <div className="pt-2">
                  <h4 className="text-xl font-bold text-slate-800 mb-2 tracking-tight flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> 
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="px-4 sm:px-8 mb-24 max-w-6xl mx-auto relative">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-20 px-8 text-center text-white shadow-2xl">
          {/* Subtle Ambient Shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent)]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Scale with Performance Influence?
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Join thousands of fast-growing operations orchestrating automated content deployments natively on CollabZoneX.
            </p>
            
            <button 
              onClick={handleGetStarted}
              className="mt-8 bg-white text-slate-900 hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:bg-slate-50 transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2.5 cursor-pointer mx-auto"
            >
              Start Free Today <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;