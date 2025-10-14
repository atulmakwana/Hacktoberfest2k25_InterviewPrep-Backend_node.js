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
      // TODO: Add required, trim, and minlength validations
    },
    company: {
      type: String,
      // TODO: Add required and trim
    },
    topic: {
      type: String,
      // TODO: Add required and trim
    },
    role: {
      type: String,
      // TODO: Add required and trim
    },
    difficulty: {
      type: String,
      // TODO: Add required and enum ['Easy', 'Medium', 'Hard']
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional: questions can be anonymous
    },
    upvotes: {
      type: Number,
      default: 0,
      // TODO: Add min 0 validation
    },
    upvotedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    // TODO: Enable timestamps
  }
);

/**
 * TODO: ADD INDEXES FOR QUERY OPTIMIZATION
 *
 * Add indexes on frequently queried fields to improve performance
 * Example: company, topic, role, difficulty, compound indexes
 */
// questionSchema.index({ /* TODO */ });

/**
 * TODO: ADD INSTANCE METHOD - addUpvote
 *
 * This method should toggle upvote by a given userId
 * Steps:
 * 1. Check if user already upvoted
 * 2. If yes: remove upvote
 * 3. If no: add upvote
 * 4. Save and return updated question
 */
// questionSchema.methods.addUpvote = async function(userId) {
//   // TODO: Implement upvote toggle logic
// };

/**
 * TODO: CREATE AND EXPORT QUESTION MODEL
 */
const Question = mongoose.model('Question', questionSchema);
export default Question;
