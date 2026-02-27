# EAYL Academy 2025

Welcome to the EAYL Academy 2025 repository! This contains educational materials, presentations, and resources for the academy program.

## Repository Structure

### 📁 `cheatsheets/`

Quick reference guides and cheat sheets covering various topics:

- `ai-basic-terms.md` - Essential AI terminology and concepts
- `git-cheatsheet.md` - Git commands and workflow reference
- `it-acronyms.md` - Common IT acronyms and their meanings
- `markdown.md` - Markdown syntax and formatting guide
- `nodejs-typescript-guide.md` - A step-by-step guide to initialize a modern Node.js project with TypeScript using ES modules

### 📁 `links/`

Curated collections of useful links and resources:

- `web-dev.md` - Web development resources and tools

### 📁 `slides/`

Presentation materials created with [Slidev](https://sli.dev/):

- `app-configuration/` - Application configuration in Node.js. Managing application settings with environment variables and .env files
- `context-engineering/` - Context engineering for AI: providing the right information at the right time, manual vs automatic context handling (`context-engineering.md`)
- `cryptography-101/` - Basic introduction to cryptography covering hashing, symmetric/asymmetric encryption, signatures, and more
- `di/` - Dependency Injection concepts and patterns
- `intro/` - Course introduction: Engineering with AI, week 1 overview, basic AI concepts (`intro.md`)
- `java-101/` - Java 101: Introduction to Java fundamentals including loops, conditions, enums, and classes (`java-101.md`)
- `js-vs-ts/` - JavaScript vs TypeScript comparison presentation
- `logging/` - Logging best practices for NodeJS Express backend and frontend applications, covering log levels, structured logging, security, and environment-specific configuration (`logging-practices.md`)
- `mcp/` - Model Context Protocol (MCP) introduction: setting up and using Context7 MCP with VS Code Copilot for up-to-date library documentation (`mcp.md`)
- `password-storage/` - Password storage in databases: from naive approaches (plaintext) to modern secure methods (bcrypt, Argon2) with salt
- `prompt-engineering/` - Prompt engineering techniques and best practices for guiding LLM output. (`prompt-engineering.md`)
- `using-agents/` - Creating and using custom GitHub Copilot agents (`.agent.md` files) for specialized AI assistants (`using-agents.md`)
- `using-git/` - Using Git: A practical guide to version control with Git, including branching, remote repositories, SSH configuration, and best practices (`using-git.md`)
- `web-authentication/` - Authentication methods for web applications: cookies, sessions, JWT, and best practices for securing user access
- `week01/` - Week 01 Wednesday recap that reviews Git/context takeaways and next steps (`wednesday-recap.md`)
- `week01/apis/` - Introduction to building Node.js APIs, including project setup, Express, and REST principles (`apis.md`)
- `week01/frontend-dev/` - Frontend development fundamentals with Node, TypeScript, Nunjucks, and GOV.UK Design System (`frontend-dev.md`)
- `week02/ci-cd/` - CI/CD fundamentals: Continuous Integration and Deployment, GitHub Actions, workflows, secrets management, and best practices (`ci-cd.md`)
- `week02/databases/` - Introduction to databases covering types, relationships, normalisation, SQL (DDL/DML/DQL), ORMs, migrations, Prisma, optimization, and security (`databases.md`)
- `week02/linting/` - Code linting: automated code analysis, error detection, style enforcement with Biome for Node.js/TypeScript projects, and automatic fixes (`linting.md`)
- `week02/testing/` - Software testing with Vitest: unit and integration testing fundamentals, best practices, coverage, and using AI to write tests (`testing.md`)

**See [slides/README.md](slides/README.md) for detailed usage instructions**

## Quick Start

### Running Presentations Interactively

Use the interactive presentation launcher (requires [gum](https://github.com/charmbracelet/gum)):

```bash
./slides.sh
```

The script will:

- Show you a list of all available presentations
- Let you select one interactively
- Run the selected presentation with Slidev

**Installing gum:**

- macOS/Linux: `brew install gum`
- Other platforms: https://github.com/charmbracelet/gum#installation

## Development

### Code Formatting and Linting

This project uses [Biome](https://biomejs.dev/) for code formatting and linting. Biome is a fast, modern toolchain that combines formatting, linting, and import sorting in one tool.

**Available commands:**

```bash
# Format all files
npm run format

# Format all files (alias)
npm run format:biome

# Lint all files and auto-fix issues
npm run lint

# Check formatting, linting, and imports (recommended)
npm run check
```

**Configuration:**

Biome is configured via `biome.json` with the following settings:

- **Formatter:** Tab indentation, 120 character line width
- **Linter:** Enabled with recommended rules
- **VCS:** Git integration enabled with ignore file support
- **JavaScript:** Double quotes for strings
- **Assist:** Auto-organize imports on save

**Note:** Always run `npm run format:biome` after completing any work to ensure consistent code formatting across the project.
