import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { User, Lock, CreditCard, Bell, Briefcase, Camera, LogOut, Mail, X } from 'lucide-react';

const AccountSetting = () => {
  const navigate = useNavigate();
  const { token, identity, logout } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('profile');
  
  // Modal states
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);


  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    
    // Brand specific fields
    brandName: '',
    industry: '',
    website: '',
    budgetRange: '',
    
    // Creator specific fields
    username: '',
    bio: '',
    niche: '',
    location: '',
    instagram: '',
    youtube: '',
    followersCount: '',
    engagementRate: '',
    pricePerPost: ''
  });

  // API states
  const [profileImage, setProfileImage] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        if (identity === "brand") {
          const res = await fetch("http://localhost:4000/api/brand/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (data.success) {
            setFormData(prev => ({
              ...prev,
              brandName: data.data.brandName || "",
              industry: data.data.industry || "",
              website: data.data.website || "",
              budgetRange: data.data.budgetRange || "",
            }));
            if (data.data.logo) setPreview(data.data.logo);
          }
        } else {
          
          const res = await fetch("http://localhost:4000/api/creator/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          
          const data = await res.json();
          
          const creatorData = data.data || data; 

          if (creatorData) {
            setFormData(prev => ({
              ...prev,
              username: creatorData.username || "",
              bio: creatorData.bio || "",
              niche: creatorData.niche || "",
              location: creatorData.location || "",
              instagram: creatorData.socialLinks?.instagram || creatorData.instagram || "",
              youtube: creatorData.socialLinks?.youtube || creatorData.youtube || "",
              followersCount: creatorData.followersCount || "",
              engagementRate: creatorData.engagementRate || "",
              pricePerPost: creatorData.pricePerPost || ""
            }));

            if (creatorData.profileImage) {
              setPreview(creatorData.profileImage);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token, identity]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (identity === "brand") {
        const form = new FormData();
        form.append("brandName", formData.brandName);
        form.append("industry", formData.industry);
        form.append("website", formData.website);
        form.append("budgetRange", formData.budgetRange);
        if (profileImage) form.append("logo", profileImage);

        const res = await fetch("http://localhost:4000/api/brand", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });

        const data = await res.json();
        if (res.ok && data.success !== false) {
          setMessage(data.message || "Brand profile updated successfully.");
        } else {
          setMessage("Something went wrong updating brand.");
        }

      } else {
        const form = new FormData();
        form.append("username", formData.username);
        form.append("bio", formData.bio);
        form.append("niche", formData.niche);
        form.append("location", formData.location);
        form.append("instagram", formData.instagram);
        form.append("youtube", formData.youtube);
        form.append("followersCount", Number(formData.followersCount));
        form.append("engagementRate", Number(formData.engagementRate));
        form.append("pricePerPost", Number(formData.pricePerPost));
        
        if (profileImage) {
          form.append("profileImage", profileImage);
        }

        const res = await fetch("http://localhost:4000/api/creator", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });

        if (res.ok) {
          setMessage("Creator profile saved successfully!");
        } else {
          setMessage("Profile save failed.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error occurred.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signinpage');
  };

  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fadeIn overflow-y-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {identity === 'brand' ? 'Brand Profile Setup' : 'Creator Profile Setup'}
            </h2>
            
            {message && (
              <div className={`mb-6 p-3 rounded-lg text-center font-medium ${message.includes('failed') || message.includes('error') || message.includes('wrong') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Common Fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Account Holder Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} disabled placeholder="Your registered email" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 outline-none" />
                </div>
              </div>

              {/* Identity Logic  */}
              {identity === 'brand' ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                      <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                      <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                        <option value="">Select Budget</option>
                        <option value="5k-10k">5k-10k</option>
                        <option value="10k-50k">10k-50k</option>
                        <option value="50k-100k">50k-100k</option>
                        <option value="100k+">100k+</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                
                <>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input name="username" placeholder="@username" value={formData.username} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
                      <input name="niche" placeholder="e.g. Tech, Beauty, Gaming" value={formData.niche} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea name="bio" placeholder="Tell your story..." value={formData.bio} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px] resize-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Post (₹)</label>
                      <input name="pricePerPost" type="number" placeholder="0" value={formData.pricePerPost} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Followers</label>
                      <input name="followersCount" type="number" placeholder="0" value={formData.followersCount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate (%)</label>
                      <input name="engagementRate" type="number" step="0.1" placeholder="0.0" value={formData.engagementRate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                      <input name="instagram" placeholder="https://instagram.com/..." value={formData.instagram} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                      <input name="youtube" placeholder="https://youtube.com/..." value={formData.youtube} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Image Upload Section */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {identity === 'brand' ? 'Brand Logo' : 'Profile Picture'}
                </label>
                <div className="flex items-center gap-4 mt-2">
                  {preview ? (
                    <img src={preview} alt="Preview" className={`object-cover border border-gray-200 shadow-sm ${identity === 'brand' ? 'h-16 w-16 rounded-lg' : 'h-20 w-20 rounded-full'}`} />
                  ) : (
                    <div className={`bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 ${identity === 'brand' ? 'h-16 w-16 rounded-lg' : 'h-20 w-20 rounded-full'}`}>
                      <Camera size={24} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="mt-6 w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md">
                {loading ? "Saving..." : "Save Profile Details"}
              </button>
            </form>
          </div>
        );

      case 'billing':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {identity === 'brand' ? 'Billing & Escrow Funding' : 'Payout Methods'}
            </h2>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {identity === 'brand' ? 'Saved Credit Cards' : 'Saved Bank Accounts'}
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-white border border-gray-200 rounded shadow-sm">
                <CreditCard className="text-gray-500 hidden sm:block" />
                <div>
                  <p className="font-medium text-gray-800">{identity === 'brand' ? 'Visa ending in 4242' : 'HDFC Bank ending in 1234'}</p>
                  <p className="text-sm text-gray-500">Expires 12/28</p>
                </div>
                <button className="sm:ml-auto text-red-500 text-sm hover:underline mt-2 sm:mt-0">Remove Method</button>
              </div>
            </div>
            <button className="px-6 py-2 w-full sm:w-auto border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-50 transition">
              + Add New Method
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="pr-4">
                  <p className="font-semibold text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your campaigns via email.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 shrink-0" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-900  relative overflow-y-auto scrollbar-hide mt-25">
      <div className=" min-h-[calc(100vh-80px)] max-w-full mx-auto bg-white  shadow-lg overflow-hidden flex flex-col md:flex-row ">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 md:p-6 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800 mb-6 px-2">Settings</h1>
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
            
            <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap transition ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              <User size={20} /> Profile Details
            </button>
            <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap transition ${activeTab === 'billing' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {identity === 'brand' ? <Briefcase size={20} /> : <Camera size={20} />} {identity === 'brand' ? 'Billing' : 'Payouts'}
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap transition ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Bell size={20} /> Notifications
            </button>
            
            <div className="md:my-4 border-l md:border-l-0 md:border-t border-gray-200 mx-2 md:mx-0"></div>
            
            <button onClick={() => setIsPasswordModalOpen(true)} className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap text-gray-600 hover:bg-gray-100 transition">
              <Lock size={20} /> Change Password
            </button>
            <button onClick={() => setIsEmailModalOpen(true)} className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg whitespace-nowrap text-gray-600 hover:bg-gray-100 transition">
              <Mail size={20} /> Verify Email
            </button>

            <div className="md:my-4 border-l md:border-l-0 md:border-t border-gray-200 mx-2 md:mx-0"></div>

            <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition whitespace-nowrap">
              <LogOut size={20} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10">
          {renderTabContent()}
        </main>
      </div>

    

      {/* 1. Change Password Modal */}
{isPasswordModalOpen && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    onClick={() => setIsPasswordModalOpen(false)}
  >
    <div 
      className="bg-white/95 border border-slate-200/60 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button 
        onClick={() => setIsPasswordModalOpen(false)} 
        className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none"
      >
        <X size={18} />
      </button>

      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Change Password
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Ensure your account is using a secure, complex password to stay fully protected.
          </p>
        </div>

        {/* Form Container */}
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert("Password updated"); 
            setIsPasswordModalOpen(false); 
          }} 
          className="space-y-4"
        >
          {/* Current Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
              />
            </div>
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                placeholder="Minimum 6 characters"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
              />
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200" 
              />
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button 
              type="submit" 
              className="w-full relative group overflow-hidden py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              Update Password
            </button>
            
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {/* 2. Verify Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp relative">
            <button onClick={() => setIsEmailModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={24} />
            </button>
            <div className="p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify your Email</h2>
              <p className="text-gray-600 mb-6">
                We will send a verification link to your email. Click the link inside to verify your account.
              </p>
              <button 
                onClick={() => { alert('Verification link sent!'); setIsEmailModalOpen(false); }} 
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Send Verification Link
              </button>
              <button onClick={() => setIsEmailModalOpen(false)} className="w-full mt-3 p-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountSetting;