const createRateLimiter = (options = {}) => {
    const windowMs = options.windowMs || 60 * 1000; // default 1 minute
    const maxRequests = options.maxRequests || 5;
    const message = options.message || "Too Many Requests. Please try again later.";
    
    // Each instance gets its own map so limits don't overlap across routes
    const requestCounts = new Map();

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const currentTime = Date.now();

        if (!requestCounts.has(ip)) {
            requestCounts.set(ip, { count: 1, startTime: currentTime });
            return next();
        }

        const requestData = requestCounts.get(ip);

        // If the window has passed, reset the counter
        if (currentTime - requestData.startTime > windowMs) {
            requestCounts.set(ip, { count: 1, startTime: currentTime });
            return next();
        }

        // If within the window and under the limit, increment the counter
        if (requestData.count < maxRequests) {
            requestData.count++;
            requestCounts.set(ip, requestData);
            return next();
        }

        // Over the limit
        return res.status(429).json({
            success: false,
            message: message
        });
    };
};

module.exports = createRateLimiter;
