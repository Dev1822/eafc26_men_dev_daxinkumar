const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/informationController');

const createRateLimiter = require('../middlewares/rateLimit');

const moderateApiLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: "Analytics API rate limit exceeded."
});

const expensiveQueryLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 10,
    message: "Complex query limit exceeded."
});

router.route('/recommendations').get(expensiveQueryLimiter, (req, res) => res.json({ success: true, message: "Recommendations (Stub)" }));
router.route('/trending').get(moderateApiLimiter, (req, res) => res.json({ success: true, message: "Trending (Stub)" }));

router.route('/name/:name').get(getPlayerByName);
router.route('/rank/:rank').get(getPlayerByRank);
router.route('/team/:team').get(getPlayersByTeam);
router.route('/league/:league').get(getPlayersByLeague);
router.route('/nation/:nation').get(getPlayersByNation);
router.route('/position/:position').get(getPlayersByPosition);
router.route('/age/:age').get(getPlayersByAge);
router.route('/gender/:gender').get(getPlayersByGender);
router.route('/playstyle/:style').get(getPlayersByPlaystyle);
router.route('/preferred-foot/:foot').get(getPlayersByPreferredFoot);
router.route('/alternative-position/:position').get(getPlayersByAlternativePosition);
router.route('/top-rated').get(moderateApiLimiter, getTopRatedPlayers);
router.route('/top-paced').get(getTopPacedPlayers);
router.route('/top-dribblers').get(getTopDribblers);
router.route('/top-finishers').get(getTopFinishers);
router.route('/top-passers').get(getTopPassers);
router.route('/top-defenders').get(getTopDefenders);
router.route('/top-physical').get(getTopPhysicalPlayers);
router.route('/top-youngsters').get(getTopYoungsters);
router.route('/recent').get(getRecentPlayers);
router.route('/skill-moves/:value').get(getPlayersBySkillMoves);
router.route('/weak-foot/:value').get(getPlayersByWeakFoot);
router.route('/compare/:player1/:player2').get(expensiveQueryLimiter, comparePlayers);
router.route('/performance/:id').get(getPlayerPerformance);
router.route('/stats/:id').get(getPlayerStats);

router.route('/filter/:type').get(getFilteredPlayers);

module.exports = router;
