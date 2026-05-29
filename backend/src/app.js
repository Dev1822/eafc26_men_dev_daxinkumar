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

const authMiddleware = require('./middlewares/auth');
const loggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app=express();
app.use(express.json())

app.use('/players', playerRoutes);
app.use('/players', informationRoutes);
app.use('/search', searchRoutes);
app.use('/analytics/players', analyticsRoutes);
app.use('/stats/players', statsRoutes);

app.use('/admin', authMiddleware, adminRoutes);
app.use('/protected', authMiddleware, protectedRoutes);
app.use('/middleware', loggerMiddleware, middlewareRoutes);

// Global Error Handler MUST be the last middleware
app.use(errorHandler);

module.exports=app;