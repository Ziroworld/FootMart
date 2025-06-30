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

// Create a new order
router.post('/create',createOrder);

// Get all orders for the current user
router.get('/user',getUserOrders);

// Get all orders (admin view)
router.get('/', getAllOrders);

// Update order status by order ID
router.put('/update/:id', updateOrderStatus);

// Delete an order by ID
router.delete('/delete/:id', deleteOrder);

module.exports = router;
