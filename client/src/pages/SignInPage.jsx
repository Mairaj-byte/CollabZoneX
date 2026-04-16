import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Mail, Lock, User, Eye, EyeOff, Briefcase, User2 } from "lucide-react";

const SignInPage = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    identity: "",
  });

  const { setToken, setIdentity } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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

        toast.success(isSignUp ? "Account created! 🚀" : "Welcome back! ✨");

        if (isSignUp) {
          // 👉 After registration
          navigate(
            data.user.identity === "brand"
              ? "/brand-profile-setup"
              : "/influ-profile-setup"
          );
        } else {
          // 👉 After login (your existing logic)
          navigate(
            data.user.identity === "brand"
              ? "/influlist"
              : "/brandlist"
          );
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 transition-all duration-500">

        {/* Toggle */}
        <div className="relative flex bg-gray-100 rounded-xl p-1 mb-8">
          <div
            className={`absolute top-1 bottom-1 w-[48%] bg-blue-600 rounded-xl transition-all duration-300 ${currentState === "Login" ? "left-1" : "left-[51%]"
              }`}
          />
          <button
            onClick={() => setCurrentState("Login")}
            className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${currentState === "Login" ? "text-white" : "text-gray-500"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentState("Sign Up")}
            className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors ${currentState === "Sign Up" ? "text-white" : "text-gray-500"
              }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {currentState === "Login" ? "Welcome Back !" : "Create Account "}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {currentState === "Login"
              ? "Login to continue"
              : "Join and start collaborating"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">

          {/* Name */}
          {currentState === "Sign Up" && (
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div
              className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Identity */}
          {currentState === "Sign Up" && (
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all flex flex-col items-center gap-2 ${formData.identity === "brand"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                  }`}
              >
                <Briefcase size={20} />
                <input
                  type="radio"
                  name="identity"
                  value="brand"
                  className="hidden"
                  onChange={handleInputChange}
                  required
                />
                <span className="text-sm font-medium">Brand</span>
              </label>

              <label
                className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all flex flex-col items-center gap-2 ${formData.identity === "creator"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                  }`}
              >
                <User2 size={20} />
                <input
                  type="radio"
                  name="identity"
                  value="creator"
                  className="hidden"
                  onChange={handleInputChange}
                />
                <span className="text-sm font-medium">Creator</span>
              </label>
            </div>
          )}

          <div className="flex justify-end">
            <span className="text-xs text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            {currentState === "Login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
