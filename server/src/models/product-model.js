const mongoose = require('mongoose');

const PRODUCT_CATEGORIES = ['boots', 'jersey', 'accessories'];

const specsSchema = new mongoose.Schema({
  material: { type: String, trim: true },
  weight: { type: String, trim: true },
  studType: { type: String, trim: true },
  fit: { type: String, trim: true },
  playerVersion: { type: Boolean },
  palmMaterial: { type: String, trim: true },
  closure: { type: String, trim: true },
  fingerProtection: { type: String, trim: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
    validate: {
      validator: v => Array.isArray(v) && v.length > 0,
      message: 'At least one product image is required.'
    }
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
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(value) {
        if (typeof value === 'number') return true;
        if (typeof value === 'string') {
          return ['S', 'M', 'L', 'XL', 'XXL'].includes(value.toUpperCase());
        }
        return false;
      },
      message: 'Size must be a number or valid size string (S, M, L, XL, XXL)'
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
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
  },
  specs: {
    type: specsSchema,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
