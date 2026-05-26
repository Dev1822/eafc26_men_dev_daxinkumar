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

        // Group counts
        if (['team-count', 'league-count', 'nation-count', 'position-count'].includes(type)) {
            let groupByField = "";
            switch (type) {
                case 'team-count': groupByField = "$Team"; break;
                case 'league-count': groupByField = "$League"; break;
                case 'nation-count': groupByField = "$Nation"; break;
                case 'position-count': groupByField = "$Position"; break;
            }
            const result = await Player.aggregate([
                { $match: { [groupByField.replace('$', '')]: { $exists: true, $ne: null, $ne: "" } } },
                { $group: { _id: groupByField, count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);
            return res.json({ success: true, type, data: result });
        }

        if (type === 'playstyle-count') {
            const result = await Player.aggregate([
                { $unwind: { path: "$play style", preserveNullAndEmptyArrays: false } },
                { $group: { _id: "$play style", count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);
            return res.json({ success: true, type, data: result });
        }

        if (type === 'youngsters') {
            const count = await Player.countDocuments({ $expr: { $lte: [{ $toDouble: "$Age" }, 23] } });
            const avgResult = await Player.aggregate([
                { $match: { $expr: { $lte: [{ $toDouble: "$Age" }, 23] } } },
                { $group: { _id: null, averageOVR: { $avg: { $toDouble: "$OVR" } } } }
            ]);
            const averageOVR = avgResult.length > 0 ? (Math.round(avgResult[0].averageOVR * 100) / 100) : 0;
            return res.json({ success: true, type, count, averageOVR });
        }

        let sortField = "";
        switch (type) {
            case 'highest-rated': sortField = "OVR"; break;
            case 'highest-paced': sortField = "PAC"; break;
            case 'highest-shooting': sortField = "SHO"; break;
            case 'highest-passing': sortField = "PAS"; break;
            case 'highest-dribbling': sortField = "DRI"; break;
            case 'highest-defending': sortField = "DEF"; break;
            case 'highest-physical': sortField = "PHY"; break;
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
