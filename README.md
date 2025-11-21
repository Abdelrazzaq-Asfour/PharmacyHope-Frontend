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



## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<img width="1880" height="937" alt="image" src="https://github.com/user-attachments/assets/4b2d3ab6-571d-4e86-b71c-7d8507fbe70f" />
<img width="1926" height="945" alt="image" src="https://github.com/user-attachments/assets/45295b8f-918d-4f04-a304-2d4ba9a15f05" />
<img width="2015" height="937" alt="image" src="https://github.com/user-attachments/assets/09c5413f-d618-43e3-8a96-dde364add02e" />






