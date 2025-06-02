// src/routes/wishlist-route.js

const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlist-controller');
const { authenticateToken } = require('../security/auth');

router.post('/add', authenticateToken, addToWishlist);
router.get('/', authenticateToken, getWishlist);
router.post('/remove', authenticateToken, removeFromWishlist);
router.post('/clear', authenticateToken, clearWishlist);

module.exports = router;
