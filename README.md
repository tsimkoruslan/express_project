
Backend API README

This README provides an overview of the backend API for your project, including technologies used.
Project Overview

This backend API serves as the core of your application, providing endpoints for user management, authentication, and car-related operations. It uses Node.js with the Express.js framework and a MongoDB database for data storage.
Technologies Used

    Node.js
    Express.js
    MongoDB
    TypeScript

API Structure

The API is structured into three main modules, each contained in a separate router:

    authRouter: Handles user authentication, registration, and password management.
    carRouter: Manages car-related operations, such as listing all cars, creating, updating, and deleting cars.
    userRouter: Provides user management functionality, including user profile retrieval, updates, and deletions.

Routes
Authentication Routes (authRouter)

    POST /register: Register a new user.
    POST /login: Log in a user.
    POST /refresh: Refresh the user's access token.
    POST /logout: Log the user out.
    POST /logout-all: Log the user out from all devices.
    POST /activate: Activate a user's account.
    PUT /activate: Complete the user account activation.
    POST /forgot: Initiate the password reset process.
    PUT /forgot/:token: Set a new password after a reset request.
    POST /password: Change the user's password.

Car Routes (carRouter)

    GET /: Retrieve a list of all cars.
    POST /: Create a new car.
    GET /:carId: Retrieve a specific car by ID.
    PUT /:carId: Update a specific car by ID.
    DELETE /:carId: Delete a specific car by ID.

User Routes (userRouter)

    GET /: Retrieve a list of all users.
    GET /me: Retrieve the user's own profile.
    GET /:userId: Retrieve a specific user by ID.
    PUT /:userId: Update a specific user's profile.
    DELETE /:userId: Delete a specific user by ID.

Middleware

Middleware functions are used throughout the API to perform tasks such as request validation, authentication, and user authorization. Some key middleware includes:

    commonMiddleware: Contains request validation functions.
    authMiddleware: Handles authentication and token-related checks.
    userMiddleware: Provides user-specific checks.

Error Handling

The API uses a custom error handling middleware to handle errors gracefully. Any errors that occur during request processing are returned as JSON responses with relevant error messages and status codes.
Database

The API relies on MongoDB as the database backend. The connection to the database is established during server startup. MongoDB is used to store and retrieve data related to users and cars.
Swagger Documentation

The API documentation is available using Swagger. You can access it by visiting the /swagger endpoint in your running application. This documentation makes it easier to understand and interact with the API endpoints.
Getting Started

    Install the required dependencies.
    Ensure that MongoDB is running and accessible.
    Set up your environment variables as specified in the configs module.
    Run the server with npm start.
    Access the API via the specified routes, and use Swagger for detailed documentation.

Feel free to customize and expand the API as needed for your project. If you encounter any issues or have questions, refer to the error handling section or consult the project's developers for assistance.