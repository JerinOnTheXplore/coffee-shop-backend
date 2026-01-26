# ☕ Coffee Shop Management System – Backend

This is the **backend API** for the Coffee Shop Management System, built as a **production-ready REST API** using modern backend technologies.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT / Cookie-based Authentication

---

## 📦 Core Features

### 🔐 Authentication & Authorization
- Email & password authentication
- Google OAuth login
- Email verification
- Role-based access control (ADMIN, CUSTOMER)

### ☕ Coffee Management
- Create, update, delete coffee items (Admin)
- Public coffee listing
- Search & filtering (roast level, availability)
- Sorting & pagination

### 🛒 Order Management
- Place orders (Customer)
- Order history with pagination
- Admin order management
- Order status tracking

### ⭐ Review System
- Coffee reviews & ratings
- Review moderation
- Cascade deletion

### 📊 Analytics (Admin)
- Total orders & revenue
- Top selling coffees
- Most reviewed coffees

### 🛡 Error Handling
- Global error handler
- Prisma error handling
- 404 not found middleware

---

## 🧱 Project Structure

coffee-shop-backend/
├─ prisma/
│ └─ schema.prisma
├─ src/
│ ├─ modules/
│ │ ├─ auth/
│ │ ├─ coffee/
│ │ ├─ order/
│ │ ├─ review/
│ │ └─ analytics/
│ ├─ middlewares/
│ ├─ utils/
│ ├─ app.ts
│ └─ server.ts
├─ package.json
└─ tsconfig.json


---

## 🔑 API Endpoints (Summary)

### Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/google`
- GET  `/auth/verify-email`

### Coffee
- GET  `/coffees`
- GET  `/coffees/:id`
- POST `/coffees` (Admin)
- PATCH `/coffees/:id` (Admin)
- DELETE `/coffees/:id` (Admin)

### Orders
- POST `/orders`
- GET  `/orders/my`
- GET  `/orders` (Admin)

### Reviews
- POST `/reviews`
- GET  `/coffees/:id/reviews`

---
### 🧪 Postman Testing Guide
- Step 1: Register User

Method: POST

URL: http://localhost:5000/auth/register

Body (JSON):

{
  "name": "Porte Boshina",
  "email": "porteboshina@exam.com",
  "password": "Fail@123",
  "role": "ADMIN"
}


Expected: 201 Created → { user, accessToken, refreshToken }

- Step 2: Login User

Method: POST

URL: http://localhost:5000/auth/login

Body (JSON):

{
  "email": "porteboshina@exam.com",
  "password": "Fail@123"
}


Expected: 200 OK → { user, accessToken, refreshToken }

- Step 3: Access Protected Route

Method: GET

URL: http://localhost:5000/admin

Headers:

Authorization: Bearer <accessToken>


Expected: 200 OK → Welcome Admin

Step 4: Refresh Access Token

Method: POST

URL: http://localhost:5000/auth/refresh

Body (JSON):

{
  "token": "<refreshToken>"
}


Expected: 200 OK → { accessToken: "newAccessToken" }

- Step 5: Test Role Middleware

Create a CUSTOMER user → try to access /admin

Expected: 403 Forbidden → { message: "Forbidden: access denied" }

- 🔐 Create Coffee (ADMIN only)

- POST /api/coffees

Headers:

Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json


Body:

{
  "name": "Ethiopian Dark Roast",
  "description": "Strong & bold coffee",
  "price": 450,
  "roastLevel": "DARK"
}

- ☕ Get All Coffees (Public)

GET:  /api/coffees

- ☕ Get Single Coffee

GET:  /api/coffees/:id

- POST:  /api/coffees

Headers:

Authorization: Bearer <NEW_ADMIN_TOKEN>
Content-Type: application/json


Body:

{
  "name": "Ethiopian Dark Roast",
  "description": "Strong & bold coffee",
  "price": 450,
  "roastLevel": "DARK"
}

- Expected Response
{
  "success": true,
  "message": "Coffee created successfully",
  "data": { ... }
}

- 1️⃣ POST /api/reviews

Headers:

Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json


Body:

{
  "coffeeId": "<existing_coffee_id>",
  "rating": 5,
  "comment": "Absolutely love this coffee!"
}

- 2️⃣ GET /api/coffees/:id/reviews

Headers: none needed
URL example:

http://localhost:5000/api/coffees/<coffeeId>/reviews


Response:

{
  "avgRating": 4.5,
  "reviews": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Absolutely love this coffee!",
      "user": { "id": "...", "name": "John Doe" },
      "createdAt": "2026-01-24T20:00:00.000Z"
    }
  ]
}

- UPDATE reviews

URL: http://localhost:5000/api/reviews

Method: POST

Headers: Authorization: Bearer <CUSTOMER_TOKEN> + Content-Type: application/json

Body:

{
  "coffeeId": "<existing_coffee_id>",
  "rating": 5,
  "comment": "Absolutely love this coffee!"
}

- Postman test (Admin delete review)
DELETE /api/reviews/<reviewId>

Headers:
Authorization: Bearer <ADMIN_TOKEN>


Expected response:

{
  "success": true,
  "message": "Review deleted successfully"
}

- Orders

1️⃣ POST /api/orders (Customer)
📦 Request body (Postman)
{
  "items": [
    { "coffeeId": "uuid-1", "quantity": 2 },
    { "coffeeId": "uuid-2", "quantity": 1 }
  ]
}

- Create order
POST /api/orders
Authorization: Bearer <CUSTOMER_TOKEN>

- My orders
GET /api/orders/my
Authorization: Bearer <CUSTOMER_TOKEN>

- Admin view
GET /api/orders
Authorization: Bearer <ADMIN_TOKEN>

2️⃣ Admin Order Status Update (PATCH) 

API

PATCH /orders/:id/status


Who

Only ADMIN

Body

{
  "status": "SHIPPED"
}

- PATCH (Admin)
PATCH: /api/orders/ORDER_ID/status
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "status": "COMPLETED"
}

Valid statuses

PENDING

PAID

CANCELLED

COMPLETED

- Step1️⃣ Admin Token (Login)

POST /api/auth/login

{
  "email": "admin@gmail.com",
  "password": "password123"
}

- 2️⃣ Order ID will come from GET order API

- 3️⃣ Get Orders (Admin)

GET /api/orders

Headers:

Authorization: Bearer <ADMIN_TOKEN>

Response example:
{
  "success": true,
  "data": [
    {
      "id": "9caa3c8b-7c6e-4ef7-b8ae-4a1f1b0c90bb",
      "status": "PENDING",
      "totalAmount": 1220,
      "userId": "abc-user-id",
      "createdAt": "2026-01-25T10:00:00.000Z"
    }
  ]
}

- PATCH API

PATCH /api/orders/9caa3c8b-7c6e-4ef7-b8ae-4a1f1b0c90bb/status

Headers:

Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

<Body>...
{
  "status": "COMPLETED"
}

- Order status
1️⃣ Create order (Customer)
POST /api/orders
Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json

{
  "items": [
    { "coffeeId": "<id1>", "quantity": 2 },
    { "coffeeId": "<id2>", "quantity": 1 }
  ]
}

2️⃣ Get my orders (Customer)
GET /api/orders/my?page=1&limit=10&status=PENDING
Authorization: Bearer <CUSTOMER_TOKEN>

3️⃣ Get all orders (Admin)
GET /api/orders?page=1&limit=10&status=PAID
Authorization: Bearer <ADMIN_TOKEN>

4️⃣ Update order status (Admin)
PATCH /api/orders/<ORDER_ID>/status
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "status": "COMPLETED"
}

## 🛠 Setup Instructions

1. Clone the repository
2. Install dependencies  
   ```bash
   npm install
Setup environment variables

DATABASE_URL=
JWT_SECRET=
Run Prisma migration

npx prisma migrate dev
Start the server


npm run dev
🎯 Purpose
This backend is designed to demonstrate:

Clean architecture

Secure authentication

Scalable database design

Real-world business logic
