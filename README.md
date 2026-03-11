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
- `prisma-setup-guide.md` - Full Prisma ORM setup guide for Node.js + Express + TypeScript: install, schema, migrations, CRUD service/controller, seeding, Studio, and query examples (blog posts domain, SQLite)
- `restful-apis.md` - RESTful API quick reference: HTTP methods, status codes, URI design, authentication, versioning, and best practices
- `solid-principles.md` - SOLID Principles in TypeScript: a complete practical guide with bad/good examples for each principle


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
- `node-ts-rest-api/` - Combined presentation covering JavaScript vs TypeScript, setting up Node.js + Express + TypeScript, and designing RESTful APIs (`node-ts-rest-api.md`, `npm run dev:node-ts-rest-api`)
- `password-storage/` - Password storage in databases: from naive approaches (plaintext) to modern secure methods (bcrypt, Argon2) with salt
- `prompt-engineering/` - Prompt engineering best practices for LLMs: clarity, examples, XML tags, roles, long context, chain-of-thought, and output formatting (`prompt-engineering.md`)
- `prompt-engineering-models/` - Model-specific prompt engineering for Anthropic Claude (Opus 4, Sonnet 4, Haiku 3.5) and OpenAI GPT-5 Codex: autonomy, AGENTS.md, preambles, personality modes, and metaprompting (`prompt-engineering-models.md`)
- `web-authentication/` - Authentication methods for web applications: cookies, sessions, JWT, and best practices for securing user access

**Week 1 Exercises — `new-slides/week-1/`:**

- `part-4/solid-principles/solid-principles.md` - Slidev presentation covering all five SOLID principles with bad/good TypeScript examples (`npm run dev:solid-principles`)
- `part-4/exercise-1-srp.md` - Hands-on exercise: refactor a `BlogPost` class that violates the Single Responsibility Principle
- `part-4/exercise-2-ocp.md` - Hands-on exercise: refactor a `DiscountCalculator` that violates the Open/Closed Principle
- `part-4/exercise-3-lsp.md` - Hands-on exercise: fix a broken `Square`/`Rectangle` hierarchy that violates the Liskov Substitution Principle
- `part-4/exercise-4-isp.md` - Hands-on exercise: break apart a fat `Vehicle` interface that violates the Interface Segregation Principle
- `part-4/exercise-5-dip.md` - Hands-on exercise: decouple a `ReportGenerator` from `PdfExporter` to apply the Dependency Inversion Principle
- `part-4/solid-exercises.zip` - Runnable TypeScript project containing all 5 exercises (unzip, run `npm install`, then `npm run exercise-N`)
- `part-5/part-2/rest-api-routes/rest-api-routes.md` - HTTP methods (GET, POST, PUT, DELETE), status codes, creating Express routes, and testing with Insomnia/Postman (`npm run dev:rest-api-routes`)
- `part-5/part-2/exercise-2-add-routes.md` - Hands-on exercise: add expense routes to the Express app returning static JSON responses
- `part-5/part-3/mvc-controllers-services/mvc-controllers-services.md` - Express best practices (thin routes), MVC structure, controllers with error handling, services with mock data, and how the pattern follows SOLID principles (`npm run dev:mvc-controllers-services`)
- `part-5/part-3/exercise-3-controllers-and-services.md` - Hands-on exercise: refactor the expenses API by extracting `ExpenseController` and `ExpenseService` classes, keeping routes thin and following the MVC + SOLID pattern
- `part-5/part-4/models-and-dtos/models-and-dtos.md` - OOP and encapsulation, why `any` is dangerous, domain model classes vs DTOs, and how the controller builds typed DTO responses from encapsulated model instances, with SOLID principles explained at each step (`npm run dev:models-and-dtos`)
- `part-5/part-4/exercise-4-models-and-dtos.md` - Hands-on exercise: replace all `any` types in the expenses API with a typed `Expense` class (with constructor validation), `ExpenseResponseDto` and `CreateExpenseRequestDto`, updating the service and controller to use them
- `part-5/part-5/validation/validation.md` - Why constructor validation isn't enough, trust boundaries, Zod schema-based validation, `safeParse` vs `parse`, reusable `validateBody` and `validateParams` middleware, integrating validation into the expense router, and SOLID principles at each step (`npm run dev:validation`)
- `part-5/part-5/exercise-5-validation.md` - Hands-on exercise: install Zod, define schemas for request bodies and route parameters in `expenseDto.ts`, create `validateBody` and `validateParams` middleware, and wire them into the expense router using `.bind()`
- `part-5/part-6/unit-testing/unit-testing.md` - Why unit tests matter, the testing pyramid, Vitest as a TypeScript-native test runner, covering all scenarios (happy path, empty results, not found, validation errors, server errors), dependency injection enabling mock injection in controller and service tests, and Supertest for testing routes at the HTTP level without starting a real server (`npm run dev:unit-testing`)
- `part-5/part-6/exercise-6-unit-testing.md` - Hands-on exercise: install Vitest and Supertest, extract `app.ts`, update the controller to accept an injected service, write service tests, controller tests with mocked req/res and service, and route tests using Supertest with `vi.mock`

**Week 1 Frontend — `new-slides/week-1/part-6/`:**

- `part-6/frontend-dev/frontend-dev.md` - Frontend Development: HTML/CSS/JS basics, Nunjucks templating (syntax, filters, inheritance), GOV.UK Design System setup, using GDS macros, base templates, UI project structure, and wiring up a forked frontend starter — controller calls a backend service, router maps URLs, Nunjucks template renders the data (`npm run dev:frontend-dev`)

**Week 1 Databases — `new-slides/week-1/part-5/`:**

- `part-5/intro-to-sql/intro-to-sql.md` - Introduction to SQL: normalisation (1NF–3NF), relationships, keys, DDL/DML/DQL, JOINs, ORMs, Prisma, migrations, optimisation, security (SQL injection), and NoSQL comparison (`npm run dev:intro-to-sql`)
- `part-5/prisma-setup/prisma-setup.md` - Setting Up Prisma ORM: install, initialise, schema definition (Expense model), migrations, client generation, singleton, and Prisma-backed service layer. Ends with Exercise 7 (`npm run dev:prisma-setup`)
- `part-5/prisma-config/prisma-config.md` - Integrating Prisma into Your API: wiring the Prisma service into the existing controller and routes, seeding, Prisma Studio, CLI reference, query examples (filtering, pagination, aggregation), tips & gotchas. Ends with Exercise 8 (`npm run dev:prisma-config`)

**Week 1 AI Module — `new-slides/week-1/new-part-1/`:**

- `new-part-1/mcp-servers/mcp-servers.md` - Model Context Protocol: what MCP is, how it works, architecture, setting up Context7 in VS Code, security considerations, and when not to use it (`npm run dev:mcp-servers`)
- `new-part-1/github-copilot-tour/github-copilot-tour.md` - GitHub Copilot Tour: what a Copilot is, Copilot + You workflow, GitHub Copilot overview, installation, Ask/Plan/Agent modes, models and use cases, context window management, and chat features (slash commands, participants, variables, tools) (`npm run dev:github-copilot-tour`)
- `new-part-1/using-and-creating-agents/using-and-creating-agents.md` - Using and Creating Agents: agentic AI vs custom agents, why use custom agents, the Copilot instruction ecosystem, `.agent.md` file structure, header fields, writing effective instructions, best practices, handoffs for chaining agents, examples, and a practical exercise (`npm run dev:using-and-creating-agents`)
- `new-part-1/prompt-engineering/prompt-engineering.md` - Prompt Engineering: how to think about Copilot when prompting, be clear and direct, "don't do this" prompts, adding context, meta prompting, role prompting, few-shot learning, chain of thought, XML tagging, and DO/DON'T guardrails (`npm run dev:prompt-engineering-new`)
- `new-part-1/context-engineering/context-engineering.md` - Context Engineering: what it is, why we need it, manual context handling strategies, automatic sub-agent architectures, the Ralph Wiggum Loop, and a practical build exercise (`npm run dev:context-engineering-new`)
- `new-part-1/prompt-engineering-specific/prompt-engineering-specific.md` - Prompt Engineering Specific: advanced prompt engineering techniques and patterns for specific use cases (`npm run dev:prompt-engineering-specific`)
- `new-part-1/exercise-1-app-with-prompt-eng.md` - Hands-on exercise: recreate the app idea from part 1 using prompt engineering best practices, including setting timers, presets, and styling

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
