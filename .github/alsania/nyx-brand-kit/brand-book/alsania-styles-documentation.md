# Nyx Global Stylesheet Documentation

## Overview

The Nyx Global Stylesheet is a comprehensive CSS foundation designed for all Nyx projects. It follows modern CSS best practices and provides a complete design system with consistent branding, components, and utilities.

## Features

### ✅ **Modern CSS Architecture**
- CSS Custom Properties (CSS Variables) for theming
- Mobile-first responsive design
- Component-based architecture
- Utility-first approach
- BEM-inspired naming conventions

### ✅ **Complete Design System**
- Consistent color palette with Nyx branding
- Typography scale with web fonts
- Spacing system based on rem units
- Border radius and shadow scales
- Z-index management system

### ✅ **Accessibility First**
- WCAG 2.1 compliant focus styles
- Screen reader support
- High contrast mode support
- Reduced motion preferences
- Semantic HTML structure

### ✅ **Performance Optimized**
- Minimal CSS reset
- Efficient selectors
- Print stylesheet included
- Font loading optimization
- Critical CSS structure

## Quick Start

### 1. Include the Stylesheet

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Nyx Project</title>
  <link rel="stylesheet" href="path/to/Nyx-global-styles.css">
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

### 2. Basic Page Structure

```html
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <div class="logo">Nyx Project</div>
      <nav class="nav">
        <a href="#" class="nav-link active">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container container-xl">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title animate-glow">Welcome to Nyx</h1>
      <p class="hero-subtitle">The Future of Web3</p>
      <p class="hero-description">
        Build amazing decentralized applications with our cutting-edge technology.
      </p>
      <div class="flex gap-4 justify-center">
        <button class="btn btn-primary btn-lg">Get Started</button>
        <button class="btn btn-secondary btn-lg">Learn More</button>
      </div>
    </section>

    <!-- Content Grid -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <div class="card hover-lift">
        <div class="card-header">
          <h3 class="card-title">Feature 1</h3>
        </div>
        <div class="card-body">
          <p>Description of your amazing feature.</p>
        </div>
      </div>
      <!-- More cards... -->
    </section>
  </main>
</body>
```

## Design System

### Colors

```css
/* Primary Nyx Colors */
--Nyx-primary: #39FF14;     /* Nyx Green */
--Nyx-secondary: #001f2e;   /* Dark Blue */
--Nyx-accent: #00d4ff;      /* Cyan Accent */

/* Semantic Colors */
--color-success: #39FF14;
--color-warning: #ffc107;
--color-error: #ff4444;
--color-info: #3498db;
```

### Typography

```css
/* Font Families */
--font-primary: 'Open Sans';    /* Body text */
--font-heading: 'Orbitron';     /* Headers */
--font-accent: 'Rajdhani';      /* UI elements */

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Spacing

```css
/* Spacing Scale (based on 0.25rem = 4px) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

## Component Examples

### Buttons

```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Button Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>

<!-- Block Button -->
<button class="btn btn-primary btn-block">Full Width</button>

<!-- Disabled Button -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here. This is a flexible container for any type of content.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Forms

```html
<form>
  <div class="form-group">
    <label class="form-label" for="email">Email Address</label>
    <input class="form-input" type="email" id="email" placeholder="Enter your email">
    <div class="form-feedback valid">Email is valid</div>
  </div>

  <div class="form-group">
    <label class="form-label" for="message">Message</label>
    <textarea class="form-textarea" id="message" placeholder="Your message"></textarea>
  </div>

  <div class="form-group">
    <label class="form-label" for="country">Country</label>
    <select class="form-select" id="country">
      <option>Select a country</option>
      <option>United States</option>
      <option>Canada</option>
    </select>
  </div>

  <button type="submit" class="btn btn-primary btn-block">Submit</button>
</form>
```

### Alerts

```html
<div class="alert alert-success">
  ✅ Success! Your action was completed successfully.
</div>

<div class="alert alert-warning">
  ⚠️ Warning! Please check your input.
</div>

<div class="alert alert-error">
  ❌ Error! Something went wrong.
</div>

<div class="alert alert-info">
  ℹ️ Info: Here's some helpful information.
</div>
```

## Utility Classes

### Layout

```html
<!-- Flexbox -->
<div class="flex items-center justify-between">
  <span>Left content</span>
  <span>Right content</span>
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Container -->
<div class="container container-xl">
  <!-- Centered content with max-width -->
</div>
```

### Spacing

```html
<!-- Margin -->
<div class="m-4">Margin on all sides</div>
<div class="mt-8 mb-4">Margin top and bottom</div>

<!-- Padding -->
<div class="p-6">Padding on all sides</div>
<div class="pt-4 pb-8">Padding top and bottom</div>
```

### Typography

```html
<!-- Font Sizes -->
<h1 class="text-4xl font-bold">Large Heading</h1>
<p class="text-lg text-gray">Large paragraph</p>
<span class="text-sm text-muted">Small text</span>

<!-- Font Families -->
<h2 class="font-heading">Orbitron Heading</h2>
<p class="font-accent">Rajdhani UI Text</p>
```

### Colors

```html
<!-- Text Colors -->
<p class="text-primary">Primary color text</p>
<p class="text-success">Success color text</p>
<p class="text-error">Error color text</p>

<!-- Background Colors -->
<div class="bg-gradient-Nyx">Nyx gradient background</div>
```

## Responsive Design

The stylesheet uses a mobile-first approach with these breakpoints:

- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Responsive: 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>

<!-- Responsive Text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
  <!-- Responsive font sizes -->
</h1>

<!-- Responsive Visibility -->
<div class="hidden md:block">
  <!-- Hidden on mobile, visible on tablet and up -->
</div>
```

## Best Practices

### 1. **Use Semantic HTML**
```html
<!-- Good -->
<main class="container">
  <section class="hero">
    <h1 class="hero-title">Page Title</h1>
  </section>
</main>

<!-- Avoid -->
<div class="container">
  <div class="hero">
    <div class="hero-title">Page Title</div>
  </div>
</div>
```

### 2. **Combine Utility Classes**
```html
<!-- Good -->
<button class="btn btn-primary hover-lift">
  Interactive Button
</button>

<!-- Combine layout utilities -->
<div class="flex items-center justify-between p-4 bg-secondary rounded-lg">
  Content
</div>
```

### 3. **Use CSS Custom Properties for Theming**
```css
/* Custom theme overrides */
:root {
  --Nyx-primary: #00ff88; /* Custom green */
  --font-heading: 'Your Custom Font', var(--font-heading);
}
```

### 4. **Accessibility Considerations**
```html
<!-- Always include proper labels -->
<label class="form-label" for="search">Search</label>
<input class="form-input" type="search" id="search" aria-describedby="search-help">
<div id="search-help" class="text-sm text-muted">Enter keywords to search</div>

<!-- Use semantic buttons -->
<button class="btn btn-primary" type="submit">Submit Form</button>
<a href="/page" class="btn btn-secondary">Navigate to Page</a>
```

## Browser Support

- **Modern Browsers**: Full support (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- **CSS Grid**: Supported in all target browsers
- **CSS Custom Properties**: Supported in all target browsers
- **Flexbox**: Full support
- **CSS Animations**: Full support with reduced motion preferences

## Performance Tips

1. **Critical CSS**: Include above-the-fold styles inline
2. **Font Loading**: Use `font-display: swap` for custom fonts
3. **Unused CSS**: Remove unused utility classes in production
4. **Minification**: Minify CSS for production builds
5. **Caching**: Set appropriate cache headers for the stylesheet

## Customization

### Creating Custom Components

```css
/* Add your custom components after importing the global styles */
@import url('Nyx-global-styles.css');

/* Custom component using the design system */
.my-custom-component {
  background: var(--bg-secondary);
  border: 1px solid var(--Nyx-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  color: var(--Nyx-primary);
  font-family: var(--font-accent);
  transition: all var(--transition-base);
}

.my-custom-component:hover {
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}
```

### Theme Customization

```css
/* Override CSS custom properties for custom themes */
:root {
  /* Custom color scheme */
  --Nyx-primary: #ff6b35;
  --Nyx-secondary: #2c1810;
  
  /* Custom fonts */
  --font-heading: 'Your Brand Font', var(--font-heading);
  
  /* Custom spacing (if needed) */
  --space-custom: 1.75rem;
}
```

This global stylesheet provides everything you need to build consistent, accessible, and beautiful Nyx websites. The modular approach allows for easy customization while maintaining design consistency across all projects.
