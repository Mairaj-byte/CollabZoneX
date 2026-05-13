import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import transporter from '../config/nodeMailer.js';

// ================= SEND RESET OTP =================
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Save OTP + expiry
        user.resetOtp = otp;
        user.resetOtpExpiryAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Send email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hi ${user.name || ''},

Your password reset OTP is: ${otp}

This OTP is valid for 15 minutes.

Best regards,  
CollabZoneX Team`
        });

        return res.json({
            success: true,
            message: 'OTP sent to your email'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email, OTP, and new password are required'
        });
    }

    try {
        // Find user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Validate OTP
        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        if (user.resetOtpExpiryAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'OTP Expired'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiryAt = 0;

        await user.save();

        // Send confirmation email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset Successful',
            text: `Hi ${user.name || ''},

Your password has been reset successfully for email: ${email}

Best regards,  
CollabZoneX Team`
        });

        return res.json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error resetting password',
            error: error.message
        });
    }
};