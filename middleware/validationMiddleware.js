// server/middleware/validationMiddleware.js
const AppError = require('../utils/AppError');

const validate = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });
  if (error) {
    const message = error.details.map((el) => el.message).join(', ');
    return next(new AppError(message, 400)); // Bad Request
  }
  next();
};

module.exports = {
  validateBody: (schema) => validate(schema, 'body'),
  validateParams: (schema) => validate(schema, 'params'),
  validateQuery: (schema) => validate(schema, 'query'),
};