
# QuickNote

QuickNote is a user-friendly note-taking application that allows users to create, edit, and manage their notes efficiently. The application features a clean interface and is built using modern web technologies.

🎥 Project Demo – QuickNote : [YouTube](https://youtu.be/BxHXLqvMZ38)

## Technologies

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - Axios

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT) for authentication

## Features

- User authentication (login and signup)
- Create, edit, and delete notes
- View note details
- Responsive design for mobile and desktop
- Date picker for selecting dates
- User-friendly interface

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/7rajnishsharma/QuickNote.git
   cd QuickNote/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `hhttp://localhost:5173`.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd quicknote/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add your MongoDB connection string:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   EMAIL_USER=your_email
   EMAIL_PASS=email_app_pass

   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The backend will run on `http://localhost:5000`.

## Frontend

The frontend of QuickNote is built using React and TypeScript. It features a clean and responsive design using Tailwind CSS. The application uses React Router for navigation between different pages, including login, signup, dashboard, and note details.

### Key Components

- **Dashboard**: Displays a list of notes with options to create, edit, or delete notes.
- **CreateNote**: A form for creating and editing notes.
- **NoteDetail**: Displays the details of a selected note.
- **Login**: User authentication page.
- **Signup**: User registration page.

## Backend

The backend of QuickNote is built using Node.js and Express.js. It provides a RESTful API for managing notes and user authentication.

### Key Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a JWT.
- **GET /api/notes**: Retrieve all notes for the authenticated user.
- **POST /api/notes**: Create a new note.
- **GET /api/notes/:id**: Retrieve a specific note by ID.
- **PUT /api/notes/:id**: Update a specific note by ID.
- **DELETE /api/notes/:id**: Delete a specific note by ID.

## API Testing with Postman

You can test the API endpoints using Postman. Below are the details for each endpoint:

### 1.1 User Registration

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Request Body**:
  ```json
  {
      "name": "New User",
      "dob": "2003-11-01",
      "email": "new-user@gmail.com"
  }
  ```
- **Response**:
  ```json
  {
      "message": "OTP sent to your email"
  }
  ```
### 1.2 verify otp 

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/verify-otp`
- **Request Body**:
  ```json
  {
      "email": "new-user@gmail.com"
      "otp": "123456" 
  }
  ```
- **Response**:
  ```json
  {
      "token": "your_jwt_token"
  }
  ```


### 2.1 User Login

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Request Body**:
  ```json
  {
      "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
      "token": "your_jwt_token"
  }
  ```
### 2.2 verify otp 

- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/verify-otp`
- **Request Body**:
  ```json
  {
      "email": "new-user@gmail.com"
      "otp": "123456" 
  }
  ```
- **Response**:
  ```json
  {
      "token": "your_jwt_token"
  }

### 3. Get All Notes

- **Method**: GET
- **URL**: `http://localhost:5000/api/notes`
- **Headers**: 
  - `Authorization: Bearer your_jwt_token`
- **Response**:
  ```json
  [
      {
          "_id": "note_id",
          "title": "Note Title",
          "content": "Note content",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
      }
  ]
  ```

### 4. Create a Note

- **Method**: POST
- **URL**: `http://localhost:5000/api/notes`
- **Headers**: 
  - `Authorization: Bearer your_jwt_token`
- **Request Body**:
  ```json
  {
      "title": "New Note",
      "content": "This is the content of the new note."
  }
  ```
- **Response**:
  ```json
  {
      "message": "Note created successfully.",
      "note": {
          "_id": "new_note_id",
          "title": "New Note",
          "content": "This is the content of the new note."
      }
  }
  ```

### 5. Get a Specific Note

- **Method**: GET
- **URL**: `http://localhost:5000/api/notes/:id`
- **Headers**: 
  - `Authorization: Bearer your_jwt_token`
- **Response**:
  ```json
  {
      "_id": "note_id",
      "title": "Note Title",
      "content": "Note content",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

### 6. Update a Note

- **Method**: PUT
- **URL**: `http://localhost:5000/api/notes/:id`
- **Headers**: 
  - `Authorization: Bearer your_jwt_token`
- **Request Body**:
  ```json
  {
      "title": "Updated Note Title",
      "content": "Updated content."
  }
  ```
- **Response**:
  ```json
  {
      "message": "Note updated successfully."
  }
  ```

### 7. Delete a Note

- **Method**: DELETE
- **URL**: `http://localhost:5000/api/notes/:id`
- **Headers**: 
  - `Authorization: Bearer your_jwt_token`
- **Response**:
  ```json
  {
      "message": "Note deleted successfully."
  }
  ```

## Conclusion

QuickNote is a powerful and easy-to-use note-taking application that leverages modern web technologies to provide a seamless user experience. Feel free to contribute to the project or reach out for any questions or suggestions!

```
