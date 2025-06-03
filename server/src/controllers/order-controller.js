
const Order = require('../models/order-model');
const Cart = require('../models/cart-model');
const Address = require('../models/address-model');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment } = req.body;

    // 1) Payment method is required
    if (!payment) {
      return res.status(400).json({ message: "Payment method is required." });
    }

    // 2) Fetch the user's cart by userId
    const cartDoc = await Cart.findOne({ userId: userId });
    if (!cartDoc || cartDoc.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    const cartItems = cartDoc.items;

    // 3) Fetch the user's address by user (Address model uses field 'user')
    const addressDoc = await Address.findOne({ user: userId });
    if (!addressDoc) {
      return res
        .status(400)
        .json({ message: "No address on file. Please add your address first." });
    }

    // 4) Calculate totalPrice
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (isNaN(totalPrice)) {
      return res.status(400).json({ message: "Invalid cart item data." });
    }

    // 5) Create the new Order
    const newOrder = await Order.create({
      user: userId,
      cartItems: cartItems.map(it => ({
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        price: it.price
      })),
      addressId: addressDoc._id,
      payment,
      totalPrice
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get all orders for the currently authenticated user.
 */
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("cartItems.productId", "name price")
      .populate("addressId");

    // Rename `addressId` → `address` in the response
    const formatted = orders.map(order => {
      const obj = order.toObject();
      return {
        ...obj,
        address: obj.addressId
      };
    });

    return res.status(200).json({ orders: formatted });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get all orders in the system (admin view).
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("cartItems.productId", "name price")
      .populate("addressId");
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Update the status of an order by ID.
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of ${allowedStatuses.join(", ")}`
      });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res
      .status(200)
      .json({ message: "Order status updated successfully", order: updated });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Delete an order by ID.
 */
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
