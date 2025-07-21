
# 🚀 Uber Clone Backend (Node.js + Express + MongoDB)

This is a Node.js backend for a simplified Uber-like application. It includes user registration, JWT authentication, request validation, MongoDB integration, and scalable architecture using best practices.

---

## 📁 Project Structure

```
project-root/
├── controllers/
│   └── user.controller.js
├── db/
│   └── db.js
├── middleware/
│   └── user.middleware.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── services/
│   └── user.service.js
├── validators/
│   └── user.validator.js
├── app.js
├── server.js
├── .env
└── README.md
```

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (local instance)**
- **Mongoose**
- **JWT (Authentication)**
- **Joi (Validation)**
- **bcrypt (Password hashing)**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/uber-clone-backend.git
cd uber-clone-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_CONNECT=mongodb://0.0.0.0/uber-clone
JWT_SECRET=uber-clone@123
```

Make sure MongoDB is running on your local machine at `mongodb://0.0.0.0`.

---

### 4. Start the server

```bash
npm start
```

Server will start at:

```
http://localhost:3000/
```

---

## 📮 API Endpoints

### Health Check

```
GET /
```

---

### 👤 User Registration

```
POST /api/users/signup
```

#### ✅ Request Body:

```json
{
  "fullName": {
    "firstName": "Rohit",
    "lastName": "Sharma"
  },
  "email": "rohit@sharma.com",
  "password": "rohit@123"
}
```

#### ✅ Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "mongo_id",
    "fullName": {
      "firstName": "Rohit",
      "lastName": "Sharma"
    },
    "email": "rohit@sharma.com"
  }
}
```

---

## 📦 Scripts

```bash
npm start       # Starts the server
npm run dev     # If using nodemon for development
```

---

## ✅ Features

- User Registration with password hashing
- JWT-based Authentication
- Input validation using Joi
- Clean MVC folder structure
- Centralized `.env` configuration

---

## 📘 To-Do (Suggestions)

- Add Login Route
- Add Socket.io for real-time ride tracking
- Add MongoDB Atlas support for production
- Add Swagger API docs

---

## 🧠 Tips

- Use [MongoDB Compass](https://www.mongodb.com/products/compass) to view your local DB visually.
- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for testing endpoints.

---

## 🛠️ Author

- **Your Name** — [GitHub Profile](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the MIT License.
