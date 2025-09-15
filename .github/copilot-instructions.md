# AI Coding Agent Instructions for Nyx Repository

## Overview
This repository contains the Nyx Chrome Extension, which integrates the Model Context Protocol (MCP) tools with various AI platforms. The project is structured to support modularity, extensibility, and seamless integration with supported platforms.

## Key Architectural Concepts

### Plugin System
- **Location**: `pages/content/src/plugins/`
- **Purpose**: Provides a modular and extensible foundation for adapting the assistant's behavior based on the active website.
- **Core Files**:
  - `plugin-registry.ts`: Manages plugin lifecycle, registration, and hostname-based activation.
  - `base.adapter.ts`: Abstract base class for all adapters, handling lifecycle and error management.
  - `plugin-context.ts`: Provides runtime context, including Zustand store access and Chrome API utilities.
- **Example Usage**:
  ```typescript
  import { useCurrentAdapter } from './hooks/useAdapter';

  function MyComponent() {
    const { insertText, submitForm } = useCurrentAdapter();
    insertText('Hello World!');
  }
  ```

### Content Scripts
- **Location**: `pages/content/`
- **Purpose**: Handles MCP integration, tool execution, and result insertion.
- **Key Directories**:
  - `src/components/`: React components for UI and site-specific handlers.
  - `src/hooks/`: React hooks for adapter and plugin integration.
  - `src/stores/`: Zustand-based state management.
  - `src/utils/`: Utility functions and helpers.

### Adapter System
- **Location**: `pages/content/src/plugins/adapters/`
- **Purpose**: Implements site-specific integrations.
- **Steps to Add New Site Support**:
  1. Create an adapter by extending `BaseAdapterPlugin`.
  2. Register the adapter in the plugin registry.
  3. Test the integration.
  4. Document the adapter in `README.md`.

## Developer Workflows

### Building the Project
- Use `pnpm` for dependency management.
- Build commands are defined in `package.json`.

### Testing
- Ensure all new features include tests.
- Testing setup is documented in `README.md`.

### Debugging
- Use the `getDebugInfo()` method in `PluginRegistry` to retrieve runtime information.
- Logs are structured and accessible via the `plugin-context.ts` logger.

## Project-Specific Conventions
- **TypeScript**: Strongly typed with comprehensive interfaces in `plugin-types.ts`.
- **State Management**: Zustand is used for state management.
- **Error Handling**: Standardized across plugins and adapters.

## Integration Points
- **External Dependencies**:
  - Chrome Extension APIs: Used for interacting with the browser environment.
  - Zustand: For state management.
- **Cross-Component Communication**:
  - Event bus in `plugin-context.ts`.
  - Shared utilities in `src/utils/`.

## Examples and References
- **Plugin System Documentation**: `pages/content/src/plugins/README.md`
- **Adapter Development Guide**: `pages/content/src/plugins/adapters/README.md`
- **Core Functionality**: `pages/content/README.md`

---

This document is a living guide. Update it as the project evolves to ensure AI agents remain productive and aligned with the repository's practices.