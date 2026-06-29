import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { Mail, Lock, KeyRound, X, ArrowLeft } from 'lucide-react';

const ResetPassword = ({ setReset }) => {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        setLoading(true);
        try {
            const url = `http://localhost:4000/api/send-reset-otp`;
            const res = await axios.post(url, { email });

            if (res?.data?.success) {
                toast.success(res.data.message || "OTP sent successfully");
                setOtpSent(true);
            } else {
                toast.error((res?.data?.message) || "Failed to send OTP");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            const url = `http://localhost:4000/api/reset-password`;
            const res = await axios.post(url, { 
                email, 
                otp, 
                newPassword 
            });

            if (res?.data?.success) {
                toast.success(res.data.message || "Password reset successfully");
                setReset(false);
            } else {
                toast.error((res?.data?.message) || "Failed to reset password");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => setReset(false)}
        >
            <div
                className="bg-white/95 border border-slate-200/60 backdrop-blur-md p-8 rounded-2xl w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none"
                    onClick={() => setReset(false)}
                >
                    <X size={18} />
                </button>

                {/* Header Section */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        {otpSent ? "Verify Code" : "Reset Password"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5">
                        {otpSent 
                          ? "We sent a secure verification token to your inbox." 
                          : "Enter your registered email address to receive an OTP code."}
                    </p>
                </div>

                {!otpSent && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            {loading ? 'Sending Code...' : 'Send Verification OTP'}
                        </button>
                    </form>
                )}

                {otpSent && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 text-center">
                                6-Digit OTP Verification
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <KeyRound size={18} />
                                </div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000 000"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl tracking-[0.25em] text-center font-bold text-lg text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Restricts to digits
                                    required
                                />
                            </div>
                            <div className="flex justify-end mt-1.5">
                                <button
                                    type="button"
                                    className="text-xs font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors focus:outline-none disabled:opacity-50"
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                >
                                    Resend Verification Code
                                </button>
                            </div>
                        </div>

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
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2 space-y-2">
                            <button
                                type="submit"
                                className="w-full relative group overflow-hidden py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 disabled:opacity-70"
                                disabled={loading}
                            >
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                {loading ? 'Updating Password...' : 'Save & Reset Password'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setOtpSent(false)}
                                className="w-full flex items-center justify-center py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl transition-all duration-200"
                            >
                                <ArrowLeft size={14} className="mr-1.5" /> Back to Email Entry
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;