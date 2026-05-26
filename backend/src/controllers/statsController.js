const Player = require('../models/playerSchema');

const getGlobalStats = async (req, res) => {
    try {
        const type = req.params.type;

        if (type === 'count') {
            const count = await Player.countDocuments();
            return res.json({ success: true, type: 'count', count });
        }

        if (type === 'average-rating') {
            const result = await Player.aggregate([
                { $match: { OVR: { $exists: true, $ne: null, $ne: "" } } },
                { $group: { _id: null, averageOVR: { $avg: { $toDouble: "$OVR" } } } }
            ]);
            
            const averageOVR = result.length > 0 ? (Math.round(result[0].averageOVR * 100) / 100) : 0;
            return res.json({ success: true, type: 'average-rating', averageRating: averageOVR });
        }

        let sortField = "";
        switch (type) {
            case 'highest-rated': sortField = "OVR"; break;
            case 'highest-paced': sortField = "PAC"; break;
            case 'highest-shooting': sortField = "SHO"; break;
            default:
                return res.status(400).json({ success: false, message: "Invalid stats type" });
        }

        const player = await Player.findOne({ [sortField]: { $exists: true, $ne: null, $ne: "" } })
            .sort({ [sortField]: -1 })
            .collation({ locale: "en_US", numericOrdering: true });

        if (!player) {
            return res.status(404).json({ success: false, message: "No players found with valid stats for this category" });
        }

        return res.json({ success: true, type, data: player });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error during global stats processing' });
    }
};

module.exports = {
    getGlobalStats
};
