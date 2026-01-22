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
