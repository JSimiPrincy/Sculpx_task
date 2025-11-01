// server/controllers/userController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const userService = require('../services/userService');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get currently logged in user's profile
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id; // User ID is attached by protect middleware
  next(); // Pass to getUser controller
};