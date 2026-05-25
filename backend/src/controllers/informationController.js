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
        const rank = Number(req.params.rank);

        const player = await Player.findOne({ rank });

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
        const players = await Player.find({ team: team });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by team' });
    }
};

const getPlayersByLeague = async (req, res) => {
    try {
        const league = req.params.league;
        const players = await Player.find({ league: league });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by league' });
    }
};

const getPlayersByNation = async (req, res) => {
    try {
        const nation = req.params.nation;
        const players = await Player.find({ nation: nation });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by nation' });
    }
};

const getPlayersByPosition = async (req, res) => {
    try {
        const position = req.params.position;
        const players = await Player.find({ position: position });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by position' });
    }
};

const getPlayersByAge = async (req, res) => {
    try {
        const age = req.params.age;
        const players = await Player.find({ age });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by age' });
    }
};

const getPlayersByGender = async (req, res) => {
    try {
        const gender = req.params.gender;
        const players = await Player.find({ gender: gender });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by gender' });
    }
};

const getPlayersByPlaystyle = async (req, res) => {
    try {
        const style = req.params.style;
        const players = await Player.find({ playStyles: style });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by playstyle' });
    }
};

const getPlayersByPreferredFoot = async (req, res) => {
    try {
        const foot = req.params.foot;
        const players = await Player.find({ preferredFoot: foot });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by preferred foot' });
    }
};
const getPlayersByAlternativePosition = async (req, res) => {
    try {
        const position = req.params.position;
        const players = await Player.find({ alternativePositions: position });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by alternative position' });
    }
};

const getTopRatedPlayers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    ovr: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    ovrNum: { $toDouble: "$ovr" }
                }
            },
            { $sort: { ovrNum: -1 } },
            { $limit: limit }
        ]);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching top rated players' });
    }
};

const getTopPacedPlayers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.aggregate([
            {
                $match: {
                    pac: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    pacNum: { $toDouble: "$pac" }
                }
            },
            { $sort: { pacNum: -1 } },
            { $limit: limit }
        ]);
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
                    dri: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    driNum: { $toDouble: "$dri" }
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
                    finishing: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    finishingNum: { $toDouble: "$finishing" }
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
                    pas: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    pasNum: { $toDouble: "$pas" }
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
                    def: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    defNum: { $toDouble: "$def" }
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
                    phy: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    phyNum: { $toDouble: "$phy" }
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
                    age: { $exists: true, $ne: null, $ne: "" },
                    ovr: { $exists: true, $ne: null, $ne: "" }
                }
            },
            {
                $addFields: {
                    ageNum: { $toDouble: "$age" },
                    ovrNum: { $toDouble: "$ovr" }
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
        const limit = parseInt(req.query.limit) || 10;
        const players = await Player.find({})
            .sort({ createdAt: -1 })
            .limit(limit);
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching recently added players' });
    }
};

const getPlayersBySkillMoves = async (req, res) => {
    try {
        const players = await Player.find({ skillMoves: req.params.value });
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching players by skill moves' });
    }
};

const getPlayersByWeakFoot = async (req, res) => {
    try {
        const players = await Player.find({ weakFoot: req.params.value });
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
                ovrDifference: compareStat(p1.ovr, p2.ovr),
                pacDifference: compareStat(p1.pac, p2.pac),
                shoDifference: compareStat(p1.sho, p2.sho),
                pasDifference: compareStat(p1.pas, p2.pas),
                driDifference: compareStat(p1.dri, p2.dri),
                defDifference: compareStat(p1.def, p2.def),
                phyDifference: compareStat(p1.phy, p2.phy)
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
        
        const isGK = player.position && player.position.toUpperCase() === 'GK';
        const calculatedScore = isGK
            ? getAvg([player.gkDiving, player.gkHandling, player.gkKicking, player.gkPositioning, player.gkReflexes])
            : getAvg([player.pac, player.sho, player.pas, player.dri, player.def, player.phy]);

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
                pace: { acceleration: player.acceleration, sprintSpeed: player.sprintSpeed },
                shooting: { positioning: player.positioning, finishing: player.finishing, shotPower: player.shotPower, longShots: player.longShots, volleys: player.volleys, penalties: player.penalties },
                passing: { vision: player.vision, crossing: player.crossing, freeKickAccuracy: player.freeKickAccuracy, shortPassing: player.shortPassing, longPassing: player.longPassing, curve: player.curve },
                dribbling: { dribbling: player.dribbling, agility: player.agility, balance: player.balance, reactions: player.reactions, ballControl: player.ballControl, composure: player.composure },
                defending: { interceptions: player.interceptions, headingAccuracy: player.headingAccuracy, defAwareness: player.defAwareness, standingTackle: player.standingTackle, slidingTackle: player.slidingTackle },
                physical: { jumping: player.jumping, stamina: player.stamina, strength: player.strength, aggression: player.aggression },
                goalkeeping: { diving: player.gkDiving, handling: player.gkHandling, kicking: player.gkKicking, positioning: player.gkPositioning, reflexes: player.gkReflexes }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching complete player statistics' });
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
    getPlayerStats
};

