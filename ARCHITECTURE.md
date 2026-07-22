# 🏗️ Architecture Overview - Task Management System

This document provides a detailed overview of the architectural decisions and patterns used in the Task Management System.

## 📌 High-Level Overview
The project follows a **Client-Server Architecture** with a decoupled frontend and backend.
- **Frontend**: A cross-platform Flutter application.
- **Backend**: A RESTful API built with Node.js and TypeScript.
- **Database**: A relational PostgreSQL database managed via Prisma ORM.
- **Infrastructure**: Containerized using Docker for consistent development and deployment environments.

---

## 📱 Frontend Architecture (Flutter)

The frontend is built using **Clean Architecture** principles combined with a **Feature-First** folder structure. This promotes scalability, testability, and clear separation of concerns.

### 📂 Folder Structure
```text
lib/
├── core/               # App-wide configurations (Network, Router, Theme)
├── shared/             # Reusable UI components and base models
└── features/           # Independent feature modules
    ├── <feature_name>/
    │   ├── data/       # DTOs, Data Sources, Repository Implementations
    │   ├── domain/     # Entities, Repository Interfaces, Use Cases
    │   └── presentation/ # Widgets and State Management (Riverpod)
```

### 🛠️ Key Technologies & Patterns
- **State Management**: **Riverpod** is used for its compile-time safety and provider-based dependency injection.
- **Routing**: **GoRouter** manages deep linking and navigation state, especially for auth-protected routes.
- **Networking**: **Dio** is used for HTTP requests, configured with interceptors for JWT injection and error handling.
- **Data Persistence**: **Flutter Secure Storage** handles sensitive tokens, while local caching is planned for future iterations.

---

## ⚙️ Backend Architecture (Node.js)

The backend follows a **Layered Architecture** (Controller-Service-Repository pattern).

### 🏛️ Layers
1.  **Controller Layer**: Handles HTTP requests, extracts parameters, and performs input validation using **Zod**.
2.  **Service Layer**: Contains the core business logic. This layer is independent of the transport mechanism (HTTP) and the database implementation.
3.  **Repository Layer**: Encapsulates all database interactions using **Prisma ORM**. This allows for easy switching of database engines if needed.

### 🔒 Security & Middleware
- **Authentication**: JWT (JSON Web Tokens) for stateless session management.
- **Password Hashing**: Bcrypt for secure storage of user credentials.
- **Middleware**: Custom middleware for request logging, error handling, and authorization checks.
- **Protection**: `Helmet` for security headers and `Express Rate Limit` to prevent brute-force attacks.

---

## 🗄️ Data Flow

1.  **User Action**: User interacts with a Flutter widget.
2.  **State Update**: A Riverpod `Notifier` or `Provider` is triggered.
3.  **Data Request**: The `Repository` implementation makes a `Dio` request to the backend.
4.  **API Handling**: The backend `Controller` receives the request and validates it.
5.  **Logic Execution**: The `Service` executes business rules.
6.  **DB Operation**: The `Repository` uses `Prisma` to fetch or modify data in **PostgreSQL**.
7.  **Response**: Data flows back up through the layers, updating the UI state reactively.

---

## 🐳 Infrastructure

- **Docker**: Used to containerize the Node.js environment and the PostgreSQL database.
- **Docker Compose**: Orchestrates the multi-container setup, ensuring that the backend can reliably connect to the database within the virtual network.

---

## 🧠 Design Principles
- **DRY (Don't Repeat Yourself)**: Shared widgets and utility classes are centralized in the `core` and `shared` directories.
- **SOLID**: Each class has a single responsibility, and dependencies are injected rather than hardcoded.
- **Scalability**: New features can be added by creating a new directory in `features/` without affecting existing code.
