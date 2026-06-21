# 🚀 AttendX-AI

### Smart AI-Powered Face Recognition Attendance System

![Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![AI](https://img.shields.io/badge/AI-Face%20Recognition-orange)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Python](https://img.shields.io/badge/Python-AI%20Model-blue)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Deploy](https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-purple)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen)

---

# 📌 Introduction

**AttendX-AI** is a modern **AI-powered face recognition attendance management system** designed for schools, colleges, universities, coaching institutes, and corporate training organizations.

The system combines **Artificial Intelligence, Computer Vision, Cloud Computing, and Modern Web Technologies** to automate attendance with high accuracy while preventing proxy attendance.

Unlike traditional attendance systems, AttendX-AI is built as a **production-ready scalable application** consisting of independent frontend, backend, and AI microservices.

---

# 🌐 Live Deployment

| Service | Platform |
|---------|----------|
| 🌍 Frontend | Vercel |
| ⚙️ Backend API | Render |
| 🤖 AI Face Recognition Service | Render |

---

# 🏗️ System Architecture

```
                    +----------------------+
                    |      Next.js Client  |
                    |   (Hosted on Vercel) |
                    +----------+-----------+
                               |
                               |
                     REST APIs / JWT
                               |
                               ▼
                  +------------------------+
                  | Node.js + Express API  |
                  |    (Hosted on Render)  |
                  +-----------+------------+
                              |
              +---------------+----------------+
              |                                |
              ▼                                ▼
     MongoDB Database                  PostgreSQL Database
              |
              |
              ▼
      Cloudinary Image Storage
              |
              ▼
      Python AI Face Recognition
       (OpenCV + NumPy + InsightFace)
             Hosted on Render
```

---

# 🎯 Purpose

Traditional attendance systems suffer from

- Manual work
- Human errors
- Proxy attendance
- Slow reporting
- Difficult record management

AttendX-AI eliminates these issues through intelligent face recognition and automated attendance tracking.

---

# ✨ Key Features

## 🤖 AI Face Recognition

- Real-time face detection
- High-accuracy facial recognition
- Fast attendance marking
- Automatic face matching
- Multiple face support

---

## 👨‍🎓 Student Portal

- Student Registration
- Login Authentication
- View Attendance
- Attendance History
- Subject-wise Attendance
- Leave Application
- Profile Management

---

## 🧑‍🏫 Faculty Panel

- Manage Classes
- Manage Students
- Take Attendance
- Attendance Reports
- View Analytics
- Attendance History

---

## 👨‍💼 Admin Dashboard

- Manage Departments
- Manage Teachers
- Manage Students
- Create Subjects
- Manage Courses
- Monitor Attendance
- System Analytics
- User Management

---

## 📊 Analytics

- Daily Attendance
- Monthly Reports
- Subject-wise Reports
- Student Attendance Percentage
- Teacher Statistics
- Performance Insights

---

## 🔐 Security

- JWT Authentication
- Protected Routes
- Secure APIs
- Role-based Authorization
- Proxy Attendance Prevention
- Cloud Image Storage

---

# ☁️ Cloud Services

### Cloudinary

- Student Image Storage
- Optimized Image Delivery
- Secure Image Management
- Cloud Image Hosting

---

### MongoDB

Used for

- Users
- Students
- Teachers
- Attendance
- Authentication
- Application Data

---

### PostgreSQL

Used for

- Structured Academic Records
- Relational Data
- Course Management
- Subject Mapping

---

# 🧠 AI Face Recognition Module

The AI microservice is developed entirely in **Python**.

### Technologies Used

- Python
- OpenCV
- NumPy
- InsightFace
- ONNX Runtime

### AI Workflow

1. Face Registration
2. Face Detection
3. Face Alignment
4. Face Embedding Generation
5. Face Matching
6. Attendance Verification
7. Attendance Recording

---

# ⚙️ Tech Stack

## Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

---

## AI

- Python
- OpenCV
- NumPy
- InsightFace
- ONNX Runtime

---

## Databases

- MongoDB
- PostgreSQL

---

## Cloud

- Cloudinary
- Render
- Vercel

---

# 📁 Project Structure

```
AttendX-AI
│
├── client/
│   ├── Next.js Frontend
│   ├── Student Portal
│   ├── Faculty Dashboard
│   └── Admin Dashboard
│
├── server/
│   ├── Express APIs
│   ├── Authentication
│   ├── Attendance APIs
│   └── Database Services
│
├── aiModel/
│   ├── Face Recognition
│   ├── AI Models
│   ├── Attendance Verification
│   └── Python Services
│
└── README.md
```

---

# ⚙️ How It Works

### Step 1

Student registers with face images.

↓

### Step 2

Images are uploaded securely to Cloudinary.

↓

### Step 3

The AI model extracts facial embeddings.

↓

### Step 4

Embeddings are stored and linked with student records.

↓

### Step 5

During attendance, the camera captures live faces.

↓

### Step 6

The AI service compares embeddings.

↓

### Step 7

Attendance is automatically marked.

↓

### Step 8

Attendance records are stored in the database and displayed in dashboards.

---

# 💡 Advantages

- 🚀 Fully Automated Attendance
- 🎯 High Accuracy Recognition
- ☁️ Cloud-Based Architecture
- 🔒 Secure Authentication
- 📊 Real-Time Analytics
- 📱 Modern Responsive UI
- ⚡ Fast Face Matching
- 🏫 Scalable for Institutions

---

# 🎯 Target Users

- Universities
- Colleges
- Schools
- Coaching Institutes
- Corporate Training Centers

---

# 🚀 Future Enhancements

- Mobile Application
- QR + Face Hybrid Attendance
- Live Classroom Monitoring
- Multi-Camera Recognition
- Face Liveness Detection
- Notifications
- ERP Integration
- AI Attendance Analytics
- Docker & Kubernetes Deployment

---

# 🛠️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Frontend

```bash
cd client
npm install
npm run dev
```

## Install Backend

```bash
cd server
npm install
npm run dev
```

## Install AI Service

```bash
cd aiModel
pip install -r requirements.txt
python app.py
```

---

# 📈 Project Highlights

✅ AI-Powered Face Recognition

✅ Three Independent Services

- Next.js Frontend
- Node.js Backend
- Python AI Service

✅ Cloudinary Image Storage

✅ MongoDB + PostgreSQL

✅ JWT Authentication

✅ REST API Architecture

✅ Responsive Dashboard

✅ Production Deployment

---

# 📢 Conclusion

**AttendX-AI** is a production-ready, AI-driven attendance management platform that combines modern web technologies with computer vision to deliver a secure, accurate, and scalable solution for educational institutions.

Built with a **microservice architecture**, it separates the frontend, backend, and AI engine into independently deployable services, making it easy to scale, maintain, and extend for real-world use.
