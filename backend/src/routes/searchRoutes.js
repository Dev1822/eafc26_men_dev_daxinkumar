const express = require('express');
const router = express.Router();

const { searchPlayers } = require('../controllers/searchController');

const createRateLimiter = require('../middlewares/rateLimit');
const moderateApiLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: "Search API rate limit exceeded."
});

router.route('/players').get(moderateApiLimiter, searchPlayers);

module.exports = router;
