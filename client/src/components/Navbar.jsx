import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { User, Settings, LogOut, Menu, X } from 'lucide-react';

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

  const [profile, setProfile] = useState({ name: "", avatar: null, email: "" });
  const [isProfile, setIsProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfile(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [token, identity]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const initials = profile.name ? profile.name.substring(0, 2).toUpperCase() : "US";

  const linkStyles = ({ isActive }) =>
    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 block md:inline-block ${isActive
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10'
      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 md:hover:bg-transparent md:dark:hover:bg-transparent'
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 sm:px-6 lg:px-8" ref={mobileMenuRef}>
      <nav className="mx-auto max-w-7xl backdrop-blur-md bg-white/85 border border-indigo-100/80 shadow-xl rounded-2xl h-20 flex justify-between items-center px-6 transition-all duration-300 relative">

        
        <div className="flex items-center">
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => { navigate("/"); setIsOpen(false); }}
          >
            CollabZone<span className="text-indigo-600">X</span>
          </h1>
        </div>

   
        {token && (
          <div className="hidden md:flex items-center gap-1 bg-indigo-50/60 p-1.5 rounded-xl border border-indigo-100/50">
            <NavLink to="/brandlist" className={linkStyles}>Brands</NavLink>
            <NavLink to="/influlist" className={linkStyles}>Creators</NavLink>
            {identity === "brand" && <NavLink to="/branddash" className={linkStyles}>Dashboard</NavLink>}
            {identity === "creator" && <NavLink to="/influencerdash" className={linkStyles}>Dashboard</NavLink>}
          </div>
        )}

       
        <div className="flex items-center gap-4">

      
          {!token && (
            <button
              onClick={handleGetStarted}
              className="hidden sm:inline-block relative group overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              Get Started
            </button>
          )}

          {token && (
            <div className="hidden md:block relative" ref={menuRef}>
              <button
                onClick={() => setIsProfile(!isProfile)}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-200 hover:border-indigo-500 transition-all focus:outline-none overflow-hidden bg-indigo-50 p-0.5 shadow-sm"
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <DefaultAvatar initials={initials} />
                )}
              </button>

             
              {isProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-indigo-100/80 rounded-xl shadow-xl py-2 z-50 transform origin-top-right transition-all duration-200">
                  <div className="px-4 py-3 border-b border-indigo-50 bg-indigo-50/30">
                    <p className="text-sm font-bold text-slate-800 text-left">{profile.name}</p>
                    <p className="text-xs font-medium text-indigo-600/80 truncate mt-0.5 text-left">{profile.email}</p>
                  </div>

                  <div className="p-1.5 space-y-0.5">
                    <button
                      className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-900 rounded-lg transition-colors cursor-pointer"
                      onClick={() => { navigate("/My_Profile"); setIsProfile(false); }}
                    >
                      <User size={16} className="mr-3 text-indigo-500" /> My Profile
                    </button>
                    <button
                      className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-900 rounded-lg transition-colors cursor-pointer"
                      onClick={() => { navigate("/Account_Setting"); setIsProfile(false); }}
                    >
                      <Settings size={16} className="mr-3 text-indigo-500" /> Account Settings
                    </button>
                  </div>

                  <div className="border-t border-indigo-50 my-1"></div>

                  <div className="p-1.5">
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut size={16} className="mr-3" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Trigger Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
        {isOpen && (
          <div className="absolute top-24 left-0 right-0 mx-auto w-full bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl border border-indigo-100 flex flex-col p-4 space-y-1.5 md:hidden z-50 max-w-[calc(100vw-2rem)] sm:max-w-none animate-in fade-in slide-in-from-top-4 duration-200">
            {token ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-indigo-50/40 rounded-xl border border-indigo-100/50">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0 border border-indigo-200">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <DefaultAvatar initials={initials} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{profile.name}</p>
                    <p className="text-xs font-medium text-indigo-600 truncate">{profile.email}</p>
                  </div>
                </div>

                <NavLink to="/brandlist" onClick={toggleMenu} className={linkStyles}>Brands</NavLink>
                <NavLink to="/influlist" onClick={toggleMenu} className={linkStyles}>Creators</NavLink>
                {identity === "brand" && <NavLink to="/branddash" onClick={toggleMenu} className={linkStyles}>Dashboard</NavLink>}
                {identity === "creator" && <NavLink to="/influencerdash" onClick={toggleMenu} className={linkStyles}>Dashboard</NavLink>}

                <hr className="border-indigo-50 my-2" />

                <button
                  onClick={() => { navigate("/My_Profile"); toggleMenu(); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-indigo-50/60 hover:text-indigo-900"
                >
                  <User size={16} className="mr-3 text-indigo-500" /> My Profile
                </button>
                <button
                  onClick={() => { navigate("/Account_Setting"); toggleMenu(); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 rounded-xl hover:bg-indigo-50/60 hover:text-indigo-900"
                >
                  <Settings size={16} className="mr-3 text-indigo-500" /> Account Settings
                </button>
                <button
                  onClick={() => { logout(); toggleMenu(); }}
                  className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 mt-1 rounded-xl"
                >
                  <LogOut size={16} className="mr-3" /> Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { handleGetStarted(); toggleMenu(); }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-center shadow-lg shadow-blue-500/20"
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