require("dotenv").config();
const express=require("express");
const playerRoutes = require('./routes/playerRoutes');
const searchRoutes = require('./routes/searchRoutes');
const informationRoutes = require('./routes/informationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const statsRoutes = require('./routes/statsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const middlewareRoutes = require('./routes/middlewareRoutes');
const authRoutes = require('./routes/authRoutes');
const jwtRoutes = require('./routes/jwtRoutes');

const authMiddleware = require('./middlewares/auth');
const { logger: loggerMiddleware } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const createRateLimiter = require('./middlewares/rateLimit');

const strictAdminLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 20,
    message: "Strict admin rate limit exceeded."
});

const moderateApiLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: "Analytics rate limit exceeded."
});

const app=express();
const cors=require("cors");
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://eafc26-men-dev-daxinkumar.vercel.app'
  ]
}));
app.use(express.json())

// Catch invalid JSON payloads globally (e.g. for bulk uploads)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: "Invalid JSON payload format" });
    }
    next(err);
});

app.use('/players', informationRoutes);
app.use('/players', playerRoutes);
app.use('/search', searchRoutes);
app.use('/analytics/players', moderateApiLimiter, analyticsRoutes);
app.use('/stats/players', statsRoutes);

app.use('/admin', strictAdminLimiter, authMiddleware, adminRoutes);
app.use('/protected', authMiddleware, protectedRoutes);
app.use('/middleware', loggerMiddleware, middlewareRoutes);
app.use('/auth', authRoutes);
app.use('/jwt', jwtRoutes);

// Global Error Handler MUST be the last middleware
app.use(errorHandler);

module.exports=app;