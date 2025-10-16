/* eslint-disable no-undef */
/**
 * SERVER.JS - Main Entry Point for Backend
 *
 * HACKTOBERFEST TODO:
 * This file sets up the Express server and connects to MongoDB.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import the database connection function from config/database.js
 * 2. Call the connectDB() function to establish MongoDB connection
 * 3. Setup middleware for JSON parsing, CORS, and URL encoding
 * 4. Import and use route handlers (auth, questions, etc.)
 * 5. Add error handling middleware at the end
 * 6. Start the server on the PORT from environment variables
 *
 * EXAMPLE STRUCTURE:
 * - Load environment variables
 * - Connect to database
 * - Setup middleware (express.json(), cors(), etc.)
 * - Mount routes (/api/auth, /api/questions, etc.)
 * - Error handling middleware
 * - Start listening on PORT
 */

import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';

// TODO: Import database connection
import connectDB from './config/database.js';

// TODO: Import routes
import authRoutes from './routes/authRoutes.js';
// import questionRoutes from './routes/questionRoutes.js';

// TODO: Import error middleware
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
import { errorHandler,notFound } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * TODO: CONNECT TO DATABASE
 * Call the connectDB function here to establish MongoDB connection
 * Example: connectDB();
*/
connectDB();
app.use(express.json())

/**
 * TODO: SETUP MIDDLEWARE
 * Add the following middleware in order:
 * 1. express.json() - Parse JSON request bodies
 * 2. express.urlencoded({ extended: true }) - Parse URL-encoded bodies
 * 3. cors() - Enable CORS for frontend communication
 *
 * BONUS: Configure CORS to only allow requests from FRONTEND_URL
 */

// Test route - Remove this after implementing proper routes
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

/**
 * TODO: MOUNT API ROUTES
 * Mount your route handlers here:
 * - app.use('/api/auth', authRoutes);
 * - app.use('/api/questions', questionRoutes);
 * - app.use('/api/categories', categoryRoutes);
 *
 * Remember: All routes should be prefixed with /api
 */

app.use('/api/auth', authRoutes)


//404 Handler - AFTER all routes
app.use(notFound);


/**
 * TODO: ADD ERROR HANDLING MIDDLEWARE
 * This should be the LAST middleware
 * Example: app.use(errorHandler);
 */

app.use(errorHandler);


// ⬇️ TEMPORARY TEST ROUTE - This should NEVER be reached!
app.get('/api/debug-test', (req, res) => {
  res.json({
    message: 'THIS SHOULD NOT APPEAR! Error handlers are too early!'
  });
});


/**
 * TODO: START SERVER
 * Listen on the PORT and log a success message
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
