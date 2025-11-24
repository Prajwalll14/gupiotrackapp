📌 Task Tracker Application

A full-stack task management system built for creating, updating, assigning, and tracking tasks with a clean UI and real-time API integration.

🚀 Tech Stack Used
Frontend

React (Hooks + Functional Components)

Redux Toolkit (State Management)

Axios (API Calls)

React Router

Tailwind CSS (UI Styling)

Backend

Node.js

Express.js

MySQL (Sequelize ORM)

dotenv (Environment Config)

CORS

🎯 Project Features
🔹 Task Management

Create new tasks

Update status (Pending → In Progress → Completed)

Delete tasks

View details of each task

🔹 Assignments

Assign tasks to users

Fetch tasks assigned to specific users

🔹 Dashboard

Lists all tasks

Shows status, deadlines, priority

Clean card UI with Tailwind styles

🔹 API Integration

REST API using Express.js

Axios used on frontend for data fetching

Error handling + Loading state

🛠️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/task-tracker.git
cd task-tracker

2️⃣ Backend Setup
cd server
npm install

Setup Environment

Create .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_tracker
PORT=5000

Run Backend
npm start

3️⃣ Frontend Setup
cd client
npm install

Run Frontend
npm start
