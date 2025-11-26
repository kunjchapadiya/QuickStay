
# QuickStay - A Resort Booking System

A Resort Booking System enables users to browse rooms, check availability, and make secure reservations online. It streamlines booking, payment processing, and room management while providing admins with tools to manage rooms, users, and overall resort operations efficiently.

## Demo

Insert gif or link to demo


## Features

- Role base: user, admin
- Responsive website
- Attractive and stunning UI
- View booking summary and payment success page
- Manage profile and view past bookings


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB  


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/kunjchapadiya/QuickStay
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server & react 

```bash
  npm run dev
```

# Backend Routes Map

This document outlines the available backend API routes, their methods, and their purposes.

**Base URL:** `http://localhost:5000`

## 1. Authentication Routes

**Base Path:** `/api`
**File:** `server/routes/Authentication.js`

| Method | Endpoint           | Description                           | Auth Required |
| :----- | :----------------- | :------------------------------------ | :------------ |
| `POST` | `/register`        | Register a new user                   | No            |
| `POST` | `/login`           | Login user                            | No            |
| `GET`  | `/logout`          | Logout user                           | No            |
| `GET`  | `/protected`       | Test protected route (verifies token) | **Yes**       |
| `POST` | `/forgot-password` | Send password reset link              | No            |
| `POST` | `/reset-password`  | Reset password                        | No            |

## 2. Admin Routes

**Base Path:** `/api/admin`
**File:** `server/routes/AdminRoutes.js`

| Method   | Endpoint           | Description                     | Auth Required         |
| :------- | :----------------- | :------------------------------ | :-------------------- |
| `GET`    | `/admin-protected` | Test admin protected route      | **Yes**               |
| `GET`    | `/viewusers`       | Get all users                   | No (Currently Public) |
| `DELETE` | `/delete-user/:id` | Delete a user                   | No (Currently Public) |
| `PUT`    | `/update-user/:id` | Update a user                   | No (Currently Public) |
| `POST`   | `/create-room`     | Create a new room (with images) | No (Currently Public) |
| `GET`    | `/viewrooms`       | Get all rooms                   | No                    |
| `GET`    | `/viewroom/:id`    | Get a single room               | No                    |
| `DELETE` | `/delete-room/:id` | Delete a room                   | No (Currently Public) |
| `PUT`    | `/update-room/:id` | Update a room                   | No (Currently Public) |

## 3. Booking Routes

**Base Path:** `/api/bookings`
**File:** `server/routes/BookingRoutes.js`

| Method | Endpoint               | Description                                     | Auth Required         |
| :----- | :--------------------- | :---------------------------------------------- | :-------------------- |
| `POST` | `/create`              | Create a new booking                            | No (Currently Public) |
| `GET`  | `/my-bookings/:userId` | Get bookings for a specific user                | No (Currently Public) |
| `GET`  | `/all-bookings`        | Get all bookings (Admin view)                   | No (Currently Public) |
| `PUT`  | `/cancel/:id`          | Cancel a booking                                | No (Currently Public) |
| `GET`  | `/stats`               | Get dashboard stats (Bookings, Revenue, Counts) | No (Currently Public) |

## 4. Payment Routes

**Base Path:** `/api/payments`
**File:** `server/routes/PaymentRoutes.js`

| Method | Endpoint  | Description                 | Auth Required         |
| :----- | :-------- | :-------------------------- | :-------------------- |
| `POST` | `/create` | Create a new payment record | No (Currently Public) |
| `GET`  | `/all`    | Get all payment records     | No (Currently Public) |

## 5. Invoice Routes

**Base Path:** `/api/invoice`
**File:** `server/routes/InvoiceRoutes.js`

| Method | Endpoint      | Description                       | Auth Required         |
| :----- | :------------ | :-------------------------------- | :-------------------- |
| `GET`  | `/:bookingId` | Generate and download PDF invoice | No (Currently Public) |

---

**Note:** "Auth Required" indicates if the route currently checks for a valid JWT token or session. Routes marked "No (Currently Public)" for sensitive actions (like delete/create) should likely be protected in a production environment.

## Authors

- [@kunjchapadiya](https://www.github.com/kunjchapadiya) 

