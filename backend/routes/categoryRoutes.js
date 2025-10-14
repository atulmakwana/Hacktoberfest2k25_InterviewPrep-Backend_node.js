/**
 * CATEGORY ROUTES - Routes for categories/filters
 *
 * HACKTOBERFEST TODO:
 * This file defines routes for getting unique categories.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import express Router
 * 2. Import getCategories controller
 * 3. Define route for getting categories
 *
 * ROUTES TO IMPLEMENT:
 *
 * GET /api/categories
 *    - Public route
 *    - Returns unique topics, companies, and roles
 *    - Used for populating filter dropdowns in frontend
 */

import express from 'express';

// TODO: Import controller
// import { getCategories } from '../controllers/questionController.js';

const router = express.Router();

/**
 * TODO: DEFINE CATEGORY ROUTES
 *
 * GET /
 *    - Public
 *    - Controller: getCategories
 *    - Returns: { success, topics: [], companies: [], roles: [] }
 *
 * EXAMPLE:
 * router.get('/', getCategories);
 */

// Placeholder route - Remove after implementation
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Category routes not implemented yet',
    topics: [],
    companies: [],
    roles: [],
  });
});

export default router;
