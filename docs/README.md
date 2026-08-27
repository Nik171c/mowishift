# MowiShift

Modern Workforce Scheduling & Employee Management Platform

---

## Overview

MowiShift is a modern Software-as-a-Service (SaaS) platform designed to simplify workforce scheduling, employee management, and internal communication for shift-based organizations.

Originally inspired by the needs of seafood processing facilities, MowiShift is being developed as a scalable solution that can support manufacturing, logistics, food production, and other industries operating with shift schedules.

The platform focuses on providing a fast, intuitive, and reliable experience for both administrators and employees.

---

## Vision

To build a modern, scalable, and intelligent workforce management platform that helps organizations optimize shift planning, improve communication, and increase operational efficiency.

---

## Mission

Reduce manual scheduling, eliminate unnecessary paperwork, and provide employees with real-time access to work schedules, requests, and company information.

---

## Key Features

### Dashboard

- Workforce overview
- Active employees
- Today's shifts
- Pending requests
- Statistics

---

### Employee Management

- Employee profiles
- Search and filtering
- Departments
- Workstations
- Employment history

---

### Shift Planner

- Calendar view
- Create and edit shifts
- Department assignment
- Workstation assignment
- Break groups
- Extra shifts

---

### Requests

- Vacation requests
- Sick leave
- Shift swaps
- Overtime requests
- Approval workflow

---

### Statistics

- Working hours
- Attendance
- Overtime
- Department reports
- Employee performance

---

### Documents

- Company policies
- Instructions
- Certificates
- Employee documents

---

### Notifications

- In-app notifications
- Future email notifications
- Future push notifications

---

### Chat

Direct communication between administrators and employees.

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Radix UI
- Lucide React

---

### Backend

- Node.js
- Express
- PostgreSQL
- JWT Authentication

---

## Architecture

The project follows **Feature-Sliced Design (FSD)**.

```
src/

app/

pages/

widgets/

features/

entities/

shared/
```

More information:

- `docs/02_ARCHITECTURE.md`

---

## Design System

MowiShift uses its own design system:

**Nordic UI**

Features:

- reusable components
- accessibility
- responsive design
- consistent UI
- long-term maintainability

Documentation:

- `docs/03_NORDIC_UI.md`

---

## Project Structure

```
mowishift/

docs/

backend/

src/

public/

package.json

README.md
```

---

## Documentation

Project documentation:

```
docs/

00_PROJECT.md

01_PRODUCT.md

02_ARCHITECTURE.md

03_NORDIC_UI.md

04_FRONTEND.md

05_BACKEND.md

06_DATABASE.md

07_API.md

08_SECURITY.md

09_DEPLOYMENT.md

10_ROADMAP.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/mowishift.git
```

---

### Install dependencies

```bash
npm install
```

---

### Start the frontend

```bash
npm run dev
```

---

### Start the backend

```bash
cd backend

npm install

npm run dev
```

---

## Environment Variables

Example:

```
PORT=

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=
```

Do not commit `.env` files to the repository.

---

## Development Principles

The project follows these principles:

- Clean Architecture
- Feature-Sliced Design
- SOLID principles
- Reusable Components
- Accessibility First
- Mobile First
- Type Safety
- Performance
- Maintainability

---

## Coding Standards

- TypeScript only
- Strong typing
- No duplicated code
- No hardcoded values
- Reusable components
- Consistent naming
- Absolute imports
- ESLint
- Prettier

---

## Roadmap

Planned features include:

- Mobile application
- AI Scheduling Assistant
- Smart Workforce Planning
- Push Notifications
- Multi-company support
- Enterprise edition
- Real-time synchronization
- Offline mode
- Progressive Web App (PWA)

See:

```
docs/10_ROADMAP.md
```

---

## Contributing

Please read the project documentation before contributing.

All code must follow:

- Architecture guidelines
- Nordic UI standards
- Coding conventions
- Security requirements

---

## License

This project is currently proprietary.

All rights reserved.

No part of this project may be copied, distributed, or modified without permission from the project owner.

---

## Author

**Yuliia Nosachova**

Project Founder & Product Owner

---

## Status

**Current Version**

```
1.0.0
```

**Project Status**

🚧 Active Development

---

## MowiShift Philosophy

> Build software that is simple for users, powerful for administrators, and maintainable for developers.

---

Made with ❤️ using React, TypeScript, PostgreSQL and Nordic UI.
