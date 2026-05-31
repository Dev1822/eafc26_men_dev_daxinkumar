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

        if (isNaN(rank) || Number(rank) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid rank value. Rank must be a positive number."
            });
        }

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
        
        if (players.length === 0) {
            return res.status(404).json({ success: false, message: `No players found for team: ${team}` });
        }
        
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
        
        if (players.length === 0) {
            return res.status(404).json({ success: false, message: `No players found for league: ${league}` });
        }
        
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
        
        if (players.length === 0) {
            return res.status(404).json({ success: false, message: `No players found for nation: ${nation}` });
        }
        
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by nation' });
    }
};

const getPlayersByPosition = async (req, res) => {
    try {
        const position = req.params.position;
        
        const validPositions = ['ST', 'RW', 'LW', 'CF', 'CAM', 'CM', 'CDM', 'RM', 'LM', 'CB', 'RB', 'LB', 'RWB', 'LWB', 'GK'];
        if (!validPositions.includes(position.toUpperCase())) {
            return res.status(400).json({ 
                success: false, 
                message: `Invalid position request: '${position}'. Expected a valid football position.` 
            });
        }

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

// ================= RANDOM PLAYER =================
const getRandomPlayer = async (req, res) => {
    try {
        const players = await Player.aggregate([{ $sample: { size: 1 } }]);
        if (!players || players.length === 0) {
            return res.status(404).json({ success: false, message: 'No players found in database' });
        }
        res.status(200).json({ success: true, data: players[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching random player' });
    }
};

// ================= TRENDING PLAYERS =================
const getTrendingPlayers = async (req, res) => {
    try {
        // Simulating "trending" by grabbing 10 random highly rated players (OVR >= 85)
        const trendingPlayers = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
            { $match: { ovrNum: { $gte: 85 } } },
            { $sample: { size: 10 } },
            { $project: { ovrNum: 0 } }
        ]);
        res.status(200).json({ success: true, data: trendingPlayers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching trending players' });
    }
};

// ================= PLAYER PREDICTIONS =================
const getPlayerPredictions = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, message: 'Player ID required via ?id=' });

        const player = await Player.findOne({ ID: id });
        if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

        const age = Number(player.Age);
        const ovr = Number(player.OVR);
        
        let growthTrend = "Stable";
        let predictedOvr = ovr;

        if (age < 24) {
            growthTrend = "High Growth";
            predictedOvr = ovr + Math.floor(Math.random() * 4) + 2; // +2 to +5
        } else if (age >= 24 && age <= 29) {
            growthTrend = "Peak";
            predictedOvr = ovr + (Math.random() > 0.5 ? 1 : 0);
        } else {
            growthTrend = "Decline";
            predictedOvr = ovr - Math.floor(Math.random() * 3) - 1; // -1 to -3
        }

        if (predictedOvr > 99) predictedOvr = 99;

        res.status(200).json({
            success: true,
            data: {
                player: player.Name,
                currentAge: age,
                currentOvr: ovr,
                growthTrend,
                predictedOvrNextSeason: predictedOvr
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error calculating predictions' });
    }
};

// ================= ESTIMATE MARKET VALUE =================
const getPlayerMarketValue = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, message: 'Player ID required via ?id=' });

        const player = await Player.findOne({ ID: id });
        if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

        const age = Number(player.Age);
        const ovr = Number(player.OVR);
        
        // Base market value scaling exponentially with OVR
        let baseValue = Math.pow(1.2, ovr - 60) * 500000;
        
        // Age Multiplier
        let ageMultiplier = 1;
        if (age <= 21) ageMultiplier = 1.5;
        else if (age <= 24) ageMultiplier = 1.2;
        else if (age >= 30 && age < 33) ageMultiplier = 0.7;
        else if (age >= 33) ageMultiplier = 0.4;

        let finalValue = Math.round((baseValue * ageMultiplier) / 100000) * 100000; // Round to nearest 100k
        
        if (finalValue < 50000) finalValue = 50000;

        res.status(200).json({
            success: true,
            data: {
                player: player.Name,
                ovr: ovr,
                age: age,
                estimatedMarketValue: finalValue,
                currency: "Abstract"
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error calculating market value' });
    }
};

// ================= DREAM TEAM GENERATOR =================
const generateDreamTeam = async (req, res) => {
    try {
        // Standard 4-3-3: GK, LB, CB, CB, RB, CM, CM, CM, LW, ST, RW
        const positions = ['GK', 'LB', 'CB', 'RB', 'CM', 'LW', 'ST', 'RW']; // simplified distinct positions
        const team = {};

        for (const pos of positions) {
            const limit = (pos === 'CB') ? 2 : (pos === 'CM') ? 3 : 1;
            
            // Allow CAM/CDM for CM
            let matchRegex = new RegExp(`^${pos}$`, 'i');
            if (pos === 'CM') matchRegex = /^(CM|CAM|CDM)$/i;

            const players = await Player.aggregate([
                { $match: { Position: matchRegex } },
                { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
                { $sort: { ovrNum: -1 } },
                { $limit: limit },
                { $project: { ovrNum: 0 } }
            ]);
            team[pos] = players;
        }

        res.status(200).json({ success: true, formation: "4-3-3", data: team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error generating dream team' });
    }
};

// ================= CUSTOM TEAM BUILDER =================
const buildCustomSquad = async (req, res) => {
    try {
        const { league, nation, minOvr } = req.query;
        let matchStage = {};
        
        if (league) matchStage.League = new RegExp(league, 'i');
        if (nation) matchStage.Nation = new RegExp(nation, 'i');
        if (minOvr) {
            matchStage.$expr = { $gte: [{ $toDouble: "$OVR" }, Number(minOvr)] };
        }

        const positions = ['GK', 'LB', 'CB', 'RB', 'CM', 'LW', 'ST', 'RW'];
        const team = {};

        for (const pos of positions) {
            const limit = (pos === 'CB') ? 2 : (pos === 'CM') ? 3 : 1;
            let matchRegex = new RegExp(`^${pos}$`, 'i');
            if (pos === 'CM') matchRegex = /^(CM|CAM|CDM)$/i;

            const finalMatch = { ...matchStage, Position: matchRegex };

            const players = await Player.aggregate([
                { $match: finalMatch },
                { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
                { $sort: { ovrNum: -1 } },
                { $limit: limit },
                { $project: { ovrNum: 0 } }
            ]);
            team[pos] = players;
        }

        res.status(200).json({ success: true, data: team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error building custom squad' });
    }
};

// ================= RECOMMENDATIONS =================
const getPlayerRecommendations = async (req, res) => {
    try {
        const id = req.query.similarTo;
        if (!id) return res.status(400).json({ success: false, message: 'Player ID required via ?similarTo=' });

        const player = await Player.findOne({ ID: id });
        if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

        const ovr = Number(player.OVR);

        const recommendations = await Player.aggregate([
            { $match: { 
                ID: { $ne: id },
                Position: player.Position,
                League: player.League
            }},
            { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
            { $match: { 
                ovrNum: { $gte: ovr - 3, $lte: ovr + 3 }
            }},
            { $sort: { ovrNum: -1 } },
            { $limit: 5 },
            { $project: { ovrNum: 0 } }
        ]);

        res.status(200).json({ success: true, targetPlayer: player.Name, data: recommendations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching recommendations' });
    }
};

// ================= CHEMISTRY ANALYTICS =================
const calculateChemistry = async (req, res) => {
    try {
        let ids = [];
        if (req.method === 'POST') {
            ids = req.body.ids;
        } else {
            // GET method using query param ?ids=1,2,3
            const idsString = req.query.ids;
            if (idsString) ids = idsString.split(',');
        }

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: 'An array of player IDs is required via ?ids= or body.ids' });
        }

        const players = await Player.find({ ID: { $in: ids } });
        if (players.length === 0) {
            return res.status(404).json({ success: false, message: 'No players found for the provided IDs' });
        }

        let totalChemistry = 0;
        const leagues = {};
        const nations = {};
        const teams = {};

        // Tally occurrences
        players.forEach(p => {
            leagues[p.League] = (leagues[p.League] || 0) + 1;
            nations[p.Nation] = (nations[p.Nation] || 0) + 1;
            teams[p.Team] = (teams[p.Team] || 0) + 1;
        });

        Object.values(leagues).forEach(count => { if (count > 1) totalChemistry += (count * 1); });
        Object.values(nations).forEach(count => { if (count > 1) totalChemistry += (count * 1); });
        Object.values(teams).forEach(count => { if (count > 1) totalChemistry += (count * 2); });

        if (totalChemistry > 100) totalChemistry = 100;

        res.status(200).json({ 
            success: true, 
            playersAnalyzed: players.length, 
            chemistryScore: totalChemistry,
            maxPossible: 100
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error calculating chemistry' });
    }
};

// ================= SYSTEM LOGS & ACTIVITY =================
const { getLogs } = require('../middlewares/logger');

const getSystemLogs = (req, res) => {
    try {
        const logs = getLogs();
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching logs' });
    }
};

const getActivityLogs = (req, res) => {
    try {
        const logs = getLogs();
        // Return only the last 20 activities
        const recent = logs.slice(0, 20);
        res.status(200).json({ success: true, count: recent.length, data: recent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching activity' });
    }
};

// ================= LIVE SEARCH =================
const getLiveSearch = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(200).json({ success: true, data: [] });
        }
        
        const players = await Player.find({ Name: new RegExp(query, 'i') })
            .select('ID Name OVR Team Nation Position -_id')
            .sort({ OVR: -1 })
            .limit(10);
            
        res.status(200).json({ success: true, count: players.length, data: players });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching live search' });
    }
};

// ================= HEATMAP =================
const getHeatmap = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ success: false, message: 'Player ID required via ?id=' });

        const player = await Player.findOne({ ID: id });
        if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

        const pos = player.Position ? player.Position.toUpperCase() : 'UNKNOWN';
        
        // Mock a 3x3 pitch matrix [Defense, Midfield, Attack]
        let matrix = [
            [0, 0, 0], // Defense (Left, Center, Right)
            [0, 0, 0], // Midfield (Left, Center, Right)
            [0, 0, 0]  // Attack (Left, Center, Right)
        ];

        if (pos.includes('CB') || pos === 'GK') matrix[0] = [1, 9, 1];
        else if (pos.includes('LB') || pos.includes('LWB')) matrix[0] = [9, 2, 0];
        else if (pos.includes('RB') || pos.includes('RWB')) matrix[0] = [0, 2, 9];
        else if (pos === 'CDM') matrix[1] = [2, 8, 2];
        else if (pos === 'CM') matrix[1] = [3, 8, 3];
        else if (pos === 'CAM') matrix[1] = [4, 9, 4];
        else if (pos === 'LM') matrix[1] = [9, 2, 0];
        else if (pos === 'RM') matrix[1] = [0, 2, 9];
        else if (pos === 'LW' || pos === 'LF') matrix[2] = [9, 3, 0];
        else if (pos === 'RW' || pos === 'RF') matrix[2] = [0, 3, 9];
        else if (pos === 'ST' || pos === 'CF') matrix[2] = [2, 9, 2];

        res.status(200).json({
            success: true,
            player: player.Name,
            position: pos,
            heatmap: matrix
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error generating heatmap' });
    }
};

// ================= TOP MONTHLY / YEARLY =================
const getTopMonthlyPerformers = async (req, res) => {
    try {
        const players = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
            { $match: { ovrNum: { $gte: 85 } } },
            { $sample: { size: 10 } },
            { $project: { ovrNum: 0 } }
        ]);
        
        // Mocking form factor
        const performers = players.map(p => ({
            ...p,
            formModifier: `+${Math.floor(Math.random() * 4) + 1} OVR`,
            period: "Monthly"
        }));

        res.status(200).json({ success: true, data: performers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching monthly performers' });
    }
};

const getTopYearlyPerformers = async (req, res) => {
    try {
        const players = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
            { $match: { ovrNum: { $gte: 87 } } },
            { $sample: { size: 10 } },
            { $project: { ovrNum: 0 } }
        ]);
        
        // Mocking form factor
        const performers = players.map(p => ({
            ...p,
            formModifier: `+${Math.floor(Math.random() * 6) + 2} OVR`,
            period: "Yearly"
        }));

        res.status(200).json({ success: true, data: performers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching yearly performers' });
    }
};

// ================= ALERTS =================
const getHighGrowthAlerts = async (req, res) => {
    try {
        const players = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" }, ageNum: { $toDouble: "$Age" } } },
            { $match: { 
                ageNum: { $lte: 22 },
                ovrNum: { $gte: 75, $lte: 84 }
            }},
            { $sort: { ovrNum: -1 } },
            { $limit: 20 },
            { $project: { ovrNum: 0, ageNum: 0 } }
        ]);
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching high growth alerts' });
    }
};

const getTopPerformerAlerts = async (req, res) => {
    try {
        const players = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" } } },
            { $match: { ovrNum: { $gte: 89 } } },
            { $sort: { ovrNum: -1 } },
            { $limit: 20 },
            { $project: { ovrNum: 0 } }
        ]);
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching top performer alerts' });
    }
};

// ================= YOUNG TALENTS =================
const getYoungTalents = async (req, res) => {
    try {
        const players = await Player.aggregate([
            { $addFields: { ovrNum: { $toDouble: "$OVR" }, ageNum: { $toDouble: "$Age" } } },
            { $match: { ageNum: { $lte: 21 } } },
            { $sort: { ovrNum: -1 } },
            { $limit: 20 },
            { $project: { ovrNum: 0, ageNum: 0 } }
        ]);
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error fetching young talents' });
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
    getFilteredPlayers,
    getRandomPlayer,
    getTrendingPlayers,
    getPlayerPredictions,
    getPlayerMarketValue,
    generateDreamTeam,
    buildCustomSquad,
    getPlayerRecommendations,
    calculateChemistry,
    getSystemLogs,
    getActivityLogs,
    getLiveSearch,
    getHeatmap,
    getTopMonthlyPerformers,
    getTopYearlyPerformers,
    getHighGrowthAlerts,
    getTopPerformerAlerts,
    getYoungTalents
};
