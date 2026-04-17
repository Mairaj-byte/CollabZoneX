import bcrypt from 'bcryptjs';
import models from '../models/userModel.js';
import transporter from '../config/nodeMailer.js';
const { userModel } = models;

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }
    try {
        // Check if email exists in userModel
        let user = await userModel.findOne({ email });
        
        
        // If still not found, return error
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpiryAt = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        const userName = user.name || ''; // adjust field as needed
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password reset OTP',
            text: `Hi ${userName},\n\nYour password reset OTP is: ${otp}\n\nThis OTP is valid for 15 minutes.\n\nBest regards,\nCollabZoneX Team`
        };
        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password are required' });
    }
    try {
        // Check if email exists in userModel
        let user = await userModel.findOne({ email });
        
        
        // If still not found, return error
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }
        if (user.resetOtpExpiryAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiryAt = 0;
        await user.save();

        const userName = user.name || '';
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password reset successfully',
            text: `Hi ${userName},\n\nYour password has been reset successfully for Email id: ${email}\n\nBest regards,\nCollabZoneX Team`
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        res.json({ success: false, message: 'Error resetting password', error: error.message });
    }
};