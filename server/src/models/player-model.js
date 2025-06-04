
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub‐schema for reviews
const ReviewSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Main Player schema
const PlayerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL to a Cloudinary (or similar) image
    required: true,
    trim: true
  },
  reviews: [ReviewSchema], // Array of { text, rating, createdAt }
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for average rating
PlayerSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / this.reviews.length;
});

// Ensure virtuals are included when converting to JSON
PlayerSchema.set('toJSON', { virtuals: true });
PlayerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Player', PlayerSchema);
