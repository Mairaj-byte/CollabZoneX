import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
    <p className="text-gray-400 text-xs mb-1">{title}</p>
    <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
  </div>
);

const CampaignItem = ({ brand, status, budget }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-b-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{brand}</p>
      <p className="text-xs text-gray-400">Status: {status}</p>
    </div>
    <p className="text-sm font-semibold text-gray-700">₹{budget}</p>
  </div>
);

const InfluencerDash = () => {
  const navigate = useNavigate();
  const { userId } = useContext(ShopContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCampaigns = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/campaign/creator/${userId}`
      );

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

  const totalEarnings = campaigns.reduce(
    (sum, c) => sum + (c.totalBudget || 0),
    0
  );


  const handleAccept = async (campaignId) => {
    try {
      await axios.put(`http://localhost:4000/api/campaign/status/${campaignId}`, {
        status: "accepted",
      });

      fetchCampaigns(); 

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 mt-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Influencer Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard title="Campaigns" value={campaigns.length} />
        <StatCard title="Earnings" value={`₹${totalEarnings}`} />
        <StatCard
          title="Active"
          value={campaigns.filter(c => c.status === "active").length}
        />
        <StatCard
          title="Completed"
          value={campaigns.filter(c => c.status === "completed").length}
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Active Campaigns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Active Campaigns
          </h2>

          {loading ? (
            <p className="text-sm text-gray-500">Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-sm text-gray-500">No campaigns found</p>
          ) : (
            campaigns.map((c) => (
              <CampaignItem
                key={c._id}
                brand={c.title}
                status={c.status}
                budget={c.totalBudget}
              />
            ))
          )}
        </div>

        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Profile Status
          </h2>

          <p className="text-xs text-gray-500 mb-1">Completion</p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "80%" }}
            />
          </div>

          <p className="text-xs text-gray-400 mb-4">80% completed</p>

          <button
            onClick={() => navigate("/influ-profile-setup")}
            className="w-full bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Complete Profile
          </button>
        </div>
      </div>

      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Your Campaigns</h2>

        {loading ? (
          <p className="text-gray-500">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-gray-500">No campaigns available</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {campaign.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {campaign.description}
                </p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Platform:</strong> {campaign.platform}</p>
                  <p><strong>Budget:</strong> ₹{campaign.totalBudget}</p>
                  <p><strong>Status:</strong> {campaign.status}</p>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-green-600 font-medium">
                    Advance ₹{campaign.advanceAmount}
                  </span>
                  <span className="text-blue-600 font-medium">
                    Final ₹{campaign.finalAmount}
                  </span>
                </div>

                <div className="flex gap-3">

                  {campaign.status === "requested" && (
                    <>
                      <button
                        onClick={() => handleAccept(campaign._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(campaign._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {campaign.status === "accepted" && (
                    <button
                      disabled
                      className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                    >
                      Waiting for Advance
                    </button>
                  )}

                  {campaign.status === "advance_paid" && (
                    <button
                      onClick={() => openChat(campaign._id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Chat Enabled !
                    </button>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default InfluencerDash;