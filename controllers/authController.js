// server/controllers/authController.js
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const authService = require('../services/authService');
const { createSendToken, signToken } = require('../utils/jwtHelpers');
const jwtConfig = require('../config/jwt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Used for finding user by refreshToken

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await authService.registerUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role || 'user', // Default role
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  res.status(200).json({ status: 'success' });
};

exports.refreshToken = catchAsync(async (req, res, next) => {
  const refreshTokenCookie = req.cookies.jwt; // Assuming refresh token is in 'jwt' cookie

  if (!refreshTokenCookie) {
    return next(new AppError('No refresh token found. Please log in.', 401));
  }

  const decoded = await promisify(jwt.verify)(refreshTokenCookie, jwtConfig.refreshTokenSecret);

  const user = await authService.findUserById(decoded.id);

  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // Create new access token
  const newAccessToken = signToken(user._id, jwtConfig.jwtSecret, jwtConfig.jwtExpiresIn);

  res.status(200).json({
    status: 'success',
    accessToken: newAccessToken,
  });
});