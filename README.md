# Nyx - Sovereign AI Extension

Nyx is a rebranded fork of the MCP SuperAssistant, designed as a sovereign AI agent for integrating advanced tool usage into AI chat interfaces (ChatGPT, Gemini, etc.). It provides a sidebar interface for tool execution, instruction management, and configuration, all while maintaining MCP protocol compatibility for functionality.

## Features
- **Sidebar Integration**: Floating sidebar with tools, settings, and server status.
- **Glass Theme**: Modern glassmorphism design with navy and neon green accents.
- **Multi-Adapter Support**: Works with ChatGPT, Gemini, Grok, and more.
- **Tool Execution**: Supports MCP tools for file operations, browser actions, and more.
- **Instructions Management**: Dynamic instruction generation and schema handling.
- **Responsive Design**: Optimized for desktop and mobile AI interfaces.

## Quick Start
1. Install dependencies: `make install`
2. Build the project: `make build`
3. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `chrome-extension/dist` folder.
4. Test the extension: `make test`

For development, run `make dev` to start the content script server.

## Project Structure
- `chrome-extension/`: Core extension (background, MCP client).
- `pages/content/`: Content scripts injected into AI sites (sidebar, adapters).
- `packages/`: Shared modules (storage, module-manager, Tailwind config).
- `.github/alsania/nyx-brand-kit/`: Branding assets (logos, CSS themes).
- `nyx-rules.md` & `nyx-agents.md`: Alignment protocols.

## Build and Test
Use the Makefile for all tasks:
- `make all`: Full setup.
- `make lint`: Code quality check.
- `make format`: Auto-format code.

See [MAKEFILE_README.md](MAKEFILE_README.md) for detailed instructions.

## Glass Theme
The UI uses a glassmorphism theme:
- Backgrounds: Semi-transparent rgba with blur.
- Accents: Neon green (#39ff14) on navy (#0b1220).
- Components: Cards, buttons, and inputs with backdrop-filter.

Styles are defined in `pages/content/src/tailwind-input.css` and `sidebar.css`.

## Compliance
- Follows Nyx Rules (no surveillance, open tools, modular code).
- Tests included for core functionality.
- No React in core (uses vanilla JS/TS where possible; React for UI components as per existing fork).

## Deployment
1. Build: `make build`
2. Package: `make package` (creates ZIP in chrome-extension/dist).
3. Upload to Chrome Web Store or load unpacked.

## Contributing
- Fork the repo.
- Run `make install`.
- Make changes, test with `make test`.
- Submit PR with tests and docs updates.

## License
MIT License. See [LICENSE](LICENSE).

Aligned with Nyx AI Protocol v1.0. Imagined by Sigma. Powered by Echo.