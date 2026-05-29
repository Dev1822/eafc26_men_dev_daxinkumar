const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate a token
const generateToken = (userId, sessionId) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';
    return jwt.sign({ userId, sessionId }, secret, { expiresIn: '7d' });
};

// ================= 1. REGISTER =================
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 2. LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password, device } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password." });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // Create a new session
        const sessionId = Math.random().toString(36).substring(2, 15);
        const deviceName = device || req.headers['user-agent'] || 'Unknown Device';
        
        user.activeSessions.push({ sessionId, device: deviceName });
        await user.save();

        const token = generateToken(user._id, sessionId);

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 3. LOGOUT =================
exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Remove the current session
        user.activeSessions = user.activeSessions.filter(s => s.sessionId !== req.sessionId);
        await user.save();

        res.status(200).json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 4. GET PROFILE =================
exports.getProfile = async (req, res) => {
    res.status(200).json({ success: true, data: req.user });
};

// ================= 5. UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ success: true, message: "Profile updated.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 6. DELETE PROFILE =================
exports.deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ success: true, message: "Account deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 7. FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "No account found with that email." });
        }

        const resetToken = Math.random().toString(36).substring(2, 15);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // MOCK EMAIL SENDING
        console.log(`[MAILER MOCK] Password reset token for ${email}: ${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to email." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 8. RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        }).select('+password');

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        // Invalidate all existing sessions for security
        user.activeSessions = []; 
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully. Please login." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 9. CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect current password." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 10. VERIFY EMAIL =================
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "Email already verified." });
        }

        user.isEmailVerified = true;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 11. SEND OTP =================
exports.sendOtp = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        user.otpCode = otp;
        user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        // MOCK EMAIL SENDING
        console.log(`[MAILER MOCK] OTP for ${user.email}: ${otp}`);

        res.status(200).json({ success: true, message: "OTP sent to email." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 12. VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.user._id).select('+otpCode +otpExpiresAt');

        if (!user.otpCode || user.otpCode !== otp || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        user.otpCode = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 13. RESEND VERIFICATION =================
exports.resendVerification = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "Email already verified." });
        }

        // MOCK EMAIL SENDING
        console.log(`[MAILER MOCK] Resending verification email to ${user.email}`);

        res.status(200).json({ success: true, message: "Verification email resent." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 14. GET SESSION =================
exports.getSession = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ 
            success: true, 
            activeSessions: user.activeSessions 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 15. DELETE SESSION =================
exports.deleteSession = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Log out from all sessions
        user.activeSessions = [];
        await user.save();

        res.status(200).json({ success: true, message: "Logged out from all active sessions successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
