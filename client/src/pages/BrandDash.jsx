import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Bell,
  Search,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";



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

  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Analytics", icon: BarChart3 },
    { name: "Audience", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  useEffect(() => {
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
    <div className="mt-21 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex">

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="text-2xl font-bold tracking-tight">
            LUXE<span className="text-indigo-600">.</span>
          </span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.name
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-600"
                  }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

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

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/brand-profile-setup")}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 shadow-md" />
          </div>
        </header>

        {/* Body */}
        <div className="p-6 lg:p-10">

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
                    {campaign.status === "pending" && (
                      <button
                        disabled
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        Waiting for Creator
                      </button>
                    )}

                    {campaign.status === "accepted" && (
                      <button
                        onClick={() => handleAdvancePayment(campaign._id)}
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
      </main>
    </div>
  );
};

export default BrandDash;