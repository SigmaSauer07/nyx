# Nyx Background System

## Overview

The Nyx background system provides a comprehensive set of background patterns, gradients, and animations that match the brand's futuristic, cyberpunk aesthetic.

## Usage

### Basic Backgrounds

```html
<!-- Solid backgrounds -->
<div class="Nyx-bg Nyx-bg--primary">Content</div>
<div class="Nyx-bg Nyx-bg--secondary">Content</div>

<!-- Gradient backgrounds -->
<div class="Nyx-bg Nyx-bg--gradient-primary">Content</div>
<div class="Nyx-bg Nyx-bg--gradient-accent">Content</div>
```

### Pattern Backgrounds

```html
<!-- Grid patterns -->
<div class="Nyx-bg Nyx-bg--grid">Content</div>
<div class="Nyx-bg Nyx-bg--grid-large">Content</div>

<!-- Geometric patterns -->
<div class="Nyx-bg Nyx-bg--hex">Content</div>
<div class="Nyx-bg Nyx-bg--circuit">Content</div>
```

### Hero Backgrounds

```html
<!-- Animated hero backgrounds -->
<div class="Nyx-hero-bg Nyx-hero-bg--floating">Hero Content</div>
<div class="Nyx-hero-bg Nyx-hero-bg--matrix">Hero Content</div>
<div class="Nyx-hero-bg Nyx-hero-bg--cyberpunk">Hero Content</div>
```

### Section Backgrounds

```html
<!-- Section patterns -->
<div class="Nyx-section-bg Nyx-section-bg--gradient-top">Section Content</div>
<div class="Nyx-section-bg Nyx-section-bg--pattern-dots">Section Content</div>
<div class="Nyx-section-bg Nyx-section-bg--bordered">Section Content</div>
```

## Best Practices

1. **Performance**: Use CSS patterns over images when possible
2. **Accessibility**: Ensure sufficient contrast with text
3. **Animation**: Respect `prefers-reduced-motion` settings
4. **Mobile**: Test responsive behavior on all devices
5. **Print**: Backgrounds are hidden in print styles

## Customization

### Color Variables

```css
:root {
  --bg-primary: #0A2472;
  --bg-secondary: #001F3F;
  --bg-accent: #39FF14;
  --bg-cyan: #00F6FF;
  --bg-violet: #2A004F;
  --bg-magenta: #FF2E92;
}
```

### Custom Patterns

```css
.Nyx-bg--custom {
  background-image: url('your-pattern.svg');
  background-size: 50px 50px;
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Notes

- CSS patterns are more performant than images
- Animated backgrounds use `transform` for better performance
- Reduced motion support for accessibility
- Mobile-optimized patterns for smaller screens 