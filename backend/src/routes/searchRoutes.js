const express = require('express');
const router = express.Router();

const { searchPlayers } = require('../controllers/searchController');

router.route('/players').get(searchPlayers);

module.exports = router;
