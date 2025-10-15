/**
 * VALIDATION MIDDLEWARE - Request data validation using express-validator
 *
 * HACKTOBERFEST TODO:
 * This file contains validation rules for different routes.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import validation functions from express-validator:
 *    - body, param, query, validationResult
 *
 * 2. Create validation chains for:
 *    - User registration (name, email, password)
 *    - User login (email, password)
 *    - Question creation (questionText, company, topic, role, difficulty)
 *    - Question update
 *    - Query parameters (search, filters, pagination)
 *
 * 3. Create 'validate' middleware to check validation results:
 *    - Get validation errors using validationResult(req)
 *    - If errors exist, return 400 with error messages
 *    - If no errors, call next()
 *
 * 4. Export all validation chains and the validate middleware
 *
 * VALIDATION RULES:
 * - Email: must be valid email format
 * - Password: minimum 6 characters
 * - QuestionText: minimum 10 characters
 * - Difficulty: must be Easy, Medium, or Hard
 * - Company, topic, role: required, non-empty strings
 *
 * USAGE EXAMPLE:
 * router.post('/register', validateRegister, validate, registerUser);
 */

import { body, param, query, validationResult } from 'express-validator';

/**
 * TODO: IMPLEMENT VALIDATE MIDDLEWARE
 *
 * This middleware checks for validation errors and returns them
 *
 * Steps:
 * 1. Get validation result: const errors = validationResult(req)
 * 2. Check if errors exist: !errors.isEmpty()
 * 3. If errors exist:
 *    - Extract error messages
 *    - Return 400 response with errors array
 * 4. If no errors, call next()
 *
 * EXAMPLE:
 * export const validate = (req, res, next) => {
 *   const errors = validationResult(req);
 *   if (!errors.isEmpty()) {
 *     return res.status(400).json({
 *       success: false,
 *       message: 'Validation failed',
 *       errors: errors.array()
 *     });
 *   }
 *   next();
 * };
 */

export const validate = (req, res, next) => {
  // TODO: Implement validation error checking
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};


export const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'), 

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'), 

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required'),
];


/**
 * TODO: CREATE VALIDATION CHAINS FOR QUESTION CREATION
 *
 * Validate:
 * - questionText: required, trimmed, min 10 characters
 * - company: required, not empty, trimmed
 * - topic: required, not empty, trimmed
 * - role: required, not empty, trimmed
 * - difficulty: required, must be one of: Easy, Medium, Hard
 *
 * EXAMPLE:
 * export const validateCreateQuestion = [
 *   body('questionText')
 *     .trim()
 *     .notEmpty().withMessage('Question text is required')
 *     .isLength({ min: 10 }).withMessage('Question must be at least 10 characters'),
 *   body('difficulty')
 *     .isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be Easy, Medium, or Hard')
 * ];
 */

export const validateCreateQuestion = [
  // TODO: Implement validation for questionText
  body('questionText'),

  // TODO: Implement validation for company
  body('company'),

  // TODO: Implement validation for topic
  body('topic'),

  // TODO: Implement validation for role
  body('role'),

  // TODO: Implement validation for difficulty
  body('difficulty'),
];


/**
 * TODO: CREATE VALIDATION CHAINS FOR QUESTION UPDATE
 *
 * Similar to create, but all fields are optional
 * If provided, they should meet the same criteria
 */

export const validateUpdateQuestion = [
  // TODO: Implement optional validation for questionText
  body('questionText').optional(),

  // TODO: Implement optional validation for topic
  body('topic').optional(),

  // TODO: Implement optional validation for difficulty
  body('difficulty').optional(),
];


/**
 * TODO: CREATE VALIDATION FOR MONGODB OBJECTID
 *
 * Validate that route params are valid MongoDB ObjectIds
 *
 * EXAMPLE:
 * export const validateObjectId = [
 *   param('id').isMongoId().withMessage('Invalid question ID')
 * ];
 */

export const validateObjectId = [
  // TODO: Implement ObjectId validation
  param('id'),
];

/**
 * TODO: CREATE VALIDATION FOR QUERY PARAMETERS
 *
 * Validate optional query parameters for filtering and search
 *
 * Examples:
 * - sort: must be 'latest', 'oldest', 'upvotes'
 * - difficulty: must be Easy, Medium, or Hard
 * - page, limit: must be positive integers
 */

export const validateQueryParams = [
  // TODO: Implement validation for sort query
  query('sort').optional(),

  // TODO: Implement validation for difficulty query
  query('difficulty').optional(),

  // TODO: Implement validation for page query
  query('page').optional(),

  // TODO: Implement validation for limit query
  query('limit').optional(),
];
