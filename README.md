# 💊 Pharmacy Hope CRUD System

A full-stack CRUD application for managing pharmacy medicines, users, and orders.  
Built with **Spring Boot**, **Next.js**, and **MySQL**.

---



## 📑 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- Data Model 
- [Features](#features)
- [User Stories](#user-stories)

---

## 🧾 Overview
Pharmacy CRUD System is a simple, clean, and functional system designed to simulate a real pharmacy workflow.

The system allows:
- Admins to **add, edit, delete, and manage medicines**.
- Users to **browse medicines and add them to an active order**.
- Automatic **quantity updates** when adding or removing medicines.
- Role-based UI:  
  - Admin → sees CRUD tools  
  - User → sees “Add to Order” button only  

---

## 🛠 Tech Stack

### Frontend
- Next.js 14  
- React  
- Fetch API  
- LocalStorage Authentication  
- Custom CSS

### Backend
- Java 17  
- Spring Boot 3  
- Spring Data JPA  
- MySQL

### Database
- `admins`  
- `users`  
- `medicines`  
- `orders`  
- `order_items`  

---


🌟 Features
🔐 Authentication

- Admin login

- User login

- Role-based navigation

- Dynamic Login → Logout

- Shows logged-in username and role

💊 Medicine Management (Admin)

- Add new medicine

- Edit medicine using a full form

- Delete medicine

- Real-time refresh after CRUD

🛒 User Orders

- Add medicine to order

- Quantity reduces automatically

- If removed → quantity increases

- Out of stock → Add button disappears

- Order page shows only selected medicines

🔎 Search System

- Search by medicine name

- Instant filtering

🧑‍💼 User Stories
- Admin

- Add medicines

- Update medicine details

- Delete medicines

- Monitor stock

- User

- Browse medicines

- Search medicines

- Add medicines to order

- View order items

- Track stock changes

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
