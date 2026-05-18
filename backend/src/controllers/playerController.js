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

module.exports = {
    getPlayers,
    getPlayerById
};
