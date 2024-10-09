
# COMP3123 Assignment 1 - Employee Management API

## sample login for testing

{
  "email": "kevinbhangu@example.com",
  "password": "kevin123"
}

## Features
- User account management (sign up and log in)
- CRUD operations for employee data
- Data validation using express-validator
- MongoDB for data storage
- Error handling with detailed responses


## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- express-validator for data validation
- bcryptjs for password hashing
- jsonwebtoken for authentication


## server
   The server will be running on `http://localhost:5000/`.

## API Endpoints
- User Management:
  - `POST /api/v1/user/signup` - Sign up a new user
  - `POST /api/v1/user/login` - Log in an existing user

- Employee Management:
  - `GET /api/v1/emp/employees` - Get all employees
  - `POST /api/v1/emp/employees` - Create a new employee
  - `GET /api/v1/emp/employees/:eid` - Get an employee by ID
  - `PUT /api/v1/emp/employees/:eid` - Update an employee by ID
  - `DELETE /api/v1/emp/employees?eid=xxx` - Delete an employee by ID

## Error Handling
The API provides detailed error messages for validation failures, missing data, and not found resources.
Example:
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

