# 💡 Smart Bill Management System

A **MERN Stack-based web application** that allows users to **view, manage, and pay monthly utility bills** (Electricity, Gas, Water, Internet, etc.).  
Users can **securely log in**, **pay only current-month bills**, and **manage their payment history** with options to **update, delete, and download PDF reports**.  
The application ensures a seamless, responsive, and user-friendly experience for all devices.

---

## 🌐 Live Demo & Repositories

- 🔗 **Live Site:** [👉 https://your-live-site-url.netlify.app](#)
- 💻 **Client Repo:** [👉 https://github.com/mdfardinislamselim/smart-bills-client](#)
- ⚙️ **Server Repo:** [👉 https://github.com/mdfardinislamselim/smart-bills-server](#)

---

## 🎯 Key Features

- 🔐 **User Authentication:** Register & Login via Email/Password and Google (Firebase).
- 💰 **Bill Payment System:** Pay only current-month bills, with auto-filled Pay Bill form.
- 📄 **PDF Report Generation:** Download paid bill reports (jsPDF + AutoTable).
- ⚙️ **CRUD Operations:** Update/Delete paid bills dynamically with modals.
- 🌗 **Dark/Light Theme Toggle** for better accessibility and user control.
- 🧭 **Dynamic Routing & Private Routes** (React Router).
- 📊 **Total Paid Summary:** Displays total bills paid and total amount.
- 📱 **Fully Responsive UI** for mobile, tablet, and desktop.
- 🔔 **Toast & SweetAlert Notifications** for all user actions.

---

## 🖼️ Layout Overview

### 🧩 Navbar
**Before Login:** Home | Bills | Login | Register  
**After Login:** Home | Bills | My Pay Bills | Profile Avatar | Logout  

### 🏠 Home Page
- Image **Carousel Slider** (3+ slides)
- **Category Section**: Electricity, Gas, Water, Internet
- **Recent Bills**: Display 6 latest bills from MongoDB
- **How It Works**: Manage all your utility bills in just a few simple steps.
- **What Our Users Say**: Thousands of users trust us to simplify their monthly bill payments.

### 💵 Bills Page (Public)
- Displays all bills in **3-column grid layout**
- **Category Filter Dropdown**


### 📋 Bill Details Page (Private)
- Displays full bill info
- **Pay Bill Button** enabled only if bill date is in the current month
- Pay Bill Modal with pre-filled data (Email, Bill ID, Amount, Date)

### 🧾 My Pay Bills Page (Private)
- Logged-in user’s paid bills in table view
- **Update/Delete** options (modal-based)
- **PDF Report Download**
- Displays **Total Bills Paid** & **Total Amount Paid**


---

## 🛠️ Tech Stack

**Frontend (Client):**
- React (Vite)
- React Router
- Firebase Authentication
- Axios (with interceptors)
- Tailwind CSS / DaisyUI
- jsPDF + jsPDF-AutoTable
- React Toastify / SweetAlert2
- Framer Motion / Lottie React (animations)

**Backend (Server):**
- Node.js + Express.js
- MongoDB
- dotenv, cors, bcrypt

