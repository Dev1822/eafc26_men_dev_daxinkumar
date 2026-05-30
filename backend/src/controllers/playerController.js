const mongoose = require('mongoose');
const Player = require('../models/playerSchema');

// ================= GET ALL PLAYERS =================
const getPlayers = async (req, res) => {
    try {
        const filter = {};

        // Basic Filters
        if (req.query.ID) filter.ID = req.query.ID;
        if (req.query.name) filter.Name = req.query.name;
        if (req.query.gender) filter.GENDER = req.query.gender;
        if (req.query.team) filter.Team = req.query.team;
        if (req.query.league) filter.League = req.query.league;
        if (req.query.nation) filter.Nation = req.query.nation;
        if (req.query.position) filter.Position = req.query.position;
        if (req.query.ovr) filter.OVR = req.query.ovr;
        if (req.query.age) filter.Age = req.query.age;

        if (req.query.preferredFoot) {
            filter["Preferred foot"] = req.query.preferredFoot;
        }

        if (req.query.skillMoves) {
            filter["Skill moves"] = req.query.skillMoves;
        }

        if (req.query.weakFoot) {
            filter["Weak foot"] = req.query.weakFoot;
        }

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { Name: searchRegex },
                { Team: searchRegex },
                { Nation: searchRegex },
                { League: searchRegex },
                { "play style": searchRegex }
            ];
        }

        // Numeric Filters
        const exprConditions = [];

        if (req.query.minPace) {
            exprConditions.push({
                $gte: [{ $toDouble: "$PAC" }, Number(req.query.minPace)]
            });
        }

        if (req.query.minShooting) {
            exprConditions.push({
                $gte: [{ $toDouble: "$SHO" }, Number(req.query.minShooting)]
            });
        }

        if (req.query.minPassing) {
            exprConditions.push({
                $gte: [{ $toDouble: "$PAS" }, Number(req.query.minPassing)]
            });
        }

        if (req.query.minDribbling) {
            exprConditions.push({
                $gte: [{ $toDouble: "$DRI" }, Number(req.query.minDribbling)]
            });
        }

        if (req.query.minDefending) {
            exprConditions.push({
                $gte: [{ $toDouble: "$DEF" }, Number(req.query.minDefending)]
            });
        }

        if (req.query.minPhysical) {
            exprConditions.push({
                $gte: [{ $toDouble: "$PHY" }, Number(req.query.minPhysical)]
            });
        }

        if (exprConditions.length > 0) {
            filter.$expr = {
                $and: exprConditions
            };
        }

        let playersQuery = Player.find(filter);

        if (req.query.sort) {
            let sortField = "";
            let sortOrder = -1; // Default descending for stats

            switch (req.query.sort) {
                case 'ovr': sortField = "OVR"; break;
                case 'pace': sortField = "PAC"; break;
                case 'shooting': sortField = "SHO"; break;
                case 'passing': sortField = "PAS"; break;
                case 'dribbling': sortField = "DRI"; break;
                case 'defending': sortField = "DEF"; break;
                case 'physical': sortField = "PHY"; break;
                case 'age': sortField = "Age"; sortOrder = 1; break; // usually sort age ascending by default
                case 'rank': sortField = "Rank"; sortOrder = 1; break; // rank 1 is best
                case 'name': sortField = "Name"; sortOrder = 1; break;
            }

            if (sortField) {
                playersQuery = playersQuery.sort({ [sortField]: sortOrder }).collation({ locale: "en_US", numericOrdering: true });
            }
        }

        let page, limit;
        if (req.query.page && req.query.limit) {
            page = parseInt(req.query.page, 10);
            limit = parseInt(req.query.limit, 10);
            
            if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
                return res.status(400).json({ success: false, message: "Page and limit must be positive integers" });
            }

            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;

        const responseData = {
            success: true,
            count: players.length,
            data: players
        };
        
        if (page && limit) {
            responseData.page = page;
            responseData.limit = limit;
        }

        return res.status(200).json(responseData);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ================= GET PLAYERS SORTED =================
const getPlayersSorted = async (req, res) => {
    try {
        const fieldAndOrder = req.params.fieldAndOrder;
        const parts = fieldAndOrder.split('-');
        if (parts.length !== 2) {
            return res.status(400).json({ success: false, message: "Invalid sort format. Expected field-order (e.g. ovr-desc)" });
        }
        
        const field = parts[0];
        const orderStr = parts[1];
        
        let sortField = "";
        switch (field) {
            case 'ovr': sortField = "OVR"; break;
            case 'pace': sortField = "PAC"; break;
            case 'shooting': sortField = "SHO"; break;
            case 'passing': sortField = "PAS"; break;
            case 'dribbling': sortField = "DRI"; break;
            case 'defending': sortField = "DEF"; break;
            case 'physical': sortField = "PHY"; break;
            case 'age': sortField = "Age"; break;
            case 'rank': sortField = "Rank"; break;
            case 'name': sortField = "Name"; break;
            default: sortField = field;
        }

        const sortOrder = orderStr === 'desc' ? -1 : 1;

        let playersQuery = Player.find({}).sort({ [sortField]: sortOrder }).collation({ locale: "en_US", numericOrdering: true });
        
        let page, limit;
        if (req.query.page && req.query.limit) {
            page = parseInt(req.query.page, 10);
            limit = parseInt(req.query.limit, 10);
            
            if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
                return res.status(400).json({ success: false, message: "Page and limit must be positive integers" });
            }

            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        
        const responseData = {
            success: true,
            count: players.length,
            data: players
        };
        
        if (page && limit) {
            responseData.page = page;
            responseData.limit = limit;
        }

        return res.status(200).json(responseData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



// ================= GET PLAYER BY ID =================
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findOne({
            ID: req.params.id
        });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: player
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ================= CHECK PLAYER EXISTS =================
const checkPlayerExists = async (req, res) => {
    try {
        const player = await Player.findOne({
            ID: req.params.id
        });

        return res.status(200).json({
            success: true,
            exists: !!player
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ================= CREATE PLAYER =================
const createPlayer = async (req, res) => {
    try {
        const ID = req.body.ID || req.body.Id || req.body.id;
        const Name = req.body.Name || req.body.name;

        if (!ID || !Name) {
            return res.status(400).json({
                success: false,
                message: "Both ID and Name are required"
            });
        }

        const existingPlayer = await Player.findOne({ ID });

        if (existingPlayer) {
            return res.status(409).json({
                success: false,
                message: `Player with ID '${ID}' already exists`
            });
        }

        // Validate core numeric stats
        const { OVR, PAC, SHO, PAS, DRI, DEF } = req.body;
        const statsToValidate = { OVR, PAC, SHO, PAS, DRI, DEF };
        
        for (const [key, value] of Object.entries(statsToValidate)) {
            if (value === undefined || value === null || value === '') {
                return res.status(400).json({ success: false, message: `Validation Error: ${key} is required` });
            }
            const num = Number(value);
            if (isNaN(num) || num < 1 || num > 99) {
                return res.status(400).json({ success: false, message: `Validation Error: ${key} must be a number between 1 and 99` });
            }
        }


        const newPlayer = new Player({
            ...req.body,
            ID,
            Name
        });

        const savedPlayer = await newPlayer.save();

        return res.status(201).json({
            success: true,
            message: "Player created successfully",
            data: savedPlayer
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// ================= BULK CREATE PLAYERS =================
const bulkCreatePlayers = async (req, res) => {
    try {
        const { players } = req.body;

        if (!Array.isArray(players) || players.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Players array is required"
            });
        }

        const insertedPlayers = await Player.insertMany(players);

        return res.status(201).json({
            success: true,
            count: insertedPlayers.length,
            data: insertedPlayers
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// ================= REPLACE PLAYER =================
const replacePlayer = async (req, res) => {
    try {
        const ID = req.params.id;

        const replacementData = {
            ...req.body,
            ID
        };

        const replacedPlayer = await Player.findOneAndReplace(
            { ID },
            replacementData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!replacedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Player replaced successfully",
            data: replacedPlayer
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// ================= UPDATE PLAYER =================
const updatePlayer = async (req, res) => {
    try {
        const ID = req.params.id;

        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body) || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid update payload. Expected a non-empty JSON object."
            });
        }

        const updatedPlayer = await Player.findOneAndUpdate(
            { ID },
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Player updated successfully",
            data: updatedPlayer
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// ================= BULK UPDATE PLAYERS =================
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



// ================= DELETE PLAYER =================
const deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findOneAndDelete({
            ID: req.params.id
        });

        if (!deletedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Player deleted successfully",
            data: deletedPlayer
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// ================= BULK DELETE PLAYERS =================
const bulkDeletePlayers = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "IDs array is required"
            });
        }

        const result = await Player.deleteMany({
            ID: { $in: ids }
        });

        return res.status(200).json({
            success: true,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
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
    bulkDeletePlayers,
    getPlayersSorted
};