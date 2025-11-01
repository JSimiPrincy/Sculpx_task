// server/utils/jwtHelpers.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const signToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, {
    expiresIn: expiresIn,
  });
};

const createSendToken = (user, statusCode, res) => {
  const accessToken = signToken(user._id, jwtConfig.jwtSecret, jwtConfig.jwtExpiresIn);
  const refreshToken = signToken(user._id, jwtConfig.refreshTokenSecret, jwtConfig.refreshTokenExpiresIn);

  const cookieOptions = {
    expires: new Date(Date.now() + jwtConfig.jwtCookieExpiresIn * 24 * 60 * 60 * 1000), // convert days to ms
    httpOnly: true, // prevent client-side JavaScript from accessing it
    secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
    sameSite: 'Lax', // or 'None' if cross-site, but require secure: true
  };

  res.cookie('jwt', refreshToken, cookieOptions); // Store refresh token in cookie

  // Remove password from output
  user.password = undefined;
  user.refreshToken = undefined; // Assuming it's not stored on user object

  res.status(statusCode).json({
    status: 'success',
    accessToken, // Send access token to client to store in memory
    user,
  });
};

module.exports = { signToken, createSendToken };