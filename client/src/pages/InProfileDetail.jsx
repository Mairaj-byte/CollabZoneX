import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const InProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/creator/${id}`);
        const data = await res.json();
        if (data.success) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8fafc]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium tracking-wide">Fetching Profile details...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f8fafc]">
        <h1 className="text-2xl font-bold text-slate-800">Profile Not Found</h1>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 underline">Go Back</button>
      </div>
    );
  }

  const {
    username,
    bio,
    niche,
    followersCount,
    engagementRate,
    location,
    pricePerPost,
    profileImage,
    socialLinks,
  } = profile;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 md:px-10 lg:py-24">
     
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-blue-50 blur-[120px] rounded-full opacity-50"></div>

      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Explorers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src={profileImage || `https://ui-avatars.com/api/?name=${username}&size=512&background=6366f1&color=fff`}
                alt={username}
                className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                 <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Primary Niche</p>
                 <p className="text-xl font-bold">{niche}</p>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">Verified Creator</span>
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {location}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                {username}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty">
                {bio || "This creator hasn't shared a bio yet, but their work speaks volumes. Reach out via social links to learn more about upcoming collaborations."}
              </p>
            </section>

           
            <div className="grid grid-cols-3 gap-1 bg-slate-900 rounded-[2rem] p-1 shadow-xl overflow-hidden">
              <div className="bg-slate-800 py-6 text-center border-r border-slate-700">
                <p className="text-2xl font-bold text-white">{followersCount?.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mt-1">Followers</p>
              </div>
              <div className="bg-slate-800 py-6 text-center border-r border-slate-700">
                <p className="text-2xl font-bold text-white">{engagementRate}%</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mt-1">Engagement</p>
              </div>
              <div className="bg-slate-800 py-6 text-center">
                <p className="text-2xl font-bold text-blue-400">₹{pricePerPost}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mt-1">Starting Price</p>
              </div>
            </div>

            
            <div className="flex flex-wrap gap-4 pt-4">
              <button  onClick={() => navigate(`/createcampaign/${id}`)} className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95">
                Hire {username}
              </button>
              
              <div className="flex gap-3">
                {socialLinks?.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                  >
                    <span className="font-semibold text-sm">Instagram</span>
                  </a>
                )}
                {socialLinks?.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                  >
                    <span className="font-semibold text-sm">YouTube</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InProfileDetail;