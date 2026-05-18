require("dotenv").config();
const express=require("express");
const playerRoutes = require('./routes/playerRoutes');

const app=express();
app.use(express.json())

app.use('/players', playerRoutes);

module.exports=app;