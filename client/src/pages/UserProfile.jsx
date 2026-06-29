import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MapPin, Link as LinkIcon, Star, Briefcase, Award,
  Users, CheckCircle, Mail, Instagram, Linkedin,
  Youtube, Globe, Calendar, FolderOpen
} from 'lucide-react';


const DefaultBanner = () => (
  <svg viewBox="0 0 800 200" className="w-full h-full object-cover" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E40AF" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bannerGrad)" />
  </svg>
);

const DefaultAvatar = ({ initials }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#avatarGrad)" />
    <text x="50" y="54" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="38" fontWeight="bold" fontFamily="system-ui">
      {initials}
    </text>
  </svg>
);

const MyProfile = () => {
  const navigate = useNavigate();
  const { token, identity } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) return;

      try {
        let data = {};

        
        if (identity === "brand") {
          const res = await fetch("http://localhost:4000/api/brand/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) data = json.data;

        } else if (identity === "creator") {
          const res = await fetch("http://localhost:4000/api/creator/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          data = json.data || json;
        }

        
        setProfile({
          name: identity === 'brand' ? (data.brandName || "Innovate Corp.") : (data.username || "Creator User"),
          username: identity === 'brand' ? "@innovatecorp" : `@${data.username || "creator"}`,
          title: identity === 'brand' ? (data.industry || "Global Tech Solutions") : (data.niche || "Content Creator"),
          location: data.location || "Global",
          joinDate: "Joined May 2022",
          avatar: identity === 'brand' ? (data.logo || null) : (data.profileImage || null),
          website: identity === 'brand'
            ? (data.website || "https://collabzonex.com")
            : (data.socialLinks?.youtube || data.youtube || data.socialLinks?.instagram || data.instagram || ""),
          stats: identity === 'brand'
            ? "500+ Projects | $100k+ Escrow"
            : `${data.followersCount ? data.followersCount.toLocaleString() : '0'} Followers | ${data.engagementRate || '0'}% Eng.`,
          bio: identity === 'brand'
            ? (data.bio || "Innovate Corp is a leading digital agency specializing in B2B software marketing. We partner with top tech influencers to drive engagement.")
            : (data.bio || "I create high-quality, engaging content and reviews."),
          tags: identity === 'brand'
            ? ["Cloud", "AI", "B2B", "SaaS"]
            : (data.niche ? [data.niche, "Digital Creator", "CollabZonex"] : ["Video", "SEO", "Tech"]),

          portfolio: [
            { id: 1, title: identity === 'brand' ? "FinTech Launch" : "Tech Campaign", category: "Video Review", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
            { id: 2, title: identity === 'brand' ? "SaaS Scaling" : "Beauty Collab", category: "Case Study", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
          ],
          reviews: [
            { id: 1, author: "Kavina Rame", rating: 5, text: "Amazing collaboration! Professional and timely." }
          ]
        });

      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token, identity]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const initials = profile.name ? profile.name.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 pt-16">
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          
          
          <div className="h-36 sm:h-48 md:h-60 w-full relative bg-slate-800">
            <DefaultBanner />
          </div>

          
          <div className="px-4 sm:px-8 pb-6 relative">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end -mt-14 sm:-mt-20 mb-6 gap-4 text-center sm:text-left">
              
              {/* Profile Avatar */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-white bg-white shadow-md overflow-hidden shrink-0">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <DefaultAvatar initials={initials} />
                )}
              </div>

              
              <div className="w-full sm:w-auto">
                <button 
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition duration-150 shadow-sm"
                  onClick={() => navigate('/Account_Setting')}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h1>
              <p className="text-sm sm:text-base text-gray-600 font-medium mt-1.5 flex flex-wrap justify-center sm:justify-start items-center gap-2">
                <span>{profile.username}</span>
                <span className="text-gray-300 hidden sm:inline">|</span> 
                <span className="text-gray-500 font-normal">{profile.title}</span>
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-4 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <MapPin size={15} className="text-gray-400" /> {profile.location}
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <Star size={15} className="text-blue-500 fill-blue-500" /> {profile.stats}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          
          <div className="space-y-6 lg:col-span-1">
            
          
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Skills & Focus</h3>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <FolderOpen size={22} className="text-blue-600" /> Portfolio & Work
              </h3>
              
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {profile.portfolio.map((item) => (
                  <div key={item.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition duration-200">
                    <div className="h-40 sm:h-44 w-full bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 bg-white flex-grow flex flex-col justify-center">
                      <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">{item.category}</p>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default MyProfile;