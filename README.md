# Student CRUD (Full-Stack Application)

A full-stack Student Management System featuring a **Vite + React (JavaScript) + Tailwind CSS** frontend and a **Spring Boot (Java 21) + PostgreSQL** backend, pre-configured for one-click deployment on **Render.com**.

---

## 📂 Project Structure

```text
student-crud/
├── frontend/               # Vite React + Tailwind CSS (No Modals UI)
│   ├── src/
│   │   ├── api/studentApi.js
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
├── student/                # Spring Boot (Java 21) Backend
│   ├── src/main/java/com/manco/student/
│   │   ├── Student.java
│   │   └── StudentController.java
│   ├── Dockerfile          # Production container setup
│   └── pom.xml
│
├── render.yaml             # Render.com Blueprint (DB + Backend + Frontend)
└── PROJECT_CONTEXT.md      # Full setup & handover documentation
```

---

## ⚡ Quick Start

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 2. Backend
```bash
cd student
./mvnw spring-boot:run
```

See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for full deployment instructions and architecture details.
