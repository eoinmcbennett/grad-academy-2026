---
theme: default
title: Model Context Protocol
transition: view-transition
mdc: true
---

# Model Context Protocol (MCP)

Connecting AI assistants to external tools and data sources

---
layout: default
---

# What is MCP?

**Model Context Protocol** - an open standard for AI-tool communication

- Universal interface for AI to access external capabilities
- Created by Anthropic, adopted across the industry
- Think of it as **"USB for AI"** - plug in any tool

```mermaid {theme: 'neutral', scale: 0.7}
flowchart LR
    A[AI Assistant] --> B[MCP Protocol]
    B --> C[Documentation]
    B --> D[Databases]
    B --> E[APIs]
    B --> F[File System]
```

---
layout: default
---

# Why Do We Need MCP?

**The Problem:** LLMs have a knowledge cutoff date

| Without MCP | With MCP |
|-------------|----------|
| Outdated code examples | Up-to-date documentation |
| Hallucinated APIs | Real, verified APIs |
| Answers for old versions | Version-specific guidance |
| No access to your tools | Direct integration |

---
layout: default
---

# How MCP Works

```mermaid {theme: 'neutral', scale: 0.8}
sequenceDiagram
    participant User
    participant VS Code
    participant MCP Server
    participant External Service

    User->>VS Code: Ask question with "use context7"
    VS Code->>MCP Server: Request documentation
    MCP Server->>External Service: Fetch latest docs
    External Service-->>MCP Server: Return docs
    MCP Server-->>VS Code: Provide context
    VS Code-->>User: Answer with current info
```

---
layout: default
---

# MCP Architecture

**Three key components:**

- **Host**: The application (VS Code, Claude Desktop)
- **Client**: Protocol handler inside the host
- **Server**: Exposes tools, resources, and prompts

```mermaid {theme: 'neutral', scale: 0.75}
flowchart TB
    subgraph Host["VS Code (Host)"]
        Client[MCP Client]
    end
    Client --> Server1[Context7 Server]
    Client --> Server2[GitHub Server]
    Client --> Server3[Filesystem Server]
```

---
layout: default
---

# Examples of Popular MCP Servers

| Server | Purpose |
|--------|---------|
| **Context7** | Up-to-date library documentation |
| **GitHub** | Issues, PRs, repository access |
| **Filesystem** | Read/write local files |
| **PostgreSQL** | Database queries |
| **Puppeteer** | Browser automation |

Browse more: [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

---
layout: default
---

# What is Context7?

**Context7** fetches current documentation directly into your prompts

**Available tools:**

- `resolve-library-id` - Find the Context7 ID for a library
- `get-library-docs` - Fetch documentation for a specific library

**Supports 1000+ libraries** including React, Next.js, Express, Prisma, and more

---
layout: default
---

# Setting Up Context7 in VS Code

**Step 1:** Create `.vscode/mcp.json` in your project

```json
{
  "servers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

---
layout: default
---

# Starting the MCP Server

**Step 2:** Start the server in VS Code

1. Open Command Palette (`Cmd+Shift+P`)
2. Run **"MCP: List Servers"**
3. Select **context7**
4. Click **"Start Server"**

Or click the **"Start"** code lens in your `mcp.json` file

---
layout: default
---

# Verifying the Setup

**Step 3:** Confirm the server is running

- Open the Chat view (`Cmd+Shift+I`)
- Click the **Tools** icon in the chat box
- You should see Context7 tools listed:
  - `context7 -> resolve-library-id`
  - `context7 -> get-library-docs`

---
layout: default
---

# Using Context7 - Basic Usage

**Add `use context7` to your prompt:**

```
How do I set up authentication in an Express API? use context7 to fetch the relevant docs for the version I'm using.
```

**Or specify a library directly:**

```
Show me how I would create a prisma schema for my database. use library /prisma/prisma
```

---
layout: default
---

# Let's Try It!

**Step 1:** Set up Context7

1. Create `.vscode/mcp.json` with the configuration shown
2. Start the MCP server
3. Verify tools appear in Chat view

**Step 2:** Ask a documentation question

```
How do I create an Express router in my typescript project? use context7
```

---
layout: default
---

# Hands-On: More Examples

**Try these prompts:**

```
What's new in React 19? use context7
```

```
How do I set up Vitest with TypeScript in a Node project?
use context7
```

```
How would I create a dockerfile for this app? Use context7
```

---
layout: default
---

# Pro Tip: Auto-Invoke Context7

**Add a rule so you don't need to type "use context7" every time**

Create `.github/copilot-instructions.md`:

```markdown
Always use Context7 MCP when a request involves a library that the project uses.
```

---
layout: default
---

# Security Considerations

⚠️ **MCP servers can run arbitrary code on your machine**

**Best practices:**

- Only install servers from **trusted sources**
- Review server configuration before starting
- VS Code prompts for **trust confirmation** on first start
- Check **server output logs** if something seems wrong

```
MCP: List Servers → Select server → Show Output
```

---
layout: default
---

# Security: What Servers Can Access

| Capability | Risk Level | Example |
|------------|------------|---------|
| Read files | Medium | Filesystem server |
| Write files | High | Could modify code |
| Network requests | Medium | API calls |
| Execute commands | VERY HIGH !!! | Shell access |

**Always review what permissions a server needs!**

---
layout: default
---

# When NOT to Use MCP

❌ **Don't use MCP when:**

- Working with **proprietary/internal/confidential** client documentation
- Working in **air-gapped** environments
- **Without express approval from your project.**

✅ **Use MCP when:**

- You need **current** library documentation
- Working with **rapidly changing** elements of your project
- **You have permission from your project**

---
layout: default
---

# Troubleshooting

**Server won't start?**

1. Check Node.js version: `node --version` (need >= 18)
2. View server output: `MCP: List Servers` → `Show Output`
3. Reset and retry: `MCP: Reset Cached Tools`

**Tools not appearing?**

- Ensure server status shows "Running"
- Try restarting VS Code
- Check `mcp.json` syntax

---
layout: default
---

# Summary

✅ MCP provides a **standard protocol** for AI-tool integration

✅ MCP can give AI access to **up-to-date documentation**

✅ Setup is simple: **one JSON file** + start server

✅ Always consider **security** when adding MCP servers

---
layout: end
---

# Questions?

**Resources:**

- [modelcontextprotocol.io](https://modelcontextprotocol.io) - MCP Documentation
- [context7.com](https://context7.com) - Context7 Website
- [VS Code MCP Docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
