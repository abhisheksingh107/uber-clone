# 🚗 Uber Clone Backend

A Node.js backend for an Uber-like app, featuring user and captain registration, authentication, validation, and MongoDB integration.

---

## 📁 Project Structure

```
Backend/
├── controllers/
│   ├── user.controller.js
│   └── captain.controller.js
├── db/
│   └── db.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   └── blackListToken.model.js
├── routes/
│   ├── user.routes.js
│   └── captain.routes.js
├── services/
│   ├── user.service.js
│   ├── captain.service.js
│   └── blackListToken.service.js
├── validators/
│   ├── user.validator.js
│   └── captain.validator.js
├── app.js
├── server.js
├── .env
└── README.md
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Joi (Validation)
- bcrypt (Password hashing)

---

## 🚀 Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/uber-clone-backend.git
    cd uber-clone-backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file:
    ```
    PORT=####
    DB_CONNECT=#####
    JWT_SECRET=####
    ```

    Make sure MongoDB is running locally.

4. **Start the server**
    ```bash
    npm start
    ```

    Server runs at: `http://localhost:3000/`

---

## 📮 API Endpoints

### User

- `POST /user/signup` — Register user
- `POST /user/login` — Login user
- `GET /user/getProfile` — Get user profile (auth required)
- `POST /user/logout` — Logout user (auth required)

### Captain

- `POST /captain/signup` — Register captain
- `POST /captain/login` — Login captain
- `GET /captain/getCaptainProfile` — Get captain profile (auth required)
- `POST /captain/logout` — Logout captain (auth required)

---

## 📂 File Descriptions

### server.js
- Loads environment, connects to MongoDB, starts HTTP server.

### app.js
- Sets up Express app, middleware, and routes.

### controllers/
- **user.controller.js**: Handles user registration, login, logout, profile.
- **captain.controller.js**: Handles captain registration, login, logout, profile.

### middlewares/
- **auth.middleware.js**: JWT authentication and blacklist check.
- **validate.middleware.js**: Joi validation for requests.

### models/
- **user.model.js**: User schema, password hashing, JWT methods.
- **captain.model.js**: Captain schema, vehicle info, password hashing, JWT methods.
- **blackListToken.model.js**: Stores blacklisted JWT tokens.

### services/
- **user.service.js**: User registration/login logic.
- **captain.service.js**: Captain registration/login logic.
- **blackListToken.service.js**: Blacklist token for logout.

### validators/
- **user.validator.js**: Joi schemas for user registration/login.
- **captain.validator.js**: Joi schemas for captain registration/login.

### routes/
- **user.routes.js**: User API endpoints.
- **captain.routes.js**: Captain API endpoints.

---

## ✅ Features

- User & Captain Registration with password hashing
- JWT-based Authentication
- Input validation using Joi
- Clean MVC folder structure
- Centralized `.env` configuration
- Token blacklist for secure logout

---

## 📘 To-Do

- Add ride booking and matching
- Add real-time tracking (Socket.io)
- Add Swagger API docs

---

## 🛠️ Author

- **Your Name** — [GitHub Profile](https://github.com/abhishek107)

---

## 📄 License

MIT License