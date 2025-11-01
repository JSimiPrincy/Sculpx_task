// server/middleware/roleMiddleware.js
const AppError = require('../utils/AppError');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array like ['admin', 'manager']
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403)); // Forbidden
    }
    next();
  };
};