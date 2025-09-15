# Alsania Component API Documentation

## Overview

This document provides comprehensive API documentation for all Alsania design system components, including props, events, and usage examples.

## Button Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `icon` | `ReactNode` | `undefined` | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `fullWidth` | `boolean` | `false` | Full width button |        ### No fullWidth buttons
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `(event: MouseEvent) => void` | Click handler |

### Examples

```tsx
// Basic usage
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// With icon
<Button variant="secondary" icon={<Icon />}>
  With Icon
</Button>

// Loading state
<Button loading={true}>
  Loading...
</Button>

### No fullWidth buttons

// Full width
<Button fullWidth variant="primary">
  Full Width Button
</Button>
```

## Card Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Card title |
| `subtitle` | `string` | `''` | Card subtitle |
| `image` | `string` | `''` | Card image URL |
| `imageAlt` | `string` | `''` | Image alt text |
| `footer` | `ReactNode` | `undefined` | Footer content |
| `hover` | `boolean` | `false` | Hover effects |
| `className` | `string` | `''` | Additional CSS classes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `(event: MouseEvent) => void` | Click handler |

### Examples

```tsx
// Basic card
<Card title="Card Title" subtitle="Card subtitle">
  Card content goes here
</Card>

// With image
<Card
  title="Image Card"
  image="/path/to/image.jpg"
  imageAlt="Description"
>
  Content with image
</Card>

// With footer
<Card title="Card with Footer">
  Main content
  <template #footer>
    <Button>Action</Button>
  </template>
</Card>
```

## Input Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'url' \| 'tel'` | `'text'` | Input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Input value |
| `label` | `string` | `''` | Input label |
| `error` | `string` | `''` | Error message |
| `success` | `string` | `''` | Success message |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `fullWidth` | `boolean` | `false` | Full width input |
| `icon` | `ReactNode` | `undefined` | Input icon |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(value: string) => void` | Value change handler |
| `onFocus` | `() => void` | Focus handler |
| `onBlur` | `() => void` | Blur handler |

### Examples

```tsx
// Basic input
<Input
  label="Email"
  placeholder="Enter your email"
  onChange={setEmail}
/>

// With validation
<Input
  label="Password"
  type="passwor
