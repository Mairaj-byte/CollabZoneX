import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Mail, Lock, User, Eye, EyeOff, Briefcase, User2, KeyRound, Sparkles, ArrowRight } from "lucide-react";

const SignInPage = () => {
  const [currentState, setCurrentState] = useState("Login"); 
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    identity: "brand", 
    otp: "",
    newPassword: ""
  });

  const { setToken, setIdentity } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/api/send-reset-otp", { email: formData.email });
      if (data.success) {
        toast.success(data.message || "OTP sent successfully!");
        setOtpSent(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/api/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      if (data.success) {
        toast.success("Password reset successfully! Please login.");
        setCurrentState("Login");
        setOtpSent(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (currentState === "Forgot Password") {
      if (!otpSent) {
        handleSendOtp();
      } else {
        handleResetPassword(e);
      }
      return;
    }

    setLoading(true);
    try {
      const isSignUp = currentState === "Sign Up";
      const url = `http://localhost:4000/api/user/${isSignUp ? "register" : "login"}`;
      const payload = isSignUp
        ? formData
        : { email: formData.email, password: formData.password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("identity", data.user.identity);
        localStorage.setItem("userId", data.user.id);

        setToken(data.token);
        setIdentity(data.user.identity);

        toast.success(isSignUp ? "Welcome to the ecosystem! 🎉" : "Welcome back! ✨");

        navigate(isSignUp 
          ? (data.user.identity === "brand" ? "/brand-profile-setup" : "/influ-profile-setup")
          : (data.user.identity === "brand" ? "/influlist" : "/brandlist")
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      
     
      <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-tr from-violet-900 via-indigo-950 to-slate-950 p-12 flex-col justify-between overflow-hidden border-r border-slate-800">
      
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white" size={22} />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CollabSphere
          </span>
        </div>

        <div className="relative z-10 my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-violet-300">
            ✨ Space for Creators & Brands
          </div>
          <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.1] text-white">
            {currentState === "Login" && "Bridge Your Vision With Massive Impact."}
            {currentState === "Sign Up" && "The Gateway to High-Value Partnerships."}
            {currentState === "Forgot Password" && "No Worries. We've Got You Covered."}
          </h1>
          <p className="text-slate-400 text-lg max-w-sm">
            {currentState === "Login" && "Sign in to launch new campaigns or match with top-tier creators instantly."}
            {currentState === "Sign Up" && "Create your customized profile wrapper and start building verified partnerships today."}
            {currentState === "Forgot Password" && "Securing your digital workspace is our absolute top priority."}
          </p>

          
          <div className="pt-6">
            <div className="p-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl flex items-center gap-4 shadow-2xl max-w-sm transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg">
                
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Live Platform Activity</p>
                <p className="text-sm font-bold text-slate-200">142+ Campaign Matches Formed Today</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 relative z-10">
          &copy; {new Date().getFullYear()} CollabSphere Inc. All rights reserved.
        </p>
      </div>

      
      <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12 bg-slate-950">
        <div className="w-full max-w-md space-y-8">
          
          
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              {currentState === "Login" && "Welcome Back"}
              {currentState === "Sign Up" && "Get Started"}
              {currentState === "Forgot Password" && "Recover Access"}
            </h2>
            <p className="text-slate-400 text-sm">
              {currentState === "Login" && "Enter your dynamic credentials below to drop back in."}
              {currentState === "Sign Up" && "Set up an authentic account to initiate collaborations."}
              {currentState === "Forgot Password" && (otpSent ? "Check your mailbox for our security token." : "Provide your email coordinates to receive an access token.")}
            </p>
          </div>

          
          {currentState !== "Forgot Password" && (
            <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800/80">
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  currentState === "Login" 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  currentState === "Sign Up" 
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>
          )}

          
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {currentState === "Sign Up" && (
              <div className="relative group">
                <User className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={19} />
                <input 
                  name="name" 
                  type="text" 
                  placeholder="Full Name / Brand Name" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-slate-100 placeholder-slate-500" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={19} />
              <input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-slate-100 placeholder-slate-500" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            {currentState !== "Forgot Password" && (
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={19} />
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-slate-100 placeholder-slate-500" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  required 
                />
                <button 
                  type="button"
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            )}

            {currentState === "Forgot Password" && otpSent && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative group">
                  <KeyRound className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={19} />
                  <input 
                    name="otp" 
                    type="text" 
                    placeholder="6-Digit OTP" 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-slate-100 placeholder-slate-500 tracking-widest font-mono" 
                    value={formData.otp} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-3.5 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={19} />
                  <input 
                    name="newPassword" 
                    type="password" 
                    placeholder="New Secure Password" 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-slate-100 placeholder-slate-500" 
                    value={formData.newPassword} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
            )}

          
            {currentState === "Sign Up" && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Profile Alignment</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`group cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
                    formData.identity === "brand"
                      ? "border-violet-500 bg-violet-600/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                  }`}>
                    <Briefcase size={22} className={formData.identity === "brand" ? "text-violet-400" : "text-slate-400 group-hover:text-slate-300"} />
                    <input type="radio" name="identity" value="brand" checked={formData.identity === "brand"} className="hidden" onChange={handleInputChange} />
                    <span className={`text-sm font-semibold ${formData.identity === "brand" ? "text-white" : "text-slate-400"}`}>Corporate Brand</span>
                  </label>

                  <label className={`group cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
                    formData.identity === "creator"
                      ? "border-violet-500 bg-violet-600/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                  }`}>
                    <User2 size={22} className={formData.identity === "creator" ? "text-violet-400" : "text-slate-400 group-hover:text-slate-300"} />
                    <input type="radio" name="identity" value="creator" checked={formData.identity === "creator"} className="hidden" onChange={handleInputChange} />
                    <span className={`text-sm font-semibold ${formData.identity === "creator" ? "text-white" : "text-slate-400"}`}>Digital Creator</span>
                  </label>
                </div>
              </div>
            )}

            {/* HELP LINKS */}
            <div className="flex items-center justify-between text-xs">
              {currentState === "Forgot Password" ? (
                <button 
                  type="button" 
                  className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  onClick={() => { setCurrentState("Login"); setOtpSent(false); }}
                >
                  Back to Log In
                </button>
              ) : (
                <button
                  type="button"
                  className="text-slate-500 hover:text-slate-300 transition-colors font-medium ml-auto"
                  onClick={() => setCurrentState("Forgot Password")}
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {currentState === "Login" && "Authenticate Frame"}
                  {currentState === "Sign Up" && "Initialize Profile Setup"}
                  {currentState === "Forgot Password" && (otpSent ? "Apply Account Overhaul" : "Request Reset Token")}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;