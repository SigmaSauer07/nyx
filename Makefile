# Nyx Project Makefile

PROJECT_NAME = Nyx
NPM = npm

# Default target
all: install build test

# Install dependencies
install:
	@echo "Installing dependencies for $(PROJECT_NAME)..."
	cd chrome-extension && $(NPM) install
	cd pages/content && $(NPM) install

# Build the project
build: build-extension build-content

build-extension:
	@echo "Building Chrome Extension..."
	cd chrome-extension && $(NPM) run build

build-content:
	@echo "Building Content Scripts..."
	cd pages/content && $(NPM) run build

# Run tests
test: test-extension test-content

test-extension:
	@echo "Running tests for Chrome Extension..."
	cd chrome-extension && $(NPM) test

test-content:
	@echo "Running tests for Content Scripts..."
	cd pages/content && $(NPM) test

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf chrome-extension/dist
	rm -rf pages/content/dist
	rm -rf .nyc_output
	rm -rf coverage

# Lint the code
lint:
	@echo "Linting code..."
	cd chrome-extension && $(NPM) run lint
	cd pages/content && $(NPM) run lint

# Format code
format:
	@echo "Formatting code..."
	cd chrome-extension && $(NPM) run format
	cd pages/content && $(NPM) run format

# Dev mode
dev:
	@echo "Starting development mode..."
	cd pages/content && $(NPM) run dev &

# Package extension
package:
	@echo "Packaging Chrome Extension..."
	cd chrome-extension && $(NPM) run package

# Help
help:
	@echo "Available targets for $(PROJECT_NAME):"
	@echo "  all       - Install, build, and test everything"
	@echo "  install   - Install dependencies"
	@echo "  build     - Build the project"
	@echo "  test      - Run tests"
	@echo "  clean     - Clean build artifacts"
	@echo "  lint      - Lint code"
	@echo "  format    - Format code"
	@echo "  dev       - Start development mode"
	@echo "  package   - Package the extension"
	@echo "  help      - Show this help"

.PHONY: all install build build-extension build-content test test-extension test-content clean lint format dev package help