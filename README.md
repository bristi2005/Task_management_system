# 🚀 Production-Ready Task Management System

A high-performance, secure, and scalable Task Management System designed for small companies. This system enables users to efficiently manage daily tasks, track productivity, and monitor deadlines through a modern interface.

---

## 🏗️ Architecture Overview

The project follows a **Decoupled Client-Server Architecture** ensuring modularity and scalability.

### Frontend (Flutter)
We follow **Clean Architecture + Feature-Based Structure**. This ensures that the UI remains decoupled from business logic and data sources.
- **Presentation Layer**: Widgets and State Management using **Riverpod**.
- **Domain Layer**: Pure business logic, Entities (Task, User), and Repository Interfaces.
- **Data Layer**: Repository implementations, Data Sources (Dio for REST API), and Local Storage (Flutter Secure Storage).

### Backend (Node.js + TypeScript)
The backend uses a **Layered Architecture** (Controller-Service-Repository pattern).
- **Controllers**: Handle HTTP requests and validate input using **Zod**.
- **Services**: Contain the core business logic, ensuring it's independent of the database or transport layer.
- **Repositories**: Abstract database operations using **Prisma ORM**.

---

## 🗄️ Database Schema

The system uses a relational schema designed for performance with appropriate indexing.

### Entities & Relations
- **User**: Stores profile information and credentials. One User can have multiple Tasks.
- **Task**: Stores task details including status and priority. Belongs to a single User.

### Schema Visual
```prisma
model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  passwordHash  String
  tasks         Task[]
  createdAt     DateTime @default(now())
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  priority    Priority @default(MEDIUM) // LOW, MEDIUM, HIGH, URGENT
  status      Status   @default(PENDING) // PENDING, IN_PROGRESS, COMPLETED
  dueDate     DateTime
  userId      String   // Foreign Key
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 🛠️ Technology Stack

 Layer | Technology |
---|---|
 **Frontend** | Flutter, Dart, Riverpod, GoRouter, Dio, Freezed |
 **Backend** | Node.js, Express, TypeScript, Prisma ORM |
 **Database** | PostgreSQL (Production) / SQLite (Development) |
 **Security** | JWT, Bcrypt, Helmet, Express Rate Limit |
 **DevOps** | Docker, Docker Compose |

---

## 📁 Folder Structure

```text
lib/
├── core/               # App-wide configurations (Router, Theme, Network)
├── features/           # Feature-based modules (auth, dashboard, tasks)
│   └── <feature>/
│       ├── data/       # Repositories & Data Sources
│       ├── domain/     # Entities & Use Cases
│       └── presentation/ # UI & Providers
├── shared/             # Reusable widgets and models
└── main.dart           # App entry point

backend/
├── src/
│   ├── controllers/    # Request handling & Validation
│   ├── services/       # Business logic
│   ├── repositories/   # Database access
│   ├── middleware/     # Auth & Security
│   └── app.ts          # Server entry point
├── prisma/             # Database schema & Migrations
└── .env                # Environment variables
```

---

## 🚀 Setup Instructions

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` based on `.env.example`.
4. Run migrations: `npx prisma migrate dev`
5. Start server: `npm run dev`

### Frontend Setup
1. `flutter pub get`
2. Run code generation: `flutter pub run build_runner build --delete-conflicting-outputs`
3. Launch app: `flutter run`

---

## 🧠 Engineering Assumptions & Logic
1.  **Data Privacy**: Tasks are strictly private. The backend implements Row-Level Security (RLS) concepts via middleware to ensure users can only access their own data.
2.  **Overdue Logic**: A task is flagged as "Overdue" if:
    *   `status != COMPLETED`
    *   `current_time > dueDate`
3.  **Time Management**: All timestamps are handled in **UTC** on the backend and database. The frontend is responsible for localizing the display time for the user.
4.  **Security**: 
    *   JWT tokens are stored in **Secure Storage** on mobile devices.
    *   Sensitive data (passwords) are never returned in API responses.
5.  **Connectivity**: The current version assumes a stable internet connection. REST responses are cached in memory for the duration of the session, but persistent offline-first sync is a roadmap item.

---

## 🚧 Challenges Faced
- **State Synchronization**: Using Riverpod's `ref.invalidate` to ensure the Dashboard and Task List stay in sync after mutations.
- **Form Validation**: Implementing cross-platform consistent validation using Zod on the backend and custom validators in Flutter.
- **Auth Guarding**: Leveraging GoRouter's `redirect` logic to handle authenticated/unauthenticated navigation flows seamlessly.

---

## 🔮 Future Improvements
- **Push Notifications**: Reminders for upcoming and overdue tasks.
- **Role-Based Access (RBAC)**: Team management and task assignment.
- **Offline Mode**: Local caching and background synchronization using SQLite.
- **Collaborative Tasks**: Shared lists and comments for team-based projects.
