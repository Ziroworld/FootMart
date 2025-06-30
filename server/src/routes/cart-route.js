const express = require('express');
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} = require('../controllers/cart-controller');

const router = express.Router();

router.post('/add',       addToCart);
router.get('/:userId',    getCart);
router.post('/remove',    removeFromCart);
router.post('/clear',     clearCart);
router.patch('/update',   updateCartItem);

module.exports = router;
