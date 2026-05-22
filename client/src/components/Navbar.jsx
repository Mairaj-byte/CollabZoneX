import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { api } from '../utils/api'; // Assuming you use this elsewhere

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
  const [isOpen, setIsOpen] = useState(false); // For mobile menu if you use it

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
              
              // 👇 FIX IS HERE: Look inside the populated userId object
              email: json.data.userId?.email || "brand@example.com" 
            });
          }
        } else if (identity === "creator") {
          const res = await fetch("http://localhost:4000/api/creator/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          const creatorData = json.data || json; // Handle both response shapes
          
          if (creatorData) {
            setProfile({
              name: creatorData.username || "Creator User",
              avatar: creatorData.profileImage || null,
              
              // 👇 FIX IS HERE: Look inside the populated userId object
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
    <nav className=" w-full flex bg-blue-25 h-20 justify-between items-center sm:px-8 sm:py-4 px-6 py-5">
      <div className="flex justify-between gap-2">
        <h1
          className='text-4xl font-extrabold'
          onClick={() => navigate("/")}
        >
          CollabZoneX
        </h1>
      </div>
      <div className="flex gap-8">
        {token && (
          <div className="flex gap-8">
            <NavLink to="/brandlist" className='text-left px-2 py-2 hover:bg-gray-200 rounded'>
              Brands
            </NavLink>

            <NavLink to="/influlist" className='text-left px-2 py-2 hover:bg-gray-200 rounded'>
              Creators
            </NavLink>

            {identity === "brand" && (
              <NavLink to="/branddash" className='text-left px-2 py-2 hover:bg-gray-200 rounded'>
                Dashboard
              </NavLink>
            )}

            {identity === "creator" && (
              <NavLink to="/influencerdash" className='text-left px-2 py-2 hover:bg-gray-200 rounded'>
                Dashboard
              </NavLink>
            )}
          </div>
        )}
        {!token && (
          <button
            onClick={handleGetStarted}
            className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        )}
        {token && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsProfile(!isProfile)}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all focus:outline-none overflow-hidden bg-gray-100"
            >
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <DefaultAvatar initials={initials} />
              )}
            </button>

            {isProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
                  <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                </div>

                <div className="py-1">
                  <button
                    className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => { navigate("/My_Profile"); setIsProfile(!isProfile); }}
                  ><User size={16} className="mr-3 text-gray-400" /> My Profile
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => { navigate("/Account_Setting"); setIsProfile(!isProfile); }}
                  ><Settings size={16} className="mr-3 text-gray-400" /> Account Settings
                  </button>
                </div>

                <hr className="my-1 border-gray-100" />

                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
                >
                  <LogOut size={16} className="mr-3" /> Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-5 py-6 md:hidden">

          {token ? (
            <>
              <NavLink to="/brandlist" onClick={toggleMenu}>
                Brands
              </NavLink>

              <NavLink to="/influlist" onClick={toggleMenu}>
                Creators
              </NavLink>

              {identity === "brand" && (
                <NavLink to="/branddash" onClick={toggleMenu}>
                  Dashboard
                </NavLink>
              )}

              {identity === "creator" && (
                <NavLink to="/influencerdash" onClick={toggleMenu}>
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleGetStarted();
                toggleMenu();
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>

  )
}
const LogOut = ({ size, className }) => <svg
  xmlns="http://www.w3.org/2000/svg"
  width="22" 
  height="22" 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round"
  className={className}
>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" y1="12" x2="9" y2="12" />
</svg>


const User = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const Settings = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
export default Navbar;
