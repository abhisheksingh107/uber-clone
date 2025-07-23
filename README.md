# Backend API Documentation

This backend powers an Uber-like application, providing authentication, profile management, ride creation, and map utilities for both users and captains.

---

## controllers/captain.controller.js

Handles all captain-related authentication and profile logic.

### Main Functions

- **createCaptain**: Registers a new captain, hashes password, saves vehicle info, and sets JWT cookie.
- **loginCaptain**: Authenticates captain, sets JWT cookie, returns captain profile.
- **logoutCaptain**: Clears JWT cookie, blacklists token for secure logout.
- **getCaptainProfile**: Returns authenticated captain’s profile data.

### Related Endpoints

- `POST /captain/signup` — Register a captain
- `POST /captain/login` — Login as captain
- `POST /captain/logout` — Logout (requires authentication)
- `GET /captain/getCaptainProfile` — Get captain profile (requires authentication)

---

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body


- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

> **Note:** All request bodies are validated using [Joi](https://joi.dev/) to ensure correct data types and required fields.
The request body should be in JSON format and include the following fields:

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

- `email` (string, required): User's email address.
- `password` (string, required): User's password.

### Example Response

- `user` (object): User profile.
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object): User profile.

## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header or cookie.

- `message` (string): Logout successfully.

---

## `/captain/signup` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
  - `firstname` (string, required): Captain's first name.
  - `lastname` (string, optional): Captain's last name.
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.
- `vehicle` (object):
  - `color` (string, required): Vehicle color.
  - `plate` (string, required): Vehicle plate number.
  - `capacity` (number, required): Vehicle passenger capacity.
  - `vehicleType` (string, required): Type of vehicle.

### Example Response

- `captain` (object): Captain profile.
- `token