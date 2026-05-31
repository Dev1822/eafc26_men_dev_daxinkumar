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
    getPlayersSorted,
    headPlayers,
    headPlayerById
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

router.use(generalApiLimiter);

router.route('/')
    .options((req, res) => res.set({
        'Allow': 'OPTIONS, HEAD, GET, POST',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST'
    }).status(204).end())
    .head(headPlayers)
    .get(getPlayers)
    .post(createPlayer);

router.route('/exists/:id').get(checkPlayerExists);
router.route('/bulk-create').post(bulkCreatePlayers);
router.route('/bulk-update').patch(bulkUpdatePlayers);
router.route('/bulk-delete').delete(bulkDeletePlayers);
router.route('/sort/:fieldAndOrder').get(getPlayersSorted);

router.route('/:id')
    .options((req, res) => res.set({
        'Allow': 'OPTIONS, HEAD, GET, PUT, PATCH, DELETE',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, PUT, PATCH, DELETE'
    }).status(204).end())
    .head(headPlayerById)
    .get(getPlayerById)
    .put(replacePlayer)
    .patch(updatePlayer)
    .delete(deletePlayer);

module.exports = router;
