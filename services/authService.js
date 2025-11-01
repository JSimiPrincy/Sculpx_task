// server/services/authService.js
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.registerUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }
  return user;
};

exports.findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};