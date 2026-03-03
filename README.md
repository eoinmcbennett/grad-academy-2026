# EAYL Academy 2025

Welcome to the EAYL Academy 2025 repository! This contains educational materials, presentations, and resources for the academy program.

## Repository Structure

### 📁 `cheatsheets/`

Quick reference guides and cheat sheets covering various topics:

- `ai-basic-terms.md` - Essential AI terminology and concepts
- `git-cheatsheet.md` - Git commands and workflow reference
- `git-notes.md` *(root)* - Git workflow notes: creating branches, commits, push/pull, merge vs rebase, fixing divergent branches, and common team issues
- `it-acronyms.md` - Common IT acronyms and their meanings
- `markdown.md` - Markdown syntax and formatting guide
- `nodejs-typescript-guide.md` - A step-by-step guide to initialize a modern Node.js project with TypeScript using ES modules


Curated collections of useful links and resources:

- `web-dev.md` - Web development resources and tools

### � Prompt Engineering Resources

Guides to effective prompt engineering for large language models:

- `prompt-engineering.md` - General prompt engineering best practices for any modern LLM (clarity, examples, XML tags, roles, chain-of-thought, formatting)
- `prompt-engineering-openAI.md` - OpenAI-specific prompt engineering including few-shot learning, RAG, context windows, and GPT-5 / reasoning model guidance
- `prompt-engineering-openai-2.md` - Codex-specific prompt engineering for the `gpt-5.2-codex` and `gpt-5.3-codex` agentic coding models: autonomy, tool use (apply_patch, shell, parallel calls), AGENTS.md, compaction, preambles, and metaprompting
- `prompt-engineering-claude-2.md` - Claude-specific prompt engineering covering communication style, verbosity, model self-knowledge, and current API model strings for Opus 4, Sonnet 4, and Haiku 3.5
- `prompt-engineering-model-specific.md` - Combined model-specific guide covering both Anthropic Claude (Opus 4, Sonnet 4, Haiku 3.5) and OpenAI Codex (`gpt-5.X-codex`): autonomy, AGENTS.md, preambles, personality modes, metaprompting, and Claude communication style

### �📁 `slides/`

Presentation materials created with [Slidev](https://sli.dev/):

- `app-configuration/` - Application configuration in Node.js. Managing application settings with environment variables and .env files
- `cryptography-101/` - Basic introduction to cryptography covering hashing, symmetric/asymmetric encryption, signatures, and more
- `di/` - Dependency Injection concepts and patterns
- `github-copilot/` - Introduction to AI, LLMs, GitHub Copilot, modes, models, context management, and chat features (`github-copilot.md`)
- `git-workflows/` - Git branching, commit/push workflow, merge vs rebase with diagrams, fixing divergent branches, and common team issues (`git-workflows.md`)
- `js-vs-ts/` - JavaScript vs TypeScript comparison presentation
- `logging/` - Logging best practices for NodeJS Express backend and frontend applications, covering log levels, structured logging, security, and environment-specific configuration (`logging-practices.md`)
- `password-storage/` - Password storage in databases: from naive approaches (plaintext) to modern secure methods (bcrypt, Argon2) with salt
- `prompt-engineering/` - Prompt engineering best practices for LLMs: clarity, examples, XML tags, roles, long context, chain-of-thought, and output formatting (`prompt-engineering.md`)
- `prompt-engineering-models/` - Model-specific prompt engineering for Anthropic Claude (Opus 4, Sonnet 4, Haiku 3.5) and OpenAI GPT-5 Codex: autonomy, AGENTS.md, preambles, personality modes, and metaprompting (`prompt-engineering-models.md`)
- `web-authentication/` - Authentication methods for web applications: cookies, sessions, JWT, and best practices for securing user access

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
