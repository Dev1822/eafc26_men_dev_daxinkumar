const express = require('express');
const router = express.Router();

const { createPlayer, updatePlayer, deletePlayer } = require('../controllers/playerController');

router.route('/players').post(createPlayer);
router.route('/players/:id').patch(updatePlayer).delete(deletePlayer);

module.exports = router;
