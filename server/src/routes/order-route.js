// src/routes/order-route.js

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/order-controller');
const { authenticateToken } = require('../security/auth');

// Create a new order
router.post('/create', authenticateToken, createOrder);

// Get all orders for the current user
router.get('/user', authenticateToken, getUserOrders);

// Get all orders (admin view)
router.get('/', authenticateToken, getAllOrders);

// Update order status by order ID
router.put('/update/:id', authenticateToken, updateOrderStatus);

// Delete an order by ID
router.delete('/delete/:id', authenticateToken, deleteOrder);

module.exports = router;
