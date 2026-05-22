import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, ArrowUpDown } from "lucide-react";

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

  // Helper to extract number from budget string (e.g., "$500" -> 500)
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-15">
      
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Partner Brands
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Discover {brands.length} industry leaders ready to collaborate.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter size={14} /> Sort By:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 px-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-300 transition-all shadow-sm"
            >
              <option value="">Featured</option>
              <option value="low-high">Budget: Low to High</option>
              <option value="high-low">Budget: High to Low</option>
            </select>
            <div className="pointer-events-none absolute right-3 bottom-3 text-slate-400">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Responsive Grid --- */}
      {/* grid-cols-2 is the key for mobile! */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => navigate(`/brand/${brand._id}`)}
            className="group bg-white border border-slate-100 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-32 sm:h-44 overflow-hidden bg-slate-50">
              {brand.logo && brand.logo.startsWith("http") ? (
                <img
                  src={brand.logo}
                  alt={brand.brandName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-2xl">
                  {brand.brandName.charAt(0)}
                </div>
              )}
              
              {/* Desktop Industry Tag */}
              <div className="absolute top-3 right-3 hidden sm:block">
                <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold text-blue-700 px-2 py-1 rounded-lg shadow-sm border border-blue-50">
                  {brand.industry}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-3 md:p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-sm md:text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {brand.brandName}
                </h2>
                <p className="text-[10px] md:text-xs uppercase tracking-tighter md:tracking-wider font-semibold text-slate-400 mt-1">
                  {brand.industry}
                </p>
              </div>
              
              <div className="mt-3 md:mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium">Budget</span>
                  <span className="text-xs md:text-sm font-bold text-blue-600">
                    {brand.budgetRange}
                  </span>
                </div>
                <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <ArrowUpDown size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No brands found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrandListing;