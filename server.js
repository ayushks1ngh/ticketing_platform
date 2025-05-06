/**
 * Ticketing System - Main Server File
 * -----------------------------------
 * This is the entry point for the Ticketing System application.
 * It sets up the Express server, configures middleware, establishes routes,
 * handles errors, and starts the server.
 * 
 * Author: Ayush
 * Date: May 6, 2025
 */

// ===================================================================
// DEPENDENCIES AND IMPORTS
// ===================================================================
// Core Node.js modules
const path = require('path');
const fs = require('fs');

// Third-party modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');

// ===================================================================
// CONFIGURATION SETUP
// ===================================================================
// Load environment variables from .env file
dotenv.config();

// Determine environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

// Create Express application
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// ===================================================================
// APPLICATION SETTINGS
// ===================================================================
app.set('trust proxy', 1); // Trust first proxy for secure cookies behind reverse proxy
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'src', 'views')); // Set views directory

// ===================================================================
// MIDDLEWARE SETUP
// ===================================================================
// Enable logging based on environment
if (NODE_ENV === 'development') {
  // Detailed logging for development
  app.use(morgan('dev'));
} else {
  // Use 'combined' format for production (more comprehensive)
  app.use(morgan('combined'));
}

// Security middleware
app.use(helmet()); // Helps secure Express apps by setting HTTP headers

// Parse JSON bodies
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent abuse

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Compress responses
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ===================================================================
// RAZORPAY INTEGRATION SETUP
// ===================================================================
/**
 * Razorpay Integration
 * This section initializes and configures the Razorpay payment gateway.
 * 
 * TODO: Implement complete Razorpay integration:
 * 1. Initialize Razorpay with API keys
 * 2. Create payment verification middleware
 * 3. Set up webhook handling for payment events
 */
const Razorpay = require('razorpay');

// Initialize Razorpay (commented out until keys are available)
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// ===================================================================
// ROUTES SETUP
// ===================================================================
// Import route modules
// const authRoutes = require('./src/routes/authRoutes');
// const ticketRoutes = require('./src/routes/ticketRoutes');
// const userRoutes = require('./src/routes/userRoutes');
// const paymentRoutes = require('./src/routes/paymentRoutes');
// const exportRoutes = require('./src/routes/exportRoutes');

// Base route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Ticketing System API',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Mount route modules
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tickets', ticketRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/payments', paymentRoutes);
// app.use('/api/v1/exports', exportRoutes);

// ===================================================================
// ERROR HANDLING
// ===================================================================
// Handle 404 - Not Found
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route not found: ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  
  // Different error responses based on environment
  if (NODE_ENV === 'development') {
    // Detailed error for development
    res.status(statusCode).json({
      status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  } else {
    // Generic error for production (avoid leaking details)
    res.status(statusCode).json({
      status,
      message: statusCode === 500 ? 'Something went wrong on the server.' : err.message
    });
  }
});

// ===================================================================
// SERVER STARTUP
// ===================================================================
// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

// Handle unhandled rejections (e.g., database connection issues)
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Gracefully shut down
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal (e.g., Heroku shutdown)
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app; // Export for testing purposes

