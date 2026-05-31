const logs = [];
const MAX_LOGS = 100;

const logger = (req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    };
    
    console.log(`[${logEntry.timestamp}] ${logEntry.method} request to ${logEntry.url}`);
    
    logs.unshift(logEntry);
    if (logs.length > MAX_LOGS) {
        logs.pop();
    }
    
    next();
};

const getLogs = () => logs;

module.exports = { logger, getLogs };
