import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Curating top creators...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-15">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Featured <span className="text-blue-600">Creators</span>
            </h1>

            <div className="overflow-hidden whitespace-nowrap w-full">
              <p className="inline-block animate-marquee text-slate-500 mt-2 text-lg">
                Collaborate with the world's most engaging influencers.
              </p>
            </div>

          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border text-sm font-medium text-slate-600">
            {creators.length} Creators Available
          </div>
        </div>

        {creators.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-lg">No creators found in this category.</p>
          </div>
        ) : (
          /* 4-Column Grid Logic */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {creators.map((creator) => {
              const {
                _id,
                userId,
                username,
                bio,
                niche,
                followersCount,
                engagementRate,
                location,
                pricePerPost,
                profileImage,
                socialLinks,
              } = creator;

              return (
                <div
                  key={userId}
                  onClick={() => navigate(`/profile/${userId}`)}
                  className="group relative cursor-pointer bg-white rounded-lg p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-300"
                >
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100">
                      {niche}
                    </span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex flex-col items-center text-center mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <img
                        src={profileImage || `https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`}
                        alt={username}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                      />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      @{username}
                    </h2>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {location}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="mt-4 text-sm text-slate-500 line-clamp-2 min-h-[40px]">
                    {bio || "Passionate creator sharing unique perspectives and daily stories."}
                  </p>

                  {/* Stats Box */}
                  <div className="mt-6 grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50/50 transition-colors">
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">
                        {followersCount >= 1000 ? (followersCount / 1000).toFixed(1) + 'K' : followersCount}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Followers</p>
                    </div>
                    <div className="text-center border-l border-slate-200">
                      <p className="text-sm font-bold text-slate-800">{engagementRate}%</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Engage</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Starts at</p>
                      <p className="text-lg font-black text-blue-600">₹{pricePerPost}</p>
                    </div>
                    <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerListing;