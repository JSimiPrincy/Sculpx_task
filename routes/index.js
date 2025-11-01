// server/routes/index.js
const express = require('express');
const v1ApiRoutes = require('./api/v1'); // Automatically loads index.js from v1

const router = express.Router();

// Mount API version 1 routes
router.use('/v1', v1ApiRoutes);

module.exports = router;