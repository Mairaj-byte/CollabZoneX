import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { User, Settings, LogOut } from 'lucide-react'; // Grouped clean imports

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

const Navbar = () => {
  const navigate = useNavigate();
  const { token, identity, logout } = useContext(ShopContext);

  // Initialize with safe defaults to prevent 'null' errors on first render
  const [profile, setProfile] = useState({ name: "", avatar: null, email: "" });
  const [isProfile, setIsProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const menuRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/signinpage");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) return;

      try {
        if (identity === "brand") {
          const res = await fetch("http://localhost:4000/api/brand/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.success) {
            setProfile({
              name: json.data.brandName || "Brand User",
              avatar: json.data.logo || null,
              email: json.data.userId?.email || "brand@example.com" 
            });
          }
        } else if (identity === "creator") {
          const res = await fetch("http://localhost:4000/api/creator/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          const creatorData = json.data || json; 
          
          if (creatorData) {
            setProfile({
              name: creatorData.username || "Creator User",
              avatar: creatorData.profileImage || null,
              email: creatorData.userId?.email || "creator@example.com" 
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [token, identity]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Safely calculate initials ONLY if profile.name exists
  const initials = profile.name ? profile.name.substring(0, 2).toUpperCase() : "US";
  
  return (
    // Floating container structure
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto max-w-7xl backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border border-slate-200/50 dark:border-slate-700/50 shadow-lg rounded-2xl h-20 flex justify-between items-center px-6 transition-all duration-300">
        
        {/* Brand Logo with Premium Gradient */}
        <div className="flex items-center">
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            CollabZone<span className="text-indigo-600 dark:text-indigo-400">X</span>
          </h1>
        </div>

        {/* Center/Right Navigation links */}
        <div className="flex items-center gap-6">
          {token && (
            <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/30">
              <NavLink 
                to="/brandlist" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                Brands
              </NavLink>

              <NavLink 
                to="/influlist" 
                className={({ isActive }) => 
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                Creators
              </NavLink>

              {identity === "brand" && (
                <NavLink 
                  to="/branddash" 
                  className={({ isActive }) => 
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {identity === "creator" && (
                <NavLink 
                  to="/influencerdash" 
                  className={({ isActive }) => 
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          )}

          {/* Action Button / Profile Section */}
          <div className="flex items-center gap-4">
            {!token && (
              <button
                onClick={handleGetStarted}
                className="relative group overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                Get Started
              </button>
            )}

            {token && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsProfile(!isProfile)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-200 hover:border-indigo-500 dark:border-slate-700 transition-all focus:outline-none overflow-hidden bg-slate-100 p-0.5 shadow-sm"
                >
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <DefaultAvatar initials={initials} />
                  )}
                </button>

                {/* Profile Dropdown Card */}
                {isProfile && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50 transform origin-top-right transition-all duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{profile.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{profile.email}</p>
                    </div>

                    <div className="p-1">
                      <button
                        className="w-full flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                        onClick={() => { navigate("/My_Profile"); setIsProfile(!isProfile); }}
                      >
                        <User size={16} className="mr-3 text-slate-400" /> My Profile
                      </button>
                      <button
                        className="w-full flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                        onClick={() => { navigate("/Account_Setting"); setIsProfile(!isProfile); }}
                      >
                        <Settings size={16} className="mr-3 text-slate-400" /> Account Settings
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>

                    <div className="p-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <LogOut size={16} className="mr-3" /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Overlay */}
        {isOpen && (
          <div className="absolute top-24 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col p-4 space-y-2 md:hidden">
            {token ? (
              <>
                <NavLink to="/brandlist" onClick={toggleMenu} className="px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200">
                  Brands
                </NavLink>
                <NavLink to="/influlist" onClick={toggleMenu} className="px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200">
                  Creators
                </NavLink>
                {identity === "brand" && (
                  <NavLink to="/branddash" onClick={toggleMenu} className="px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200">
                    Dashboard
                  </NavLink>
                )}
                {identity === "creator" && (
                  <NavLink to="/influencerdash" onClick={toggleMenu} className="px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200">
                    Dashboard
                  </NavLink>
                )}
                <hr className="border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => { logout(); toggleMenu(); }}
                  className="w-full text-left px-4 py-2.5 text-rose-500 font-medium rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { handleGetStarted(); toggleMenu(); }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl text-center shadow-md shadow-blue-500/20"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;