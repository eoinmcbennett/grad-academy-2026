---
theme: default
title: Setting Up Prisma ORM
transition: view-transition
mdc: true
---

# Setting Up Prisma ORM

Adding a real database to your Node.js + Express + TypeScript API

<!--
This session builds directly on the Express API you built in Part 4. We'll replace the in-memory array with a real PostgreSQL database, accessed through Prisma — a type-safe ORM for Node.js and TypeScript.
-->

---

# What is Prisma?

- **Next-generation ORM** for Node.js and TypeScript
- **Type-safe** — your queries are validated at compile time
- Generates a **client** from your schema — no raw SQL needed
- Handles **migrations** — keeping your database and code in sync
- Includes **Prisma Studio** — a visual database browser

> Prisma version 6.x · Imports from `@prisma/client`

<!--
ORM stands for Object-Relational Mapper. Prisma removes the need to write raw SQL for most operations. The generated client gives you full autocomplete and type safety.
-->

---

# How Prisma Works

```mermaid {theme: 'neutral', scale: 0.6}
flowchart LR
    A[schema.prisma: Define your models] -->|prisma migrate dev| B[Database: Tables created]
    A -->|prisma generate| C[Prisma Client: Type-safe queries]
    C -->|import & use| D[Your App: Service layer]
    D -->|queries| B
    style A fill:#e8f4fd,stroke:#4a90d9
    style B fill:#e8f5e9,stroke:#43a047
    style C fill:#fff3e0,stroke:#fb8c00
    style D fill:#f3e5f5,stroke:#8e24aa
```

One schema file drives everything — migrations, the generated client, and TypeScript types.

<!--
The schema.prisma file is the single source of truth. Running migrate dev applies changes to the database AND regenerates the client. You never write SQL manually.
-->

---

# 1 — Install Prisma

```bash
npm install prisma --save-dev
npm install @prisma/client
```

| Package | Purpose |
|---------|---------|
| `prisma` | CLI — migrations, generate, studio (dev only) |
| `@prisma/client` | Runtime query engine used in your code |

> **Why `--save-dev` for `prisma`?**
> The `prisma` package is only the CLI — you use it to write migrations and generate the client during development, but it's never imported by your running app. `@prisma/client` is what your app actually calls at runtime, so it's a regular dependency.

<!--
prisma is a dev dependency because you only need the CLI during development. @prisma/client is a runtime dependency because your app needs it to query the database.
-->

---

# 2 — Initialise Prisma

```bash
npx prisma init --datasource-provider postgresql
```

Creates two files:

```
prisma/
  schema.prisma    ← your data model lives here
.env               ← DATABASE_URL environment variable
```

`.env` contents:

```ini
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb"
```

> Add `.env` to your `.gitignore` — never commit credentials

<!--
PostgreSQL is the industry-standard choice for production applications. You'll need a running Postgres instance — locally you can use a Docker container or a managed service like Supabase or Neon for free.
-->

---

# 3 — Define Your Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Author {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}
```

---


# 3 — Define Your Schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  author    Author   @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

<!--
The generator block tells Prisma which generator to use. prisma-client-js is the standard provider — it outputs the client into node_modules/@prisma/client, which is where you import it from.
-->

---

# Schema Concepts

| Syntax | Meaning |
|--------|---------|
| `@id` | Primary key |
| `@default(autoincrement())` | Auto-incrementing integer |
| `@default(now())` | Set to current timestamp on insert |
| `@updatedAt` | Auto-updated on every save |
| `@unique` | Unique constraint on the column |
| `@relation(fields, references)` | Foreign key relationship |
| `String?` | Optional / nullable field |
| `Post[]` | One-to-many — Author has many Posts |

<!--
These are Prisma's field-level attributes. They map directly to database constraints. The @relation attribute is how you express foreign keys in schema.prisma.
-->

---

# 4 — Run Your First Migration

```bash
npx prisma migrate dev --name init
```

This does three things:

1. Creates `prisma/migrations/` with SQL migration files
2. Applies the migration to your PostgreSQL database
3. Automatically runs `prisma generate`

> Every schema change → new migration

```bash
# Example: after adding a new field
npx prisma migrate dev --name add-post-slug
```

<!--
Migrations are versioned SQL files that record every change to your database schema. They're committed to git so the whole team stays in sync. Never edit migration files by hand.
-->

---
layout: two-cols-header
---

# Migration Workflow

::left::

**Development**

```bash
# Prototype quickly (no migration file)
npx prisma db push

# Create a real migration
npx prisma migrate dev --name <name>

# Reset everything
npx prisma migrate reset
```

::right::

**When to use each**

| Command | Use When |
|---------|----------|
| `db push` | Prototyping, throwaway changes |
| `migrate dev` | Real features, team projects |
| `migrate reset` | Starting fresh locally |

<!--
db push is faster but doesn't create migration files. Use migrate dev for anything that needs to be tracked — which is almost always.
-->

---

# 5 — Generate the Prisma Client

```bash
npx prisma generate
```

Generates a **type-safe client** into `node_modules/@prisma/client`

```typescript
// Import in your code
import { PrismaClient } from "@prisma/client";
```

> `migrate dev` runs this automatically — only run it manually if you need to regenerate without a migration

<!--
The generated client contains TypeScript types that match your exact schema. If you add a field in schema.prisma and regenerate, TypeScript will immediately know about the new field.
-->

---

# 6 — Prisma Client Singleton

Create `src/prismaClient.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

Import and use it across your app:

```typescript
import prisma from "../prismaClient.js";

const posts = await prisma.post.findMany();
```

> One instance = one connection pool shared across the whole app

<!--
Creating multiple PrismaClient instances is an anti-pattern — each one opens its own connection pool. A singleton prevents resource exhaustion. In a future Node.js server restart scenario, this also avoids hot-reload issues.
-->

---

# 7 — Service Layer (Read)

Replace the in-memory array from Part 4:

```typescript
import prisma from "../prismaClient.js";
import type { Post } from "@prisma/client";

export class PostService {
  async findAll(): Promise<Post[]> {
    return prisma.post.findMany({
      include: { author: true },
    });
  }

  async findById(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }
}
```

<!--
include: { author: true } tells Prisma to JOIN and return the related Author alongside each Post. By default Prisma only returns scalar fields — you always opt in to relations.
-->

---

# 7 — Service Layer (Write)

```typescript
  async create(data: {
    title: string;
    content?: string;
    authorId: number;
  }): Promise<Post> {
    return prisma.post.create({ data, include: { author: true } });
  }

  async update(
    id: number,
    data: { title?: string; content?: string; published?: boolean },
  ): Promise<Post | null> {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return null;
    return prisma.post.update({ where: { id }, data, include: { author: true } });
  }

  async delete(id: number): Promise<boolean> {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return false;
    await prisma.post.delete({ where: { id } });
    return true;
  }
```

<!--
We check for existence before update and delete to return null/false for not-found cases. The controller translates null into a 404 response. Prisma would throw if you tried to update a record that doesn't exist.
-->

---

# What Changed from Part 4?

| Part 4 — In-Memory | Prisma |
|--------------------|--------|
| `this.posts.find(p => p.id === id)` | `prisma.post.findUnique({ where: { id } })` |
| `this.posts.push(newPost)` | `prisma.post.create({ data })` |
| `Object.assign(post, data)` | `prisma.post.update({ where, data })` |
| `this.posts.splice(index, 1)` | `prisma.post.delete({ where: { id } })` |
| Manual `id` increment | `@default(autoincrement())` |
| Data lost on restart | Data persisted in PostgreSQL |

The controller and routes **don't change** — the service is the only layer that knows about the database.

<!--
This is the beauty of the MVC pattern from Part 4. By keeping database logic inside the service, swapping from in-memory to Prisma only requires changing one file.
-->

---
layout: center
---

# Now it's your turn

**Exercise 7** — Add Prisma to your expenses API: define an a schema, run a migration, create the Prisma singleton, and create a service to get data via Prisma.

<!--
This exercise brings together everything from the slides. Students apply each step — install, init, schema, migrate, singleton, service — to the expenses API they've been building since Part 4.
-->
