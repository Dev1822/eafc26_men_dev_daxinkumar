const Player = require('../models/playerSchema');

const getPlayerAnalytics = async (req, res) => {
    try {
        const type = req.params.type;
        const limit = parseInt(req.query.limit) || 10;
        
        // 1. Playstyles Analysis
        if (type === 'top-playstyles') {
            const result = await Player.aggregate([
                { $unwind: { path: "$play style", preserveNullAndEmptyArrays: false } },
                { $group: { _id: "$play style", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: limit }
            ]);
            return res.json({ success: true, type, data: result });
        }
        
        // 2. Average OVR Groupings (Teams, Leagues, Nations)
        if (type === 'top-teams' || type === 'top-leagues' || type === 'top-nations') {
            const groupByField = type === 'top-teams' ? "$Team" : (type === 'top-leagues' ? "$League" : "$Nation");
            const result = await Player.aggregate([
                { $match: { OVR: { $exists: true, $ne: null, $ne: "" } } },
                { $group: { 
                    _id: groupByField, 
                    averageOVR: { $avg: { $toDouble: "$OVR" } },
                    playerCount: { $sum: 1 }
                } },
                { $match: { playerCount: { $gte: 5 } } }, // Filter out obscure ones with < 5 players
                { $sort: { averageOVR: -1 } },
                { $limit: limit }
            ]);
            return res.json({ success: true, type, data: result });
        }

        // 3. Distributions
        if (type === 'skill-distribution' || type === 'foot-distribution' || type === 'position-distribution') {
            let groupByField = "";
            if (type === 'skill-distribution') groupByField = "$Skill moves";
            if (type === 'foot-distribution') groupByField = "$Preferred foot";
            if (type === 'position-distribution') groupByField = "$Position";

            const result = await Player.aggregate([
                { $match: { [groupByField.replace('$', '')]: { $exists: true, $ne: null, $ne: "" } } },
                { $group: { _id: groupByField, count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);
            return res.json({ success: true, type, data: result });
        }

        // 4. Top Player Stats (Shooting, Passing, etc.)
        let sortField = "";
        let sortOrder = -1;

        switch (type) {
            case 'top-rated': sortField = "OVR"; break;
            case 'youngest': sortField = "Age"; sortOrder = 1; break;
            case 'oldest': sortField = "Age"; break;
            case 'top-scorers': sortField = "SHO"; break;
            case 'top-assisters': sortField = "PAS"; break;
            case 'top-dribblers': sortField = "DRI"; break;
            case 'top-defenders': sortField = "DEF"; break;
            case 'top-physical': sortField = "PHY"; break;
            default:
                return res.status(400).json({ success: false, message: "Invalid analytics type" });
        }

        const players = await Player.find({ [sortField]: { $exists: true, $ne: null, $ne: "" } })
            .sort({ [sortField]: sortOrder })
            .collation({ locale: "en_US", numericOrdering: true })
            .limit(limit);

        // Calculate the average of the stat for these top N players
        const avgScore = players.reduce((acc, curr) => acc + (parseFloat(curr[sortField]) || 0), 0) / (players.length || 1);

        return res.json({ 
            success: true, 
            type, 
            analyzedStat: sortField,
            averageStatOfTop: Math.round(avgScore * 100) / 100,
            data: players 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error during analytics processing' });
    }
};

// ================= EXPLICIT HEAD HANDLERS =================
const headAnalyticsType = (req, res) => {
    try {
        const type = req.params.type;
        const validTypes = [
            'top-playstyles', 'top-teams', 'top-leagues', 'top-nations',
            'skill-distribution', 'foot-distribution', 'position-distribution',
            'top-rated', 'youngest', 'oldest', 'top-scorers',
            'top-assisters', 'top-dribblers', 'top-defenders', 'top-physical'
        ];
        
        if (validTypes.includes(type)) {
            return res.status(200).end();
        } else {
            return res.status(404).end();
        }
    } catch (error) {
        return res.status(500).end();
    }
};

module.exports = {
    getPlayerAnalytics,
    headAnalyticsType
};
