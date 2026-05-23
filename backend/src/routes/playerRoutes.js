const express = require('express');
const router = express.Router();
const { getPlayers, getPlayerById, createPlayer, replacePlayer, updatePlayer, deletePlayer } = require('../controllers/playerController');

router.route('/')
    .get(getPlayers)
    .post(createPlayer);
router.route('/:id')
    .get(getPlayerById)
    .put(replacePlayer)
    .patch(updatePlayer)
    .delete(deletePlayer);

module.exports = router;
