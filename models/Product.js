// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [100, 'A product name must have less or equal than 100 characters'],
      minlength: [3, 'A product name must have more or equal than 3 characters'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      enum: {
        values: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Food'],
        message: 'Category is either: Electronics, Clothing, Books, Home & Kitchen, Sports, Food',
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    imageUrl: {
      type: String,
      default: 'no-photo.jpg',
    },
    availableForPurchase: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance on queries
productSchema.index({ price: 1, category: 1 });
productSchema.index({ name: 'text', description: 'text' }); // For text search

const Product = mongoose.model('Product', productSchema);

module.exports = Product;