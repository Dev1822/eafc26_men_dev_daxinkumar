const express = require('express');
const router = express.Router();

const { getPlayers } = require('../controllers/playerController');
const { getGlobalStats } = require('../controllers/statsController');
const { getPlayerAnalytics } = require('../controllers/analyticsController');

router.route('/dashboard').get((req, res) => {
    res.json({ success: true, message: "Welcome to the admin dashboard." });
});

router.route('/players')
    .options((req, res) => res.set({
        'Allow': 'OPTIONS, GET',
        'Access-Control-Allow-Methods': 'OPTIONS, GET'
    }).status(204).end())
    .get(getPlayers);

router.route('/stats').get((req, res, next) => {
    req.params.type = 'count';
    next();
}, getGlobalStats);

router.route('/teams').get((req, res, next) => {
    req.params.type = 'top-teams';
    next();
}, getPlayerAnalytics);

router.route('/leagues').get((req, res, next) => {
    req.params.type = 'top-leagues';
    next();
}, getPlayerAnalytics);

module.exports = router;
