// server/config/index.js
require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  JWT_COOKIE_EXPIRES_IN: parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 30, // in days
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};