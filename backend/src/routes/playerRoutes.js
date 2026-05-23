const express = require('express');
const router = express.Router();
const { getPlayers, getPlayerById, createPlayer, replacePlayer } = require('../controllers/playerController');

router.route('/')
    .get(getPlayers)
    .post(createPlayer);
router.route('/:id')
    .get(getPlayerById)
    .put(replacePlayer);

module.exports = router;
