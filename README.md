# 📋 Project Management System - MERN Stack Project

A full-stack Project Management System built using the **MERN Stack**. This application allows teams to manage projects, members, tasks, comments, and notifications with secure authentication and role-based access control.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password (Email)
- Reset Password
- Password Validation

### 👤 User Profile
- View Profile
- Edit Profile

### 📁 Project Management
- Create Project
- View All Projects
- View Single Project
- Edit Project
- Delete Project
- Add Project Members
- View Project Members
- Remove Project Members

### ✅ Task Management
- Create Task
- View All Tasks
- View Single Task
- Edit Task
- Delete Task
- Assign Tasks
- Update Task Status
- Set Task Priority

### 💬 Comments
- Add Comments
- View Comments
- Edit Own Comments
- Delete Own Comments

### 🔔 Notifications
- View Notifications
- Mark Notifications as Read
- Delete Notifications

### 🔒 Role Based Access

#### 👨‍💼 Admin
- Manage projects
- Manage project members
- Manage tasks
- Manage users and permissions
- Access admin-level operations

#### 👨‍💻 Manager
- Create projects
- Edit projects
- Manage project members
- Create tasks
- Edit tasks
- Manage project work

#### 👩‍💻 Member
- View assigned projects
- View project tasks
- Work on assigned tasks
- Update task-related work
- Add and manage comments

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- React Toastify
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Resend

---

## 📁 Project Structure

```text
project-management-system/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js/app.js
│ 
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   └── style/
│   └── package.json
│
└── README.md

⚙ Installation
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev

🔑 Environment Variables

Create a .env file inside the backend folder.

PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

RESEND_API_KEY=YOUR_RESEND_API_KEY

CLIENT_URL=YOUR_FRONTEND_URL
📌 API Endpoints
Authentication
POST    /api/auth/register

POST    /api/auth/login

GET     /api/auth/me

POST    /api/auth/forgot-password

POST    /api/auth/reset-password/:token
Projects
POST    /api/projects

GET     /api/projects

GET     /api/projects/:id

PUT     /api/projects/:id

DELETE  /api/projects/:id

POST    /api/projects/:id/members

GET     /api/projects/:id/members

DELETE  /api/projects/:id/members/:userId
Tasks
POST    /api/tasks

GET     /api/tasks

GET     /api/tasks/:id

PUT     /api/tasks/:id

DELETE  /api/tasks/:id
Comments
POST    /api/comments

GET     /api/comments/:taskId

PUT     /api/comments/:id

DELETE  /api/comments/:id
Notifications
GET     /api/notifications

PUT     /api/notifications/:id/read

DELETE  /api/notifications/:id
🔮 Future Improvements
File/Image Attachments
Real-time Notifications
Project Progress Tracking
Advanced Task Filtering
Activity Logs
Team Chat
Dark Mode
📚 What I Learned
MERN Stack Development
REST API Development
JWT Authentication
Role-Based Authorization
MongoDB & Mongoose
Password Reset using Email
CRUD Operations
Project & Task Management
React Routing
Axios API Integration
Protected Routes
Role-Based UI Permissions
Git & GitHub Workflow
Frontend & Backend Integration
👩‍💻 Author

Dixita Ratanpara

📄 License

This project is created for learning and portfolio purposes.


### ⚠️ One important thing before we add it

I intentionally kept this README **simple like your Bug Tracker README**—no screenshots, no badges, no unnecessary documentation.

But before committing it, we should verify the **exact API endpoint paths** for Comments and Notifications against your actual backend routes. I don't want to put even one incorrect endpoint in your GitHub README.

So **don't create/commit the README yet**.

Next, send me your:

```text
backend/src/routes/
