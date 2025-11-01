// server/app.js
const express = require('express');
const morgan = require('morgan'); // For logging requests
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes'); // Aggregated API routes
const corsOptions = require('./config/corsOptions');
const config = require('./config');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors(corsOptions));

// Development logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser, reading cookies from req.headers.cookie
app.use(cookieParser());

// Data sanitization against NoSQL query injection (e.g., filter out '$' in queries)
// Data sanitization against XSS (e.g., convert html entities)
// (These are more advanced and usually implemented with packages like express-mongo-sanitize, xss-clean)
// For now, simple prevention is by using Joi validation and not directly using user input in DB queries.

// ROUTES
app.use('/api', apiRoutes); // Mount all API routes under /api

// Handle undefined routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;