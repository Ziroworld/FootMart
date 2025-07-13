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

// Accept sizes as array: ["M","L"] or [38, 39, 40]
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
    type: [mongoose.Schema.Types.Mixed],
    required: true,
    validate: {
      validator: function(values) {
        if (!Array.isArray(values) || values.length === 0) return false;
        return values.every(val =>
          typeof val === 'number'
            ? Number.isInteger(val) && val >= 30 && val <= 50 // You can change shoe size range here if needed
            : typeof val === 'string' && ['S', 'M', 'L', 'XL', 'XXL'].includes(val.toUpperCase())
        );
      },
      message: 'Sizes must be array of numbers (shoe sizes) or strings (S, M, L, XL, XXL)'
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
