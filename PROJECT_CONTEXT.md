# Project Context & Handover Guide

> **Repository:** [https://github.com/equilibrium32/student-crud](https://github.com/equilibrium32/student-crud)  
> **Status:** Fully prepared and configured for Render.com deployment and local development.

---

## 🏗️ Architecture Overview

This is a full-stack Student CRUD application consisting of three main parts:

1. **Frontend (`frontend/`)**:
   - **Framework:** React 18 (JavaScript) + Vite 6
   - **Styling:** Tailwind CSS 3
   - **Icons:** Lucide React
   - **Design:** **Zero modals** — fully inline create/edit form, responsive table with real-time search, course filters, and inline delete safety confirmation.
   - **API Client:** Axios client in `frontend/src/api/studentApi.js`, targeting `/manco/students`.
   - **Auto-Discovery:** Dynamically supports Render's `VITE_API_HOST` from Blueprints, `VITE_API_BASE_URL` overrides, and localhost.
   - **Resilience:** Fallback mode with interactive sample data if backend is offline.

2. **Backend (`student/`)**:
   - **Framework:** Spring Boot 4.1.1 (Java 21)
   - **Entity (`Student.java`):**
     - `id`: Auto-generated Integer
     - `firstName`: String
     - `lastName`: String
     - `course`: String
     - `section`: String
   - **Controller (`StudentController.java` & `HealthController.java`):**
     - Base path: `/manco/students`
     - Health & Root: `/` and `/health` for uptime checks and Render pinging
     - Cross-Origin: `@CrossOrigin(origins = "*")`
     - Methods: `GET /`, `GET /{id}`, `POST /`, `PUT /{id}`, `DELETE /{id}`
   - **Database:** PostgreSQL (`db_student`) with Hibernate auto-DDL and SSL support (`sslmode=require`).
   - **Render Optimization:** JVM flags tuned for Render Free Tier (512MB RAM):
     `-XX:MaxRAMPercentage=65 -XX:+UseSerialGC -Xss512k -XX:ReservedCodeCacheSize=48m`
   - **Docker:** Multi-stage `student/Dockerfile` for Java 21 container packaging with LF newline sanitation.

3. **Deployment (`render.yaml`)**:
   - Infrastructure-as-Code Blueprint for [Render.com](https://render.com).
   - Provisions:
     - Managed PostgreSQL database (`student-db`)
     - Spring Boot Web Service (`student-backend`)
     - Vite React Static Site (`student-frontend`)

---

## 💻 How to Run Locally

### Step 1: Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:3000`*

### Step 2: Run the Backend
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

## 🌐 Deploy to Render.com (Blueprint Guide)

### Step 1: Push Project to GitHub
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: prepare project for Render.com deployment"
   ```
2. Link your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/student-crud.git
   git push -u origin main
   ```

### Step 2: Deploy on Render
1. Open [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository (`<your-username>/student-crud`).
4. Render will read `render.yaml` and show the 3 resources:
   - `student-db` (PostgreSQL)
   - `student-backend` (Docker Web Service)
   - `student-frontend` (Static Site)
5. Click **Apply**.
6. Render deploys everything in the correct order:
   - DB is created first.
   - Backend spins up and auto-connects to DB via SSL (`sslmode=require`).
   - Frontend builds and links to the backend URL via `fromService`.

---

## 📝 Key File Locations

- **Frontend App Entry:** `frontend/src/App.jsx`
- **Frontend Form (Inline):** `frontend/src/components/StudentForm.jsx`
- **Frontend Table:** `frontend/src/components/StudentTable.jsx`
- **Frontend API Service:** `frontend/src/api/studentApi.js`
- **Frontend Config:** `frontend/.env`
- **Backend Model:** `student/src/main/java/com/manco/student/Student.java`
- **Backend Controller:** `student/src/main/java/com/manco/student/StudentController.java`
- **Backend Health:** `student/src/main/java/com/manco/student/HealthController.java`
- **Backend Properties:** `student/src/main/resources/application.properties`
- **Backend Dockerfile:** `student/Dockerfile`
- **Render Blueprint:** `render.yaml`
