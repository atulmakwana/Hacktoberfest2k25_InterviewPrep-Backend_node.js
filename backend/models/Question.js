/**
 * QUESTION MODEL - Defines the schema for interview questions
 *
 * HACKTOBERFEST TODO:
 * This model represents interview questions submitted by users.
 *
 * CONTRIBUTOR TASKS:
 * 1. Define required fields: questionText, company, topic, role, difficulty
 * 2. Define optional fields: submittedBy, upvotes, upvotedBy
 * 3. Enable timestamps
 * 4. Add indexes for optimization
 * 5. Implement instance method 'addUpvote' to handle upvoting
 * 6. Export the Question model
 */

import mongoose from 'mongoose';

/**
 * TODO: DEFINE QUESTION SCHEMA
 *
 * Required Fields:
 * - questionText: String, required, trim, minlength 10
 * - company: String, required, trim
 * - topic: String, required, trim
 * - role: String, required, trim
 * - difficulty: String, required, enum ['Easy', 'Medium', 'Hard']
 *
 * Optional Fields:
 * - submittedBy: ObjectId, ref 'User'
 * - upvotes: Number, default 0, min 0
 * - upvotedBy: [ObjectId], ref 'User', default []
 *
 * Schema Options:
 * - timestamps: true
 */
const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    topic: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard']
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional: questions can be anonymous
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0
    },
    upvotedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true
  }
);

/**
 * Database Indexes for Query Optimization
 */

// Single-field indexes for filtering
questionSchema.index({ company: 1 });
questionSchema.index({ topic: 1 });
questionSchema.index({ difficulty: 1 });

// Text index for search functionality
questionSchema.index({ questionText: 'text' });

// Compound index for common filter combinations
questionSchema.index({ company: 1, topic: 1, role: 1 });

/**
 * Instance Method: addUpvote
 * Toggle upvote functionality for a question by userId
 */
questionSchema.methods.addUpvote = async function(userId) {
  // Check if user already upvoted this question
  const userIndex = this.upvotedBy.indexOf(userId);
  
  if (userIndex > -1) {
    // User already upvoted - remove upvote
    this.upvotedBy.splice(userIndex, 1);
    this.upvotes -= 1;
  } else {
    // User hasn't upvoted - add upvote
    this.upvotedBy.push(userId);
    this.upvotes += 1;
  }
  
  // Save the updated document
  const updatedQuestion = await this.save();
  return updatedQuestion;
};

/**
 * TODO: CREATE AND EXPORT QUESTION MODEL
 */
const Question = mongoose.model('Question', questionSchema);
export default Question;
