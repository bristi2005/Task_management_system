# 🚀 Production-Ready Task Management System

A high-performance, secure, and scalable Task Management System designed for small companies. This system enables users to efficiently manage daily tasks, track productivity, and monitor deadlines through a modern interface.

---

## 🏗️ Architecture Explanation

### Frontend (Flutter)
We follow **Clean Architecture + Feature-Based Structure**. This ensures that the UI remains decoupled from business logic and data sources.
- **Presentation Layer**: Widgets and Controllers (Riverpod) handling UI state and user interactions.
- **Domain Layer**: Entities and business rules (e.g., Task and User models).
- **Data Layer**: Repositories and Data Sources (Dio for APIs, Secure Storage for tokens).

### Backend (Node.js + TypeScript)
The backend uses a **Layered Architecture** (Controller-Service-Repository pattern).
- **Controllers**: Handle HTTP requests and validate input using Zod.
- **Services**: Contain the core business logic.
- **Repositories**: Abstract database operations using Prisma ORM.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | Flutter, Dart, Riverpod, GoRouter, Dio, Freezed |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM |
| **Database** | PostgreSQL |
| **Security** | JWT, Bcrypt, Helmet, Express Rate Limit |
| **DevOps** | Docker, Docker Compose |

---

## 📁 Folder Structure

```text
lib/
├── core/               # App-wide configurations (Router, Theme, Network)
├── features/           # Feature-based modules
│   ├── authentication/ # Login, user sessions
│   ├── dashboard/      # Analytics and overview
│   └── tasks/          # Task CRUD, search, and filtering
├── shared/             # Reusable widgets and models
└── main.dart           # App entry point

backend/
├── src/
│   ├── controllers/    # Request handling
│   ├── services/       # Business logic
│   ├── repositories/   # Database access
│   ├── middleware/     # Auth & Security
│   └── app.ts          # Server entry point
├── prisma/             # Database schema
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

## 🧠 Engineering Assumptions
1. **Privacy**: Tasks are private to the authenticated user who created them.
2. **Overdue Logic**: A task is only "Overdue" if its status is not "Completed" and the current time is past the due date.
3. **Timezones**: All dates are stored and processed in UTC.
4. **Connectivity**: The app assumes a stable internet connection for most operations (offline sync is a future improvement).

---

## 🚧 Challenges Faced
- **State Synchronization**: Ensuring the Dashboard stats update immediately when a task is completed or deleted in the list view. This was solved using Riverpod's `ref.invalidate` and `ref.watch` patterns.
- **Secure Persistence**: Implementing a seamless "Remember Me" flow while keeping the JWT token encrypted in platform-specific secure storage.
- **Responsive Navigation**: Designing a GoRouter configuration that handles deep linking and redirect logic based on the authentication state.

---

## 🔮 Future Improvements
- **Push Notifications**: Reminders for upcoming and overdue tasks.
- **Role-Based Access (RBAC)**: Manager roles to assign tasks to team members.
- **Offline Mode**: Local caching and background synchronization using SQLite.
- **Collaborative Tasks**: Shared lists and comments for team-based projects.
- **Attachment Support**: Uploading files or images directly to tasks.
