# Naming Conventions

## CSS Modules

CSS Module class names use different conventions depending on their role.

### Component-specific classes

Use camelCase for classes that represent a component's structure or elements.

```css
.hero {
}

.mainHeading {
}

.description {
}
```

Usage:

```text
styles.hero
styles.mainHeading
styles.description
```

### Variant Classes

Use kebab-case for variant classes.

```css
.size-sm {
}
.size-md {
}
.size-lg {
}

.weight-normal {
}
.weight-bold {
}
```

Usage:

```text
styles[`size-${size}`]
styles[`weight-${weight}`]
```

Variant classes use kebab-case because the name represents a
property-value relationship such as size-sm or weight-bold.

## Summary

| Purpose         | Convention | Example        |
| --------------- | ---------- | -------------- |
| Component       | PascalCase | `Hero`         |
| Component class | camelCase  | `.mainHeading` |
| Variant class   | kebab-case | `.size-xl`     |
| State class     | kebab-case | `.is-active`   |
