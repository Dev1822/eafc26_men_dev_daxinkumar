const express = require('express');
const router = express.Router();
const {
    getPlayers,
    getPlayerById,
    checkPlayerExists,
    createPlayer,
    bulkCreatePlayers,
    replacePlayer,
    updatePlayer,
    bulkUpdatePlayers,
    deletePlayer,
    bulkDeletePlayers,
    getPlayersSorted
} = require('../controllers/playerController');

const createRateLimiter = require('../middlewares/rateLimit');

const generalApiLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 60,
    message: "General API rate limit exceeded."
});

const expensiveQueryLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 10,
    message: "Too many complex queries. Please try again later."
});

router.route('/exists/:id').get(checkPlayerExists);
router.route('/bulk-create').post(bulkCreatePlayers);
router.route('/bulk-update').patch(bulkUpdatePlayers);
router.route('/bulk-delete').delete(bulkDeletePlayers);
router.route('/sort/:fieldAndOrder').get(getPlayersSorted);

router.route('/')
    .get(generalApiLimiter, getPlayers)
    .post(createPlayer);

router.route('/:id')
    .get(getPlayerById)
    .put(replacePlayer)
    .patch(updatePlayer)
    .delete(deletePlayer);

module.exports = router;
