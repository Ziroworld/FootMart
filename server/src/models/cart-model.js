const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assumes you have a User model
    required: true,
    unique: true  // One cart per user
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productImage: {
        type: String // URL (Cloudinary link)
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cart", CartSchema);
