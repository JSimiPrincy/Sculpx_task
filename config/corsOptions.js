// server/config/corsOptions.js
const config = require('./index');

const corsOptions = {
  origin: config.CLIENT_URL, // Allow only your client URL
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;