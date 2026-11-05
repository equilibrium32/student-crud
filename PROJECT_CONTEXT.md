# Project Context & Handover Guide

> **Repository:** [https://github.com/equilibrium32/student-crud](https://github.com/equilibrium32/student-crud)  
> **Status:** Ready for local development and Render.com deployment.

---

## 🏗️ Architecture Overview

This is a full-stack Student CRUD application consisting of three main parts:

1. **Frontend (`frontend/`)**:
   - **Framework:** React 18 (JavaScript) + Vite 6
   - **Styling:** Tailwind CSS 3
   - **Icons:** Lucide React
   - **Design:** **Zero modals** — fully inline create/edit form, responsive table with real-time search, course filters, and inline delete safety confirmation.
   - **API Client:** Axios client in `frontend/src/api/studentApi.js`, targeting `/manco/students`.
   - **Resilience:** Fallback mode with interactive sample data if backend is offline.

2. **Backend (`student/`)**:
   - **Framework:** Spring Boot 4.1.1 (Java 21)
   - **Entity (`Student.java`):**
     - `id`: Auto-generated Integer
     - `firstName`: String
     - `lastName`: String
     - `course`: String
     - `section`: String
   - **Controller (`StudentController.java`):**
     - Base path: `/manco/students`
     - Cross-Origin: `@CrossOrigin(origins = "*")`
     - Methods: `GET /`, `GET /{id}`, `POST /`, `PUT /{id}`, `DELETE /{id}`
   - **Database:** PostgreSQL (`db_student`) with Hibernate auto-DDL.
   - **Docker:** Multi-stage `student/Dockerfile` for Java 21 container packaging.

3. **Deployment (`render.yaml`)**:
   - Infrastructure-as-Code Blueprint for [Render.com](https://render.com).
   - Provisions:
     - Managed PostgreSQL database (`student-db`)
     - Spring Boot Web Service (`student-backend`)
     - Vite React Static Site (`student-frontend`)

---

## 💻 How to Continue on Another Computer

### Step 1: Clone the Repository
```bash
git clone https://github.com/equilibrium32/student-crud.git
cd student-crud
```

### Step 2: Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:3000`*

### Step 3: Run the Backend (Optional for local testing)
Make sure you have **Java 21** and **PostgreSQL** installed:
```bash
cd student
# On Windows:
.\mvnw.cmd spring-boot:run

# On macOS/Linux:
./mvnw spring-boot:run
```
*Backend runs at: `http://localhost:8080/manco/students`*

---

## 🌐 Deploy to Render.com (1-Click Blueprint)

1. Open [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Select this repo: `equilibrium32/student-crud`.
4. Render reads `render.yaml` and deploys the Database, Backend, and Frontend automatically!

---

## 📝 Key File Locations

- **Frontend App Entry:** `frontend/src/App.jsx`
- **Frontend Form (Inline):** `frontend/src/components/StudentForm.jsx`
- **Frontend Table:** `frontend/src/components/StudentTable.jsx`
- **Frontend API Service:** `frontend/src/api/studentApi.js`
- **Frontend Config:** `frontend/.env` (Points to `http://localhost:8080/manco/students`)
- **Backend Model:** `student/src/main/java/com/manco/student/Student.java`
- **Backend Controller:** `student/src/main/java/com/manco/student/StudentController.java`
- **Backend Properties:** `student/src/main/resources/application.properties`
- **Backend Dockerfile:** `student/Dockerfile`
- **Render Blueprint:** `render.yaml`
