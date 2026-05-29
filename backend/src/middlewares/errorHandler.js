const errorHandler = (err, req, res, next) => {
    console.error(`[Error Caught] ${err.message}`);

    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || "Internal Server Error",
            status: statusCode,
            // In a real production environment, stack traces should be hidden. 
            // We expose it here for practice/debugging purposes.
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
        }
    });
};

module.exports = errorHandler;
