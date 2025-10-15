/**
 * ERROR MIDDLEWARE - Centralized error handling
 *
 * HACKTOBERFEST TODO:
 * This middleware handles all errors in a consistent format.
 */
export const errorHandler = (err, req, res, next) => {
  // Start with default error code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error';

  // Handle different types of errors

  // Bad MongoDB ID format - should be 404 per TODO
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Duplicate data - use exact message from TODO
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Validation errors - extract detailed messages
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Get all validation error messages
    const errors = Object.values(err.errors).map(error => error.message);
    message = errors.join(', ');
  }

  // JWT token issues
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  const errorResponse = {
    success: false,
    message: message,
    timestamp: new Date().toISOString()
  };

  // Add stack trace (you can remove this later)
  errorResponse.stack = err.stack;
  res.status(statusCode).json(errorResponse);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);

  error.type = 'ROUTE_NOT_FOUND';
  error.timestamp = new Date().toISOString();
  error.requestedUrl = req.originalUrl;
  error.method = req.method;

  next(error);
};