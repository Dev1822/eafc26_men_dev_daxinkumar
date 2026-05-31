const express = require('express');
const router = express.Router();

const { getPlayerAnalytics, headAnalyticsType } = require('../controllers/analyticsController');

router.route('/:type')
    .head(headAnalyticsType)
    .get(getPlayerAnalytics);

module.exports = router;
