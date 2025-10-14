/**
 * QUESTION ROUTES - Interview questions routes
 *
 * HACKTOBERFEST TODO:
 * This file defines all routes for question management.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import express Router
 * 2. Import question controllers
 * 3. Import middleware (auth, validation)
 * 4. Define routes according to API specification
 *
 * ROUTES TO IMPLEMENT:
 *
 * PUBLIC ROUTES (No auth required):
 * - GET    /api/questions              - Get all questions (with filters)
 * - GET    /api/questions/search       - Search questions
 * - GET    /api/questions/:id          - Get single question
 * - GET    /api/questions/:id/upvotes  - Get upvote count
 *
 * PRIVATE ROUTES (Auth required):
 * - POST   /api/questions              - Create question
 * - PUT    /api/questions/:id          - Update question (owner/admin)
 * - DELETE /api/questions/:id          - Delete question (owner/admin)
 * - POST   /api/questions/:id/upvote   - Upvote question
 *
 * ROUTE ORDER MATTERS:
 * - Define /search BEFORE /:id (otherwise 'search' will be treated as ID)
 * - Define specific routes before dynamic routes
 *
 * MIDDLEWARE USAGE:
 * - protect: Requires authentication
 * - authorize('admin'): Requires admin role
 * - validateCreateQuestion, validate: Request validation
 * - validateObjectId, validate: ID validation
 */

import express from 'express';

// TODO: Import controllers
// import {
//   createQuestion,
//   getAllQuestions,
//   getQuestionById,
//   updateQuestion,
//   deleteQuestion,
//   upvoteQuestion,
//   getQuestionUpvotes,
//   searchQuestions,
//   getCategories
// } from '../controllers/questionController.js';

// TODO: Import middleware
// import { protect, authorize } from '../middleware/authMiddleware.js';
// import {
//   validateCreateQuestion,
//   validateUpdateQuestion,
//   validateObjectId,
//   validateQueryParams,
//   validate
// } from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * TODO: DEFINE QUESTION ROUTES
 *
 * IMPORTANT: Order matters! Define specific routes before parameterized routes.
 *
 * 1. GET /search?q=keyword
 *    - Public
 *    - Controller: searchQuestions
 *
 * 2. GET /
 *    - Public
 *    - Middleware: validateQueryParams (optional)
 *    - Controller: getAllQuestions
 *    - Query params: company, topic, role, difficulty, sort, page, limit, fromDate, toDate
 *
 * 3. POST /
 *    - Private (requires auth)
 *    - Middleware: protect, validateCreateQuestion, validate
 *    - Controller: createQuestion
 *
 * 4. GET /:id
 *    - Public
 *    - Middleware: validateObjectId, validate
 *    - Controller: getQuestionById
 *
 * 5. PUT /:id
 *    - Private (owner or admin)
 *    - Middleware: protect, validateObjectId, validateUpdateQuestion, validate
 *    - Controller: updateQuestion
 *
 * 6. DELETE /:id
 *    - Private (owner or admin)
 *    - Middleware: protect, validateObjectId, validate
 *    - Controller: deleteQuestion
 *
 * 7. POST /:id/upvote
 *    - Private (requires auth)
 *    - Middleware: protect, validateObjectId, validate
 *    - Controller: upvoteQuestion
 *
 * 8. GET /:id/upvotes
 *    - Public
 *    - Middleware: validateObjectId, validate
 *    - Controller: getQuestionUpvotes
 *
 * EXAMPLES:
 * router.get('/search', searchQuestions);
 * router.route('/')
 *   .get(getAllQuestions)
 *   .post(protect, validateCreateQuestion, validate, createQuestion);
 * router.route('/:id')
 *   .get(validateObjectId, validate, getQuestionById)
 *   .put(protect, validateObjectId, validateUpdateQuestion, validate, updateQuestion)
 *   .delete(protect, validateObjectId, validate, deleteQuestion);
 * router.post('/:id/upvote', protect, validateObjectId, validate, upvoteQuestion);
 */

// Placeholder route - Remove after implementation
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Question routes not implemented yet',
  });
});

// TODO: Add actual question routes here

export default router;
