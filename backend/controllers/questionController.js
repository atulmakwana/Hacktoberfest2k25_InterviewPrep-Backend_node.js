/**
 * QUESTION CONTROLLER - Handles all question-related operations
 *
 * HACKTOBERFEST TODO:
 * This controller manages CRUD operations for interview questions.
 *
 * CONTRIBUTOR TASKS:
 * Implement the following controller functions:
 *
 * 1. createQuestion - POST /api/questions
 * 2. getAllQuestions - GET /api/questions (with filtering, sorting, pagination)
 * 3. getQuestionById - GET /api/questions/:id
 * 4. updateQuestion - PUT /api/questions/:id
 * 5. deleteQuestion - DELETE /api/questions/:id
 * 6. upvoteQuestion - POST /api/questions/:id/upvote
 * 7. getQuestionUpvotes - GET /api/questions/:id/upvotes
 * 8. searchQuestions - GET /api/questions/search
 * 9. getCategories - GET /api/categories
 *
 * FILTERING & SORTING:
 * - Filter by: company, topic, role, difficulty, date range
 * - Sort by: latest, oldest, upvotes
 * - Pagination: page, limit query params
 *
 * TIMESTAMPS:
 * - All questions include createdAt and updatedAt
 * - Return timestamps in ISO format
 */

import Question from '../models/Question.js';

/**
 * TODO: IMPLEMENT CREATE QUESTION
 *
 * @route   POST /api/questions
 * @desc    Create a new interview question
 * @access  Private (authenticated users only)
 *
 * Steps:
 * 1. Extract questionText, company, topic, role, difficulty from req.body
 * 2. Add submittedBy field from req.user.id (optional - for anonymous support)
 * 3. Create question using Question.create()
 * 4. Return 201 response with created question
 * 5. Handle errors (validation, duplicate, etc.)
 *
 * REQUEST BODY:
 * {
 *   questionText: "Explain event loop in Node.js",
 *   company: "Amazon",
 *   topic: "JavaScript",
 *   role: "SDE",
 *   difficulty: "Medium"
 * }
 *
 * RESPONSE:
 * {
 *   success: true,
 *   message: "Question created successfully",
 *   data: { question object with id, timestamps, etc. }
 * }
 */

export const createQuestion = async (req, res, next) => {
  try {
    // TODO: Implement create question logic

    const { questionText, company, topic, role, difficulty } = req.body;

    // Create question with submittedBy field (optional for anonymous)
    // const question = await Question.create({
    //   questionText,
    //   company,
    //   topic,
    //   role,
    //   difficulty,
    //   submittedBy: req.user ? req.user.id : null
    // });

    res.status(501).json({
      success: false,
      message: 'Create question endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT GET ALL QUESTIONS
 *
 * @route   GET /api/questions
 * @desc    Get all questions with filtering, sorting, and pagination
 * @access  Public
 *
 * QUERY PARAMETERS:
 * - company: Filter by company name
 * - topic: Filter by topic
 * - role: Filter by job role
 * - difficulty: Filter by difficulty (Easy/Medium/Hard)
 * - sort: Sort by 'latest', 'oldest', or 'upvotes'
 * - fromDate: Filter questions from this date
 * - toDate: Filter questions until this date
 * - page: Page number (default: 1)
 * - limit: Results per page (default: 10)
 *
 * Steps:
 * 1. Build filter object based on query params
 * 2. Build sort object based on sort param
 * 3. Calculate skip value for pagination: (page - 1) * limit
 * 4. Query database with filters, sort, skip, and limit
 * 5. Get total count for pagination info
 * 6. Return questions with pagination metadata
 *
 * EXAMPLE QUERY:
 * GET /api/questions?company=Amazon&topic=Arrays&sort=latest&page=1&limit=10
 *
 * RESPONSE:
 * {
 *   success: true,
 *   count: 45,
 *   page: 1,
 *   pages: 5,
 *   data: [array of questions]
 * }
 */

export const getAllQuestions = async (req, res, next) => {
  try {
    // TODO: Implement get all questions with filters

    // Extract query parameters
    const { company, topic, role, difficulty, sort, fromDate, toDate, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    // if (company) filter.company = company;
    // if (topic) filter.topic = topic;
    // if (role) filter.role = role;
    // if (difficulty) filter.difficulty = difficulty;

    // Date range filtering
    // if (fromDate || toDate) {
    //   filter.createdAt = {};
    //   if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    //   if (toDate) filter.createdAt.$lte = new Date(toDate);
    // }

    // Build sort object
    // let sortOption = {};
    // if (sort === 'latest') sortOption = { createdAt: -1 };
    // else if (sort === 'oldest') sortOption = { createdAt: 1 };
    // else if (sort === 'upvotes') sortOption = { upvotes: -1 };
    // else sortOption = { createdAt: -1 }; // default

    // Pagination
    // const skip = (page - 1) * limit;

    // Execute query
    // const questions = await Question.find(filter)
    //   .sort(sortOption)
    //   .skip(skip)
    //   .limit(parseInt(limit))
    //   .populate('submittedBy', 'name');

    // Get total count
    // const total = await Question.countDocuments(filter);

    res.status(501).json({
      success: false,
      message: 'Get questions endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT GET QUESTION BY ID
 *
 * @route   GET /api/questions/:id
 * @desc    Get a single question by ID
 * @access  Public
 *
 * Steps:
 * 1. Extract id from req.params
 * 2. Find question using Question.findById()
 * 3. Optionally populate submittedBy field
 * 4. If not found, return 404 error
 * 5. Return question data
 */

export const getQuestionById = async (req, res, next) => {
  try {
    // TODO: Implement get question by ID

    const { id } = req.params;

    // const question = await Question.findById(id).populate('submittedBy', 'name email');

    // if (!question) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Question not found'
    //   });
    // }

    res.status(501).json({
      success: false,
      message: 'Get question by ID endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT UPDATE QUESTION
 *
 * @route   PUT /api/questions/:id
 * @desc    Update a question (admin or question owner only)
 * @access  Private
 *
 * AUTHORIZATION:
 * - Only admin or the user who submitted can update
 * - Check: req.user.role === 'admin' || question.submittedBy === req.user.id
 *
 * Steps:
 * 1. Find question by ID
 * 2. Check authorization
 * 3. Update allowed fields (questionText, topic, difficulty)
 * 4. Save updated question
 * 5. Return updated question
 *
 * ALLOWED UPDATES: questionText, topic, difficulty
 * NOT ALLOWED: company, role, upvotes, submittedBy
 */

export const updateQuestion = async (req, res, next) => {
  try {
    // TODO: Implement update question

    const { id } = req.params;
    const { questionText, topic, difficulty } = req.body;

    // Find question
    // const question = await Question.findById(id);

    // Check if exists
    // if (!question) return 404

    // Check authorization
    // if (req.user.role !== 'admin' && question.submittedBy.toString() !== req.user.id) {
    //   return 403 error
    // }

    // Update fields
    // if (questionText) question.questionText = questionText;
    // if (topic) question.topic = topic;
    // if (difficulty) question.difficulty = difficulty;

    // Save
    // const updatedQuestion = await question.save();

    res.status(501).json({
      success: false,
      message: 'Update question endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT DELETE QUESTION
 *
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question (admin or owner only)
 * @access  Private
 *
 * AUTHORIZATION:
 * - Only admin or the user who submitted can delete
 *
 * Steps:
 * 1. Find question by ID
 * 2. Check if exists
 * 3. Check authorization
 * 4. Delete using question.deleteOne() or Question.findByIdAndDelete()
 * 5. Return success message
 */

export const deleteQuestion = async (req, res, next) => {
  try {
    // TODO: Implement delete question

    const { id } = req.params;

    // Find and check authorization
    // const question = await Question.findById(id);

    // Delete
    // await question.deleteOne();
    // OR
    // await Question.findByIdAndDelete(id);

    res.status(501).json({
      success: false,
      message: 'Delete question endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT UPVOTE QUESTION
 *
 * @route   POST /api/questions/:id/upvote
 * @desc    Upvote or remove upvote from a question (toggle)
 * @access  Private (authenticated users only)
 *
 * Steps:
 * 1. Find question by ID
 * 2. Check if user already upvoted (check upvotedBy array)
 * 3. If upvoted: remove upvote (toggle off)
 * 4. If not upvoted: add upvote (toggle on)
 * 5. Update upvotes count
 * 6. Save question
 * 7. Return new upvote count
 *
 * HINT: Use the addUpvote instance method from Question model
 *
 * RESPONSE:
 * {
 *   success: true,
 *   message: "Question upvoted" or "Upvote removed",
 *   upvotes: 42
 * }
 */

export const upvoteQuestion = async (req, res, next) => {
  try {
    // TODO: Implement upvote toggle

    const { id } = req.params;
    const userId = req.user.id;

    // Find question
    // const question = await Question.findById(id);

    // Use the addUpvote method from model
    // await question.addUpvote(userId);

    res.status(501).json({
      success: false,
      message: 'Upvote endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT GET QUESTION UPVOTES
 *
 * @route   GET /api/questions/:id/upvotes
 * @desc    Get total upvotes for a question
 * @access  Public
 *
 * Steps:
 * 1. Find question by ID
 * 2. Return upvotes count
 *
 * RESPONSE:
 * {
 *   success: true,
 *   upvotes: 42
 * }
 */

export const getQuestionUpvotes = async (req, res, next) => {
  try {
    // TODO: Implement get upvotes

    const { id } = req.params;

    // const question = await Question.findById(id);
    // if (!question) return 404

    res.status(501).json({
      success: false,
      message: 'Get upvotes endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT SEARCH QUESTIONS
 *
 * @route   GET /api/questions/search?q=keyword
 * @desc    Search questions by keyword in questionText, company, or topic
 * @access  Public
 *
 * Steps:
 * 1. Extract 'q' query parameter (search keyword)
 * 2. Build regex search query for questionText, company, and topic
 * 3. Use $or operator to search across multiple fields
 * 4. Return matching questions
 *
 * EXAMPLE:
 * const searchRegex = new RegExp(keyword, 'i'); // case-insensitive
 * const questions = await Question.find({
 *   $or: [
 *     { questionText: searchRegex },
 *     { company: searchRegex },
 *     { topic: searchRegex }
 *   ]
 * });
 */

export const searchQuestions = async (req, res, next) => {
  try {
    // TODO: Implement search functionality

    const { q } = req.query;

    // if (!q) return 400 error

    // Build regex search
    // const searchRegex = new RegExp(q, 'i');

    // Search across multiple fields
    // const questions = await Question.find({
    //   $or: [
    //     { questionText: searchRegex },
    //     { company: searchRegex },
    //     { topic: searchRegex }
    //   ]
    // }).sort({ createdAt: -1 });

    res.status(501).json({
      success: false,
      message: 'Search endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: IMPLEMENT GET CATEGORIES
 *
 * @route   GET /api/categories
 * @desc    Get list of all unique topics and companies
 * @access  Public
 *
 * Steps:
 * 1. Use Question.distinct() to get unique values
 * 2. Get distinct topics: Question.distinct('topic')
 * 3. Get distinct companies: Question.distinct('company')
 * 4. Get distinct roles: Question.distinct('role')
 * 5. Return all three arrays
 *
 * RESPONSE:
 * {
 *   success: true,
 *   topics: ['Arrays', 'Graphs', 'System Design', ...],
 *   companies: ['Google', 'Amazon', 'Microsoft', ...],
 *   roles: ['SDE', 'Analyst', 'Frontend', ...]
 * }
 */

export const getCategories = async (req, res, next) => {
  try {
    // TODO: Implement get categories

    // Get distinct values
    // const topics = await Question.distinct('topic');
    // const companies = await Question.distinct('company');
    // const roles = await Question.distinct('role');

    res.status(501).json({
      success: false,
      message: 'Get categories endpoint not implemented yet',
    });
  } catch (error) {
    next(error);
  }
};
