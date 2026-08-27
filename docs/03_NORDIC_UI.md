# 03_NORDIC_UI.md

# Nordic UI Design System

**Project:** MowiShift

**Version:** 1.0

**Status:** Active

---

# 1. Introduction

Nordic UI is the official design system of MowiShift.

It provides a consistent, scalable, accessible, and reusable component library that serves as the foundation for the entire application.

Every user interface element must follow the rules defined in this document.

---

# 2. Goals

The primary goals of Nordic UI are:

- consistency
- simplicity
- accessibility
- maintainability
- scalability
- high performance
- developer productivity

---

# 3. Design Philosophy

Nordic UI follows five principles.

## Simplicity

Interfaces should be clean and easy to understand.

Avoid unnecessary decorations.

---

## Consistency

Similar components should behave the same way everywhere.

Buttons, forms, dialogs and navigation must have identical behavior.

---

## Accessibility

Every component must be accessible.

Accessibility is never optional.

---

## Scalability

The design system must support future growth without requiring redesign.

---

## Reusability

Components should be reusable across the entire application.

---

# 4. Technology Stack

Nordic UI is built using:

- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI
- Lucide React

No additional UI libraries are allowed.

---

# 5. Folder Structure

```
shared/
└── ui/
    avatar.tsx
    badge.tsx
    button.tsx
    card.tsx
    checkbox.tsx
    dialog.tsx
    dropdown-menu.tsx
    input.tsx
    label.tsx
    loading.tsx
    select.tsx
    separator.tsx
    sheet.tsx
    switch.tsx
    table.tsx
    tabs.tsx
    textarea.tsx
    tooltip.tsx
    index.ts
```

Every component must be exported from:

```
shared/ui/index.ts
```

---

# 6. Import Rules

Correct

```tsx
import { Button, Card, Badge } from "@/shared/ui";
```

Incorrect

```tsx
import { Button } from "@/shared/ui/button";
```

---

# 7. Naming Conventions

Files

```
button.tsx
```

Components

```
Button
```

Props

```
ButtonProps
```

Hooks

```
useDialog()
```

Types

```
ButtonVariant
```

---

# 8. Color System

Primary

Used for primary actions.

---

Secondary

Used for secondary actions.

---

Success

Used for successful actions.

---

Warning

Used for warnings.

---

Danger

Used for destructive actions.

---

Info

Used for informational messages.

---

Neutral

Used for backgrounds, borders and secondary text.

---

# 9. Typography

Hierarchy

Display

Heading 1

Heading 2

Heading 3

Heading 4

Body

Small

Caption

Label

---

# 10. Border Radius

Allowed values

Small

Medium

Large

Extra Large

Full

Do not use arbitrary radius values.

---

# 11. Shadows

Levels

None

Small

Medium

Large

Extra Large

Shadows indicate elevation.

---

# 12. Spacing

Spacing must follow a consistent scale.

Never use random spacing values.

Preferred spacing:

```
4
8
12
16
20
24
32
40
48
64
```

---

# 13. Motion

Animations must be:

- fast
- smooth
- subtle

Avoid distracting animations.

Default duration

```
200ms
```

---

# 14. Icons

Nordic UI uses

**Lucide React**

Only outline icons should be used.

Recommended icon size

```
16
20
24
```

---

# 15. Layout

Use

- Flexbox
- CSS Grid

Avoid absolute positioning unless necessary.

---

# 16. Responsive Design

Breakpoints

Mobile

Tablet

Laptop

Desktop

Wide Screen

Every component must work on all supported screen sizes.

---

# 17. Accessibility

Every interactive component must support

- keyboard navigation
- focus indicators
- ARIA attributes
- sufficient color contrast

Accessibility is mandatory.

---

# 18. Component Structure

Every component should follow the same pattern.

```tsx
Imports;

Types;

Constants;

Component;

Export;
```

---

# 19. Button

Supported variants

- primary
- secondary
- outline
- ghost
- danger

Supported sizes

- sm
- md
- lg

Supports

- loading
- disabled
- fullWidth
- leftIcon
- rightIcon

---

# 20. Input

Supports

- label
- helper text
- error state
- disabled
- placeholder

---

# 21. Textarea

Supports

- auto resize
- validation
- disabled

---

# 22. Select

Supports

- keyboard navigation
- search (future)
- grouped options

---

# 23. Checkbox

Supports

- checked
- unchecked
- disabled
- indeterminate

---

# 24. Switch

Supports

- on
- off
- disabled

---

# 25. Dialog

Supports

- header
- content
- footer
- close button
- keyboard navigation
- Escape key
- focus trap

---

# 26. Sheet

Supports

Opening from

- left
- right
- top
- bottom

---

# 27. Dropdown Menu

Supports

- nested menus
- separators
- labels
- radio items
- checkbox items
- keyboard navigation

---

# 28. Tooltip

Should provide additional information.

Tooltips should never contain essential information.

---

# 29. Tabs

Used to organize related content.

Avoid using more than seven tabs.

---

# 30. Table

Supports

- sorting
- filtering
- pagination
- row selection

Future versions may support virtualization.

---

# 31. Loading

Supported loading states

- spinner
- inline loading
- page loading
- overlay loading

---

# 32. Badge

Variants

- primary
- success
- warning
- danger
- neutral
- outline

---

# 33. Avatar

Supports

- image
- initials
- fallback

---

# 34. Empty State

Every page without data should display

- illustration or icon
- title
- description
- primary action

Never leave empty pages blank.

---

# 35. Error State

Every error state should contain

- icon
- title
- description
- retry action

---

# 36. Component Rules

Components must

- be reusable
- be typed
- support accessibility
- support dark mode in future
- avoid duplicated logic

---

# 37. Code Rules

Do not use

- inline styles
- duplicated code
- hardcoded colors
- hardcoded spacing

Use shared utilities whenever possible.

---

# 38. Future Components

Future versions of Nordic UI will include

- Accordion
- Alert
- Breadcrumb
- Calendar
- Command Palette
- Context Menu
- Date Picker
- Empty State
- Pagination
- Popover
- Progress
- Skeleton
- Toast

---

# 39. Best Practices

Prefer composition over inheritance.

Keep components focused.

Avoid large components.

Extract reusable logic into hooks.

---

# 40. Anti-patterns

Avoid

- duplicated components
- deeply nested JSX
- unnecessary props
- inconsistent spacing
- inconsistent colors
- inconsistent typography

---

# 41. Long-Term Vision

Nordic UI is designed as a standalone design system that can be reused across multiple products beyond MowiShift.

The design system should evolve independently while maintaining backward compatibility whenever possible.
