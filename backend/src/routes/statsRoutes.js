const express = require('express');
const router = express.Router();

const { getGlobalStats, headStatsCount } = require('../controllers/statsController');

router.route('/:type')
    .head(headStatsCount)
    .get(getGlobalStats);

module.exports = router;
