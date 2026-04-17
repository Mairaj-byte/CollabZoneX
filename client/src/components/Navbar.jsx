import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, identity, logout } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/signinpage");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">

      {/* Logo */}
      <h1
        className="text-2xl md:text-3xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        CollabZoneX
      </h1>

      {/* Desktop Menu */}
      {token && (
        <div className="space-x-6 hidden md:flex items-center">
          <NavLink to="/brandlist" className="hover:text-indigo-600">
            Brands
          </NavLink>

          <NavLink to="/influlist" className="hover:text-indigo-600">
            Creators
          </NavLink>

          {identity === "brand" && (
            <NavLink to="/branddash" className="hover:text-indigo-600">
              Dashboard
            </NavLink>
          )}

          {identity === "creator" && (
            <NavLink to="/influencerdash" className="hover:text-indigo-600">
              Dashboard
            </NavLink>
          )}

          <button
            onClick={logout}
            className="hover:text-red-500 font-medium"
          >
            Logout
          </button>
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

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
  );
};

export default Navbar;
