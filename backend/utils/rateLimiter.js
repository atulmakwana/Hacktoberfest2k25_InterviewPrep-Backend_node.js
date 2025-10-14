/**
 * RATE LIMITER - Prevents API abuse using express-rate-limit
 *
 * HACKTOBERFEST TODO:
 * This utility creates rate limiters for different routes.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import express-rate-limit
 * 2. Create different rate limiters:
 *    - General API limiter (100 requests per 15 minutes)
 *    - Auth limiter (5 login/register attempts per 15 minutes)
 *    - Strict limiter (10 requests per 15 minutes for sensitive routes)
 *
 * RATE LIMIT CONFIGURATION:
 * - windowMs: Time window in milliseconds
 * - max: Maximum requests per window
 * - message: Error message when limit exceeded
 * - standardHeaders: Send rate limit info in headers
 * - legacyHeaders: Disable X-RateLimit headers
 *
 * USAGE:
 * Apply to routes in server.js or individual route files:
 * app.use('/api/', generalLimiter);
 * app.use('/api/auth', authLimiter);
 */

import rateLimit from 'express-rate-limit';

/**
 * TODO: CREATE GENERAL API RATE LIMITER
 *
 * Configuration:
 * - windowMs: 15 * 60 * 1000 (15 minutes)
 * - max: 100 requests
 * - message: 'Too many requests, please try again later'
 * - standardHeaders: true
 * - legacyHeaders: false
 *
 * EXAMPLE:
 * export const generalLimiter = rateLimit({
 *   windowMs: 15 * 60 * 1000,
 *   max: 100,
 *   message: 'Too many requests from this IP, please try again later',
 *   standardHeaders: true,
 *   legacyHeaders: false
 * });
 */

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * TODO: CREATE AUTH RATE LIMITER
 *
 * Stricter limits for authentication routes to prevent brute force
 *
 * Configuration:
 * - windowMs: 15 * 60 * 1000 (15 minutes)
 * - max: 5 requests
 * - message: 'Too many login attempts, please try again later'
 * - skipSuccessfulRequests: false
 *
 * Apply to: /api/auth/login, /api/auth/register
 */

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * TODO: CREATE STRICT RATE LIMITER
 *
 * For sensitive operations like delete, update
 *
 * Configuration:
 * - windowMs: 15 * 60 * 1000
 * - max: 10 requests
 * - message: 'Too many requests, please slow down'
 */

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests, please slow down',
  standardHeaders: true,
  legacyHeaders: false,
});
