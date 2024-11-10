# MERN-Backend-Demo-Project

## Employee Management API

This project is a RESTful API for managing employees in a database, built using Node.js, Express, TypeScript, MongoDB, and several middleware packages. It includes CRUD operations (Create, Read, Update, Delete) and is designed to be secure, efficient, and structured for maintainability.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Framework for building web applications and RESTful APIs.
- **TypeScript**: Typed superset of JavaScript that enhances code quality and maintainability.
- **MongoDB**: NoSQL database used to store employee data.
- **Mongoose**: ODM library for MongoDB to manage database operations with schemas.
- **Winston**: Logging library for structured logging.
- **Morgan**: HTTP request logger middleware, configured to work with Winston for efficient logging.
- **Helmet**: Middleware for securing HTTP headers.
- **CORS**: Middleware to enable cross-origin resource sharing, allowing secure access to the API from different origins.
- **esLint**:Linting tool for adding coding rules.
- **Redis**:Caching server.
- **RabbitMQ**:Message Broker.

---

## Project Structure

```plaintext
├── src
│   ├── controllers
│   │   └── EmpController.ts      # Employee controller with CRUD logic
│   ├── db
│   │   └── employees.ts          # Mongoose model schema for employees
│   ├── routes
│   │   └── index.ts              # Routes for employee CRUD operations
│   ├── config
│   │   └── logger.ts             # Winston logger configuration
│   ├── index.ts                  # Main entry point for the application
├── logs                          # Folder for storing log files (e.g., error.log, combined.log)
└── README.md                     # Project documentation

---

## API Endpoints
Method	Endpoint	Description
GET	/api/users	Fetch all employees
GET	/api/users/:id	Fetch a specific employee
POST	/api/users	Create a new employee
PUT	/api/users/:id	Update an employee
DELETE	/api/users/:id	Delete an employee

---
