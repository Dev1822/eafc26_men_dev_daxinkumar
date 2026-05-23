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
        const { Id, name } = req.body;

        if (!Id || !name) {
            return res.status(400).json({ message: 'Both Id and name are required' });
        }

        const existingPlayer = await Player.findOne({ Id });
        if (existingPlayer) {
            return res.status(409).json({ message: `Player with Id '${Id}' already exists` });
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
            return res.status(409).json({ message: 'Player with this Id already exists' });
        }
        res.status(500).json({ message: 'Server Error creating player' });
    }
};

const replacePlayer = async (req, res) => {
    try {
        const { Id, name } = req.body;

        if (!Id || !name) {
            return res.status(400).json({ message: 'Both Id and name are required' });
        }

        const playerToReplace = await Player.findById(req.params.id);
        if (!playerToReplace) {
            return res.status(404).json({ message: 'Player not found' });
        }

        if (Id !== playerToReplace.Id) {
            const existingConflict = await Player.findOne({ Id });
            if (existingConflict) {
                return res.status(409).json({ message: `Player with Id '${Id}' already exists` });
            }
        }

        const replacedPlayer = await Player.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        res.json(replacedPlayer);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid player ID format' });
        }
        res.status(500).json({ message: 'Server Error replacing player record' });
    }
};

module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    replacePlayer
};
