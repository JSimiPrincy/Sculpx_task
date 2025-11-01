// server/server.js
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1); // Exit process with failure
});

// Connect to database
connectDB();

const PORT = config.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., DB connection errors)
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1); // Exit process with failure
  });
});

// For Vercel or other platforms that might send SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});