const express = require('express');
const router = express.Router();

const { getPlayerAnalytics } = require('../controllers/analyticsController');

router.route('/:type').get(getPlayerAnalytics);

module.exports = router;
