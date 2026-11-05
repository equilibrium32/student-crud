# Student CRUD Frontend (Vite + React + Tailwind CSS)

A clean, responsive, and modern frontend for Student Management built with **Vite**, **React (JavaScript)**, and **Tailwind CSS**, designed with an **inline workflow and zero modals**.

Connected to the **Spring Boot Student API** located in `../student`.

---

## 🚀 Running the Frontend

### 1. Navigate to the frontend directory
```bash
cd frontend
```

### 2. Start the development server
```bash
npm run dev
```
*Opens at `http://localhost:3000`.*

---

## 📡 Spring Boot API Endpoints (`student/`)

The backend Spring Boot app is located in `../student` (`com.manco.student.StudentController`):

- **Base URL**: `http://localhost:8080/manco/students` (configurable in `.env`)
- **Student Model**:
  - `id`: Integer (Auto-generated)
  - `firstName`: String
  - `lastName`: String
  - `course`: String
  - `section`: String

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/manco/students` | Get all students |
| `GET` | `/manco/students/{id}` | Get student by ID |
| `POST` | `/manco/students` | Create new student |
| `PUT` | `/manco/students/{id}` | Update existing student |
| `DELETE` | `/manco/students/{id}` | Delete student record |
