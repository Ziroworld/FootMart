// server/src/controllers/order-controller.js
const Order   = require('../models/order-model');
const Cart    = require('../models/cart-model');
const Address = require('../models/address-model');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      payment,
      fullName,
      phoneNumber,
      streetAddress,
      landmark,
      city,
      state,
      country
    } = req.body;

    // 1) Validate required fields
    if (
      !userId ||
      !payment ||
      !fullName ||
      !phoneNumber ||
      !streetAddress ||
      !landmark ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // 2) Fetch user's cart
    const cartDoc = await Cart.findOne({ userId });
    if (!cartDoc || !cartDoc.items?.length) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    const cartItems = cartDoc.items;

    // 3) Calculate total price
    const totalPrice = cartItems.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );

    // 4) Create & save the address
    const newAddress = await Address.create({
      user: userId,
      fullName,
      phoneNumber,
      streetAddress,
      landmark,
      city,
      state,
      country
    });

    // 5) Create & save the order, referencing the new address
    const order = await Order.create({
      user: userId,
      cartItems: cartItems.map(it => ({
        productId:   it.productId,
        productName: it.productName,
        quantity:    it.quantity,
        price:       it.price
      })),
      addressId:  newAddress._id,
      payment,
      totalPrice
    });

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate("cartItems.productId", "name price")
      .populate("addressId");

    // rename addressId → address for clarity
    const formatted = orders.map(o => {
      const obj = o.toObject();
      return { ...obj, address: obj.addressId };
    });

    return res.status(200).json({ orders: formatted });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["Pending","Processing","Shipped","Delivered","Cancelled"];
    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ message: `Status must be one of: ${allowed.join(", ")}` });
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
      .json({ message: "Order status updated", order: updated });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

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
