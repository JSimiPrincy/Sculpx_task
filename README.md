# MERN Stack Backend (SculpTech Labs Project)

This repository contains the backend server for a MERN (MongoDB, Express.js, React, Node.js) stack application, designed to manage products with secure authentication, authorization, access control, and advanced data manipulation features (filtering, sorting, pagination, search, and CSV export).

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Products](#products)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## Features

This backend API provides the following core functionalities:

*   **Secure Authentication:**
    *   User registration and login with robust password hashing (bcrypt).
    *   JSON Web Token (JWT) based authentication for access tokens.
    *   Refresh token mechanism using HTTP-only cookies for enhanced security.
    *   Logout functionality to clear session/cookies.
*   **Authorization & Access Control:**
    *   Role-Based Access Control (RBAC) with roles like `user`, `admin`, `manager`.
    *   Middleware to restrict access to specific routes based on user roles (e.g., only admins can manage users, admins/managers can manage products).
*   **User Management:**
    *   CRUD operations for users (Admin only).
    *   Endpoint for users to retrieve their own profile.
*   **Product Management:**
    *   CRUD operations for products (Admin/Manager only for create/update/delete).
    *   **Advanced Data Filtering:** Filter products by various criteria (e.g., price ranges, categories).
    *   **Sorting:** Sort products by any field (e.g., price, creation date).
    *   **Pagination:** Retrieve products in chunks for efficient display.
    *   **Real-time Search:** Search products by name, description, or category (case-insensitive).
    *   **Export to CSV:** Download filtered and sorted product data as a CSV file (Admin/Manager only).
*   **Robust Error Handling:** Centralized error handling for consistent API responses.
*   **Input Validation:** Joi-based schema validation for all incoming request bodies.

## Folder Structure

The project follows a well-organized and scalable folder structure:
server/
├── config/ # Centralized configuration files
│ ├── index.js # Main configuration loader (dotenv)
│ ├── db.js # Database connection setup
│ ├── jwt.js # JWT specific configurations
│ └── corsOptions.js # CORS policy configuration
├── controllers/ # Request handlers; orchestrate service calls & prepare responses
│ ├── authController.js # Authentication logic (register, login, logout, refresh)
│ ├── userController.js # User CRUD and profile retrieval
│ └── productController.js# Product CRUD, filtering, sorting, pagination, export
├── middleware/ # Express middleware functions
│ ├── authMiddleware.js # JWT verification and user protection
│ ├── roleMiddleware.js # Role-based access control
│ ├── errorHandler.js # Global error handling
│ └── validationMiddleware.js # Joi validation middleware
├── models/ # Mongoose schemas and models
│ ├── User.js # User model with password hashing, roles
│ └── Product.js # Product model with schema, indexes
├── routes/ # API endpoint definitions
│ ├── api/ # API versioning namespace
│ │ ├── v1/ # Version 1 API routes
│ │ │ ├── authRoutes.js # Authentication routes
│ │ │ ├── userRoutes.js # User management routes
│ │ │ └── productRoutes.js # Product management routes
│ │ └── index.js # Aggregator for v1 routes
│ └── index.js # Aggregator for all API versions
├── services/ # Business logic layer (interacts with models, used by controllers)
│ ├── authService.js # Business logic for auth
│ ├── userService.js # Business logic for user data
│ └── productService.js # Business logic for product data
├── utils/ # Helper utilities
│ ├── apiFeatures.js # Class for applying filtering, sorting, pagination
│ ├── AppError.js # Custom error class
│ ├── catchAsync.js # Wrapper for async route handlers
│ └── jwtHelpers.js # JWT token signing/creation utilities
├── validators/ # Joi validation schemas
│ ├── authValidator.js # Schemas for auth requests
│ └── productValidator.js # Schemas for product requests
├── app.js # Main Express application configuration
├── server.js # Server entry point, DB connection, unhandled rejections
└── package.json # Project dependencies and scripts
code
Code
## Technologies Used

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web application framework for Node.js
*   **MongoDB:** NoSQL database
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js
*   **`dotenv`:** Loads environment variables from a `.env` file
*   **`bcryptjs`:** For hashing passwords securely
*   **`jsonwebtoken`:** For creating and verifying JSON Web Tokens
*   **`cookie-parser`:** Parses Cookie header and populates `req.cookies`
*   **`joi`:** For powerful schema-based data validation
*   **`cors`:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
*   **`json2csv`:** For converting JSON data to CSV format for export.
*   **`morgan`:** HTTP request logger middleware for Node.js (for development)
*   **`nodemon` (dev-dependency):** Automatically restarts the Node.js application when file changes are detected.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   A MongoDB database (local or cloud-hosted like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd mern-app-server # or whatever your server directory is named
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the `mern-app-server` directory and populate it with the following variables:
NODE_ENV=development
code
Code
*   **`MONGO_URI`**: Your MongoDB connection string. **Make sure to replace the placeholder password if you use the provided URI.**
*   **`JWT_SECRET`**: A strong, unique secret key for signing JWT access tokens.
*   **`JWT_EXPIRES_IN`**: Expiration time for access tokens (e.g., `1h`, `10m`).
*   **`JWT_COOKIE_EXPIRES_IN`**: Expiration for the refresh token cookie, in days.
*   **`REFRESH_TOKEN_SECRET`**: A different, strong, unique secret key for signing refresh tokens.
*   **`REFRESH_TOKEN_EXPIRES_IN`**: Expiration time for refresh tokens (e.g., `30d`).
*   **`CLIENT_URL`**: The URL of your frontend application (e.g., `http://localhost:3000`) for CORS.

### Running the Server

To start the server in development mode (with `nodemon` for auto-reloading):

```bash
npm run dev
To start the server in production mode:
code
Bash
npm start
The server will typically run on http://localhost:5000.
API Endpoints
All API endpoints are prefixed with /api/v1.
Base URL: http://localhost:5000/api/v1
Authentication (/api/v1/auth)
Method	Endpoint	Description	Access
POST	/auth/register	Register a new user	Public
POST	/auth/login	Log in an existing user	Public
GET	/auth/logout	Log out the current user (clears refresh token cookie)	Authenticated
GET	/auth/refresh-token	Get a new access token using the refresh token cookie	Authenticated
Users (/api/v1/users)
Requires Authorization: Bearer <accessToken> header for all routes.
_id refers to the user ID.
Method	Endpoint	Description	Access
GET	/users/me	Get the profile of the currently logged-in user	Authenticated
GET	/users	Get all users	Admin
GET	/users/:id	Get a specific user by ID	Admin
PATCH	/users/:id	Update a specific user by ID	Admin
DELETE	/users/:id	Delete a specific user by ID	Admin
Products (/api/v1/products)
_id refers to the product ID.
Method	Endpoint	Description	Access
GET	/products	Get all products (supports filtering, sorting, search, pagination)	Public
GET	/products/:id	Get a specific product by ID	Public
GET	/products/export	Export products to CSV (supports filtering, sorting, search)	Admin, Manager
POST	/products	Create a new product	Admin, Manager
PATCH	/products/:id	Update a specific product by ID	Admin, Manager
DELETE	/products/:id	Delete a specific product by ID	Admin, Manager
Query Parameters for /products (GET) and /products/export (GET)
page: Current page number (e.g., page=2).
limit: Number of results per page (e.g., limit=20).
sort: Fields to sort by, comma-separated. Prefix with - for descending (e.g., sort=price,-createdAt).
fields: Fields to include in the response, comma-separated (e.g., fields=name,price,category).
search: A string to search across name, description, category fields (e.g., search=laptop).
Filtering: Use field names with operators for advanced filtering (e.g., price[gte]=100, category=Electronics).
[gte]: Greater than or equal to
[gt]: Greater than
[lte]: Less than or equal to
[lt]: Less than
Example: GET /api/v1/products?page=1&limit=10&sort=-price&price[gte]=50&category=Electronics&search=gaming
Error Handling
The API provides structured error responses:
code
JSON
{
    "status": "fail",
    "message": "Validation failed: 'name' is required"
}
Or for internal server errors:
code
JSON
{
    "status": "error",
    "message": "Something went very wrong!"
}
Security Considerations
Password Hashing: bcryptjs is used to hash user passwords before storing them in the database.
JWT & Refresh Tokens: Access tokens are short-lived and sent in Authorization headers. Refresh tokens are long-lived and stored in secure, HTTP-only cookies to prevent XSS attacks.
CORS: Configured to allow requests only from the specified CLIENT_URL.
Input Validation: joi schemas are used to validate all incoming data, preventing common injection attacks and ensuring data integrity.
Environment Variables: Sensitive information is stored in environment variables, not hardcoded.
HTTP-Only Cookies: Refresh tokens are set as HttpOnly cookies, making them inaccessible to client-side JavaScript.
HTTPS (Production): secure: true is set for cookies in production, ensuring they are only sent over HTTPS.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'feat: Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a Pull Request.