/**
 * DATABASE.JS - MongoDB Connection Configuration
 *
 * HACKTOBERFEST TODO:
 * This file handles the connection to MongoDB using Mongoose.
 *
 * CONTRIBUTOR TASKS:
 * 1. Import mongoose
 * 2. Create an async function called 'connectDB'
 * 3. Inside the function, use mongoose.connect() with the MONGODB_URI from env
 * 4. Add try-catch block for error handling
 * 5. Log success message with connection host on success
 * 6. Log error message and exit process on failure
 * 7. Export the connectDB function
 *
 * MONGOOSE CONNECTION OPTIONS:
 * You may want to pass options object to mongoose.connect():
 * {
 *   useNewUrlParser: true,
 *   useUnifiedTopology: true
 * }
 *
 * ERROR HANDLING:
 * On error, log the error and call process.exit(1) to stop the server
 */

import mongoose from 'mongoose';

/**
 * TODO: CREATE connectDB FUNCTION
 *
 * This function should:
 * 1. Use try-catch for error handling
 * 2. Await mongoose.connect(process.env.MONGODB_URI)
 * 3. Store the connection in a variable (e.g., const conn = await mongoose.connect...)
 * 4. On success, log: `✅ MongoDB Connected: ${conn.connection.host}`
 * 5. On error, log: `❌ Error: ${error.message}` and call process.exit(1)
 *
 * EXAMPLE STRUCTURE:
 * const connectDB = async () => {
 *   try {
 *     // Connect to MongoDB
 *     // Log success with connection host
 *   } catch (error) {
 *     // Log error
 *     // Exit process
 *   }
 * };
 */

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log successful connection
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error message and exit process
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
