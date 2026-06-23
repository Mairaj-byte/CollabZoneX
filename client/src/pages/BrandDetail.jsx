import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      const res = await fetch(`http://localhost:4000/api/brand/${id}`);
      const data = await res.json();
      if (data.success) {
        setBrand(data.data);
      }
    };
    fetchBrand();
  }, [id]);

  if (!brand) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-blue-600 font-medium">Loading Brand Assets...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfdfe] mt-7">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Brands
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
  <div className="bg-white rounded-lg overflow-hidden shadow-xl shadow-blue-100 border border-slate-100 flex flex-col lg:flex-row">
    
    
    <div className="lg:w-1/2 relative bg-slate-50 min-h-[320px]">
      {brand.logo && brand.logo.startsWith("http") ? (
        <img
          src={brand.logo}
          alt={brand.brandName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-200 text-7xl font-black">
          {brand.brandName.charAt(0)}
        </div>
      )}
      <div className="absolute bottom-6 left-6">
        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
          {brand.industry}
        </span>
      </div>
    </div>

    
    <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
        {brand.brandName}
      </h1>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Budget Allocation
            </p>
            <p className="text-base font-bold text-blue-700">
              {brand.budgetRange}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Industry Sector
            </p>
            <p className="text-base font-bold text-slate-700">
              {brand.industry}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold mb-2">
            About the Brand
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Join {brand.brandName} in creating impactful stories. They are currently looking for 
            creative partners in the {brand.industry} space who can deliver high-quality 
            engagement within the {brand.budgetRange} range.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md shadow-blue-200 transition-all active:scale-95">
            Send Proposal
          </button>
          
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </div>

  </div>
</div>


     
    </div>
  );
};

export default BrandDetail;