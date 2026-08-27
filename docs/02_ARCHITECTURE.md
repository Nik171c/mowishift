# 02_ARCHITECTURE.md

# MowiShift Architecture

**Version:** 1.0
**Status:** Draft

---

# 1. Architecture Goals

The architecture of MowiShift is designed to support long-term development, maintainability, and scalability.

Every architectural decision should follow these principles:

- Simplicity
- Consistency
- Scalability
- Reusability
- Performance
- Security
- Accessibility
- Developer Experience

---

# 2. Architecture Style

MowiShift follows a modular architecture based on **Feature-Sliced Design (FSD)**.

Each layer has a single responsibility and a clear dependency direction.

```
App
│
Pages
│
Widgets
│
Features
│
Entities
│
Shared
```

Dependencies always flow downward.

A lower layer must never import from a higher layer.

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

---

# 4. Layer Responsibilities

## app/

Application bootstrap.

Contains:

- Router
- Providers
- Global styles
- Theme
- Application initialization
- Error boundaries

---

## pages/

Application pages.

Examples:

```
Dashboard
Employees
Planner
Requests
Statistics
Documents
Settings
```

Pages compose widgets and features.

Pages should contain little or no business logic.

---

## widgets/

Large UI blocks composed of multiple features.

Examples:

- Dashboard Header
- Employee Table
- Shift Calendar
- Statistics Cards
- Request List

Widgets may combine several features.

---

## features/

User actions.

Examples:

```
Create Shift
Approve Request
Reject Request
Edit Employee
Upload Document
Change Password
```

Features contain business logic related to user interactions.

---

## entities/

Business entities.

Examples:

```
Employee
Shift
Department
Request
Document
Notification
```

Each entity contains:

- model
- api
- ui
- types
- helpers

---

## shared/

Reusable code shared across the application.

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

Shared must never depend on higher layers.

---

# 5. UI Architecture

The application uses a custom design system named **Nordic UI**.

All reusable components are located in:

```
shared/ui/
```

Components are imported only from:

```ts
import { Button, Card } from "@/shared/ui";
```

Never import internal component files directly.

---

# 6. Design Tokens

Visual values must be centralized.

```
shared/theme/

colors.ts
spacing.ts
radius.ts
shadows.ts
typography.ts
motion.ts
z-index.ts
```

Components should use design tokens instead of hard-coded values whenever practical.

---

# 7. State Management

## Local State

Use:

```
useState
```

for component-local state.

---

## Shared Client State

Use:

```
Zustand
```

for UI state shared across components.

Examples:

- sidebar
- dialogs
- filters
- language
- theme

---

## Server State

Use:

```
TanStack Query
```

for:

- fetching
- caching
- mutations
- synchronization
- background updates

Never use Zustand for server data.

---

# 8. Forms

All forms use:

- React Hook Form
- Zod

Validation must be schema-based.

---

# 9. Routing

React Router is the only routing solution.

Each page owns its route.

Route definitions are centralized in the `app` layer.

---

# 10. API Layer

API requests are isolated.

```
shared/api/
```

Each business entity exposes its own API functions.

Example:

```
entities/employee/api/
```

UI components must never call fetch directly.

---

# 11. Data Models

Every entity contains:

```
model/
api/
types/
ui/
lib/
```

Business logic belongs to the model layer.

---

# 12. Styling

The project uses:

- Tailwind CSS v4

No CSS frameworks are allowed.

Global styles are minimal.

Component styles belong inside components.

---

# 13. Design Principles

All UI components should be:

- reusable
- composable
- accessible
- responsive
- typed
- documented

---

# 14. Performance

Use memoization only when there is measurable benefit.

Preferred tools:

- React.memo
- useMemo
- useCallback

Avoid premature optimization.

---

# 15. Accessibility

Every interactive component must support:

- keyboard navigation
- focus management
- ARIA attributes where appropriate
- visible focus states
- sufficient color contrast

Accessibility is a core requirement, not an optional enhancement.

---

# 16. Error Handling

Application errors should be handled consistently.

Use:

- Error Boundaries
- Query error states
- User-friendly messages
- Structured logging

Never expose raw server errors to users.

---

# 17. Internationalization

The application supports multiple languages.

Translation files are stored separately from business logic.

UI components must never contain hard-coded user-facing text unless it is intentionally reusable.

---

# 18. File Naming

Use:

```
kebab-case
```

Examples:

```
employee-card.tsx
shift-calendar.tsx
request-list.tsx
```

Component names use PascalCase.

Functions and variables use camelCase.

Constants use UPPER_SNAKE_CASE only when globally shared.

---

# 19. Import Rules

Prefer absolute imports.

Example:

```ts
import { Button } from "@/shared/ui";
```

Avoid deep imports into another module's internal structure.

---

# 20. Code Quality

Every new module should be:

- strongly typed
- reusable
- documented when necessary
- tested where business logic exists
- easy to understand

Code should optimize for readability over cleverness.

---

# 21. Future Scalability

The architecture must support:

- multiple factories
- multiple organizations
- role expansion
- plugin integrations
- mobile applications
- AI-assisted scheduling
- real-time updates
- enterprise deployment

No architectural decision should unnecessarily limit future growth.

---

# 22. Architecture Principles

Before implementing any new feature, ask:

1. Does it belong in the correct FSD layer?
2. Can it be reused?
3. Is the responsibility clear?
4. Does it introduce unnecessary coupling?
5. Will it still make sense in two years?

If the answer to any of these questions is "No", redesign the solution before implementation.
