# 07_API.md

# API Specification

**Project:** MowiShift

**Version:** 1.0

**Status:** Active

---

# 1. Overview

The MowiShift API provides communication between the frontend application and the backend services.

The API follows REST principles and exchanges data using JSON.

Every endpoint must be:

- secure
- predictable
- versioned
- documented
- validated

---

# 2. Base URL

Development

```text
http://localhost:5000/api/v1
```

Production

```text
https://api.mowishift.com/v1
```

Every endpoint begins with:

```text
/api/v1
```

Future versions:

```text
/api/v2
```

---

# 3. Content Type

Requests

```http
Content-Type: application/json
```

Responses

```http
Content-Type: application/json
```

---

# 4. Authentication

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

Public endpoints do not require authentication.

---

# 5. API Principles

Every endpoint must:

- return JSON
- validate input
- validate permissions
- return consistent responses
- return appropriate HTTP status codes

---

# 6. Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

## Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

# 7. HTTP Methods

Use the correct HTTP method for every action.

| Method | Purpose          |
| ------ | ---------------- |
| GET    | Retrieve data    |
| POST   | Create resource  |
| PUT    | Replace resource |
| PATCH  | Update resource  |
| DELETE | Remove resource  |

---

# 8. Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# 9. API Modules

The API is divided into modules.

```
Authentication

Users

Employees

Departments

Shifts

Requests

Documents

Messages

Notifications

Statistics
```

---

# 10. Authentication Endpoints

```
POST /auth/login

POST /auth/logout

POST /auth/refresh

GET /auth/me
```

---

# 11. Users

```
GET /users

GET /users/:id

POST /users

PATCH /users/:id

DELETE /users/:id
```

---

# 12. Employees

```
GET /employees

GET /employees/:id

POST /employees

PATCH /employees/:id

DELETE /employees/:id
```

---

# 13. Departments

```
GET /departments

POST /departments

PATCH /departments/:id

DELETE /departments/:id
```

---

# 14. Shifts

```
GET /shifts

GET /shifts/:id

POST /shifts

PATCH /shifts/:id

DELETE /shifts/:id
```

Additional endpoints

```
GET /shifts/calendar

GET /shifts/today

GET /shifts/week

GET /shifts/month
```

---

# 15. Requests

```
GET /requests

POST /requests

PATCH /requests/:id

DELETE /requests/:id
```

Approval

```
PATCH /requests/:id/approve

PATCH /requests/:id/reject
```

---

# 16. Documents

```
GET /documents

GET /documents/:id

POST /documents

PATCH /documents/:id

DELETE /documents/:id
```

---

# 17. Messages

```
GET /messages

POST /messages
```

Future

```
WebSocket

Real-time chat

Typing indicator

Read receipts
```

---

# 18. Notifications

```
GET /notifications

PATCH /notifications/:id/read

DELETE /notifications/:id
```

---

# 19. Statistics

```
GET /statistics/dashboard

GET /statistics/employees

GET /statistics/departments

GET /statistics/overtime

GET /statistics/attendance
```

---

# 20. Query Parameters

Filtering

```
?department=Fillet
```

Sorting

```
?sort=name
```

Ordering

```
?order=asc
```

Searching

```
?search=John
```

Pagination

```
?page=1

&limit=20
```

Example

```
GET /employees?page=1&limit=20&search=John
```

---

# 21. Pagination

Example

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

# 22. Sorting

Supported parameters

```
sort

order
```

Example

```
GET /employees?sort=lastName&order=asc
```

---

# 23. Filtering

Examples

```
department

role

status

date

workstation

breakGroup
```

Multiple filters are supported.

---

# 24. Validation

Every request must be validated before reaching the business logic.

Validation includes:

- required fields
- data types
- formats
- ranges
- permissions

---

# 25. Error Handling

Every error response should include:

```json
{
  "success": false,
  "message": "Readable error message"
}
```

Do not expose:

- SQL errors
- stack traces
- internal server information

---

# 26. API Versioning

Current version

```
v1
```

Future versions

```
v2

v3
```

Breaking changes require a new API version.

---

# 27. Rate Limiting

Future implementation:

```
100 requests/minute
```

Rate limits help protect the API from abuse.

---

# 28. Security

Every endpoint must:

- validate JWT
- validate permissions
- sanitize input
- validate request body
- validate query parameters

---

# 29. Performance

The API should support:

- pagination
- filtering
- sorting
- indexing
- response caching (future)
- compression

Avoid returning unnecessary data.

---

# 30. Documentation

Every endpoint must include:

- description
- request example
- response example
- status codes
- authentication requirements
- validation rules

API documentation should be generated using OpenAPI (Swagger) in future versions.

---

# 31. Future Improvements

Planned API enhancements:

- OpenAPI / Swagger documentation
- WebSocket support
- Server-Sent Events (SSE)
- GraphQL gateway (optional)
- Bulk operations
- Batch endpoints
- API analytics
- API monitoring

---

# 32. API Principles

Before creating a new endpoint, verify:

- Does the endpoint follow REST conventions?
- Is authentication required?
- Is authorization enforced?
- Is input validated?
- Are HTTP status codes correct?
- Is the response consistent?
- Can the endpoint scale efficiently?

If the answer to any question is "No", redesign the endpoint before implementation.
