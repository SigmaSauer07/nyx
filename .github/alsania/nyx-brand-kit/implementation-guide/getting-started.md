# Nyx Brand Kit Implementation Guide

## Quick Start

### 1. Install Dependencies

```bash
# For React projects
npm install @Nyx/design-system

# For Vue projects
npm install @Nyx/vue-components

# For vanilla projects
npm install @Nyx/css-framework
```

### 2. Import Styles

```javascript
// React/Vue
import '@Nyx/design-system/dist/styles.css';

// Vanilla CSS
@import url('@Nyx/css-framework/dist/Nyx-global-styles.css');
```

### 3. Use Components

```jsx
// React
import { Button, Card, Input } from '@Nyx/design-system';

function App() {
  return (
    <div className="Nyx-container">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

```vue
<!-- Vue -->
<template>
  <div class="Nyx-container">
    <AlsaniaButton variant="primary" size="lg">
      Get Started
    </AlsaniaButton>
  </div>
</template>

<script>
import { AlsaniaButton } from '@Nyx/vue-components';

export default {
  components: {
    AlsaniaButton
  }
};
</script>
