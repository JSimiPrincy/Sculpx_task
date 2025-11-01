// server/validators/productValidator.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).default(0),
  imageUrl: Joi.string().uri().optional().allow(''), // Optional image URL
  availableForPurchase: Joi.boolean().default(true),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().optional(),
  stock: Joi.number().integer().min(0).optional(),
  imageUrl: Joi.string().uri().optional().allow(''),
  availableForPurchase: Joi.boolean().optional(),
}).min(1); // At least one field is required for update

module.exports = { createProductSchema, updateProductSchema };