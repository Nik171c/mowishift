# 04_BACKEND.md

# Backend Architecture

**Project:** MowiShift

**Version:** 1.0

**Status:** Active

---

# 1. Overview

The MowiShift backend provides secure, reliable, and scalable services for the frontend application.

It is responsible for:

- business logic
- authentication
- authorization
- database access
- API endpoints
- validation
- notifications
- logging

The backend follows a layered architecture to separate responsibilities and simplify maintenance.

---

# 2. Technology Stack

Backend technologies:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt
- Zod
- Prisma _(future)_

Development tools:

- ESLint
- Prettier
- Nodemon
- Vitest

---

# 3. Backend Goals

The backend must be:

- secure
- modular
- scalable
- testable
- maintainable
- easy to extend

---

# 4. Folder Structure

```text
backend/

src/

config/

controllers/

middlewares/

routes/

services/

repositories/

models/

validators/

utils/

types/

database/

logs/

app.ts

server.ts
```

---

# 5. Architecture

The backend follows a layered architecture.

```text
HTTP Request

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

PostgreSQL
```

Each layer has one responsibility.

---

# 6. Controllers

Controllers:

- receive HTTP requests
- validate request structure
- call services
- return responses

Controllers should never contain business logic.

---

# 7. Services

Services contain business logic.

Examples:

- create shift
- approve request
- assign workstation
- generate statistics

Services communicate with repositories.

---

# 8. Repositories

Repositories communicate with PostgreSQL.

Responsibilities:

- SQL queries
- inserts
- updates
- deletes
- transactions

Business rules must never be placed inside repositories.

---

# 9. Routes

Each module owns its routes.

Example

```text
/auth

/employees

/shifts

/requests

/documents

/statistics

/users
```

Routes should remain small and readable.

---

# 10. Validation

All incoming data must be validated.

Validation uses:

- Zod

Never trust client input.

---

# 11. Authentication

Authentication uses:

- JWT Access Token

Future support:

- Refresh Token
- Session Management

Passwords are never stored in plain text.

---

# 12. Authorization

Access is role-based.

Current roles:

- Administrator
- Employee

Future roles:

- Supervisor
- HR Manager
- Plant Manager

Every endpoint should verify permissions.

---

# 13. Middleware

Middleware responsibilities:

- authentication
- authorization
- validation
- logging
- error handling
- rate limiting

Middleware should be reusable.

---

# 14. Error Handling

Every error should return a consistent response.

Example

```json
{
  "success": false,
  "message": "Employee not found"
}
```

Never expose internal server details.

---

# 15. Logging

Backend logs should include:

- requests
- errors
- warnings
- security events

Future support:

- Winston
- Pino

---

# 16. Configuration

Environment variables are stored in:

```
.env
```

Examples

```
PORT

DATABASE_URL

JWT_SECRET

JWT_EXPIRES_IN
```

Secrets must never be committed to Git.

---

# 17. API Response Format

Successful response

```json
{
  "success": true,
  "data": {}
}
```

Error response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

Every endpoint should use a consistent response structure.

---

# 18. File Uploads

Future support:

- employee avatars
- documents
- certificates

Uploaded files should be:

- validated
- virus scanned (future)
- securely stored

---

# 19. Notifications

Future notification system:

- in-app notifications
- email
- push notifications
- SMS (optional)

Notification logic belongs in services.

---

# 20. Background Jobs

Future background tasks:

- scheduled reminders
- report generation
- cleanup tasks
- notification delivery

Background jobs should never block HTTP requests.

---

# 21. Security

The backend must implement:

- JWT authentication
- password hashing
- input validation
- SQL injection protection
- CORS
- Helmet
- rate limiting

Security is required for every endpoint.

---

# 22. Database Access

Repositories are the only layer allowed to access the database.

Controllers must never execute SQL queries.

Services must never contain SQL statements.

---

# 23. Transactions

Transactions are required for operations involving multiple database changes.

Example

```text
Create Shift

↓

Assign Employee

↓

Create Notification

↓

Audit Log
```

If one step fails, all changes must be rolled back.

---

# 24. Performance

Backend performance should prioritize:

- efficient SQL queries
- indexing
- pagination
- caching (future)
- asynchronous processing

Avoid unnecessary database requests.

---

# 25. Future Scalability

The backend should support:

- multiple factories
- multiple organizations
- multiple languages
- REST API versioning
- WebSocket communication
- AI scheduling services
- microservices (future)

---

# 26. Development Rules

Every new module should include:

- route
- controller
- service
- repository
- validator
- types

This structure must remain consistent across the project.

---

# 27. Backend Principles

Before implementing a new feature, verify:

- Is the business logic inside a service?
- Is validation performed?
- Is authorization required?
- Is the endpoint secure?
- Does it follow the project architecture?
- Is the code reusable?
- Is it easy to test?

If the answer to any question is "No", redesign the implementation before writing code.
