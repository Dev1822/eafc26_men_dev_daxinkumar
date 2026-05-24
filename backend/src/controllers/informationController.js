const Player = require('../models/playerSchema');
const mongoose = require('mongoose');

const getPlayerByName = async (req, res) => {
    try {
        const name = req.params.name;
        const player = await Player.findOne({ Name: { $regex: new RegExp(`^${name}$`, 'i') } });
        
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
        const rank = req.params.rank;
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

const getPlayersByPosition = async (req, res) => {
    try {
        const position = req.params.position;
        const players = await Player.find({ position: { $regex: new RegExp(`^${position}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by position' });
    }
};

const getPlayersByAge = async (req, res) => {
    try {
        const age = req.params.age;
        const players = await Player.find({ age });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by age' });
    }
};

const getPlayersByGender = async (req, res) => {
    try {
        const gender = req.params.gender;
        const players = await Player.find({ gender: { $regex: new RegExp(`^${gender}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by gender' });
    }
};

const getPlayersByPlaystyle = async (req, res) => {
    try {
        const style = req.params.style;
        const players = await Player.find({ playStyles: { $regex: new RegExp(`^${style}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by playstyle' });
    }
};

const getPlayersByPreferredFoot = async (req, res) => {
    try {
        const foot = req.params.foot;
        const players = await Player.find({ preferredFoot: { $regex: new RegExp(`^${foot}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by preferred foot' });
    }
};
const getPlayersByAlternativePosition = async (req, res) => {
    try {
        const position = req.params.position;
        const players = await Player.find({ alternativePositions: { $regex: new RegExp(`^${position}$`, 'i') } });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by alternative position' });
    }
};

const getTopRatedPlayers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    ovr: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    ovrNum: { $toDouble: "$ovr" }
                }
            },
            { $sort: { ovrNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top rated players' });
    }
};

const getTopPacedPlayers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    pac: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    pacNum: { $toDouble: "$pac" }
                }
            },
            { $sort: { pacNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top paced players' });
    }
};

const getTopDribblers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    dri: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    driNum: { $toDouble: "$dri" }
                }
            },
            { $sort: { driNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top dribbling players' });
    }
};

const getTopFinishers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    finishing: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    finishingNum: { $toDouble: "$finishing" }
                }
            },
            { $sort: { finishingNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top finishing players' });
    }
};

module.exports = {
    getPlayerByName,
    getPlayerByRank,
    getPlayersByTeam,
    getPlayersByLeague,
    getPlayersByNation,
    getPlayersByPosition,
    getPlayersByAge,
    getPlayersByGender,
    getPlayersByPlaystyle,
    getPlayersByPreferredFoot,
    getPlayersByAlternativePosition,
    getTopRatedPlayers,
    getTopPacedPlayers,
    getTopDribblers,
    getTopFinishers
};
