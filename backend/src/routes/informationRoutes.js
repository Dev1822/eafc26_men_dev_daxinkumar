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
    getYoungTalents,
    headPlayersByTeam,
    headSystemHealth
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

router.route('/random').get(expensiveQueryLimiter, getRandomPlayer);
router.route('/trending').get(moderateApiLimiter, getTrendingPlayers);
router.route('/recommendations').get(expensiveQueryLimiter, getPlayerRecommendations);
router.route('/predictions').get(moderateApiLimiter, getPlayerPredictions);
router.route('/market-value').get(moderateApiLimiter, getPlayerMarketValue);
router.route('/dream-team').get(expensiveQueryLimiter, generateDreamTeam);
router.route('/team-builder').get(expensiveQueryLimiter, buildCustomSquad);
router.route('/chemistry').get(moderateApiLimiter, calculateChemistry).post(moderateApiLimiter, calculateChemistry);

// New Analytics & Logging Routes
router.route('/heatmap').get(moderateApiLimiter, getHeatmap);
router.route('/performance/top-monthly').get(moderateApiLimiter, getTopMonthlyPerformers);
router.route('/performance/top-yearly').get(moderateApiLimiter, getTopYearlyPerformers);
router.route('/alerts/high-growth').get(moderateApiLimiter, getHighGrowthAlerts);
router.route('/alerts/top-performers').get(moderateApiLimiter, getTopPerformerAlerts);
router.route('/young-talents').get(moderateApiLimiter, getYoungTalents);
router.route('/logs').get(moderateApiLimiter, getSystemLogs);
router.route('/activity').get(moderateApiLimiter, getActivityLogs);
router.route('/live-search').get(getLiveSearch); // Intentionally no strict limiter for snappy autocomplete, or moderate.

router.route('/system/health').head(headSystemHealth);

router.route('/name/:name').get(getPlayerByName);
router.route('/rank/:rank').get(getPlayerByRank);
router.route('/team/:team').head(headPlayersByTeam).get(getPlayersByTeam);
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
