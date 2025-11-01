// server/services/productService.js
const Product = require('../models/Product');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');

exports.createProduct = async (productData) => {
  const newProduct = await Product.create(productData);
  return newProduct;
};

exports.getAllProducts = async (queryString) => {
  const features = new APIFeatures(Product.find(), queryString)
    .search(['name', 'description', 'category']) // Search fields for products
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  // Count total documents for pagination metadata (without pagination applied)
  const totalCountFeatures = new APIFeatures(Product.find(), queryString)
    .search(['name', 'description', 'category'])
    .filter();
  const totalCount = await totalCountFeatures.query.countDocuments();


  return { products, totalCount };
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError('No product found with that ID', 404);
  }
  return product;
};

exports.updateProduct = async (id, productData) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new AppError('No product found with that ID', 404);
  }
  return updatedProduct;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new AppError('No product found with that ID', 404);
  }
  return null;
};