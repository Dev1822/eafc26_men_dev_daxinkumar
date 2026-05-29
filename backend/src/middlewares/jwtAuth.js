const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const jwtAuth = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route. No token provided."
            });
        }

        // Verify token
        const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';
        const decoded = jwt.verify(token, secret);

        // Find the user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The user belonging to this token no longer exists."
            });
        }

        // Verify that the session is still active
        const sessionExists = user.activeSessions.some(session => session.sessionId === decoded.sessionId);
        if (!sessionExists) {
            return res.status(401).json({
                success: false,
                message: "Session expired or logged out from another device."
            });
        }

        // Attach user to request
        req.user = user;
        req.sessionId = decoded.sessionId;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route. Invalid token."
        });
    }
};

module.exports = jwtAuth;
