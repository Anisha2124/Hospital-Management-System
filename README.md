# 🏥 Hospital Management System

A full-stack web-based **Hospital Management System** designed to simplify and manage essential hospital operations such as patient records, doctor information, appointments, billing, and dashboard statistics.

## 📌 Project Overview

The Hospital Management System provides a centralized platform for managing hospital-related information through an easy-to-use web interface.

The system includes a responsive frontend along with a **Node.js + Express.js backend** and **MongoDB database** for storing and managing application data.

## ✨ Features

* 🔐 User Login
* 📊 Interactive Dashboard
* 👨‍⚕️ Doctor Management
* 🧑‍🤝‍🧑 Patient Management
* 📅 Appointment Management
* 💳 Billing Management
* 📈 Hospital Statistics
* 💰 Revenue Tracking
* 📱 Responsive User Interface
* 🗄️ MongoDB Database Integration
* 🔗 REST API Integration

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Tools

* Visual Studio Code
* Git & GitHub
* MongoDB Compass
* Postman

## 📂 Project Structure

```text
HospitalManagementSystem/
│
├── index.html
├── login.html
├── dashboard.html
├── patients.html
├── doctors.html
├── appointments.html
├── billing.html
├── about.html
├── contact.html
│
├── css/
│   ├── style.css
│   ├── login.css
│   ├── dashboard.css
│   ├── patient.css
│   ├── doctor.css
│   ├── appointment.css
│   └── billing.css
│
├── js/
│   ├── script.js
│   ├── login.js
│   ├── patient.js
│   ├── doctor.js
│   ├── appointment.js
│   └── billing.js
│
├── images/
├── icons/
│
└── backend/
    ├── server.js
    ├── package.json
    ├── config/
    ├── controllers/
    ├── models/
    └── routes/
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anisha2124/Hospital-Management-System.git
```

### 2. Navigate to the Project

```bash
cd Hospital-Management-System
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

> **Note:** Never upload your `.env` file or database credentials to GitHub.

### 5. Start the Backend

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Run the Frontend

Open the project in **Visual Studio Code** and launch `index.html` using **Live Server**.

## 🔗 API

The backend provides REST APIs for managing hospital data.

Example:

```text
GET /api/patients
GET /api/dashboard
```

The dashboard API provides information such as:

* Patient count
* Doctor count
* Appointment count
* Revenue

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

Example response:

```json
{
  "success": true,
  "count": 0,
  "patients": []
}
```

## 🔮 Future Enhancements

* 👤 Role-based authentication
* 🔒 Improved security
* 📧 Email notifications
* 💊 Medicine and pharmacy management
* 🧾 Advanced invoice generation
* 📊 Advanced analytics
* ☁️ Cloud deployment
* 📱 Mobile-friendly improvements

## 🎯 Project Objective

The primary objective of this project is to develop a centralized digital solution for managing hospital operations while reducing manual record keeping and improving accessibility of hospital information.

## 👩‍💻 Author

**Anisha Sasikumar**

B.Sc. Computer Science
Artificial Intelligence & Data Science

GitHub: [Anisha2124](https://github.com/Anisha2124)

---

⭐ If you find this project useful, consider giving it a star!
