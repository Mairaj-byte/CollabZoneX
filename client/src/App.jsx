import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";

import BrandDash from "./pages/BrandDash";
import InfluencerDash from "./pages/InfluencerDash";

import BrandListing from "./pages/BrandListing";
import InfluencerListing from "./pages/InfluencerListing";

import InProfileDetail from "./pages/InProfileDetail";
import BrandDetail from "./pages/BrandDetail";

import UserProfile from "./pages/UserProfile";
import AccountSetting from "./pages/AccountSetting"

import CreateCampaign from "./pages/CreateCampaign";

import { AboutUs } from "./pages/AboutUs";
import { Pricing } from "./pages/Pricing";
import { LegalPage } from "./pages/LegalPage";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import ResetPassword from "./components/ResetPassword";

const App = () => {
  const location = useLocation();

  // Hide Navbar & Footer on specific routes
  const hideLayoutRoutes = ["/signinpage"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      
      {/* Navbar */}
      {!hideLayout && <Navbar />}
      {/* Routes */}
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signinpage" element={<SignInPage />} />

        {/* Dashboard Routes */}
        <Route path="/branddash" element={<BrandDash />} />
        <Route path="/influencerdash" element={<InfluencerDash />} />

        {/* Protected Routes */}
        <Route
          path="/brandlist"
          element={
            <ProtectedRoute>
              <BrandListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/influlist"
          element={
            <ProtectedRoute>
              <InfluencerListing />
            </ProtectedRoute>
          }
        />

        {/* Profile & Details */}
        <Route path="/profile/:id" element={<InProfileDetail />} />
        <Route path="/brand/:id" element={<BrandDetail />} />

        <Route path='/reset_password' element={<ResetPassword />}/>

        {/* Setup Pages */}
        <Route path="/My_Profile" element={<UserProfile/>} />
        <Route path="/Account_Setting" element={<AccountSetting/>}/>

        {/* Static Pages */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/legalpage" element={<LegalPage />} />

        {/* Campaign */}
        <Route path="/createcampaign/:id" element={<CreateCampaign />} />

      </Routes>


      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </div>
  );
};

export default App;