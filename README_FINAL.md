# Web Developer Assignment

## Backend

### Provided Backend

A Node server written in TypeScript is provided.
The server utilizes an SQLite database (data.db) containing all relevant data, including users posts and adders.
The server exposes several partial RESTful API endpoints:

- GET /users: Returns a list of users with pagination support.
- GET /users/count: Returns the total number of users.
- GET /posts: Returns posts filtered by a specific user ID, using the userId query parameter (e.g., /posts?userId={userId}).

### Backend Requirements

You are required to implement the following backend functionalities:

- Extend the existing user-related endpoints to include adders (metadata associated with the user).
- Query the adders from the database and include them in the user response.
- Ensure the adders are properly validated and formatted before returning to the frontend.
- Create an endpoint to delete a post by its ID.
- Remove the post from the database upon successful deletion.
- Return appropriate HTTP status codes and messages.
- Create an endpoint to add a new post for a user, accepting **Title**, **Body**, and **User ID**.
- Validate input data and handle errors.
- Save the new post to the database upon success.

## Front-End

### General Requirements

### Users Table

- **Pagination**: Show 4 users per page.
- **User Details**:
  - Full Name
  - Email Address
  - Address formatted as "street, state, city, zipcode". Keep the address column at 392px width and use ellipsis (...) for any overflow.

### User Posts

- A header with a summary of the user and the number of posts.
- A list of all posts (**no pagination required**).
- Each post should display:
  - **Title**
  - **Body**
  - A **Delete** icon.
    - Clicking the Delete icon should delete the post via your backend API and update the UI accordingly.
- An option to **add a new post**:
  - Include a button that opens a form to create a new post with **Title** and **Body** fields.
  - Upon submission, the new post should be saved via your backend API and appear in the list of posts without requiring a page refresh.

## Guidelines

1. **State Management with React Query**
   - Use React Query to manage server state.
   - Ensure efficient data fetching, caching, and synchronization with the backend.
   - Utilize React Query's features to handle loading and error states.
2. **Code Reusability and Separation**
   - Structure your components to promote reusability and maintainability.
   - Abstract shared logic into custom hooks or utility functions where appropriate.
   - Follow best practices for component composition and props management.
3. **Responsiveness**
   - Ensure the application is responsive and functions well on various screen sizes and devices.
   - Use Tailwind CSS utilities to create responsive layouts.
4. **Performance Optimization**
   - Optimize the application for performance, minimizing unnecessary re-renders.
   - Use React's memoization techniques where applicable.
   - Efficiently manage list rendering.
5. **Error Handling**
   - Implement robust error handling for API requests and unexpected data.
   - Provide meaningful feedback to the user in case of errors.
   - Use try-catch blocks and handle promise rejections appropriately in your backend.
6. **Testing**
   - Include at least one unit test for a critical component or functionality in your frontend code.
   - Use testing libraries such as Jest and React Testing Library.
   - Write tests that are meaningful and cover important use cases.

## Resources

[Figma Design for Web UI](https://www.figma.com/design/Wkbz27sGWBOFMDocOck4mm/Full-Stack-Developer-Assignment?node-id=0-1&node-type=canvas&t=zK4X8qKaPmxu84XZ-0)

## Deliverables

## Submission Instructions

## WDAM Project

This project consists of a backend (Node.js/TypeScript) and a frontend (Next.js/React) application.

---

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Testing](#testing)

---

## Installation

Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Database Setup

- The backend uses a SQLite database (`data.db`).
- No migrations are required. The database file is already present in `backend/data.db`.

---

## Running the Backend

From the `backend` directory:

```bash
cd backend
npm run build
npm start
```

The backend server will start (default: http://localhost:3001 or as configured).

---

## Running the Frontend

From the `frontend` directory:

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000 by default.

---

## Testing

### Backend Tests

From the `backend` directory:

```bash
cd backend
npm test
```

### Frontend Tests

From the `finalx` directory:

```bash
cd finalx
npm test
```

---

## Notes

- No database migrations are required.
- Ensure Node.js and npm are installed on your system.
