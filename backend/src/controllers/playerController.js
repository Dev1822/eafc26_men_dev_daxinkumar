const Player = require('../models/playerSchema');

const getPlayers = async (req, res) => {
    try {
        const players = await Player.find({});
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players' });
    }
};

const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching player details' });
    }
};
const createPlayer = async (req, res) => {
    try {
        const { externalId, name } = req.body;

        if (!externalId || !name) {
            return res.status(400).json({ message: 'Both externalId and name are required' });
        }

        const existingPlayer = await Player.findOne({ externalId });
        if (existingPlayer) {
            return res.status(409).json({ message: `Player with externalId '${externalId}' already exists` });
        }

        const newPlayer = new Player(req.body);
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Player with this externalId already exists' });
        }
        res.status(500).json({ message: 'Server Error creating player' });
    }
};

module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer
};
