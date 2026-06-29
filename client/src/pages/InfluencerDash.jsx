import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

// Professional Stat Card Component
const StatCard = ({ title, value, iconColor = "text-indigo-600" }) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition duration-200">
    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
    <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
  </div>
);

// Campaign Item Component for the Overview Section
const CampaignItem = ({ brand, status, budget }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="flex justify-between items-center py-3.5 border-b border-gray-100 last:border-b-0 flex-wrap gap-2">
      <div>
        <p className="text-sm font-semibold text-gray-800">{brand}</p>
        <span className={`inline-block text-[11px] font-medium px-2 py-0.5 mt-1 rounded-full border ${getStatusStyles(status)}`}>
          {status}
        </span>
      </div>
      <p className="text-sm font-bold text-gray-900">₹{budget.toLocaleString("en-IN")}</p>
    </div>
  );
};

// Main Dashboard Component
const InfluencerDash = () => {
  const navigate = useNavigate();
  const { userId } = useContext(ShopContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/campaign/creator/${userId}`);
      const data = await res.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCampaigns();
  }, [userId]);

  const totalEarnings = campaigns.reduce((sum, c) => sum + (c.totalBudget || 0), 0);

  const handleAccept = async (campaignId) => {
    try {
      await axios.put(`${backendUrl}/api/campaign/status/${campaignId}`, {
        status: "accepted",
      });
      fetchCampaigns();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleReject = async (campaignId) => {
    try {
      await axios.put(`${backendUrl}/api/campaign/status/${campaignId}`, {
        status: "rejected",
      });
      fetchCampaigns();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const openChat = (campaignId) => {
    navigate(`/chat/${campaignId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 text-gray-800">
      
      
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 mt-5">
        
     
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Influencer Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your campaigns, track earnings, and review updates.
          </p>
        </div>

       
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Campaigns" value={campaigns.length} />
          <StatCard title="Total Earnings" value={`₹${totalEarnings.toLocaleString("en-IN")}`} />
          <StatCard title="Active" value={campaigns.filter((c) => c.status === "active").length} />
          <StatCard title="Completed" value={campaigns.filter((c) => c.status === "completed").length} />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
         
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                Campaign Overview
              </h2>
              {loading ? (
                <p className="text-sm text-gray-500 py-4">Loading campaigns...</p>
              ) : campaigns.length === 0 ? (
                <p className="text-sm text-gray-500 py-4">No recent activities found.</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {campaigns.slice(0, 5).map((c) => (
                    <CampaignItem key={c._id} brand={c.title} status={c.status} budget={c.totalBudget} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                Profile Performance
              </h2>
              <div className="mb-2 flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Completion</p>
                <p className="text-xs font-bold text-indigo-600">80%</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: "80%" }} />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Complete your profile setups to gain higher visibility with global brands.
              </p>
            </div>
            <button
              onClick={() => navigate("/influ-profile-setup")}
              className="w-full bg-indigo-600 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow transition duration-150"
            >
              Complete Profile
            </button>
          </div>
        </div>

        
        <div className="mt-12">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Deliverables</h2>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading your schedules...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-gray-500 bg-white border rounded-xl p-8 text-center shadow-sm">No campaigns allocated currently.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition duration-200"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {campaign.title}
                      </h3>
                      <span className="text-[11px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {campaign.platform || "Social"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-3.5 space-y-2 text-sm border border-gray-100">
                      <div className="flex justify-between"><span className="text-gray-500">Total Budget</span><span className="font-semibold text-gray-900">₹{campaign.totalBudget}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Current Milestone Status</span><span className="font-medium text-indigo-600 capitalize">{campaign.status}</span></div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-xs font-semibold">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        Advance: ₹{campaign.advanceAmount || 0}
                      </span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Final Net: ₹{campaign.finalAmount || 0}
                      </span>
                    </div>
                  </div>

                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                    {campaign.status === "requested" && (
                      <>
                        <button
                          onClick={() => handleAccept(campaign._id)}
                          className="flex-1 bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                          Accept Offer
                        </button>
                        <button
                          onClick={() => handleReject(campaign._id)}
                          className="flex-1 bg-white border border-red-200 text-red-600 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-red-50 transition"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {campaign.status === "accepted" && (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-500 text-xs font-medium py-2 px-3 rounded-lg cursor-not-allowed text-center"
                      >
                        Awaiting Escrow/Advance Transfer
                      </button>
                    )}

                    {(campaign.status === "advance_paid" || campaign.status === "active") && (
                      <button
                        onClick={() => openChat(campaign._id)}
                        className="w-full bg-indigo-600 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-indigo-700 shadow-sm transition"
                      >
                        Open Workspace Chat
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Creator Platform Inc. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="#terms" className="hover:text-indigo-600 transition">Terms of Service</a>
            <a href="#privacy" className="hover:text-indigo-600 transition">Privacy Policy</a>
            <a href="#support" className="hover:text-indigo-600 transition">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default InfluencerDash;