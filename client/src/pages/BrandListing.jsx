import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, ArrowUpRight, Wallet, Briefcase } from "lucide-react";
import Footer from "../components/Footer";

const BrandListing = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); 
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/brand/list`);
        const brand = await res.json();

        if (brand.success) {
          setBrands(brand.data);
          setFilteredBrands(brand.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [backendUrl]);

  const getBudgetNumber = (budgetString) => {
    return Number(budgetString.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...filteredBrands].sort((a, b) => {
      const priceA = getBudgetNumber(a.budgetRange);
      const priceB = getBudgetNumber(b.budgetRange);
      return order === "low-high" ? priceA - priceB : priceB - priceA;
    });
    setFilteredBrands(sorted);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#FAF9F6] space-y-4 px-4 text-center">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-blue-50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-indigo-900/60 font-semibold text-sm tracking-wide animate-pulse">Syncing campaign boards...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-blue-50/30 px-4 py-8 sm:px-6 md:px-8 lg:py-20 pt-24 sm:pt-28 relative overflow-x-hidden">
      
      {/* Decorative Grid Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Responsive Glow Layer */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] md:w-[500px] h-[250px] bg-gradient-to-r from-blue-300/10 to-indigo-400/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>

      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 relative z-10 mt-6 sm:mt-15">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black tracking-widest uppercase mb-4 shadow-md shadow-indigo-600/10">
          <Briefcase size={10} /> Live Campaigns
        </div>
        <h1 className="text-3xl sm:text-6xl font-black text-indigo-950 tracking-tight leading-tight sm:leading-none">
          Partner <span className="decoration-2 underline-offset-4">Brands</span>
        </h1>
        <p className="text-slate-600 mt-3 sm:mt-5 text-xs sm:text-base max-w-xl mx-auto leading-relaxed px-2">
          Connect directly with {brands.length} market leaders scouting for fresh influencer distributions.
        </p>

        {/* Sort Layout Section */}
        <div className="mt-6 sm:mt-8 flex justify-center px-2">
          <div className="inline-flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 bg-white px-3 sm:px-4 py-2 rounded-xl border border-indigo-100 shadow-sm transition-all hover:border-indigo-200">
            <div className="flex items-center gap-2">
              <Filter size={12} className="text-indigo-400 flex-shrink-0" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Sort Layout:</span>
            </div>
            <div className="relative flex items-center flex-1 sm:flex-initial">
              <select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-transparent text-indigo-950 text-xs py-0.5 pl-1 pr-6 font-bold focus:outline-none cursor-pointer hover:text-blue-600 transition-colors"
              >
                <option value="">Featured Opportunities</option>
                <option value="low-high">Budget: Low → High</option>
                <option value="high-low">Budget: High → Low</option>
              </select>
              <div className="pointer-events-none absolute right-0 text-indigo-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-16 sm:mb-24 relative z-10">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => navigate(`/brand/${brand._id}`)}
            className="group relative flex flex-col justify-between overflow-hidden bg-white border border-indigo-50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div>
              {/* Card Banner/Logo container */}
              <div className="relative h-40 sm:h-56 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center overflow-hidden border-b border-indigo-50/50 p-4 sm:p-6 transition-colors group-hover:from-blue-50/40 group-hover:to-indigo-50/20">
                {brand.logo && brand.logo.startsWith("http") ? (
                  <img
                    src={brand.logo}
                    alt={brand.brandName}
                    className="max-w-[85%] max-h-[80%] object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-500">
                    {brand.brandName ? brand.brandName.charAt(0) : "B"}
                  </div>
                )}
                
                {/* Industry Tag */}
                <div className="absolute top-2.5 right-2.5 max-w-[80%]">
                  <span className="bg-indigo-600 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 sm:py-1 rounded-md shadow-sm block truncate tracking-widest uppercase">
                    {brand.industry || "Market"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <h2 className="text-sm sm:text-base font-black text-indigo-950 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tight">
                  {brand.brandName}
                </h2>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-indigo-400/70 mt-1">
                  {brand.industry || "Enterprise"}
                </p>
              </div>
            </div>
            
            {/* Card Footer actions */}
            <div className="mx-4 sm:mx-5 mb-4 sm:mb-5 pt-3 sm:pt-4 border-t border-indigo-50/80 flex items-center justify-between gap-2">
              <div className="min-w-0 flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 hidden xs:block flex-shrink-0">
                  <Wallet size={12} />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Allocation</span>
                  <span className="text-xs sm:text-sm font-black text-indigo-600 truncate block">
                    {brand.budgetRange || "Flexible"}
                  </span>
                </div>
              </div>
              
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Layout */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-16 sm:py-24 max-w-7xl mx-auto bg-indigo-50/20 border border-dashed border-indigo-100 rounded-3xl mt-6 mb-16 sm:mb-24 px-4">
          <p className="text-indigo-900/50 text-sm sm:text-base font-medium">No open brand mandates found.</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BrandListing;