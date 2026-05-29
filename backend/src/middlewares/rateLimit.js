const requestCounts = new Map();

const rateLimit = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5; // allow 5 requests per minute

    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, { count: 1, startTime: currentTime });
        return next();
    }

    const requestData = requestCounts.get(ip);

    // If the 1-minute window has passed, reset the counter
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
        message: "Too Many Requests. Please try again later."
    });
};

module.exports = rateLimit;
