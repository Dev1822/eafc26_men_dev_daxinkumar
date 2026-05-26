const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Check for a specific practice token
    if (authHeader && authHeader === 'Bearer admin-token') {
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or missing token."
        });
    }
};

module.exports = authMiddleware;
