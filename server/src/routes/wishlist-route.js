// src/routes/wishlist-route.js

const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlist-controller');


router.post('/add',  addToWishlist);
router.get('/', getWishlist);
router.post('/remove', removeFromWishlist);
router.post('/clear', clearWishlist);

module.exports = router;
