import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, ArrowUpRight } from "lucide-react";

const BrandListing = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); // "" | "low-high" | "high-low"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/brand/list");
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
  }, []);

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
      <div className="flex justify-center items-center h-screen bg-[#f8fafc]">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full border-4 border-blue-100 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 sm:px-8 py-12 mt-16">
      
      {/* Header & Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Partner Brands
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Discover {brands.length} industry leaders ready to collaborate.
          </p>
        </div>

        {/* Custom Pill-Style Sort Dropdown Container */}
        <div className="relative inline-block text-left">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 pl-1">
              <Filter size={12} className="text-slate-400" /> Sort:
            </span>
            <div className="relative flex items-center">
              <select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-transparent text-slate-700 text-sm py-1 pl-1 pr-7 font-semibold focus:outline-none cursor-pointer hover:text-blue-600 transition-colors"
              >
                <option value="">Featured</option>
                <option value="low-high">Budget: Low → High</option>
                <option value="high-low">Budget: High → Low</option>
              </select>
              <div className="pointer-events-none absolute right-1 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout forced into dynamic 4 columns on large viewport breaklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => navigate(`/brand/${brand._id}`)}
            className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.08)] transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
          >
            {/* Image / Logo Cover container (Slightly smaller height) */}
            <div className="relative h-28 sm:h-36 bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center overflow-hidden border-b border-slate-100">
              {brand.logo && brand.logo.startsWith("http") ? (
                <img
                  src={brand.logo}
                  alt={brand.brandName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                  {brand.brandName.charAt(0)}
                </div>
              )}
              
              {/* Premium Frosted Floating Industry Tag */}
              <div className="absolute top-2.5 right-2.5">
                <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md shadow-sm border border-slate-200/40">
                  {brand.industry}
                </span>
              </div>
            </div>

            {/* Tightened Content Info Matrix */}
            <div className="p-4 flex-grow flex flex-col justify-between bg-white">
              <div>
                <h2 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tight">
                  {brand.brandName}
                </h2>
                <p className="text-[11px] uppercase tracking-wider font-medium text-slate-400 mt-0.5">
                  {brand.industry}
                </p>
              </div>
              
              {/* Card Footer: Budget Metric Block */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Est. Budget</span>
                  <span className="text-sm font-extrabold text-blue-600 tracking-tight mt-0.5">
                    {brand.budgetRange}
                  </span>
                </div>
                
                {/* Clean Micro-arrow pointer effect */}
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Fallback State Container */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-24 max-w-7xl mx-auto bg-white border border-dashed border-slate-200 rounded-2xl mt-4">
          <p className="text-slate-400 text-base font-medium">No brands found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrandListing;