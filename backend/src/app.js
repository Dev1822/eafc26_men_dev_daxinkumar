require("dotenv").config();
const express=require("express");
const playerRoutes = require('./routes/playerRoutes');
const searchRoutes = require('./routes/searchRoutes');
const informationRoutes = require('./routes/informationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app=express();
app.use(express.json())

app.use('/players', playerRoutes);
app.use('/players', informationRoutes);
app.use('/search', searchRoutes);
app.use('/analytics/players', analyticsRoutes);
app.use('/stats/players', statsRoutes);

module.exports=app;