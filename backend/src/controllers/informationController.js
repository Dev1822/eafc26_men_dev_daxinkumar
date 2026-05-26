const Player = require('../models/playerSchema');
const mongoose = require('mongoose');

const getPlayerByName = async (req, res) => {
    try {
        const name = req.params.name;
        const player = await Player.findOne({ Name: name });
        
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: `Player with name '${name}' not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getPlayerByRank = async (req, res) => {
    try {
        const rank = req.params.rank;

        const player = await Player.findOne({ Rank: rank });

        if (!player) {
            return res.status(404).json({
                message: `Player with rank ${rank} not found`
            });
        }

        res.status(200).json(player);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Server Error fetching player by rank'
        });
    }
};

const getPlayersByTeam = async (req, res) => {
    try {
        const team = req.params.team;
        let playersQuery = Player.find({ Team: team });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by team' });
    }
};

const getPlayersByLeague = async (req, res) => {
    try {
        const league = req.params.league;
        let playersQuery = Player.find({ League: league });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by league' });
    }
};

const getPlayersByNation = async (req, res) => {
    try {
        const nation = req.params.nation;
        let playersQuery = Player.find({ Nation: nation });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by nation' });
    }
};

const getPlayersByPosition = async (req, res) => {
    try {
        const position = req.params.position;
        let playersQuery = Player.find({ Position: position });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by position' });
    }
};

const getPlayersByAge = async (req, res) => {
    try {
        const age = req.params.age;
        const players = await Player.find({ Age: age });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by age' });
    }
};

const getPlayersByGender = async (req, res) => {
    try {
        const gender = req.params.gender;
        const players = await Player.find({ GENDER: gender });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by gender' });
    }
};

const getPlayersByPlaystyle = async (req, res) => {
    try {
        const style = req.params.style;

        let playersQuery = Player.find({
            "play style": {
                $regex: style,
                $options: "i"
            }
        });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        }

        const players = await playersQuery;
        res.status(200).json(players);

    } catch (error) {
        console.error("Error fetching players by playstyle:", error);

        res.status(500).json({
            success: false,
            message: "Server Error fetching players by playstyle"
        });
    }
};

const getPlayersByPreferredFoot = async (req, res) => {
    try {
        const foot = req.params.foot;
        const players = await Player.find({ "Preferred foot": foot });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by preferred foot' });
    }
};
const getPlayersByAlternativePosition = async (req, res) => {
    try {
        const position = req.params.position;

        const players = await Player.find({
            "Alternative positions": {
                $regex: position,
                $options: "i"
            }
        });

        res.status(200).json(players);

    } catch (error) {
        console.error("Error fetching players by alternate positions:", error);

        res.status(500).json({
            success: false,
            message: "Server Error fetching players by alternate positions"
        });
    }
};

const getTopRatedPlayers = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: {
                    OVR: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    ovrNum: { $toDouble: "$OVR" }
                }
            },
            { $sort: { ovrNum: -1 } }
        ];

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: limit });
        } else {
            const defaultLimit = parseInt(req.query.limit) || 10;
            pipeline.push({ $limit: defaultLimit });
        }

        const players = await Player.aggregate(pipeline);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top rated players' });
    }
};

const getTopPacedPlayers = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: {
                    PAC: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    pacNum: { $toDouble: "$PAC" }
                }
            },
            { $sort: { pacNum: -1 } }
        ];

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: limit });
        } else {
            const defaultLimit = parseInt(req.query.limit) || 10;
            pipeline.push({ $limit: defaultLimit });
        }

        const players = await Player.aggregate(pipeline);
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
                    DRI: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    driNum: { $toDouble: "$DRI" }
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
                    Finishing: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    finishingNum: { $toDouble: "$Finishing" }
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

const getTopPassers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    PAS: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    pasNum: { $toDouble: "$PAS" }
                }
            },
            { $sort: { pasNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top passing players' });
    }
};

const getTopDefenders = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    DEF: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    defNum: { $toDouble: "$DEF" }
                }
            },
            { $sort: { defNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top defending players' });
    }
};

const getTopPhysicalPlayers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    PHY: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    phyNum: { $toDouble: "$PHY" }
                }
            },
            { $sort: { phyNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top physical players' });
    }
};

const getTopYoungsters = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    Age: { $exists: true, $ne: null, $ne: "" },
                    OVR: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    ageNum: { $toDouble: "$Age" },
                    ovrNum: { $toDouble: "$OVR" }
                }
            },
            {
                $match: {
                    ageNum: { $lte: 23 }
                }
            },
            { $sort: { ovrNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top youngsters' });
    }
};

const getRecentPlayers = async (req, res) => {
    try {
        let playersQuery = Player.find({}).sort({ createdAt: -1 });

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        } else {
            const limit = parseInt(req.query.limit) || 10;
            playersQuery = playersQuery.limit(limit);
        }

        const players = await playersQuery;
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching recently added players' });
    }
};

const getPlayersBySkillMoves = async (req, res) => {
    try {
        const players = await Player.find({ "Skill moves": req.params.value });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by skill moves' });
    }
};

const getPlayersByWeakFoot = async (req, res) => {
    try {
        const players = await Player.find({ "Weak foot": req.params.value });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by weak foot' });
    }
};

const comparePlayers = async (req, res) => {
    try {
        const { player1, player2 } = req.params;
        const p1 = mongoose.Types.ObjectId.isValid(player1)
            ? await Player.findById(player1)
            : await Player.findOne({ ID: player1 });
        const p2 = mongoose.Types.ObjectId.isValid(player2)
            ? await Player.findById(player2)
            : await Player.findOne({ ID: player2 });
        
        if (!p1 || !p2) {
            return res.status(404).json({ message: 'One or both players not found' });
        }

        // Calculate raw numerical difference comparisons
        const compareStat = (s1, s2) => (Number(s1) || 0) - (Number(s2) || 0);

        res.json({
            player1: p1,
            player2: p2,
            comparison: {
                ovrDifference: compareStat(p1.OVR, p2.OVR),
                pacDifference: compareStat(p1.PAC, p2.PAC),
                shoDifference: compareStat(p1.SHO, p2.SHO),
                pasDifference: compareStat(p1.PAS, p2.PAS),
                driDifference: compareStat(p1.DRI, p2.DRI),
                defDifference: compareStat(p1.DEF, p2.DEF),
                phyDifference: compareStat(p1.PHY, p2.PHY)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error comparing players' });
    }
};

const getPlayerPerformance = async (req, res) => {
    try {
        const id = req.params.id;
        const player = mongoose.Types.ObjectId.isValid(id)
            ? await Player.findById(id)
            : await Player.findOne({ ID: id });

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const getAvg = (arr) => arr.reduce((acc, curr) => acc + (Number(curr) || 0), 0) / arr.length;
        
        const isGK = player.Position && player.Position.toUpperCase() === 'GK';
        const calculatedScore = isGK
            ? getAvg([player["GK Diving"], player["GK Handling"], player["GK Kicking"], player["GK Positioning"], player["GK Reflexes"]])
            : getAvg([player.PAC, player.SHO, player.PAS, player.DRI, player.DEF, player.PHY]);

        res.json({
            player,
            analytics: {
                type: isGK ? 'Goalkeeper' : 'Outfield',
                performanceScore: Math.round(calculatedScore * 100) / 100
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching player performance analytics' });
    }
};

const getPlayerStats = async (req, res) => {
    try {
        const id = req.params.id;
        const player = mongoose.Types.ObjectId.isValid(id)
            ? await Player.findById(id)
            : await Player.findOne({ ID: id });

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.json({
            player,
            stats: {
                pace: { acceleration: player.Acceleration, sprintSpeed: player["Sprint Speed"] },
                shooting: { positioning: player.Positioning, finishing: player.Finishing, shotPower: player["Shot Power"], longShots: player["Long Shots"], volleys: player.Volleys, penalties: player.Penalties },
                passing: { vision: player.Vision, crossing: player.Crossing, freeKickAccuracy: player["Free Kick Accuracy"], shortPassing: player["Short Passing"], longPassing: player["Long Passing"], curve: player.Curve },
                dribbling: { dribbling: player.Dribbling, agility: player.Agility, balance: player.Balance, reactions: player.Reactions, ballControl: player["Ball Control"], composure: player.Composure },
                defending: { interceptions: player.Interceptions, headingAccuracy: player["Heading Accuracy"], defAwareness: player["Def Awareness"], standingTackle: player["Standing Tackle"], slidingTackle: player["Sliding Tackle"] },
                physical: { jumping: player.Jumping, stamina: player.Stamina, strength: player.Strength, aggression: player.Aggression },
                goalkeeping: { diving: player["GK Diving"], handling: player["GK Handling"], kicking: player["GK Kicking"], positioning: player["GK Positioning"], reflexes: player["GK Reflexes"] }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching complete player statistics' });
    }
};

const getFilteredPlayers = async (req, res) => {
    try {
        const type = req.params.type;
        let filter = {};
        let sortOption = {};
        
        switch (type) {
            case 'high-rated':
                filter.$expr = { $gte: [{ $toDouble: "$OVR" }, 85] };
                sortOption = { "OVR": -1 };
                break;
            case 'low-rated':
                filter.$expr = { $lte: [{ $toDouble: "$OVR" }, 65] };
                sortOption = { "OVR": 1 };
                break;
            case 'high-pace':
                filter.$expr = { $gte: [{ $toDouble: "$PAC" }, 88] };
                sortOption = { "PAC": -1 };
                break;
            case 'high-shooting':
                filter.$expr = { $gte: [{ $toDouble: "$SHO" }, 85] };
                sortOption = { "SHO": -1 };
                break;
            case 'high-passing':
                filter.$expr = { $gte: [{ $toDouble: "$PAS" }, 85] };
                sortOption = { "PAS": -1 };
                break;
            case 'high-dribbling':
                filter.$expr = { $gte: [{ $toDouble: "$DRI" }, 85] };
                sortOption = { "DRI": -1 };
                break;
            case 'high-defending':
                filter.$expr = { $gte: [{ $toDouble: "$DEF" }, 85] };
                sortOption = { "DEF": -1 };
                break;
            case 'high-physical':
                filter.$expr = { $gte: [{ $toDouble: "$PHY" }, 85] };
                sortOption = { "PHY": -1 };
                break;
            case 'youngsters':
                filter.$expr = { $lte: [{ $toDouble: "$Age" }, 23] };
                sortOption = { "OVR": -1 };
                break;
            case 'veterans':
                filter.$expr = { $gte: [{ $toDouble: "$Age" }, 33] };
                sortOption = { "OVR": -1 };
                break;
            case 'left-footed':
                filter["Preferred foot"] = "Left";
                sortOption = { "OVR": -1 };
                break;
            case 'right-footed':
                filter["Preferred foot"] = "Right";
                sortOption = { "OVR": -1 };
                break;
            case 'five-star-skillers':
                filter["Skill moves"] = "5";
                sortOption = { "OVR": -1 };
                break;
            case 'top-finishers':
                filter.$expr = { $gte: [{ $toDouble: "$Finishing" }, 85] };
                sortOption = { "Finishing": -1 };
                break;
            case 'top-playmakers':
                filter.$expr = { 
                    $and: [
                        { $gte: [{ $toDouble: "$Vision" }, 85] },
                        { $gte: [{ $toDouble: "$PAS" }, 85] }
                    ]
                };
                sortOption = { "Vision": -1 };
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid filter type" });
        }

        let playersQuery = Player.find(filter);
        if (Object.keys(sortOption).length > 0) {
            playersQuery = playersQuery.sort(sortOption).collation({ locale: "en_US", numericOrdering: true });
        }

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const skip = (page - 1) * limit;
            playersQuery = playersQuery.skip(skip).limit(limit);
        } else {
            playersQuery = playersQuery.limit(parseInt(req.query.limit) || 50);
        }

        const players = await playersQuery;
        res.json(players);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching filtered players' });
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
    getTopFinishers,
    getTopPassers,
    getTopDefenders,
    getTopPhysicalPlayers,
    getTopYoungsters,
    getRecentPlayers,
    getPlayersBySkillMoves,
    getPlayersByWeakFoot,
    comparePlayers,
    getPlayerPerformance,
    getPlayerStats,
    getFilteredPlayers
};
