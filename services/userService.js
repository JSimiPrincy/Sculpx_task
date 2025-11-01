// server/services/userService.js
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }
  return user;
};

exports.updateUser = async (id, userData) => {
  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    new: true, // return the modified document rather than the original
    runValidators: true, // run Mongoose validators on update
  }).select('-password');

  if (!updatedUser) {
    throw new AppError('No user found with that ID', 404);
  }
  return updatedUser;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }
  return null; // indicate successful deletion
};