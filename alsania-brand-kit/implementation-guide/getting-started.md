# Alsania Brand Kit Implementation Guide

## Quick Start

### 1. Install Dependencies

```bash
# For React projects
npm install @alsania/design-system

# For Vue projects
npm install @alsania/vue-components

# For vanilla projects
npm install @alsania/css-framework
```

### 2. Import Styles

```javascript
// React/Vue
import '@alsania/design-system/dist/styles.css';

// Vanilla CSS
@import url('@alsania/css-framework/dist/alsania-global-styles.css');
```

### 3. Use Components

```jsx
// React
import { Button, Card, Input } from '@alsania/design-system';

function App() {
  return (
    <div className="alsania-container">
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
  <div class="alsania-container">
    <AlsaniaButton variant="primary" size="lg">
      Get Started
    </AlsaniaButton>
  </div>
</template>

<script>
import { AlsaniaButton } from '@alsania/vue-components';

export default {
  components: {
    AlsaniaButton
  }
};
</script>
