// server/validators/authValidator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({'any.only': 'Passwords do not match'}),
  role: Joi.string().valid('user', 'admin', 'manager').default('user'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { registerSchema, loginSchema };