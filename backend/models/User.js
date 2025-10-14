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
// TODO: Import bcryptjs
// TODO: Import jsonwebtoken

/**
 * TODO: DEFINE USER SCHEMA
 *
 * Required Fields:
 * - name: String (required, trimmed)
 * - email: String (required, unique, lowercase, trimmed)
 * - password: String (required, min length 6)
 * - role: String (enum: ['user', 'admin'], default: 'user')
 *
 * Schema Options:
 * - timestamps: true (auto-creates createdAt and updatedAt)
 *
 * EXAMPLE:
 * const userSchema = new mongoose.Schema({
 *   fieldName: { type: String, required: true }
 * }, { timestamps: true });
 */

const userSchema = new mongoose.Schema(
  {
    // TODO: Add schema fields here
    name: {
      type: String,
      // TODO: Add required and trim properties
    },
    // TODO: Add email field with unique, lowercase, trim
    // TODO: Add password field with minlength validation
    // TODO: Add role field with enum and default value
  },
  {
    // TODO: Enable timestamps
  }
);

/**
 * TODO: PRE-SAVE MIDDLEWARE FOR PASSWORD HASHING
 *
 * This should run before saving a user document
 * Steps:
 * 1. Check if password is modified using this.isModified('password')
 * 2. If not modified, call next() and return
 * 3. Generate salt using bcrypt.genSalt(10)
 * 4. Hash password using bcrypt.hash(this.password, salt)
 * 5. Set this.password to the hashed password
 * 6. Call next()
 *
 * EXAMPLE:
 * userSchema.pre('save', async function(next) {
 *   if (!this.isModified('password')) return next();
 *   // Hash password logic
 * });
 */

/**
 * TODO: ADD INSTANCE METHOD - comparePassword
 *
 * This method compares a plain text password with the hashed password
 *
 * Parameters: plainPassword (String)
 * Returns: Boolean (true if passwords match, false otherwise)
 *
 * EXAMPLE:
 * userSchema.methods.comparePassword = async function(plainPassword) {
 *   return await bcrypt.compare(plainPassword, this.password);
 * };
 */

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
