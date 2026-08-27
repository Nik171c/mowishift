# 04_DATABASE.md

# Database Architecture

**Project:** MowiShift

**Version:** 1.0

**Status:** Active

---

# 1. Overview

MowiShift uses **PostgreSQL** as its primary relational database.

The database is designed to be:

- scalable
- secure
- normalized
- maintainable
- optimized for performance

All business data is stored in PostgreSQL.

---

# 2. Database Goals

The database must:

- maintain data integrity
- eliminate unnecessary duplication
- support high performance
- be easy to extend
- support future enterprise features

---

# 3. Database Technology

Database Engine

```
PostgreSQL
```

Future support:

- Read Replicas
- Database Clustering
- Automatic Backups
- High Availability

---

# 4. Database Principles

Every table must:

- have a primary key
- use foreign keys
- use indexes where appropriate
- avoid duplicated data
- follow naming conventions

---

# 5. Naming Conventions

Tables

```
employees

departments

shifts

requests
```

Always use:

- lowercase
- plural
- snake_case

---

Columns

```
first_name

last_name

created_at

updated_at
```

Never use spaces or camelCase.

---

Primary Keys

```
id UUID
```

Every table uses UUID.

---

Foreign Keys

```
employee_id

department_id

shift_id
```

---

# 6. Core Tables

The MVP database contains the following entities.

---

## Users

Authentication information.

---

## Employees

Employee profile information.

---

## Departments

Production departments.

Examples:

- Blue
- Red
- Fillet

---

## Workstations

Machine or manual stations.

Examples:

- Manual
- A1
- A2
- A3
- A4
- A5

---

## Break Groups

Break planning.

Examples:

Pause 1

Pause 2

Pause 3

Pause 4

Pause 5

---

## Shifts

Employee schedules.

Contains:

- employee
- date
- start time
- end time
- department
- workstation
- break group

---

## Requests

Employee requests.

Examples:

- vacation
- sick leave
- shift swap
- unavailable
- overtime

---

## Documents

Company documents.

Examples:

- certificates
- instructions
- policies

---

## Notifications

System notifications.

---

## Messages

Chat between administrator and employees.

---

## Roles

Application roles.

Examples

Administrator

Employee

Future:

Supervisor

HR Manager

---

# 7. Relationships

Main relationships

```
Department

↓

Employees

↓

Shifts

↓

Requests
```

Every relationship should use foreign keys.

---

# 8. Data Types

Preferred types

```
UUID

TEXT

VARCHAR

BOOLEAN

INTEGER

DATE

TIME

TIMESTAMP

JSONB
```

Avoid storing structured data inside TEXT.

---

# 9. Audit Fields

Every business table contains

```
id

created_at

updated_at
```

Optional

```
created_by

updated_by
```

---

# 10. Soft Deletes

Business data should not be permanently deleted.

Preferred column

```
deleted_at
```

If NULL

Record is active.

---

# 11. Constraints

Use constraints whenever possible.

Examples

- NOT NULL
- UNIQUE
- CHECK
- FOREIGN KEY

The database should enforce business rules.

---

# 12. Indexes

Create indexes for

- foreign keys
- frequently searched columns
- sorting columns
- filtering columns

Avoid unnecessary indexes.

---

# 13. Transactions

Transactions must be used when multiple related operations occur.

Example

```
Create Shift

↓

Assign Employee

↓

Create Notification

↓

Write Audit Log
```

Either all operations succeed or none.

---

# 14. Migrations

Schema changes must be managed using migrations.

Never edit production tables manually.

Migration files should be version controlled.

---

# 15. Backups

Database backups should be:

- automatic
- encrypted
- regularly tested

Retention policy should be configurable.

---

# 16. Security

Sensitive information should never be stored as plain text.

Passwords must always be hashed.

Personal information should be protected according to applicable privacy regulations.

---

# 17. Performance

Optimize using:

- indexes
- query optimization
- pagination
- efficient joins

Avoid unnecessary full table scans.

---

# 18. Future Scalability

The database should support:

- multiple factories
- multiple organizations
- multiple locations
- multiple countries
- multi-language content
- tenant isolation (future SaaS)

---

# 19. Entity Overview

```
Users
│
├── Employees
│
├── Roles
│
├── Departments
│
├── Workstations
│
├── Break Groups
│
├── Shifts
│
├── Requests
│
├── Documents
│
├── Messages
│
└── Notifications
```

---

# 20. Database Standards

Every table must:

- use UUID primary keys
- include audit fields
- use foreign keys
- support indexing
- follow naming conventions
- support future scalability

The database should remain normalized, secure, and easy to maintain throughout the lifetime of the project.
