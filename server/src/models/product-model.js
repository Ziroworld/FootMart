
const mongoose = require('mongoose');

const PRODUCT_CATEGORIES = ['boots', 'jersey', 'accessories'];

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,          // Cloudinary (or any) URL string
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0           // quantity = 0 ⇒ out of stock
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: PRODUCT_CATEGORIES
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
