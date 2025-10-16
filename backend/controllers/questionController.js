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
    // Extract required fields from request body
    const { questionText, company, topic, role, difficulty } = req.body;

    // Create question with submittedBy field from authenticated user
    const question = await Question.create({
      questionText,
      company,
      topic,
      role,
      difficulty,
      submittedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question
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
    // Extract query parameters
    const { company, topic, role, difficulty, sort, fromDate, toDate, page = 1, limit = 10 } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (company) filter.company = company;
    if (topic) filter.topic = topic;
    if (role) filter.role = role;
    if (difficulty) filter.difficulty = difficulty;

    // Handle date range filtering on createdAt field
    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    // Build sort object based on sort parameter
    let sortOption = {};
    if (sort === 'latest') sortOption = { createdAt: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };
    else if (sort === 'upvotes') sortOption = { upvotes: -1 };
    else sortOption = { createdAt: -1 }; // default to latest

    // Calculate pagination values
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with filtering, sorting, and pagination
    const questions = await Question.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .populate('submittedBy', 'name');

    // Get total count for pagination metadata
    const total = await Question.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    // Return response with pagination metadata
    res.status(200).json({
      success: true,
      count: total,
      page: pageNum,
      pages: totalPages,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

/*
 * @route   GET /api/questions/:id
 * @desc    Get a single question by ID
 * @access  Public
 */

export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find question and populate submittedBy
    const question = await Question.findById(id).populate('submittedBy', 'name'); 

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question fetched successfully',
      question
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
    const { id } = req.params;
    const { questionText, topic, difficulty } = req.body;

    // Find question by ID
    const question = await Question.findById(id);

    // Check if question exists
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Authorization: Check if user is admin OR question owner
    if (req.user.role !== 'admin' && question.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this question'
      });
    }

    // Update fields if they exist in request body
    if (questionText) question.questionText = questionText;
    if (topic) question.topic = topic;
    if (difficulty) question.difficulty = difficulty;

    // Save the updated question
    const updatedQuestion = await question.save();

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: updatedQuestion
    });
  } catch (error) {
    next(error);
  }
};

/*
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question (admin or owner only)
 * @access  Private
 */
export const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find question
    const question = await Question.findById(id).select('submittedBy');
    if (!question) {
      return res.status(404).json({
         success: false, 
         message: "Question not found" });
    }

    // Authorization check using req.user
    if (!(question.submittedBy.toString() === req.user.id || req.user.role === 'admin')) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden to delete the question" });
    }

    // Delete
    await question.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: "Question deleted" });
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
 */

export const upvoteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({
         success: false,
         message: "Question not found" });
    }

    // Toggle upvote using model method
    const upvotedQuestion = await question.addUpvote(userId);

    // Check if user is now in upvotedBy array
    const isUserUpvoted = upvotedQuestion.upvotedBy.some(uid => uid.toString() === userId);

    res.status(200).json({
      success: true,
      message: isUserUpvoted ? "Question upvoted" : "Upvote removed",
      upvotes: upvotedQuestion.upvotes
    });

  } catch (error) {
    next(error);
  }
};

/*
 * @route   GET /api/questions/:id/upvotes
 * @desc    Get total upvotes for a question
 * @access  Public
 */

export const getQuestionUpvotes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if(!question){
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    res.status(200).json({
      success: true,
      message: 'Upvotes fetched successfully',
      upvotes: question.upvotes 
    });
  } catch (error) {
    next(error);
  }
};

/*
 * @route   GET /api/questions/search?q=keyword
 * @desc    Search questions by keyword in questionText, company, or topic
 * @access  Public
 */

export const searchQuestions = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    // Build case-insensitive regex
    const searchRegex = new RegExp(q, 'i');

    // Search across multiple fields
    const questions = await Question.find({
      $or: [
        { questionText: searchRegex },
        { company: searchRegex },
        { topic: searchRegex }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: questions.length ? "Questions fetched successfully" : "No questions found",
      count: questions.length,
      questions
    });

  } catch (error) {
    next(error);
  }
};

/*
 * @route   GET /api/categories
 * @desc    Get list of all unique topics and companies
 * @access  Public
 */

export const getCategories = async (req, res, next) => {
  try {
    // Get distinct values from the Question collection
    const topics = await Question.distinct('topic');
    const companies = await Question.distinct('company');
    const roles = await Question.distinct('role');

    res.status(200).json({
      success: true,
      topics,
      companies,
      roles
    });
  } catch (error) {
    next(error);
  }
};
