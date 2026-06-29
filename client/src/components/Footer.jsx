import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Footer = () => {
  const { token, identity } = useContext(ShopContext);

  return (
    <footer className="w-full mt-auto border-t border-gray-200 bg-white">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />


      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-blue-600">CollabZoneX</h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-sm mx-auto sm:mx-0">
            Connecting brands with the right creators to build authentic,
            high-impact collaborations.
          </p>
        </div>


        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-gray-800 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link to="/brandlist" className="hover:text-indigo-600 transition">
                Brands
              </Link>
            </li>
            <li>
              <Link to="/influlist" className="hover:text-indigo-600 transition">
                Creators
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-indigo-600 transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-indigo-600 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>


        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-gray-800 mb-4">Account</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            {!token && (
              <li>
                <Link to="/signinpage" className="hover:text-blue-600 transition">
                  Sign In
                </Link>
              </li>
            )}

            {token && identity === "brand" && (
              <li>
                <Link to="/influlist" className="hover:text-blue-600 transition">
                  Find Creators
                </Link>
              </li>
            )}

            {token && identity === "creator" && (
              <li>
                <Link to="/brandlist" className="hover:text-blue-600 transition">
                  Find Brands
                </Link>
              </li>
            )}
          </ul>
        </div>


        <div className="bg-blue-50 rounded-2xl p-6 text-center sm:text-left flex flex-col items-center sm:items-start justify-center">
          <h3 className="font-semibold text-gray-900">
            Ready to collaborate?
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-xs">
            Start discovering meaningful partnerships today.
          </p>
          <Link
            to={token ? (identity === "brand" ? "/influlist" : "/brandlist") : "/signinpage"}
            className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Get Started
          </Link>
        </div>
      </div>


      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm text-gray-500 text-center md:text-left">
          <span>© {new Date().getFullYear()} CollabZoneX. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/legalpage" className="hover:text-blue-600">Privacy</Link>
            <Link to="/legalpage" className="hover:text-blue-600">Terms</Link>
            <Link to="/" className="hover:text-blue-600">Support</Link>
            <Link to="/aboutus" className="hover:text-blue-600">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;