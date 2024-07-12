# This is a online library management system project.

## Backend
  Sure, here's a more detailed README.md for the backend folder of your Library Management System:



### Overview
This README provides a comprehensive overview of the backend folder structure, key components, setup instructions, and API documentation for the Library Management System backend.

### Folder Structure
```
backend/
├── middlewares/
│   ├── auth.middleware.js
│   ├── adminCheck.middleware.js
├── controllers/
│   ├── user.controller.js
│   ├── book.controller.js
│   ├── booksTransaction.controller.js
├── db/
│   ├── connection.js
├── models/
│   ├── user.model.js
│   ├── book.model.js
│   ├── bookTransaction.model.js
├── routes/
│   ├── user.routes.js
│   ├── book.routes.js
│   ├── booksTransaction.routes.js
├── utils/
│   ├── asyncHandler.js
│   ├── apiError.js
│   ├── apiResponse.js
├── app.js
├── index.js
├── .env
├── package.json
└── README.md
```

### Key Components

#### Middlewares
- **auth.middleware.js**: Handles user authentication using JWT tokens.
- **adminCheck.middleware.js**: Ensures that only admin users can access certain routes.

#### Controllers
- **user.controller.js**: Manages user operations such as registration, login, logout, password change, and fetching user details.
- **book.controller.js**: Handles book CRUD operations including adding, editing, removing, and fetching books.
- **booksTransaction.controller.js**: Manages book transaction operations such as adding, editing, and removing transactions. Validates required fields like `userdetails`, `bookdetails`, `dueDate`, and `transactionType`.

#### Database
- **connection.js**: Establishes a connection to the MongoDB database using Mongoose.

#### Models
- **user.model.js**: Defines the schema for the User entity with methods for token generation and password validation.
- **book.model.js**: Defines the schema for the Book entity.
- **bookTransaction.model.js**: Defines the schema for the BookTransaction entity.

#### Routes
- **user.routes.js**: Defines API endpoints for user-related operations.
- **book.routes.js**: Defines API endpoints for book-related operations.
- **booksTransaction.routes.js**: Defines API endpoints for book transaction-related operations.

#### Utils
- **asyncHandler.js**: Utility function to handle asynchronous operations in Express routes.
- **apiError.js**: Custom error handling for API responses.
- **apiResponse.js**: Utility for formatting API responses.

#### Entry Points
- **app.js**: Entry point of the backend application where the Express app is configured.
- **index.js**: Connects to the database and starts the server.

### Setup and Running

#### Prerequisites
- Node.js
- MongoDB

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/library-management-system.git
   cd library-management-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` folder with the following configurations:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### API Documentation

#### User Endpoints
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user.
- **POST /api/users/logout**: Logout a user.
- **GET /api/users/profile**: Get user profile details.
- **PUT /api/users/password**: Change user password.

#### Book Endpoints
- **POST /api/books**: Add a new book.
- **GET /api/books**: Get all books.
- **GET /api/books/:id**: Get a book by ID.
- **PUT /api/books/:id**: Update a book by ID.
- **DELETE /api/books/:id**: Delete a book by ID.

#### Book Transaction Endpoints
- **POST /api/transactions**: Add a new book transaction.
- **GET /api/transactions**: Get all book transactions.
- **GET /api/transactions/:id**: Get a book transaction by ID.
- **PUT /api/transactions/:id**: Update a book transaction by ID.
- **DELETE /api/transactions/:id**: Delete a book transaction by ID.

### Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for authentication.

### Contributors
- [abhijitWebDev]
- [abhijitmone2@gmail.com]

Feel free to update this README with any additional information or changes as needed.

---

