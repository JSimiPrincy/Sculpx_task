// server/config/jwt.js
const config = require('./index');

module.exports = {
  jwtSecret: config.JWT_SECRET,
  jwtExpiresIn: config.JWT_EXPIRES_IN,
  jwtCookieExpiresIn: config.JWT_COOKIE_EXPIRES_IN, // in days
  refreshTokenSecret: config.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
};