const Player = require('../models/playerSchema');

const searchPlayers = async (req, res) => {
    try {
        const query = req.query.q || '';
        const qLower = query.toLowerCase().trim();

        if (!qLower) {
            return res.status(400).json({ success: false, message: "Search keyword 'q' is required" });
        }

        let filter = {};
        let sortOption = {};
        
        // Exact keyword mapping logic for specific requests
        if (qLower === 'young') {
            // Find young players (Age <= 23)
            filter.$expr = { $lte: [{ $toDouble: "$Age" }, 23] };
        } 
        else if (qLower === 'legend' || qLower === 'icon') {
            // Legends usually have "Icon" or "Hero" in their League or Team
            filter.$or = [
                { League: { $regex: /icon|hero|legend/i } },
                { Team: { $regex: /icon|hero|legend/i } }
            ];
        }
        else if (qLower === 'left foot' || qLower === 'left footed') {
            filter["Preferred foot"] = "Left";
        }
        else if (qLower === 'skill moves' || qLower === 'skills' || qLower === 'skiller') {
            // High skill moves (5 or 4)
            filter["Skill moves"] = { $in: ["5", "4"] };
            sortOption = { "Skill moves": -1 };
        }
        else if (qLower === 'pace' || qLower === 'fast') {
            // High pace players
            filter.$expr = { $gte: [{ $toDouble: "$PAC" }, 85] };
            sortOption = { "PAC": -1 };
        }
        else if (qLower === 'dribbling' || qLower === 'dribbler') {
            // High dribbling players
            filter.$expr = { $gte: [{ $toDouble: "$DRI" }, 85] };
            sortOption = { "DRI": -1 };
        }
        else if (['st','cf','rw','lw','cam','cm','cdm','lm','rm','cb','lb','rb','lwb','rwb','gk'].includes(qLower)) {
            // Exact position match
            filter.Position = { $regex: new RegExp(`^${qLower}$`, 'i') };
        }
        else {
            // General text search across multiple fields
            // Covers Name, Team, Nation, League, and play style (e.g., "mbappe", "real madrid", "france", "premier league", "rapid", "finesse")
            const searchRegex = new RegExp(qLower, 'i');
            filter.$or = [
                { Name: searchRegex },
                { Team: searchRegex },
                { Nation: searchRegex },
                { League: searchRegex },
                { "play style": searchRegex }
            ];
        }

        let playersQuery = Player.find(filter);

        if (Object.keys(sortOption).length > 0) {
            playersQuery = playersQuery.sort(sortOption).collation({ locale: "en_US", numericOrdering: true });
        }

        // Pagination
        let page, limit;
        if (req.query.page && req.query.limit) {
            page = parseInt(req.query.page, 10);
            limit = parseInt(req.query.limit, 10);
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
        return res.status(500).json({ success: false, message: 'Server Error during search' });
    }
};

module.exports = {
    searchPlayers
};
