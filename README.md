Task Manager Application
A modern, full-stack Task Manager application for managing tasks with boards, lists, and cards, built with a React frontend and a Node.js backend, integrated with MongoDB and secured with JWT authentication.

🚀 Features
Frontend

React + Vite: Fast, modern frontend with hot module replacement.
Redux Toolkit: Efficient global state management for boards, lists, and cards.
Axios: HTTP client with JWT-based authentication for secure API requests.
Responsive Design: Mobile-friendly UI with Tailwind CSS for styling.

Backend

Node.js + Express: Lightweight and scalable REST API.
MongoDB: NoSQL database for storing user, board, list, and card data.
JWT Authentication: Secure routes with token-based authentication.
API Endpoints:
/user: Public routes for login and registration.
/boards: Protected routes for managing boards.
/lists: Protected routes for managing lists within boards.
/cards: Protected routes for managing task cards.




🛠️ Tech Stack
Frontend

React 18 + Vite
Redux Toolkit
Axios
Tailwind CSS

Backend

Node.js + Express
MongoDB (via MongoDB Atlas)
JWT for authentication


📦 Prerequisites

Node.js (>= 18.x)
MongoDB Atlas account (for database)
Git (for cloning the repository)
A modern web browser


🚀 Setup Instructions
Frontend Setup

Clone the Repository:
git clone <your-frontend-repo-url>
cd <your-frontend-folder>


Install Dependencies:
npm install


Configure Axios:

Open src/utils/axiosInstance.js.
Update the baseURL to point to your backend server (e.g., http://localhost:5000).


Run the Development Server:
npm run dev


Access the app at http://localhost:5173 (or the port displayed in the terminal).



Backend Setup

Clone the Repository:
git clone <your-backend-repo-url>
cd <your-backend-folder>


Install Dependencies:
npm install


Set Up Environment Variables:

Create a .env file in the backend root directory.
Add the following variables:MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key

Example:MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Task_Management?retryWrites=true&w=majority
JWT_SECRET=supersecret123




Set Up MongoDB Database:

Create a free cluster on MongoDB Atlas.
Create a database named Task_Management.
Create the following collections:
UserLogin
BoardsData
ListData
CardsData




Run the Backend Server:
node index.js


The server typically runs on http://localhost:5000.




🧩 API Structure
Endpoint
Description
Authentication

/user
User login and registration
Public

/boards
Manage boards (CRUD)
Protected (JWT)

/lists
Manage lists within boards (CRUD)
Protected (JWT)

/cards
Manage task cards within lists (CRUD)
Protected (JWT)

Authentication
Protected routes (/boards, /lists, /cards) require a valid JWT token.
Include the token in the Authorization header:Authorization: Bearer <your_token>

Example Test User
To test the API, use the following credentials for login:
{
  "username": "testuser",
  "password": "test123"
}


🖥️ Running the Application

Start the backend server:node index.js


Start the frontend development server:npm run dev


Open your browser and navigate to http://localhost:5173 to use the Task Manager.


📝 Notes

Ensure the backend server is running before starting the frontend.
The frontend communicates with the backend via Axios, so the baseURL in axiosInstance.js must match the backend server's address.
Use a tool like Postman or Thunder Client to test API endpoints.


📚 Resources

React Documentation
Redux Toolkit Documentation
MongoDB Atlas
Node.js Documentation
Express Documentation
