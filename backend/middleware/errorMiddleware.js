/**
 * ERROR MIDDLEWARE - Centralized error handling
 *
 * HACKTOBERFEST TODO:
 * This middleware handles all errors in a consistent format.
 *
 * CONTRIBUTOR TASKS:
 * 1. Create 'errorHandler' middleware function:
 *    - Accept (err, req, res, next) parameters (4 parameters for error middleware)
 *    - Set default statusCode (err.statusCode or 500)
 *    - Create error response object with:
 *      - success: false
 *      - message: err.message or 'Server Error'
 *      - stack: err.stack (only in development mode)
 *    - Handle specific error types:
 *      - Mongoose CastError (Invalid ID): 400
 *      - Mongoose Duplicate Key (11000): 400
 *      - Mongoose Validation Error: 400
 *      - JWT Errors: 401
 *    - Send JSON response
 *
 * 2. Create 'notFound' middleware function:
 *    - Handles 404 errors for undefined routes
 *    - Create error with message "Route not found"
 *    - Set status to 404
 *    - Pass to next error handler
 *
 * STANDARD ERROR RESPONSE FORMAT:
 * {
 *   success: false,
 *   message: "Error message here",
 *   stack: "Stack trace (only in development)"
 * }
 */

/**
 * TODO: IMPLEMENT ERROR HANDLER MIDDLEWARE
 *
 * This is the main error handling middleware
 *
 * Parameters: (err, req, res, next)
 * Note: Error middleware MUST have 4 parameters
 *
 * Steps:
 * 1. Set statusCode
 *    - Use err.statusCode if it exists, otherwise 500
 *
 * 2. Build error response object
 *    - success: false
 *    - message: err.message
 *    - stack: Include only if NODE_ENV === 'development'
 *
 * 3. Handle specific Mongoose errors:
 *    a. CastError (Invalid ObjectId):
 *       - Check: err.name === 'CastError'
 *       - Message: 'Resource not found'
 *       - StatusCode: 404
 *
 *    b. Duplicate Key Error (E11000):
 *       - Check: err.code === 11000
 *       - Message: 'Duplicate field value entered'
 *       - StatusCode: 400
 *
 *    c. ValidationError:
 *       - Check: err.name === 'ValidationError'
 *       - Message: Extract from err.errors object
 *       - StatusCode: 400
 *
 * 4. Handle JWT errors:
 *    - JsonWebTokenError: 'Invalid token'
 *    - TokenExpiredError: 'Token expired'
 *    - StatusCode: 401
 *
 * 5. Send response
 *    - res.status(statusCode).json(errorResponse)
 *
 * EXAMPLE STRUCTURE:
 * export const errorHandler = (err, req, res, next) => {
 *   let statusCode = err.statusCode || 500;
 *   let message = err.message;
 *
 *   // Handle specific error types
 *   if (err.name === 'CastError') {
 *     // Handle cast error
 *   }
 *
 *   res.status(statusCode).json({
 *     success: false,
 *     message,
 *     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
 *   });
 * };
 */

export const errorHandler = (err, req, res, next) => {
  // TODO: Implement centralized error handling
  console.log('⚠️ Error handler not fully implemented yet!');
  console.log('Error:', err.message);

  // Placeholder response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

/**
 * TODO: IMPLEMENT NOT FOUND MIDDLEWARE
 *
 * This middleware handles requests to undefined routes
 *
 * Parameters: (req, res, next)
 *
 * Steps:
 * 1. Create new Error with message `Route ${req.originalUrl} not found`
 * 2. Set res.status(404)
 * 3. Pass error to next middleware: next(error)
 *
 * EXAMPLE STRUCTURE:
 * export const notFound = (req, res, next) => {
 *   const error = new Error(`Route ${req.originalUrl} not found`);
 *   res.status(404);
 *   next(error);
 * };
 *
 * USAGE:
 * In server.js, add AFTER all routes but BEFORE errorHandler:
 * app.use(notFound);
 * app.use(errorHandler);
 */

export const notFound = (req, res, next) => {
  // TODO: Implement 404 handler
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};
