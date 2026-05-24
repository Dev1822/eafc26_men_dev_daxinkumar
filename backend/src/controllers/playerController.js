const Player = require('../models/playerSchema');
const mongoose = require('mongoose');

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

const checkPlayerExists = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);

        if (player) {
            return res.status(200).json({
                exists: true,
                message: "Player exists"
            });
        }

        return res.status(404).json({
            exists: false,
            message: "Player does not exist"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error fetching player details"
        });
    }
};

const createPlayer = async (req, res) => {
    try {
        const Id = req.body.Id || req.body.ID || req.body.id;
        const name = req.body.name || req.body.Name;

        if (!Id || !name) {
            return res.status(400).json({ message: 'Both Id and name are required' });
        }

        const existingPlayer = await Player.findOne({ Id });
        if (existingPlayer) {
            return res.status(409).json({ message: `Player with Id '${Id}' already exists` });
        }

        const newPlayer = new Player({
            ...req.body,
            Id,
            name
        });
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const bulkCreatePlayers = async (req, res) => {
    try {
        const { players } = req.body;

        if (!Array.isArray(players) || players.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Players array is required and cannot be empty"
            });
        }

        const newPlayers = await Player.insertMany(players);

        res.status(201).json({
            success: true,
            message: `${players.length} players created successfully`,
            data: newPlayers
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const replacePlayer = async (req, res) => {
    try {
        const Id = req.body.Id || req.body.ID || req.body.id;
        const name = req.body.name || req.body.Name;

        if (!Id || !name) {
            return res.status(400).json({ message: 'Both Id and name are required' });
        }

        const updatedPlayer = await Player.findByIdAndUpdate(
            Id,
            name,
            req.body,
            { new: true, overwrite: true, runValidators: true }
        );

        if (!updatedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Player replaced successfully",
            data: updatedPlayer
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const { id } = req.params;

         
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update"
            });
        }

        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Player updated successfully",
            data: updatedPlayer
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const bulkUpdatePlayers = async (req, res) => {
    try {
        const players = req.body;

        if (!Array.isArray(players) || players.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Players array is required"
            });
        }

        for (const player of players) {
            const { ID, ...updateData } = player;

            await Player.findOneAndUpdate(
                { ID },
                { $set: updateData },
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Players updated successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        
        if (player) {
            res.json({ message: 'Player record deleted successfully', player });
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const bulkDeletePlayers = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "IDs array is required and cannot be empty"
            });
        }

        const validIds = ids.filter(id =>
            mongoose.Types.ObjectId.isValid(id)
        );

        if (validIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid IDs provided"
            });
        }

        const result = await Player.deleteMany({
            _id: { $in: validIds }
        });

        res.status(200).json({
            success: true,
            message: `Players deleted successfully`,
            data: null
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPlayers,
    getPlayerById,
    checkPlayerExists,
    createPlayer,
    bulkCreatePlayers,
    replacePlayer,
    updatePlayer,
    bulkUpdatePlayers,
    deletePlayer,
    bulkDeletePlayers
};
