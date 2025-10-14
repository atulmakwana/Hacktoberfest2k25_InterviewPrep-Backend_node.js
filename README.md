# InterviewPrep Backend API

A RESTful API for the InterviewPrep platform - a community-sourced interview question bank where students can anonymously submit and browse interview questions from real company interviews.

> **Note:** This is the backend repository. The frontend React application is maintained in a separate repository.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)

## Project Overview

InterviewPrep Backend is a Node.js + Express API that provides endpoints for user authentication, question management, searching, filtering, and upvoting. This is a **Hacktoberfest 2025 project** with detailed TODO comments throughout the codebase for contributors to implement features.

### What This API Does

- User registration and authentication with JWT
- CRUD operations for interview questions
- Search and advanced filtering (company, topic, role, difficulty)
- Upvote system for questions
- Role-based access control (user/admin)
- Input validation and error handling
- Rate limiting for security

### How It Connects to Frontend

The frontend React application (separate repository) consumes this API:
- Frontend makes HTTP requests to these endpoints
- API responds with JSON data
- JWT tokens are used for authentication
- CORS is configured to allow frontend access

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## Features

### Implemented
- Project structure and boilerplate
- Route definitions with TODO comments
- Validation middleware chains
- Error handling setup
- Rate limiting configuration
- Model schemas with method placeholders

### To Be Implemented (Contributors)
- Database connection logic
- User authentication (register, login)
- Password hashing and JWT generation
- Question CRUD operations
- Search and filtering logic
- Upvote system
- Authorization middleware
- Category endpoints

## Project Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection [TODO]
│
├── controllers/
│   ├── authController.js        # Auth logic [TODO]
│   └── questionController.js    # Question CRUD [TODO]
│
├── middleware/
│   ├── authMiddleware.js        # JWT auth [TODO]
│   ├── errorMiddleware.js       # Error handling [TODO]
│   └── validationMiddleware.js  # Validation chains [PARTIAL]
│
├── models/
│   ├── User.js                  # User schema [TODO]
│   └── Question.js              # Question schema [TODO]
│
├── routes/
│   ├── authRoutes.js           # Auth endpoints [TODO]
│   ├── questionRoutes.js       # Question endpoints [TODO]
│   └── categoryRoutes.js       # Category endpoints [TODO]
│
├── utils/
│   └── rateLimiter.js          # Rate limiting [COMPLETE]
│
├── .env.example                # Environment template
├── .eslintrc.json             # ESLint config
├── .prettierrc.json           # Prettier config
├── package.json               # Dependencies
└── server.js                  # Entry point [TODO]
```

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone <backend-repo-url>
cd interviewprep-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/interviewprep
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

4. **Start MongoDB**

For local MongoDB:
```bash
mongod
```

For MongoDB Atlas, use the connection string in `.env`.

5. **Start the development server**
```bash
npm run dev
```

The API will be available at: **http://localhost:5000**

## Environment Setup

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/interviewprep
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewprep

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

**Important:**
- Use a strong `JWT_SECRET` in production
- Never commit `.env` file to Git
- Update `FRONTEND_URL` to match your frontend URL

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb

# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Whitelist your IP address
5. Add connection string to `.env`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```
POST /api/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get User Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```
**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Question Routes (`/api/questions`)

#### Get All Questions
```
GET /api/questions
```
**Query Parameters:**
- `company` - Filter by company
- `topic` - Filter by topic
- `role` - Filter by role
- `difficulty` - Filter by difficulty (Easy/Medium/Hard)
- `sort` - Sort by (latest/oldest/upvotes)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `fromDate` - Filter from date
- `toDate` - Filter to date

**Response:**
```json
{
  "success": true,
  "count": 50,
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalQuestions": 50
  },
  "questions": [
    {
      "id": "question_id",
      "questionText": "Explain closures in JavaScript",
      "company": "Google",
      "topic": "JavaScript",
      "role": "Frontend Developer",
      "difficulty": "Medium",
      "upvoteCount": 15,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Question
```
GET /api/questions/:id
```

#### Create Question
```
POST /api/questions
Authorization: Bearer <token>
```
**Body:**
```json
{
  "questionText": "Explain closures in JavaScript",
  "company": "Google",
  "topic": "JavaScript",
  "role": "Frontend Developer",
  "difficulty": "Medium"
}
```

#### Update Question
```
PUT /api/questions/:id
Authorization: Bearer <token>
```
Only owner or admin can update.

#### Delete Question
```
DELETE /api/questions/:id
Authorization: Bearer <token>
```
Only owner or admin can delete.

#### Toggle Upvote
```
POST /api/questions/:id/upvote
Authorization: Bearer <token>
```

#### Get Upvote Count
```
GET /api/questions/:id/upvotes
```

#### Search Questions
```
GET /api/questions/search?q=keyword
```

### Category Routes (`/api/categories`)

#### Get All Categories
```
GET /api/categories
```
Returns unique topics, companies, and roles.

**Response:**
```json
{
  "success": true,
  "categories": {
    "topics": ["JavaScript", "React", "Node.js"],
    "companies": ["Google", "Microsoft", "Amazon"],
    "roles": ["Frontend Developer", "Backend Developer", "SDE"]
  }
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How It Works

1. User registers or logs in
2. Server generates JWT token
3. Client stores token (localStorage/sessionStorage)
4. Client sends token in Authorization header for protected routes
5. Server verifies token and grants/denies access

### Protected Routes

Protected routes require the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### Token Expiration

Tokens expire based on `JWT_EXPIRE` environment variable. Users need to login again after expiration.

## Data Models

### User Model

```javascript
{
  name: String,        // User's full name
  email: String,       // Unique email
  password: String,    // Hashed password
  role: String,        // 'user' or 'admin'
  createdAt: Date,     // Registration date
  updatedAt: Date      // Last update
}
```

**Methods:**
- `comparePassword(plainPassword)` - Verify password
- `generateAuthToken()` - Generate JWT token

### Question Model

```javascript
{
  questionText: String,     // The interview question
  company: String,          // Company name
  topic: String,            // Technical topic
  role: String,             // Job role
  difficulty: String,       // Easy/Medium/Hard
  upvotedBy: [ObjectId],   // Array of user IDs who upvoted
  upvoteCount: Number,     // Total upvotes
  submittedBy: ObjectId,   // User who submitted (optional/anonymous)
  createdAt: Date,         // Submission date
  updatedAt: Date          // Last update
}
```

**Methods:**
- `addUpvote(userId)` - Toggle upvote for user

## Middleware

### Authentication Middleware (`authMiddleware.js`)

- `protect` - Verifies JWT token and attaches user to request
- `authorize(...roles)` - Restricts access to specific roles

Usage:
```javascript
router.get('/admin', protect, authorize('admin'), controller);
```

### Validation Middleware (`validationMiddleware.js`)

Provides validation chains for:
- User registration
- User login
- Question creation
- Question updates

### Error Middleware (`errorMiddleware.js`)

- `notFound` - Handles 404 errors
- `errorHandler` - Centralized error handling with proper status codes

## Development

### Available Scripts

```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting

Configuration files:
- `.eslintrc.json`
- `.prettierrc.json`

### Adding New Routes

1. Create controller in `controllers/`
2. Create route file in `routes/`
3. Import and use in `server.js`

Example:
```javascript
// routes/newRoute.js
import express from 'express';
import { myController } from '../controllers/myController.js';

const router = express.Router();
router.get('/', myController);

export default router;

// server.js
import newRoutes from './routes/newRoute.js';
app.use('/api/new', newRoutes);
```

## Testing

### Manual Testing with curl

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Questions:**
```bash
curl http://localhost:5000/api/questions
```

**Create Question (with token):**
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "questionText": "Explain promises in JavaScript",
    "company": "Microsoft",
    "topic": "JavaScript",
    "role": "SDE",
    "difficulty": "Medium"
  }'
```

### Testing Tools

Recommended tools:
- **Postman** - Full-featured API testing
- **Thunder Client** - VS Code extension
- **Insomnia** - REST client
- **curl** - Command-line tool

## Security Best Practices

- Passwords are hashed with bcrypt (10 salt rounds)
- JWT tokens are signed with secret key
- Input validation on all routes
- Rate limiting on sensitive endpoints
- CORS configured for specific origin
- Error messages don't leak sensitive information
- MongoDB injection protection via Mongoose

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Rate limits are configured in `utils/rateLimiter.js`:
- Auth routes: 5 requests per 15 minutes per IP
- General routes: 100 requests per 15 minutes per IP

## Contributing

This is a **Hacktoberfest 2024** project! We welcome contributions from developers of all skill levels.

### How to Contribute

1. **Find an Issue**
   - Browse open issues
   - Look for `hacktoberfest`, `good-first-issue`, or `help-wanted` labels
   - Comment to get assigned

2. **Fork and Clone**
```bash
git clone https://github.com/your-username/interviewprep-backend.git
cd interviewprep-backend
```

3. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Follow TODO Comments**
   - Every file has detailed TODO comments
   - Read the instructions carefully
   - Follow existing code patterns

5. **Test Your Changes**
   - Test endpoints with Postman/curl
   - Verify error handling
   - Check console for errors

6. **Commit and Push**
```bash
git add .
git commit -m "feat: implement user authentication"
git push origin feature/your-feature-name
```

**Commit Message Convention:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Tests

7. **Create Pull Request**
   - Link related issue
   - Describe changes
   - Wait for review

### Contribution Levels

**🟢 Easy (Beginner-Friendly)**
- Complete database connection
- Implement validation rules
- Add error messages
- Write documentation

**🟡 Medium**
- Implement authentication controllers
- Build question CRUD operations
- Add search functionality
- Implement filtering logic

**🔴 Hard**
- Advanced search with full-text
- Caching with Redis
- Real-time features
- Analytics endpoints

## Development Guidelines

### Code Style

- Use ES6+ features
- Use `const`/`let`, avoid `var`
- Meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

### File Organization

- One controller per resource
- Group related routes together
- Keep middleware reusable
- Separate business logic from routes

### Error Handling

Always use try-catch in async functions:

```javascript
export const myController = async (req, res, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};
```

### Security Best Practices

- Never commit `.env` or secrets
- Hash passwords with bcrypt
- Validate all user inputs
- Use rate limiting
- Set proper CORS configuration
- Sanitize database queries

### Available Scripts

```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

### Testing Checklist

- [ ] User registration works
- [ ] User login returns token
- [ ] Protected routes require token
- [ ] Invalid token returns 401
- [ ] Questions can be created
- [ ] Questions can be filtered
- [ ] Search returns relevant results
- [ ] Upvote toggles correctly
- [ ] Error handling works
- [ ] Rate limiting prevents abuse

## Common Issues

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running (`mongod`)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process
lsof -i :5000
# Kill it
kill -9 <PID>
```

### JWT Token Invalid
**Solution:**
- Check `JWT_SECRET` in `.env`
- Ensure token format: `Bearer <token>`
- Verify token hasn't expired

## Related Repositories

- **Frontend Repository:** [Frontend Repo](https://github.com/MSTC-DA-IICT/Hacktoberfest2k25_React.js)
- **Documentation for Endpoints[API Routes]:** [Docs](https://docs.google.com/document/d/14AyAqyu26qKM8LX28oWZee304NahW7DJWeGDLIGZw3Y/edit?usp=sharing)

## Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT.io](https://jwt.io)


## Support

For questions or issues:
1. Check existing issues
2. Read TODO comments in code
3. Create new issue with details
4. Join community discussions

---

## 🌐 *Connect with MSTC DAU*
- [LinkedIn](https://www.linkedin.com/company/microsoft-student-technical-club-da-iict/)
- [Instagram](https://www.instagram.com/mstc_daiict/)
- 📧 Email: *microsoftclub@dau.ac.in*

---

💡 Happy Coding & Keep Contributing! 💙  
*#Hacktoberfest2025 #OpenSource #InterviewPrep*
