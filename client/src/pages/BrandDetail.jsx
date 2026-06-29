import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [error, setError] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/brand/${id}`);
        const data = await res.json();
        if (data.success) {
          setBrand(data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };
    fetchBrand();
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50 p-4">
        <p className="text-slate-600 font-medium mb-4">Failed to load brand assets.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow-sm hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!brand) return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="flex flex-col items-center space-y-3">
        <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div className="text-slate-500 font-medium text-sm tracking-wide">Loading Brand Profile...</div>
      </div>
    </div>
  );

  const hasValidLogo = brand.logo && brand.logo.startsWith("http");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 mt-20">
    
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Brands
        </button>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          
          <div className="w-full lg:w-[45%] relative bg-slate-100 min-h-[260px] sm:min-h-[360px] lg:min-h-[auto] flex items-center justify-center overflow-hidden">
            {hasValidLogo ? (
              <img
                src={brand.logo}
                alt={brand.brandName}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 text-8xl font-black tracking-tighter select-none">
                {brand.brandName?.charAt(0)}
              </div>
            )}
            
            
            <div className="absolute top-4 left-4 z-10">
              <span className="backdrop-blur-md bg-slate-900/70 text-white px-3 py-1 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
                {brand.industry}
              </span>
            </div>
          </div>

          
          <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {brand.brandName}
                </h1>
              </div>

            
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/50">
                  <p className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mb-1">
                    Budget Allocation
                  </p>
                  <p className="text-base font-semibold text-indigo-900">
                    {brand.budgetRange}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                    Industry Sector
                  </p>
                  <p className="text-base font-semibold text-slate-800">
                    {brand.industry}
                  </p>
                </div>
              </div>

              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  About the Brand
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Join {brand.brandName} in creating impactful stories. They are currently looking for 
                  creative partners in the <span className="font-medium text-slate-800">{brand.industry}</span> space who can deliver high-quality 
                  engagement within the <span className="font-medium text-slate-800">{brand.budgetRange}</span> tier.
                </p>
              </div>
            </div>

          
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all">
                Send Proposal
              </button>
              
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 font-medium text-sm transition-all bg-white"
                >
                  Visit Website
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrandDetail;