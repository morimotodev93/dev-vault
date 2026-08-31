# Component Organization

Dev Vault groups reusable UI components by abstraction level and responsibility.

The component structure is designed to keep low-level building blocks separate from reusable UI patterns and application-specific components.

## Directory Structure

```text
src/components/
├─ primitives/    # Low-level layout and visual building blocks
├─ ui/            # Reusable form and interface controls
├─ common/        # Shared UI patterns used across features
├─ Header/        # Application header and navigation shell
├─ Footer/        # Application footer shell
├─ icon/          # Reusable icon set for app and navigation UI
└─ index.ts       # Optional shared entry exports
```

## primitives

Use `primitives` for small, low-level building blocks that provide basic layout, typography, spacing, or visual structure.

These components should:

- Be highly reusable.
- Have minimal application-specific knowledge.
- Avoid business logic.
- Focus on structure, presentation, and composition.

Examples currently used in the app:

- `Button`
- `Container`
- `Grid`
- `Heading`
- `Link`
- `Spacer`
- `Stack`
- `Surface`
- `Text`

This layer is the foundation for most shared UI usage throughout the app.

### Example

```tsx
<Stack gap={4}>
  <Heading level={2}>Snippets</Heading>
  <Text>Manage your reusable development knowledge.</Text>
</Stack>
```

## ui

Use `ui` for reusable interface controls that provide a complete interaction or input pattern.

These components are more specialized than primitives but should still remain independent from application-specific business logic.

Examples currently used in the app:

- `Input`
- `Select`
- `Textarea`
- `Checkbox`
- `Switch`
- `LinkButton`

These components may handle concerns such as:

- Labels
- Validation states
- Error messages
- Accessibility attributes
- Input-specific styling
- Generated IDs

They should not contain Snippet-specific logic.

These components may handle concerns such as:

- Labels
- Validation states
- Error messages
- Accessibility attributes
- Input-specific styling
- Generated IDs

They should not contain Snippet-specific logic.

For example, `Input` can support an error state, but it should not know how Snippet validation works.

## common

Use `common` for reusable UI patterns that are shared across multiple screens or features.

These components usually represent a meaningful interface pattern rather than a single low-level control.

Examples currently used in the app:

- `EmptyState`
- `Loading`
- `Pagination`
- `SearchInput`
- `Tag`
- `TagInput`

Common components may combine primitives or UI controls to provide a reusable experience.

For example, `SearchInput` combines an input field with a common search interaction pattern, and `TagInput` packages tag entry logic for forms.

## Header / Footer / icon

The app also includes a few shared shell and utility directories that are not feature-specific but are not part of the same abstraction levels as `primitives` or `ui`.

### Header / Footer

These are app-shell components used at the page layout level.

- `Header` manages the global navigation shell and mobile navigation state.
- `Footer` provides the app-wide footer content.

They are shared across the app, but they are structurally tied to the site shell rather than a specific business feature.

### icon

The `icon` directory contains reusable icon primitives used across app shell, navigation, and UI patterns.

It is organized by usage area, such as:

- `navigation/`
- `circle/`
- `util/`

These icons are shared assets rather than page-level components.

## Feature-Specific Components

Components that are strongly tied to a specific feature should be placed near that feature rather than in a global component directory.

For example:

```text
src/app/snippets/
├─ _components/
│  ├─ SnippetCard/
│  ├─ SnippetForm/
│  └─ SnippetSearch/
├─ page.tsx
├─ new/
└─ [id]/
```

A component belongs in a feature directory when it:

- Uses feature-specific data.
- Contains feature-specific business logic.
- Is unlikely to be reused outside that feature.
- Exists primarily to support a specific route or workflow.

This keeps the global component directories focused on genuinely reusable components.

## Choosing a Component Location

When creating a component, consider its scope and responsibility.

### Use `primitives` when:

- It is a low-level building block.
- It provides layout, typography, spacing, or basic visual structure.
- It does not contain application-specific logic.

### Use `ui` when:

- It represents a reusable interface control.
- It handles user input or interaction.
- It can be reused independently across features.

### Use `common` when:

- It represents a reusable UI pattern.
- It combines multiple lower-level components.
- It is shared across multiple features or pages.

### Use a feature directory when:

- The component is specific to one feature.
- It depends on feature-specific data or behavior.
- Reuse outside the feature is unlikely.

## Rule of Thumb

Prefer the narrowest appropriate scope.

```text
Low-level building block
        ↓
   primitives

Reusable interface control
        ↓
       ui

Reusable UI pattern
        ↓
     common

Feature-specific component
        ↓
 feature/_components
```

Do not move a component into a global directory only because it is technically reusable.

A component should be promoted to a shared directory when there is a clear need for reuse or when its responsibility is genuinely generic.

## Design Principles

### Keep Components Focused

A component should have a clear responsibility.

Avoid creating components that combine unrelated layout, data fetching, business logic, and presentation concerns.

### Keep Shared Components Generic

Shared components should not depend on a specific application feature unless that dependency is intentional.

For example:

```tsx
<EmptyState
  title="No snippets yet"
  description="Create your first snippet to start building your knowledge base."
/>
```

The `EmptyState` component provides the presentation pattern, while the Snippets feature provides the actual content.

### Prefer Composition

Build more complex interfaces by composing smaller components.

For example:

```text
SnippetForm
├─ Input
├─ Textarea
├─ Select
├─ Tag
├─ Button
└─ Layout primitives
```

This allows individual components to remain reusable while feature-specific components define the overall workflow.

## Documentation

This document provides the general rules for component organization.

Individual component documentation should be added only when a component has behavior or conventions that cannot be explained clearly through its implementation and types.

Keep the documentation lightweight and update it when the component architecture changes.
