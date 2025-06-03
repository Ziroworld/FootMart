
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: {              // changed from userId → user
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      productName: {
        type: String,
        required: true,
        trim: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  addressId: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  payment: {           // storing a string (e.g., "Credit Card", "COD")
    type: String,
    required: true,
    trim: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
