# Component Organization

This project groups reusable UI components by abstraction level and scope.

## Directory Roles

### primitives

Use this directory for small, low-level building blocks.
These components should be highly reusable, style-oriented, and free from app-specific business logic.

Examples:

- Button
- Text
- Heading
- Container
- Stack
- Grid
- Surface
- Link

### common

Use this directory for shared UI pieces that are used across multiple views or features but are still more specialized than primitives.
These components usually encapsulate common patterns such as empty states, loading states, pagination, search input, or tags.

Examples:

- EmptyState
- Loading
- Pagination
- SearchInput
- Tag

### ui

Use this directory for higher-level, feature-oriented components that combine primitives and common patterns.
These components are typically used in forms or interactive surfaces and may represent a complete user-facing control.

Examples:

- Input
- Textarea
- Select

## Guidance for Choosing a Location

When adding a new component, choose the directory based on its abstraction level:

- Put it in primitives when it is a small reusable building block.
- Put it in common when it is shared across multiple screens but still carries a general-purpose UI pattern.
- Put it in ui when it represents a more complete control or composed interface element.

## Rule of Thumb

If a component is only a structural or visual primitive, place it in primitives.
If it is reused across features and expresses a common UI pattern, place it in common.
If it is a composite control meant to be used as a polished interface element, place it in ui.

## Should Each Category Be Documented Separately?

Yes, but only when the guidance becomes specific enough to benefit from its own document.

For a small project, a single overview document is usually sufficient.
However, if the project grows and each directory develops its own conventions, it is better to split the documentation into focused documents for clarity and maintainability.

Recommended approach:

- Keep one high-level overview document for the overall component system.
- Create separate documents for primitives, common, and ui when their rules diverge significantly.
- This makes the guidance easier to read for both humans and AI agents.

A concise English version suitable for sharing is:

> A single overview document is enough at the beginning, but separate documentation is recommended once primitives, common, and ui each require distinct rules and examples.
