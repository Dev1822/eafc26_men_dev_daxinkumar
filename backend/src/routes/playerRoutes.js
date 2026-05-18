const express = require('express');
const router = express.Router();
const { getPlayers, getPlayerById } = require('../controllers/playerController');

router.route('/').get(getPlayers);
router.route('/:id').get(getPlayerById);

module.exports = router;
