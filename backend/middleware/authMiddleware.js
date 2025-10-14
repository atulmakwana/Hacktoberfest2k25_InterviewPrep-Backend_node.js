/**
 * AUTH MIDDLEWARE - Protects routes and verifies JWT tokens
 *
 * HACKTOBERFEST TODO:
 * This middleware authenticates users and protects routes.
 *
 * CONTRIBUTOR TASKS:
 * 1. Create 'protect' middleware function:
 *    - Extract token from Authorization header (Bearer <token>)
 *    - Verify token is present, if not send 401 error
 *    - Verify token using jwt.verify(token, JWT_SECRET)
 *    - Decode token to get user id
 *    - Find user in database using the id (exclude password field)
 *    - If user not found, send 401 error
 *    - Attach user to req.user
 *    - Call next()
 *    - Handle errors in try-catch
 *
 * 2. Create 'authorize' middleware function:
 *    - Accept roles as parameters (...roles)
 *    - Check if req.user.role is included in allowed roles
 *    - If not authorized, send 403 error
 *    - If authorized, call next()
 *
 * USAGE EXAMPLES:
 * - Protect route: router.get('/profile', protect, getProfile);
 * - Admin only: router.delete('/question/:id', protect, authorize('admin'), deleteQuestion);
 *
 * ERROR RESPONSES:
 * - No token: 401 "Not authorized, no token"
 * - Invalid token: 401 "Not authorized, invalid token"
 * - No user found: 401 "User not found"
 * - Not authorized role: 403 "Not authorized to access this route"
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * TODO: IMPLEMENT PROTECT MIDDLEWARE
 *
 * This middleware verifies JWT tokens and authenticates users
 *
 * Steps:
 * 1. Get token from request header (Authorization: Bearer <token>)
 *    - Check if req.headers.authorization starts with 'Bearer'
 *    - Extract token: req.headers.authorization.split(' ')[1]
 *
 * 2. Check if token exists
 *    - If no token, return 401 with message "Not authorized, no token"
 *
 * 3. Verify token
 *    - Use jwt.verify(token, process.env.JWT_SECRET)
 *    - This returns decoded token with user id
 *
 * 4. Find user by id
 *    - Use User.findById(decoded.id).select('-password')
 *    - The .select('-password') excludes password from result
 *
 * 5. Attach user to request
 *    - Set req.user = user
 *    - Call next()
 *
 * 6. Handle errors
 *    - Wrap in try-catch
 *    - On error, return 401 with message "Not authorized, invalid token"
 *
 * EXAMPLE STRUCTURE:
 * export const protect = async (req, res, next) => {
 *   let token;
 *   try {
 *     // Extract token from header
 *     // Verify token exists
 *     // Verify token with JWT
 *     // Find user
 *     // Attach user to req
 *     // Call next
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 */

export const protect = async (req, res, next) => {
  // TODO: Implement token verification and user authentication
  console.log('⚠️ Auth middleware not implemented yet!');
  console.log('👉 Implement this in middleware/authMiddleware.js');

  // Placeholder - remove after implementation
  return res.status(401).json({
    success: false,
    message: 'Authentication not implemented yet',
  });
};

/**
 * TODO: IMPLEMENT AUTHORIZE MIDDLEWARE
 *
 * This middleware checks if user has the required role(s)
 *
 * Parameters: ...roles (e.g., 'admin', 'user')
 * Returns: Middleware function
 *
 * Steps:
 * 1. Return a middleware function that accepts (req, res, next)
 * 2. Check if req.user.role is in the allowed roles array
 * 3. If not, return 403 error with message
 * 4. If authorized, call next()
 *
 * EXAMPLE STRUCTURE:
 * export const authorize = (...roles) => {
 *   return (req, res, next) => {
 *     if (!roles.includes(req.user.role)) {
 *       return res.status(403).json({
 *         success: false,
 *         message: `Role ${req.user.role} is not authorized to access this route`
 *       });
 *     }
 *     next();
 *   };
 * };
 *
 * USAGE:
 * router.delete('/question/:id', protect, authorize('admin'), deleteQuestion);
 */

export const authorize = (...roles) => {
  return (req, res, next) => {
    // TODO: Implement role-based authorization
    console.log('⚠️ Authorization middleware not implemented yet!');
    next();
  };
};
