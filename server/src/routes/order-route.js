// server/src/routes/order-route.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/order-controller');

// Create a new order (and address in one shot)
router.post('/create', createOrder);

// Get all orders for a given user
router.get('/user/:userId', getUserOrders);

// Admin: get all orders
router.get('/', getAllOrders);

// Update order status
router.put('/update/:id', updateOrderStatus);

// Delete an order
router.delete('/delete/:id', deleteOrder);

module.exports = router;
