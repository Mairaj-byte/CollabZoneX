import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
// import { api } from '../utils/api';

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
            toast.error('Please enter a valid email');
            return;
        }
        setLoading(true);
        try {
            // Single endpoint that checks both models
            const url = `http://localhost:4000/api/send-reset-otp`
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
            // Single endpoint that checks both models
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
            className="fixed inset-0 bg-black/45 flex justify-center items-center z-50"
            onClick={() => setReset(false)}
        >
            <div
                className="bg-white p-8 rounded-xl w-80 relative shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-xl"
                    onClick={() => setReset(false)}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                    Reset Password
                </h2>

                {!otpSent && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border px-4 py-2 rounded mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button
                            className="w-full bg-black text-white py-2 rounded cursor-pointer hover:bg-gray-800"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </>
                )}

                {otpSent && (
                    <div className="mt-4">
                        <p className="text-center mb-2 text-sm text-gray-600">Enter the OTP sent to your email</p>

                        <input
                            type="text"
                            maxLength={6}
                            placeholder="000000"
                            className="w-full border px-4 py-2 rounded tracking-widest text-center text-lg mb-3"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="text-blue-600 hover:underline text-sm mb-3"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP Again'}
                        </button>

                        <input
                            type="password"
                            placeholder="Set New Password"
                            className="w-full border px-4 py-2 rounded mb-3"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full border px-4 py-2 rounded mb-4"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button
                            className="cursor-pointer w-full bg-gray-900 text-white py-2 rounded hover:bg-black"
                            onClick={handleResetPassword}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
