// src/routes/cart-route.js

const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require('../controllers/cart-controller');
const { authenticateToken } = require('../security/auth');

router.post('/add', authenticateToken, addToCart);
router.get('/', authenticateToken, getCart);
router.post('/remove', authenticateToken, removeFromCart);
router.post('/clear', authenticateToken, clearCart);

module.exports = router;
