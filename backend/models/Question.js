/**
 * QUESTION MODEL - Defines the schema for interview questions
 *
 * HACKTOBERFEST TODO:
 * This model represents interview questions submitted by users.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import mongoose
 * 2. Create a questionSchema with the following fields:
 *
 *    REQUIRED FIELDS:
 *    - questionText (String, required, trim, minlength: 10)
 *    - company (String, required, trim)
 *    - topic (String, required, trim) - e.g., "Arrays", "System Design"
 *    - role (String, required, trim) - e.g., "SDE", "Analyst"
 *    - difficulty (String, required, enum: ['Easy', 'Medium', 'Hard'])
 *
 *    OPTIONAL FIELDS:
 *    - submittedBy (ObjectId, ref: 'User') - Reference to User model
 *    - upvotes (Number, default: 0, min: 0)
 *    - upvotedBy (Array of ObjectIds, ref: 'User', default: [])
 *
 * 3. Enable timestamps (createdAt, updatedAt) in schema options
 *
 * 4. Add indexes for better query performance:
 *    - Index on 'company' field
 *    - Index on 'topic' field
 *    - Index on 'role' field
 *    - Index on 'difficulty' field
 *    - Compound index on ['company', 'topic']
 *
 * 5. Add instance method 'addUpvote' to handle upvoting:
 *    - Accept userId as parameter
 *    - Check if user already upvoted (userId in upvotedBy array)
 *    - If not upvoted: add userId to upvotedBy, increment upvotes
 *    - If already upvoted: remove userId from upvotedBy, decrement upvotes (toggle)
 *    - Save and return the updated question
 *
 * 6. Create and export the Question model
 *
 * VALIDATION RULES:
 * - questionText: minimum 10 characters
 * - difficulty: must be 'Easy', 'Medium', or 'Hard'
 * - upvotes: cannot be negative
 */

import mongoose from 'mongoose';

/**
 * TODO: DEFINE QUESTION SCHEMA
 *
 * Required Fields with Validation:
 * - questionText: String (required, trim, minlength: 10)
 * - company: String (required, trim) - e.g., "Google", "Amazon"
 * - topic: String (required, trim) - e.g., "Arrays", "Graphs"
 * - role: String (required, trim) - e.g., "SDE", "Data Analyst"
 * - difficulty: String (required, enum: ['Easy', 'Medium', 'Hard'])
 *
 * Optional Fields:
 * - submittedBy: ObjectId (ref: 'User')
 * - upvotes: Number (default: 0, min: 0)
 * - upvotedBy: [ObjectId] (ref: 'User', default: [])
 *
 * Schema Options:
 * - timestamps: true
 *
 * EXAMPLE:
 * const questionSchema = new mongoose.Schema({
 *   fieldName: {
 *     type: String,
 *     required: [true, 'Error message'],
 *     trim: true
 *   }
 * }, { timestamps: true });
 */

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      // TODO: Add required, trim, and minlength validations
    },
    company: {
      type: String,
      // TODO: Add required and trim properties
    },
    topic: {
      type: String,
      // TODO: Add required and trim properties
    },
    role: {
      type: String,
      // TODO: Add required and trim properties
    },
    difficulty: {
      type: String,
      // TODO: Add required, enum: ['Easy', 'Medium', 'Hard']
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // This is optional - questions can be anonymous
    },
    upvotes: {
      type: Number,
      default: 0,
      // TODO: Add min: 0 validation
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
 * Add indexes on frequently queried fields:
 * - questionSchema.index({ company: 1 });
 * - questionSchema.index({ topic: 1 });
 * - questionSchema.index({ role: 1 });
 * - questionSchema.index({ difficulty: 1 });
 * - questionSchema.index({ company: 1, topic: 1 }); // Compound index
 * - questionSchema.index({ createdAt: -1 }); // For sorting by date
 *
 * Indexes improve query performance when filtering/sorting
 */

/**
 * TODO: ADD INSTANCE METHOD - addUpvote
 *
 * This method handles upvoting/un-upvoting a question
 *
 * Parameters: userId (String or ObjectId)
 * Returns: Updated question document
 *
 * Logic:
 * 1. Convert userId to string for comparison
 * 2. Check if userId exists in upvotedBy array
 * 3. If exists (already upvoted):
 *    - Remove userId from upvotedBy array
 *    - Decrement upvotes by 1
 * 4. If not exists (new upvote):
 *    - Add userId to upvotedBy array
 *    - Increment upvotes by 1
 * 5. Save the document
 * 6. Return the updated document
 *
 * EXAMPLE:
 * questionSchema.methods.addUpvote = async function(userId) {
 *   const userIdStr = userId.toString();
 *   const hasUpvoted = this.upvotedBy.some(id => id.toString() === userIdStr);
 *
 *   if (hasUpvoted) {
 *     // Remove upvote (toggle off)
 *     this.upvotedBy = this.upvotedBy.filter(id => id.toString() !== userIdStr);
 *     this.upvotes -= 1;
 *   } else {
 *     // Add upvote
 *     this.upvotedBy.push(userId);
 *     this.upvotes += 1;
 *   }
 *
 *   await this.save();
 *   return this;
 * };
 */

/**
 * TODO: CREATE AND EXPORT MODEL
 *
 * Create the Question model and export it
 *
 * EXAMPLE:
 * const Question = mongoose.model('Question', questionSchema);
 * export default Question;
 */

// Placeholder export - Replace with actual model
const Question = mongoose.model('Question', questionSchema);
export default Question;
