# student_payment_system-Node.js-MongoDB

The **Student Payment System** is a web application designed to manage student information and handle student payments. This README provides a guide on how to use the provided `admin` router for various functionalities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
  - [Admin Login](#admin-login)
  - [Create Student](#create-student)
  - [Delete Student](#delete-student)
  - [All Student Information](#all-student-information)
  - [Update Student Information](#update-student-information)
  - [Search Student Information](#search-student-information)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ridoyislamnasim/student_payment_system-Node.js-MongoDB.git
    ```

2. Install dependencies:

    ```bash
    npm init
    ```
    These commands will install the following dependencies:
    ```bash
    npm install dotenv express nodemon jsonwebtoken mongoose  --seve
    ```
* `dotenv`: This package allows you to load environment variables from a `.env` file.
* `express`: This is a web framework for Node.js.
* `jsonwebtoken`: This package allows you to generate and verify JSON Web Tokens (JWTs).
* `mongoose`: This is an object modeling library for Node.js that allows you to interact with MongoDB databases.
* `nodemon`: This package allows you to automatically restart your Node.js application when your code changes.



3. create an environment (.env) file with these configurations, you can follow these steps:

    Create a New File:
      Create a new file in your project's root directory and name it .env.

    Add Configurations:
        Open the .env file and add the following configurations:

env
```env 
PORT=?
MONGO_CONNECTION_STRING= ?
JWT_EXPIRY=?
SECRET_KEY=?
```
Explanation:

    PORT: Specifies the port on which your server will run (in this case, 2000).
    MONGO_CONNECTION_STRING: Contains the MongoDB connection string.
    JWT_EXPIRY: Sets the expiry time for JWT tokens (in milliseconds).

    SECRET_KEY: Defines a secret key for JWT token generation.
## Run project
```
nodemon app.js
```
or
```
node app.js 
```
## Usage

To use the `admin` router, ensure you have set up the application correctly and have MongoDB running.

```javascript
// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// internal imports
const admin = require("./router/adminRouter");
// MongoDB connection setup
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));

// routing setup
app.use("/admin", admin);

// Start the server
app.listen(process.env.PORT || 2000, () => {
    console.log(`app listening to port `, process.env.PORT || 2000);
});

```

## Routes
| Route | Method | Description |
|---|---|---|
| `/login` | `POST` | Admin login. |
| `/create-student` | `POST` | Create a new student account. |
| `/delete-student/:id` | `DELETE` | Delete a student account. |
| `/all-student` | `GET` | Get all student accounts. |
| `/update-student/:id` | `PUT` | Update a student account. |
| `/search-student/:name` | `GET` | Search for a student account by name. |



### Admin Login

    Route: POST /admin/login
    Description: Log in as an admin using email and password. Receive a JWT secret code for further authorization. 
    
Header set JWT
```
admin-auth-token : JWT token that received
```

### Create Student

    Route: POST /admin/create-student
    Description: Create a new student account in the admin panel. Requires admin authentication.
    Parameters:
        name (required): Student's name.
        address: Student's address.
        phone: Student's phone number.

### Delete Student

    Route: DELETE /admin/delete-student/:id
    Description: Delete a student's information by providing the student ID. Requires admin authentication.
    Parameters:
        id (required): Student ID.

### All Student Information

    Route: GET /admin/all-student
    Description: Get information for all students. Requires admin authentication.

### Update Student Information

    Route: PUT /admin/update-student/:id
    Description: Update a student's information by providing the student ID. Requires admin authentication.
    Parameters:
        id (required): Student ID.
        name: Updated student name.
        address: Updated student address.
        phone: Updated student phone number.
        january (month name): True or false indicating whether the payment for the current month (January) is done or not.
        february, march, ... (other month names): True or false indicating whether the payment for the respective month is done or not.

Note: This route allows updating multiple months' payment status by providing the corresponding month parameters (january, february, etc.). If you provide values for name, address, and phone, those details will also be updated for the specified student.

Example:
```json
// Request Body
{
  "name": "UpdatedName",
  "address": "UpdatedAddress",
  "phone": "UpdatedPhoneNumber",
  "january": true,
  "february": false,
  "march": true
}
```

In this example, the student's name, address, and phone number are updated, and the payment status for January is set to true, for February is set to false, and for March is set to true.

### Search Student Information

    Route: GET /admin/search-student/:name
    Description: Search for a student's information by providing the student's name. Requires admin authentication.
    Parameters:
        name (required): Student name.
