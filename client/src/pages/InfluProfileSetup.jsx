import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfluProfileSetup = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    niche: "",
    instagram: "",
    youtube: "",
    followersCount: "",
    engagementRate: "",
    location: "",
    pricePerPost: ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch existing profile (Edit Mode)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/creator/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data) {
          setFormData({
            username: res.data.username || "",
            bio: res.data.bio || "",
            niche: res.data.niche || "",
            instagram: res.data.socialLinks?.instagram || "",
            youtube: res.data.socialLinks?.youtube || "",
            followersCount: res.data.followersCount || "",
            engagementRate: res.data.engagementRate || "",
            location: res.data.location || "",
            pricePerPost: res.data.pricePerPost || ""
          });

          if (res.data.profileImage) {
            setPreview(res.data.profileImage); // existing image URL
          }
        }
      } catch (err) {
        console.log("No existing profile found");
      }
    };

    if (token) fetchProfile();
  }, [token]);

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

    try {
      const data = new FormData();

      data.append("username", formData.username);
      data.append("bio", formData.bio);
      data.append("niche", formData.niche);
      data.append("location", formData.location);
      data.append("instagram", formData.instagram);
      data.append("youtube", formData.youtube);
      data.append("followersCount", Number(formData.followersCount));
      data.append("engagementRate", Number(formData.engagementRate));
      data.append("pricePerPost", Number(formData.pricePerPost));

      if (profileImage) {
        data.append("profileImage", profileImage);
      }


      await axios.post(
        "http://localhost:4000/api/creator",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Profile saved successfully 🎉");
      setTimeout(() => navigate("/influencerdash"), 1200);
    } catch (err) {
      toast.error("Profile save failed ❌");
    }
  };

  return (

    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6 mt-21">
    
      <ToastContainer />

      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Accent */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Creator Setup</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Build your digital identity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Profile Image Circle - Unique Center Piece */}
            <div className="flex justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group-hover:border-blue-400 transition-colors">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs text-center p-2 font-medium">Add Photo</span>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Ref" />
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </label>
            </div>

            {/* Essential Info */}
            <div className="space-y-3">
              <input
                name="username"
                placeholder="@username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 rounded-lg px-4 py-2.5 text-sm transition-all outline-none border"
              />

              <textarea
                name="bio"
                placeholder="Tell your story..."
                value={formData.bio}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 rounded-lg px-4 py-2.5 text-sm min-h-[80px] transition-all outline-none border resize-none"
              />
            </div>

            {/* Niche & Location - Small Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  name="niche"
                  placeholder="Niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-transparent focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm outline-none border"
                />
              </div>
              <div className="relative">
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-transparent focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm outline-none border"
                />
              </div>
            </div>

            {/* Stats Row - Compact Glass Cards */}
            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                <label className="block text-[10px] uppercase text-blue-400 font-bold ml-1">Followers</label>
                <input
                  name="followersCount"
                  type="number"
                  placeholder="0"
                  value={formData.followersCount}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold px-1 outline-none"
                />
              </div>
              <div className="bg-purple-50/50 p-2 rounded-lg border border-purple-100">
                <label className="block text-[10px] uppercase text-purple-400 font-bold ml-1">Eng. %</label>
                <input
                  name="engagementRate"
                  step="0.1"
                  type="number"
                  placeholder="0.0"
                  value={formData.engagementRate}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold px-1 outline-none"
                />
              </div>
              <div className="bg-pink-50/50 p-2 rounded-lg border border-pink-100">
                <label className="block text-[10px] uppercase text-pink-400 font-bold ml-1">Price (₹)</label>
                <input
                  name="pricePerPost"
                  type="number"
                  placeholder="0"
                  value={formData.pricePerPost}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold px-1 outline-none"
                />
              </div>
            </div>

            {/* Social Links - Slimmed down */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center bg-gray-50 rounded-lg px-3">
                <span className="text-gray-400 text-xs font-bold mr-2 italic">IG</span>
                <input
                  name="instagram"
                  placeholder="Instagram URL"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-xs outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-50 rounded-lg px-3">
                <span className="text-gray-400 text-xs font-bold mr-2 italic">YT</span>
                <input
                  name="youtube"
                  placeholder="YouTube URL"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-xs outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-indigo-600 shadow-lg shadow-gray-200 hover:shadow-blue-200 transition-all active:scale-[0.98]"
            >
              Complete Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfluProfileSetup;
