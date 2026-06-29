import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, MapPin, ArrowUpRight } from "lucide-react";
import Footer from "../components/Footer";

const InfluencerListing = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/creator/list");
        const data = await res.json();
        if (data.success) {
          setCreators(data.profiles);
        }
      } catch (error) {
        console.error("Failed to fetch creators", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4 bg-[#FAF9F6]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-indigo-900/60 font-semibold tracking-wide animate-pulse text-sm">
          Assembling top creators...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-blue-50/30 px-3 py-12 sm:px-6 md:px-8 lg:py-20 pt-28 relative">
      
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-blue-200/20 to-indigo-300/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16 px-1 mt-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4 tracking-wide uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
            Live Database
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-indigo-950 tracking-tight leading-none">
            Elite <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Creators</span>
          </h1>
          
          <p className="text-slate-600 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover and instantly partner with top-tier creators tailored to your brand identity.
          </p>

        
          <div className="mt-6 inline-block bg-white px-4 py-1.5 rounded-xl shadow-sm border border-indigo-50 text-xs sm:text-sm font-semibold text-slate-600">
            <span className="text-blue-600 font-black">{creators.length}</span> Talents Open for Deals
          </div>
        </div>

        {creators.length === 0 ? (
          <div className="text-center py-24 max-w-4xl mx-auto bg-indigo-50/10 border border-dashed border-indigo-100 rounded-3xl mb-24">
            <p className="text-indigo-900/40 text-base font-medium">No creators found matching your criteria.</p>
          </div>
        ) : (
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
            {creators.map((creator) => {
              const {
                userId,
                username,
                bio,
                niche,
                followersCount,
                engagementRate,
                location,
                pricePerPost,
                profileImage,
              } = creator;

              return (
                <div
                  key={userId}
                  onClick={() => navigate(`/profile/${userId}`)}
                  className="group relative flex flex-col justify-between overflow-hidden cursor-pointer bg-white rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 border border-indigo-50/60"
                >
                  <div>
                   
                    <div className="flex items-center justify-between gap-1 mb-4">
                      <span className="bg-blue-50 text-blue-700 text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-lg truncate max-w-[85%] border border-blue-100/30">
                        {niche || "General"}
                      </span>
                      <div className="text-indigo-300 group-hover:text-blue-600 transition-colors hidden sm:block">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                        <div className="p-0.5 rounded-full bg-indigo-50 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
                          <img
                            src={profileImage || `https://ui-avatars.com/api/?name=${username}&background=4f46e5&color=fff`}
                            alt={username}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white relative z-10"
                          />
                        </div>
                      </div>

                      <h2 className="mt-3 text-sm sm:text-base font-black text-indigo-950 group-hover:text-blue-600 transition-colors line-clamp-1 w-full px-1 tracking-tight">
                        @{username}
                      </h2>
                      
                      <p className="text-slate-400 text-[10px] sm:text-xs flex items-center justify-center gap-0.5 mt-0.5 truncate max-w-full">
                        <MapPin size={11} className="text-indigo-400 flex-shrink-0" />
                        <span className="truncate">{location || "Remote"}</span>
                      </p>
                    </div>

                    
                    <p className="mt-3 text-[11px] sm:text-xs text-slate-500 text-center line-clamp-2 min-h-[32px] sm:min-h-[40px] px-1 leading-relaxed">
                      {bio || "Sharing standard lifestyle, art updates, and collaborative masterclasses."}
                    </p>
                  </div>

                  <div>
                
                    <div className="mt-4 grid grid-cols-2 gap-1.5 p-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-indigo-50/50">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-1 text-indigo-950">
                          <Users size={12} className="text-blue-500 flex-shrink-0" />
                          <span className="text-xs font-black tracking-tight">
                            {followersCount >= 1000 ? (followersCount / 1000).toFixed(1) + 'K' : followersCount}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Audience</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center text-center border-l border-indigo-50">
                        <div className="flex items-center gap-1 text-indigo-950">
                          <TrendingUp size={12} className="text-indigo-500 flex-shrink-0" />
                          <span className="text-xs font-black tracking-tight">{engagementRate || "0.0"}%</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Engage</span>
                      </div>
                    </div>

                    
                    <div className="mt-4 pt-3 border-t border-indigo-50 flex items-center justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Rate Card</span>
                        <span className="text-xs sm:text-base font-black text-indigo-950 truncate block tracking-tight">
                          ₹{pricePerPost?.toLocaleString() || "0"}
                        </span>
                      </div>
                      
                      <button className="bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white p-2 sm:p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 border border-indigo-100 group-hover:border-transparent">
                        <span className="text-[10px] sm:text-xs font-bold px-1 sm:px-2 hidden xs:block">View Deals</span>
                        <ArrowUpRight size={14} className="xs:hidden" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InfluencerListing;