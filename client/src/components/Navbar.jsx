import React from "react";
import { ShopContext } from "../context/ShopContext";

import { Menu, X } from "lucide-react";
import { toast } from "react-toastify"
import { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Navbar = () => {
  const navigate = useNavigate()
  const [isProfile, setIsProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token, identity, logout } = useContext(ShopContext);
  const menuRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/signinpage");
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" w-full flex h-20 justify-between items-center sm:px-8 sm:py-4 px-6 py-5">
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
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsProfile(!isProfile)}
            className="flex items-center focus:outline-none"
          >
            <img
              alt="User Profile"
              className="w-9 h-9 rounded-full border border-gray-200 hover:border-blue-500 transition-all cursor-pointer"
            />
          </button>

          {isProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>

              <a
                className=" flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate("/brand-profile-setup")}
              ><img alt="Profile" className='w-5 h-5 mr-2' />
                My Profile
              </a>
              <a
                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate('/account_setting')}
              ><img alt="Settings" className='w-5 h-5 mr-2' />
                Account Settings
              </a>

              <hr className="my-1 border-gray-100" />

              <button
                onClick={logout}
                className="flex w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
              ><img alt="Log Out" className='w-5 h-5 mr-2' />
                Log Out
              </button>
            </div>
          )}
        </div>
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

export default Navbar;
