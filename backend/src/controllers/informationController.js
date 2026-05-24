const Player = require('../models/playerSchema');
const mongoose = require('mongoose');

const getPlayerByName = async (req, res) => {
    try {
        const name = req.params.name;
        const player = await Player.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: `Player with name '${name}' not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching player details by name' });
    }
};

const getPlayerByRank = async (req, res) => {
    try {
        const rank = Number(req.params.rank);
        if (isNaN(rank)) {
            return res.status(400).json({ message: 'Invalid rank format, must be a number' });
        }

        const player = await Player.findOne({ rank });
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: `Player with rank ${rank} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching player by rank' });
    }
};

const getPlayersByTeam = async (req, res) => {
    try {
        const team = req.params.team;
        const players = await Player.find({ team: { $regex: new RegExp(`^${team}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by team' });
    }
};

const getPlayersByLeague = async (req, res) => {
    try {
        const league = req.params.league;
        const players = await Player.find({ league: { $regex: new RegExp(`^${league}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by league' });
    }
};

const getPlayersByNation = async (req, res) => {
    try {
        const nation = req.params.nation;
        const players = await Player.find({ nation: { $regex: new RegExp(`^${nation}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by nation' });
    }
};

module.exports = {
    getPlayerByName,
    getPlayerByRank,
    getPlayersByTeam,
    getPlayersByLeague,
    getPlayersByNation
};
