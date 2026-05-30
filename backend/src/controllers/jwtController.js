const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';

// ================= 1. GENERATE TOKEN =================
// Public endpoint for practice: Generates a real token for a given user ID without a password
exports.generateToken = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Please provide a valid userId." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const sessionId = Math.random().toString(36).substring(2, 15);
        user.activeSessions.push({ sessionId, device: 'JWT Practice Tool' });
        await user.save();

        const token = jwt.sign({ userId: user._id, sessionId }, secret, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "JWT generated successfully.",
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 2. VERIFY TOKEN =================
// Protected endpoint: simply returns success if the middleware passed
exports.verifyToken = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is valid!",
        decodedData: {
            userId: req.user._id,
            sessionId: req.sessionId
        }
    });
};

// ================= 3. REFRESH TOKEN =================
// Protected endpoint: invalidates current session and issues a new token
exports.refreshToken = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Remove old session
        user.activeSessions = user.activeSessions.filter(s => s.sessionId !== req.sessionId);
        
        // Create new session
        const newSessionId = Math.random().toString(36).substring(2, 15);
        user.activeSessions.push({ sessionId: newSessionId, device: 'JWT Refresh Tool' });
        await user.save();

        const newToken = jwt.sign({ userId: user._id, sessionId: newSessionId }, secret, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully. Old token is now invalid.",
            token: newToken
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 4. REVOKE TOKEN =================
// Protected endpoint: invalidates current session without issuing a new one
exports.revokeToken = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Remove current session
        user.activeSessions = user.activeSessions.filter(s => s.sessionId !== req.sessionId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Token revoked successfully. You are now logged out."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= 5. PROFILE =================
exports.getProfile = (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to your protected profile.", user: req.user });
};

// ================= 6. DASHBOARD =================
exports.getDashboard = (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the protected dashboard." });
};

// ================= 7. ADMIN =================
exports.getAdmin = (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the strictly protected admin portal." });
};

// ================= 8. PRIVATE STATS =================
exports.getPrivateStats = (req, res) => {
    res.status(200).json({ success: true, message: "Displaying highly classified private stats." });
};

// ================= 9. PRIVATE PLAYERS =================
exports.getPrivatePlayers = (req, res) => {
    res.status(200).json({ success: true, message: "Displaying protected player records." });
};

// ================= 10. TEAM DASHBOARD =================
exports.getTeamDashboard = (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the protected team management dashboard." });
};
