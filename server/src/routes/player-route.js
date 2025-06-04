// src/routes/player-route.js

const express = require('express');
const router = express.Router();

const {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  addReview,
  getPopularPlayers
} = require('../controllers/player-controller');

// Define routes for player operations
router.post('/', createPlayer);
router.get('/', getAllPlayers);
router.get('/popular', getPopularPlayers);
router.get('/:id', getPlayerById);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);
router.post('/:id/review', addReview);

module.exports = router;
