# 04_FRONTEND.md

# Frontend Architecture

**Project:** MowiShift

**Version:** 1.0

**Status:** Active

---

# 1. Overview

The frontend of MowiShift is built as a modern, scalable React application using Feature-Sliced Design (FSD).

The primary goals are:

- scalability
- maintainability
- performance
- accessibility
- developer experience
- clean architecture

Every feature should be easy to understand, test, and extend.

---

# 2. Technology Stack

Frontend technologies:

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Radix UI
- Lucide React

Only approved libraries may be added to the project.

---

# 3. Project Structure

```
src/

app/
pages/
widgets/
features/
entities/
shared/
```

Each layer has a specific responsibility.

Dependencies always flow downward.

```
App
↓

Pages
↓

Widgets
↓

Features
↓

Entities
↓

Shared
```

Higher layers may import lower layers.

Lower layers must never import higher layers.

---

# 4. App Layer

Responsible for application initialization.

Contains:

```
router/
providers/
styles/
config/
```

Responsibilities:

- Router
- Global Providers
- Theme
- Error Boundary
- Query Client
- Application bootstrap

---

# 5. Pages Layer

Represents application screens.

Examples:

```
Dashboard
Employees
Planner
Requests
Statistics
Settings
```

Pages compose widgets.

Pages should contain minimal business logic.

---

# 6. Widgets Layer

Widgets combine multiple features.

Examples:

```
DashboardHeader

EmployeeTable

ShiftCalendar

StatisticsCards

RecentRequests
```

Widgets organize complex UI sections.

---

# 7. Features Layer

Contains user actions.

Examples:

```
Create Shift

Edit Shift

Approve Request

Reject Request

Upload Document

Edit Employee
```

Business logic related to user interactions belongs here.

---

# 8. Entities Layer

Represents business objects.

Examples:

```
Employee

Shift

Department

Request

Notification

Document
```

Each entity contains:

```
api/

model/

types/

ui/

lib/
```

---

# 9. Shared Layer

Reusable resources.

Contains:

```
api/

config/

constants/

hooks/

lib/

theme/

types/

ui/

utils/
```

Shared should never depend on higher layers.

---

# 10. Routing

Routing is handled using React Router.

Routes are registered only inside:

```
app/router/
```

Pages own routes.

Features never define routes.

---

# 11. State Management

## Local State

Use

```
useState
```

for component-local state.

---

## Shared UI State

Use

```
Zustand
```

Examples:

- sidebar
- dialogs
- filters
- theme
- language

Do not store server data inside Zustand.

---

## Server State

Use

```
TanStack Query
```

for:

- fetching
- caching
- mutations
- synchronization
- background updates

Never replace Query with useEffect.

---

# 12. Forms

All forms use:

- React Hook Form
- Zod

Validation must always be schema-based.

Never validate forms manually.

---

# 13. Component Rules

Every component should:

- have a single responsibility
- be reusable
- be typed
- support accessibility
- avoid duplicated logic

---

# 14. Component Structure

Every component follows the same order:

```tsx
Imports;

Types;

Constants;

Hooks;

Component;

Export;
```

---

# 15. Naming Conventions

Files

```
employee-card.tsx
```

Components

```
EmployeeCard
```

Hooks

```
useEmployees()
```

Types

```
Employee
```

Interfaces

```
EmployeeCardProps
```

Enums

```
ShiftStatus
```

---

# 16. Imports

Always prefer absolute imports.

Correct

```tsx
import { Button } from "@/shared/ui";
```

Incorrect

```tsx
import Button from "../../../shared/ui/button";
```

---

# 17. Styling

The project uses:

- Tailwind CSS v4

Avoid:

- inline styles
- CSS frameworks
- duplicated utility classes

Use the shared `cn()` helper when combining class names.

---

# 18. Design System

Only Nordic UI components may be used.

Correct

```tsx
<Button />

<Card />

<Input />
```

Avoid creating duplicate UI components.

---

# 19. Hooks

Custom hooks belong inside:

```
shared/hooks/

or

entities/*/model/
```

Hooks must:

- begin with use
- be reusable
- avoid UI rendering

---

# 20. Error Handling

Errors should be handled gracefully.

Never expose raw server errors.

Provide:

- friendly message
- retry action
- fallback UI

---

# 21. Loading States

Every asynchronous operation should display loading feedback.

Supported loading types:

- spinner
- skeleton
- overlay
- page loading

Avoid empty screens during loading.

---

# 22. Empty States

Every empty page should include:

- icon
- title
- description
- primary action

Never display blank pages.

---

# 23. Performance

Use optimization only when necessary.

Preferred tools:

- React.memo
- useMemo
- useCallback

Avoid premature optimization.

---

# 24. Accessibility

Every interactive element must support:

- keyboard navigation
- focus indicators
- screen readers
- ARIA attributes
- sufficient contrast

Accessibility is mandatory.

---

# 25. Internationalization

Application text should support multiple languages.

User-facing text must not be hardcoded inside reusable components.

Translations should be stored separately.

---

# 26. Icons

Use only:

```
Lucide React
```

Recommended sizes:

```
16
20
24
```

Icons should communicate meaning without replacing text.

---

# 27. File Organization

Keep files focused.

Avoid files larger than approximately 300–400 lines unless there is a clear reason.

Extract reusable logic into hooks or utilities when appropriate.

---

# 28. Code Quality

Every new module should be:

- strongly typed
- documented when necessary
- easy to read
- reusable
- maintainable

Readable code is preferred over clever code.

---

# 29. Future Scalability

The frontend architecture should support:

- multiple factories
- multiple organizations
- dark mode
- white-label deployments
- offline mode
- mobile applications
- AI-powered features

Architecture decisions should not unnecessarily limit future growth.

---

# 30. Development Principles

Before implementing a feature, verify:

- Does it belong to the correct FSD layer?
- Can it be reused?
- Is the code strongly typed?
- Does it follow Nordic UI?
- Does it follow accessibility guidelines?
- Is it easy to maintain?
- Would another developer understand it quickly?

If the answer is "No" to any of these questions, redesign the solution before implementation.
