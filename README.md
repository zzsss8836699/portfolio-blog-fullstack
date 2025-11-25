# Portfolio & Blog API - Backend

A RESTful API built with Node.js, Express, and MongoDB for managing portfolio projects and blog posts.

## 🌐 Live Deployment

**Live Backend API URL:** https://portfolio-blog-47o1zr9pi-asdosadkkoas-projects.vercel.app

**API Base:** https://portfolio-blog-47o1zr9pi-asdosadkkoas-projects.vercel.app/api

**Health Check:** https://portfolio-blog-47o1zr9pi-asdosadkkoas-projects.vercel.app/api/health

**Frontend Repository:** https://github.com/zzsss8836699/fullstack-portfolio-blog

## 📋 Assignment Information

**Assignment:** Backend API (Assignment 1)

**Submission Requirements:**
1. ✅ Live Backend API URL: https://portfolio-blog-47o1zr9pi-asdosadkkoas-projects.vercel.app
2. ✅ Source Code: https://github.com/zzsss8836699/portfolio-blog-fullstack
3. ✅ README.md: Complete API documentation (see below)

## Features

- User authentication with JWT
- CRUD operations for Projects
- CRUD operations for Blog Posts
- Comment system for blog posts
- Contact form message handling
- Secure password hashing with bcrypt
- Protected routes with authorization

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string (min 6 characters)"
  }
  ```
- **Response:** Returns JWT token and user data

#### Login User
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** Returns JWT token and user data

### Projects (Portfolio)

#### Get All Projects
- **GET** `/api/projects`
- **Access:** Public
- **Response:** Array of all projects

#### Get Single Project
- **GET** `/api/projects/:id`
- **Access:** Public
- **Response:** Single project object

#### Create Project
- **POST** `/api/projects`
- **Access:** Protected (requires JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "imageUrl": "string (optional)",
    "repoUrl": "string (optional)",
    "liveUrl": "string (optional)"
  }
  ```

#### Update Project
- **PUT** `/api/projects/:id`
- **Access:** Protected (requires JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create (all fields optional)

#### Delete Project
- **DELETE** `/api/projects/:id`
- **Access:** Protected (requires JWT)
- **Headers:** `Authorization: Bearer <token>`

### Blog Posts

#### Get All Blog Posts
- **GET** `/api/blog`
- **Access:** Public
- **Response:** Array of all blog posts with author info

#### Get Single Blog Post
- **GET** `/api/blog/:id`
- **Access:** Public
- **Response:** Single blog post with author and comments

#### Create Blog Post
- **POST** `/api/blog`
- **Access:** Protected (requires JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

#### Update Blog Post
- **PUT** `/api/blog/:id`
- **Access:** Protected & Authorized (only author can update)
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create

#### Delete Blog Post
- **DELETE** `/api/blog/:id`
- **Access:** Protected & Authorized (only author can delete)
- **Headers:** `Authorization: Bearer <token>`

### Comments

#### Get Comments for a Post
- **GET** `/api/blog/:postId/comments`
- **Access:** Public
- **Response:** Array of comments for the specified post

#### Create Comment
- **POST** `/api/blog/:postId/comments`
- **Access:** Protected (requires JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "body": "string"
  }
  ```

### Contact

#### Send Message
- **POST** `/api/contact`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

3. Start the server:
   ```bash
   npm start
   ```
   Or for development with nodemon:
   ```bash
   npm run dev
   ```

## Technologies Used

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Helmet
- CORS
- dotenv

