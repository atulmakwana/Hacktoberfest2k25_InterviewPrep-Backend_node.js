/**
 * USER MODEL - Defines the schema for users in the database
 *
 * HACKTOBERFEST TODO:
 * This model represents registered users who can submit and upvote questions.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import mongoose
 * 2. Create a userSchema with the following fields:
 *    - name (String, required, trim)
 *    - email (String, required, unique, lowercase, trim)
 *    - password (String, required, minlength: 6)
 *    - role (String, enum: ['user', 'admin'], default: 'user')
 *    - createdAt (Date, default: Date.now)
 *
 * 3. Enable timestamps (createdAt, updatedAt) in schema options
 *
 * 4. Add pre-save middleware to hash password before saving:
 *    - Use bcryptjs to hash the password
 *    - Only hash if password is modified
 *    - Use salt rounds = 10
 *
 * 5. Add instance method 'comparePassword' to verify passwords:
 *    - Accept plain password as parameter
 *    - Return bcrypt.compare(password, this.password)
 *
 * 6. Add instance method 'generateAuthToken' to create JWT:
 *    - Use jwt.sign() with payload: { id: this._id, role: this.role }
 *    - Use JWT_SECRET from environment variables
 *    - Set expiration from JWT_EXPIRE env variable
 *
 * 7. Create and export the User model
 *
 * IMPORTS NEEDED:
 * - mongoose
 * - bcryptjs
 * - jsonwebtoken
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);




userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }

})


userSchema.methods.comparePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};


/**
 * TODO: ADD INSTANCE METHOD - generateAuthToken
 *
 * This method generates a JWT token for authentication
 *
 * Returns: String (JWT token)
 *
 * Payload should include:
 * - id: this._id
 * - role: this.role
 *
 * Use:
 * - jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
 *
 * EXAMPLE:
 * userSchema.methods.generateAuthToken = function() {
 *   return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
 *     expiresIn: process.env.JWT_EXPIRE
 *   });
 * };
 */

userSchema.methods.generateAuthToken = function() {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

/**
 * TODO: CREATE AND EXPORT MODEL
 *
 * Create the model using mongoose.model()
 * Export it as default
 *
 * EXAMPLE:
 * const User = mongoose.model('User', userSchema);
 * export default User;
 */

// Placeholder export - Replace with actual model
const User = mongoose.model('User', userSchema);
export default User;
