# Updated AI‑Assisted Academy Agenda / Plan – Engineering

## Overview / Timeline

### Week 1

#### Aims
- Educate the group on effective AI use appropriate to their level
- Introduce source control and ensure comfort working with Git
- Cover fundamentals of the tech stack with hands‑on exercises

#### Notes
- Timeline is flexible and can be moved around as needed
- Mini project to be done **individually**
- All participants require GitHub Copilot licences
- All changes must be pushed to a Git repository

---

## Week 1 Schedule

| Day       | AM                                   | PM                |
|----------|--------------------------------------|-------------------|
| Monday   | Induction day, computer setup, licences | —                 |
| Tuesday  | AI, Copilot, and use in workflow     | Git               |
| Wednesday| Git                                  | SOLID + DRY       |
| Thursday | Mini project – backend               | Mini project – backend |
| Friday   | Mini project – frontend              | Mini project – frontend |

---

## AI, Copilot, and Use in Workflow

### Introduction to AI & GitHub Copilot

**Key concepts - all quick, 1 slide explainations for each point**
- What is AI at a high level
- What LLMs are and where hey fit into AI
- How AI models are trained and outcomes of badly trained models
- What is a Copilot
- GitHub Copilot

### Github Copilot tour
- how to install it and configure it in VSCode

**Copilot modes**
- Ask
- Agent
- Plan

**Models & use cases**
- General‑purpose coding & writing: GPT‑5.1‑Codex
- Fast help with simple or repetitive tasks: Claude Haiku 4.5
- Deep reasoning and debugging: Claude Sonnet 4 / Opus 4.6
- Visuals, diagrams, screenshots: Claude Sonnet 4

**Context**
- What context is and how to measure it
- Managing context window

**Chat features**
For each of these, explain what they are, how to use them and most used in each case
- Slash commands (`/`)
- Chat participants (`@`)
- Chat variables (`#`)

### Exercises (1 slide for the exercise, 1 slide for)

**Exercise 1 – One‑shot app idea**
- Try with different models
- Play around with the apps created

**Exercise 1 - Review**
- Did it create what you wanted?
- Did it over-engineer the solution?
- What would you change about the app?

**Exercise 2 – Iterative app improvement**
- Repeat exercise 1 but write follow up prompts to make changes
- Recommend using better models for this

**Exercise 2 – Review**
- How easy was it to make changes?
- Did it break something else?
- Did it still over-engineer?

**last slide**
- Is quite difficult to get the AI to do exactly what you want
- AI has to be guided very precisely to complete it's task
- Prompt Engineering

---

## Improving Outputs from GitHub Copilot (Prompt Engineering)

- Based on general prompt‑engineering principles
- Aligned with Claude prompt‑engineering guidance
- Focus on a single approach: **XML tagging**
- Acknowledge other approaches exist
- Encourage consulting model‑specific documentation

**Exercise**
- Repeat iterative app exercise using prompt‑engineering concepts

### MCP Servers
- What MCP servers are
- Why they are powerful with GitHub Copilot
- Warning: can be token‑heavy

**Exercise / Walkthrough**
- Set up Context7
- Enable it in GitHub Copilot chats

---

## Using AI in Your Workflow as a Technologist

**Copilot**
- Comparable to your IDE

**Prompt engineering**
- Comparable to a programming language

**Productivity factors**
- Typing speed
- IDE knowledge
- CLI proficiency
- Communication (Teams / Slack)

### AI Agent Mode (Code Generation + Review)
- Knowledge discovery
- Research
- Googling
- Documentation / how‑tos
- Online learning platforms (Udemy, Pluralsight)

### AI Ask Mode
- Your own experience
- Problem‑solving skills
- Current project context

---

## Git / Source Control

**Learning tool**
- https://www.gitmastery.me/

**Slides & topics**
- SSH key setup
- Branching and pulling
- Add, commit, push
- Merge vs rebase
- Conflict resolution
- Pull request etiquette

---

## SOLID, DRY, and KISS Principles

- Purpose: clean, maintainable code
- Created by “Uncle Bob”
- Recommend *Clean Code* book / lecture series

**Teaching approach**
- Examples in TypeScript
- Optional comparisons with Python and JavaScript
- Trainer demo followed by student exercises
- Separate exercise repository for forking
- **No AI usage for this section**

---

## Full‑Stack Mini Project

**Rules**
- Individual work
- GitHub Copilot **Ask mode only**
- All code committed and pushed
- Small, concise commits

---

## Backend – APIs

### Slides 1
- JavaScript vs TypeScript
- How to Node.js + Express + TypeScript
- What is a RESTful API

### Exercise 1
- Create project with correct tech stack
- Running project prints “Hello World”

### Slides 2
- REST APIs: GET, POST, PUT, DELETE
- HTTP responses and status codes
- Creating routes in your express app
- Testing APIs with Insomnia / Postman

### Exercise 2
- Create routes for:
  - Get single expense
  - Get list of expenses
  - Update update an expense
  - Delete an expense
- an expense json object will look like:
  - id: 1
  - date: 20-10-2026
  - description: Lunch with a client
  - user: Joe Blogs

### Slides 3
- Express best practices (no logic in routes)
- MVC structure
- SOLID with ORM and services

### Exercise 3
- Controller + service classes
- Map routes → controllers → services

### Slides 4
- OOP and encapsulation
- Models (MVC)
- Mapper classes

### Exercise 4
- Create model
- Create mapper
- Map service output to model

### Slides 5
- Validation and error handling

### Exercise 5
- Add validation and error handling to controllers

### Slides 6
- Unit testing
- Vitest
- Dependency injection
- Supertest (no real endpoints)

### Exercise 6
- Unit tests for controllers, mappers, and routes

---

## SQL, ORMs, and Databases

### Slides 1
- SQL fundamentals and best practices
- Optimisation
- Data types
- Prisma setup and migrations

### Exercise 1
- Prisma schema
- Initial migration

### Slides 2
- Replace mock services with Prisma services
- Liskov Substitution & Dependency Inversion

### Exercise 2
- CRUD services using Prisma

### Slides 3
- Integration vs unit tests

### Exercise 3
- Integration tests using real database

---

## Frontend Development

### Slides 1
- HTML, CSS, JavaScript basics
- Nunjucks
- GOV.UK Frontend

**Provided**
- Frontend setup repo
- Empty backend service
- Controllers and routers scaffolded

### Exercise 1
- Pages for:
  - Single entity
  - Entity list
- Pass mock data into templates

### Slides 2
- Template values from form submissions

### Exercise 2
- Update entity page
- Add update and delete functionality

### Slides 3
- Axios for backend calls

### Exercise 3
- Axios service calling backend APIs

---

## Week 2 & 3 Overview

- Morning content delivery
- Afternoons focused on project work
- Content order flexible
- Prioritise material needed for ticket completion

---

## Week 2

**Monday**
- PR etiquette
- Code reviews
- Ticket workflow
- Linting and test runners in VS Code

**Tuesday**
- CI/CD pipelines for PRs
- Builds, tests, linting
- App configuration and environment files
- Middleware

**Wednesday**
- Presentation skills (morning)
- Project work (afternoon)

**Thursday**
- Secure password storage (Argon, cryptography)
- Authentication & authorisation (JWT)

**Friday**
- Demo preparation

---

## Week 3

**Monday**
- Caching
- Accessibility testing
- Test‑Driven Development (TDD)

**Tuesday**
- OWASP vulnerabilities
- OWASP Juice Shop hands‑on

**Wednesday**
- Advanced databases + NoSQL
- Agents vs agentic AI

**Thursday**
- Final ticket push

**Friday**
- Final demos and preparation