import React, { useState, useEffect, useContext } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Bell,
  Search,
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  MessageSquare,
  DollarSign,
  Layers,
  SlidersHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Menu from "../components/Menu";
import { assets } from '../assets/assets';

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
      growth: "+12% this month",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      label: "Engagement Rate",
      value: "12.5%",
      growth: "+3.1% vs last week",
      gradient: "from-pink-500 to-rose-400",
    },
    {
      label: "Active Ads",
      value: "18",
      growth: "Stable performance",
      gradient: "from-emerald-500 to-teal-400",
    },
  ];

  const handleAdvancePayment = async (campaignId, amount) => {
    try {
      const res = await fetch("http://localhost:4000/api/payment/advance/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, amount }),
      });
      const data = await res.json();

      const options = {
        key: "rzp_test_S4wlmSNbitLgNI",
        amount: data.order.amount,
        currency: "INR",
        name: "Collab Platform",
        description: "Advance Payment",
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:4000/api/payment/advance/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, campaignId, amount }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Advance Payment Successful ✅");
            window.location.reload();
          } else {
            alert("Payment verification failed ❌");
          }
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed ❌");
    }
  };

  useEffect(() => {
    if (!userId) return;
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/campaign/brand/${userId}`);
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, [userId]);

  return (
    <div className="flex h-screen bg-slate-50/50 text-slate-800 font-sans antialiased overflow-hidden mt-25 shadow-2xl">
      {/* Sidebar Desktop Component */}
      <aside className="hidden md:block shrink-0 bg-white border-r border-slate-200/80 z-20">
        <Menu />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 px-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-100 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl md:hidden transition"
            >
              <MenuIcon size={22} />
            </button>
            <div className="hidden sm:flex relative w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search campaigns, analytics..."
                className="w-full bg-slate-100/80 border border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2.5 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition group">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
            </button>

            <button 
              onClick={() => navigate("/createcampaign/:id")}
              className="bg-indigo-600 text-white font-medium text-sm py-2.5 px-5 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
            >
              + <span className="hidden sm:inline">Create</span> Campaign
            </button>
          </div>
        </header>

        {/* Dynamic Filter Row */}
        <section className="px-4 md:px-8 py-3 bg-white border-b border-slate-100 flex flex-nowrap items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button className="border border-slate-200 text-slate-700 bg-slate-50 font-medium rounded-full py-1.5 px-4 text-xs md:text-sm hover:border-slate-300 transition cursor-pointer">
              All Categories
            </button>
            <button className="flex items-center gap-1.5 border border-slate-200 text-slate-600 rounded-full py-1.5 px-4 text-xs md:text-sm hover:bg-slate-50 transition cursor-pointer">
              <img src={assets.instagram_icon} alt="Instagram" className="w-4 h-4 object-contain" />
              <span>Instagram</span>
            </button>
            <button className="flex items-center gap-1.5 border border-slate-200 text-slate-600 rounded-full py-1.5 px-4 text-xs md:text-sm hover:bg-slate-50 transition cursor-pointer">
              <img src={assets.youtube_icon} alt="YouTube" className="w-4 h-4 object-contain" />
              <span>YouTube</span>
            </button>
          </div>

          <div className="flex items-center shrink-0 h-9 gap-2">
            <SlidersHorizontal size={14} className="text-slate-400 hidden sm:inline" />
            <select
              id="sort-by"
              defaultValue="Latest Gigs"
              className="h-full border border-slate-200 rounded-full bg-slate-50 text-xs md:text-sm text-slate-700 pl-3 pr-8 py-1 outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 transition cursor-pointer"
            >
              <option value="Latest Gigs">Latest Gigs</option>
              <option value="Oldest Gigs">Oldest Gigs</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Lowest Price">Lowest Price</option>
            </select>
          </div>
        </section>

        {/* Dashboard Viewport Area */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Scrollable Center Pane */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar">
            
            {/* Greetings Banner */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Brand Performance
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Real-time breakdown of your live media and active integrations.
              </p>
            </div>

            {/* Performance Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-[0.08] group-hover:opacity-[0.15] rounded-full blur-xl transition-all duration-500`} />
                  <div>
                    <p className="text-slate-400 font-medium text-xs tracking-wider uppercase">{stat.label}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 tracking-tight">{stat.value}</h3>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                      {stat.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Campaign Timeline Stream */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Your Active Campaigns</h2>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">Total: {campaigns.length}</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {campaigns.length === 0 ? (
                  <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                    No active campaigns found. Add one to get started!
                  </div>
                ) : campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 md:p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {campaign.platform}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${
                          campaign.status === 'accepted' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          campaign.status === 'advance_paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {campaign.status?.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-slate-800">{campaign.title}</h3>
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-2">{campaign.description}</p>
                      
                      <div className="pt-2 flex gap-4 text-xs md:text-sm text-slate-500">
                        <div>Budget: <span className="font-semibold text-slate-800">₹{campaign.totalBudget}</span></div>
                        <div>Advance: <span className="font-semibold text-emerald-600">₹{campaign.advanceAmount}</span></div>
                        <div>Final: <span className="font-semibold text-indigo-600">₹{campaign.finalAmount}</span></div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center justify-end">
                      {campaign.status === "requested" && (
                        <button disabled className="w-full md:w-auto bg-slate-100 text-slate-400 text-xs md:text-sm px-4 py-2.5 font-medium rounded-xl cursor-not-allowed">
                          Waiting for Response
                        </button>
                      )}

                      {campaign.status === "accepted" && (
                        <button
                          onClick={() => handleAdvancePayment(campaign._id, campaign.advanceAmount)}
                          className="w-full md:w-auto bg-indigo-600 text-white text-xs md:text-sm px-5 py-2.5 font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition cursor-pointer"
                        >
                          Pay Advance
                        </button>
                      )}

                      {campaign.status === "advance_paid" && (
                        <button
                          onClick={() => typeof openChat === 'function' && openChat(campaign._id)}
                          className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs md:text-sm px-5 py-2.5 font-semibold rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition cursor-pointer"
                        >
                          <MessageSquare size={16} /> Open Room Chat
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar  */}
          <aside className="hidden xl:block w-72 bg-white border-l border-slate-100 p-6 overflow-y-auto space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 tracking-wide flex items-center gap-2">
                <Layers size={16} className="text-indigo-500" />
                Quick Diagnostics
              </h4>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Active Requests</span>
                  <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded shadow-sm">4</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Pending Approvals</span>
                  <span className="font-semibold text-amber-600 bg-white px-2 py-0.5 rounded shadow-sm">2</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Monthly Runrate</span>
                  <span className="font-semibold text-emerald-600 bg-white px-2 py-0.5 rounded shadow-sm">₹84.5k</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <DollarSign size={18} className="text-indigo-300" />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Escrow Protected Fund</p>
                <h3 className="text-xl font-bold mt-1">₹1,24,000</h3>
              </div>
              <p className="text-[11px] text-slate-400">Funds are secured perfectly until the complete delivery of creative content items.</p>
            </div>
          </aside>
        </main>
      </div>

      {/* Slide-over Mobile Side Navigation Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full animate-in slide-in-from-left duration-200">
            <div className="p-4 flex justify-end">
              <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Menu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandDash;