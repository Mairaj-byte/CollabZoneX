import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Bell,
  Search,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Menu from "../components/Menu";
import { assets } from '../assets/assets'



const BrandDash = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { userId } = useContext(ShopContext);

  const stats = [
    {
      label: "Brand Reach",
      value: "45.2k",
      growth: "+12%",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      label: "Engagement",
      value: "12.5%",
      growth: "+3.1%",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      label: "Active Ads",
      value: "18",
      growth: "Stable",
      gradient: "from-emerald-500 to-lime-400",
    },
  ];

  const handleAdvancePayment = async (campaignId, amount) => {
    try {
      // 1. Create order from backend
      const res = await fetch("http://localhost:4000/api/payment/advance/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId: campaignId,
          amount: amount,
        }),
      });

      const data = await res.json();

      // 2. Open Razorpay popup
      const options = {
        key: "rzp_test_S4wlmSNbitLgNI", // 🔥 replace
        amount: data.order.amount,
        currency: "INR",
        name: "Collab Platform",
        description: "Advance Payment",
        order_id: data.order.id,

        handler: async function (response) {
          // 3. Verify payment
          const verifyRes = await fetch(
            "http://localhost:4000/api/payment/advance/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                campaignId: campaignId,
                amount: amount,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Advance Payment Successful ✅");

            // 🔥 Refresh campaigns
            window.location.reload();
          } else {
            alert("Payment verification failed ❌");
          }
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed ❌");
    }
  };

  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Analytics", icon: BarChart3 },
    { name: "Audience", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  useEffect(() => {
    if (!userId) return; // 🔥 stop if not ready

    const fetchCampaigns = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/campaign/brand/${userId}`
        );
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [userId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">
      <div className='flex flex-1 overflow-hidden'>
        <aside className='shrink-0'>
          <Menu />
        </aside>
        <div className='flex flex-col flex-1 overflow-hidden'>
          <div className='h-18 mt-0 mb-0 px-2 py-2 border border-gray-200 bg-white flex flex-row justify-between items-center  sticky z-10 '>
            <div className="hidden sm:flex relative w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search analytics..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className='flex  gap-8 mr-2'>
              <button className='hover:opacity-70 transition-opacity p-1'>
                <Bell size={20} alt="Analytics" className='cursor-pointer w-10 sm:w-6 ' />
              </button>

              <button className='hover:opacity-70 transition-opacity p-1'>
                <Bell size={20} alt="Messages" className='cursor-pointer w-10 sm:w-6' />
              </button>

              <button className='hover:opacity-70 transition-opacity p-1'>
                <Bell size={20} alt="Notifications" className='cursor-pointer w-10 sm:w-6' />
              </button>

              <button className='bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-500'
                onClick={() => navigate("/createcampaign/:id")}
              >
                Create Campaign
              </button>
            </div>
          </div>

          <div className='h-18 gap-4 mt-0 mb-0 px-2 py-2 bg-blue border border-gray-200 bg-white flex flex-row justify-between items-center  sticky z-10 '>
            <div className='flex justify-between items-center gap-8'>
              <button className='border border-gray-300 rounded-md py-1 px-3 cursor-pointer hover:bg-gray-300 focus:bg-gray-300'>
                All Catagories
              </button>
              <button className=' flex gap-1 border border-gray-300 rounded-md py-1 px-3 cursor-pointer hover:bg-gray-300 focus:bg-gray-300'>
                <img src={assets.instagram_icon} alt="" className='cursor-pointer w-10 sm:w-6' />
                Instagram
              </button>
              <button className=' flex gap-1 items-center border border-gray-300 rounded-md py-1 px-3 cursor-pointer hover:bg-gray-300 focus:bg-gray-300'>
                <img src={assets.youtube_icon} alt="" className='cursor-pointer w-1 sm:w-7' />
                YouTube
              </button>
            </div>
            <div className='flex h-10 mr-2 items-center'>
              <label htmlFor="sort-by" className='mr-2'>Sort By:</label>
              <select
                id="sort-by"
                defaultValue="Latest Gigs"
                className='w-44 h-full border border-gray-300 rounded-md bg-white px-3 py-1 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition-all'
              >
                <option value="Latest Gigs">Latest Gigs</option>
                <option value="Oldest Gigs">Oldest Gigs</option>
                <option value="Highest Price">Highest Price</option>
                <option value="Lowest Price">Lowest Price</option>
              </select>
            </div>
          </div>

          {/* Main */}
          <main className='flex flex-1 overflow-hidden'>



            {/* Body */}
            <div className="flex-1 overflow-y-auto py-5 px-5">

              {/* Welcome */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                  Brand Performance
                </h2>
                <p className="text-gray-500 mt-1">
                  Here's a quick overview of your campaign metrics.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-full blur-2xl`}
                    />
                    <div className="relative z-10">
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                      <span className="text-sm text-green-600 font-semibold mt-2 inline-block">
                        {stat.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl overflow-hidden mb-10">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Campaign Analytics</h3>
                  <button className="flex items-center gap-1 text-indigo-600 font-medium text-sm">
                    View Report <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="h-72 flex items-center justify-center text-gray-400 italic">
                  Chart / Graph Placeholder
                </div>
              </div>

              {/* Campaign List */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Campaigns</h2>

                <div className="grid grid-cols-1 gap-6">
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

                      <div>
                        {campaign.status === "requested" && (
                          <button
                            disabled
                            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                          >
                            Waiting for Creator to Respond
                          </button>
                        )}

                        {campaign.status === "accepted" && (
                          <button
                            onClick={() => handleAdvancePayment(campaign._id, campaign.advanceAmount)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                          >
                            Pay Advance
                          </button>
                        )}

                        {campaign.status === "advance_paid" && (
                          <button
                            onClick={() => openChat(campaign._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                          >
                            Chat Enabled
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

              </div>

            </div>
            <aside className='shrink-0'>
              <div className=' bg-white border border-gray-400 flex flex-col w-60 px-0 py-0 mt-0 mb-0 overflow-y-clip sticky'>
                <div className='flex flex-col gap-2 px-2 py-4 border border-gray-300  bg-gray-50 rounded m-2'>
                  <h1 className='text-xl font-bold'>Quick Stats</h1>
                  <label htmlFor="">Active Request:</label><hr className='border-b bg-gray-100' />
                  <label htmlFor="">Panding Approvals:</label> <hr className='border-b bg-gray-100' />
                  <label htmlFor="">Earning this Month:</label><hr className='border-b bg-gray-100' />
                </div>
                <div className='flex flex-col gap-2 px-2 py-4 border border-gray-300 bg-gray-50 rounded m-2'>
                  <h1 className='text-xl font-bold'>Quick Stats</h1>
                  <label htmlFor="">Active Request:</label><hr className='border-b bg-gray-100' />
                  <label htmlFor="">Panding Approval:s:</label> <hr className='border-b bg-gray-100' />
                  <label htmlFor="">Earning this Month:</label><hr className='border-b bg-gray-100' />
                </div>
              </div>
            </aside>
          </main>

        </div>
      </div>
    </div>
  );
};

export default BrandDash;