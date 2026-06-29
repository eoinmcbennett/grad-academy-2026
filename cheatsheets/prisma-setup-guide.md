# Prisma ORM Setup Guide — Node.js + Express + TypeScript

A complete guide to adding Prisma ORM to an existing Node.js Express API (like the expenses API from Part 4). Uses **blog posts** as the example domain and **PostgreSQL** as the database.

> **Prisma version:** 6.x (latest). Uses the standard `prisma-client-js` generator and imports from `@prisma/client`.

---

## Table of Contents

- [Prisma ORM Setup Guide — Node.js + Express + TypeScript](#prisma-orm-setup-guide--nodejs--express--typescript)
  - [Table of Contents](#table-of-contents)
  - [1 — Install Prisma](#1--install-prisma)
  - [2 — Initialise Prisma](#2--initialise-prisma)
  - [3 — Define Your Schema](#3--define-your-schema)
    - [Key Prisma Schema Concepts](#key-prisma-schema-concepts)
  - [4 — Run Your First Migration](#4--run-your-first-migration)
  - [5 — Generate the Prisma Client](#5--generate-the-prisma-client)
  - [6 — Create a Prisma Client Singleton](#6--create-a-prisma-client-singleton)
  - [7 — Update Your Service Layer](#7--update-your-service-layer)
    - [What Changed from Part 4?](#what-changed-from-part-4)
  - [8 — Update Your Controller](#8--update-your-controller)
  - [9 — Update Your Routes](#9--update-your-routes)
  - [10 — Seed the Database](#10--seed-the-database)
    - [Step 1: Create the seed script](#step-1-create-the-seed-script)
    - [Step 2: Add the seed command to `package.json`](#step-2-add-the-seed-command-to-packagejson)
    - [Step 3: Run the seed](#step-3-run-the-seed)
  - [11 — View Data with Prisma Studio](#11--view-data-with-prisma-studio)
  - [12 — Common Prisma CLI Commands](#12--common-prisma-cli-commands)
  - [13 — Useful Query Examples](#13--useful-query-examples)
    - [Find with filtering](#find-with-filtering)
    - [Pagination](#pagination)
    - [Include related data](#include-related-data)
    - [Select specific fields](#select-specific-fields)
    - [Count records](#count-records)
    - [Upsert (create or update)](#upsert-create-or-update)
  - [14 — Tips \& Gotchas](#14--tips--gotchas)
  - [Project Structure After Setup](#project-structure-after-setup)
  - [Quick Start Summary](#quick-start-summary)

---

## 1 — Install Prisma

From your project root (where `package.json` lives):

```bash
npm install prisma --save-dev
npm install @prisma/client
```

| Package | Why |
|---------|-----|
| `prisma` | CLI tool — migrations, generation, studio (dev dependency) |
| `@prisma/client` | Runtime query engine used in your application code |

---

## 2 — Initialise Prisma

```bash
npx prisma init --datasource-provider postgresql
```

This creates:

```
prisma/
  schema.prisma    ← your data model lives here
.env               ← DATABASE_URL environment variable
```

The `.env` file will contain:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb"
```

> **Tip:** Add `.env` to your `.gitignore` — never commit database credentials.

---

## 3 — Define Your Schema

Open `prisma/schema.prisma` and replace the contents with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Author {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}
```

Then add the relation on `Post`:

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

### Key Prisma Schema Concepts

| Syntax | Meaning |
|--------|---------|
| `@id` | Primary key |
| `@default(autoincrement())` | Auto-incrementing integer |
| `@default(now())` | Set to current timestamp on creation |
| `@updatedAt` | Automatically updated on every save |
| `@unique` | Unique constraint |
| `@relation(fields: [...], references: [...])` | Foreign key relationship |
| `String?` | Optional field (nullable) |
| `Post[]` | One-to-many relation (Author has many Posts) |

---

## 4 — Run Your First Migration

```bash
npx prisma migrate dev --name init
```

This will:

1. Create a `prisma/migrations/` folder with SQL migration files
2. Apply the migration to your PostgreSQL database
3. Automatically run `prisma generate`

> Every time you change `schema.prisma`, run `npx prisma migrate dev --name describe-the-change` to create and apply a new migration.

---

## 5 — Generate the Prisma Client

If you need to regenerate the client without a migration:

```bash
npx prisma generate
```

This generates a type-safe client into `node_modules/@prisma/client`. Import from `@prisma/client` in your code.

> The generated client is stored in `node_modules` — it does not need to be committed to git.

---

## 6 — Create a Prisma Client Singleton

Create `src/prismaClient.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

> Using a singleton ensures all parts of your app share one database connection pool.

---

## 7 — Update Your Service Layer

Replace the in-memory array from Part 4 with real database calls. Create `src/services/postService.ts`:

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

  async create(data: {
    title: string;
    content?: string;
    authorId: number;
  }): Promise<Post> {
    return prisma.post.create({
      data,
      include: { author: true },
    });
  }

  async update(
    id: number,
    data: { title?: string; content?: string; published?: boolean },
  ): Promise<Post | null> {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return null;

    return prisma.post.update({
      where: { id },
      data,
      include: { author: true },
    });
  }

  async delete(id: number): Promise<boolean> {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return false;

    await prisma.post.delete({ where: { id } });
    return true;
  }
}
```

### What Changed from Part 4?

| Part 4 (in-memory) | Prisma |
|---------------------|--------|
| `this.posts.find(...)` | `prisma.post.findUnique({ where: { id } })` |
| `this.posts.push(...)` | `prisma.post.create({ data })` |
| `this.posts.splice(...)` | `prisma.post.delete({ where: { id } })` |
| Manual ID generation | `@default(autoincrement())` handles it |
| Data lost on restart | Data persisted in PostgreSQL |

---

## 8 — Update Your Controller

Create `src/controllers/postController.ts`:

```typescript
import type { Request, Response } from "express";
import type { PostService } from "../services/postService.js";

export class PostController {
  constructor(private postService: PostService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const posts = await this.postService.findAll();
    res.json(posts);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const post = await this.postService.findById(id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { title, content, authorId } = req.body;
    if (!title || !authorId) {
      res.status(400).json({ error: "title and authorId are required" });
      return;
    }

    const post = await this.postService.create({ title, content, authorId });
    res.status(201).json(post);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const post = await this.postService.update(id, req.body);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const deleted = await this.postService.delete(id);
    if (!deleted) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(204).send();
  }
}
```

---

## 9 — Update Your Routes

Create `src/routes/postRouter.ts`:

```typescript
import { Router } from "express";
import { PostController } from "../controllers/postController.js";
import { PostService } from "../services/postService.js";

const router = Router();
const service = new PostService();
const controller = new PostController(service);

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
```

Register it in `src/index.ts`:

```typescript
import postRouter from "./routes/postRouter.js";

app.use("/api/posts", postRouter);
```

---

## 10 — Seed the Database

### Step 1: Create the seed script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create authors
  const alice = await prisma.author.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@example.com",
    },
  });

  const bob = await prisma.author.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob",
      email: "bob@example.com",
    },
  });

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Prisma",
        content: "Prisma is a next-generation ORM for Node.js and TypeScript.",
        published: true,
        authorId: alice.id,
      },
      {
        title: "REST API Best Practices",
        content: "Learn how to design clean and maintainable REST APIs.",
        published: true,
        authorId: alice.id,
      },
      {
        title: "TypeScript Tips & Tricks",
        content: "Advanced TypeScript patterns for everyday use.",
        published: false,
        authorId: bob.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Step 2: Add the seed command to `package.json`

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### Step 3: Run the seed

```bash
npx prisma db seed
```

---

## 11 — View Data with Prisma Studio

```bash
npx prisma studio
```

Opens a browser GUI at `http://localhost:5555` where you can view, create, edit, and delete records visually — no SQL needed.

---

## 12 — Common Prisma CLI Commands

| Command | What It Does |
|---------|-------------|
| `npx prisma init` | Initialise Prisma in your project |
| `npx prisma migrate dev --name <name>` | Create and apply a migration |
| `npx prisma migrate reset` | Drop the database and re-run all migrations + seed |
| `npx prisma generate` | Regenerate the Prisma Client from the schema |
| `npx prisma db push` | Push schema changes without creating a migration (prototyping) |
| `npx prisma db seed` | Run the seed script |
| `npx prisma studio` | Open the visual database editor |
| `npx prisma format` | Auto-format `schema.prisma` |
| `npx prisma validate` | Check `schema.prisma` for errors |

---

## 13 — Useful Query Examples

### Find with filtering

```typescript
// Published posts only
const published = await prisma.post.findMany({
  where: { published: true },
});

// Posts by a specific author
const authorPosts = await prisma.post.findMany({
  where: { authorId: 1 },
});

// Posts containing a keyword in the title
const results = await prisma.post.findMany({
  where: {
    title: { contains: "Prisma" },
  },
});
```

### Pagination

```typescript
const page = await prisma.post.findMany({
  skip: 0,
  take: 10,
  orderBy: { createdAt: "desc" },
});
```

### Include related data

```typescript
// Post with its author
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: { author: true },
});

// Author with all their posts
const author = await prisma.author.findUnique({
  where: { id: 1 },
  include: { posts: true },
});
```

### Select specific fields

```typescript
const titles = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: {
      select: { name: true },
    },
  },
});
```

### Count records

```typescript
const total = await prisma.post.count();
const publishedCount = await prisma.post.count({
  where: { published: true },
});
```

### Upsert (create or update)

```typescript
const author = await prisma.author.upsert({
  where: { email: "alice@example.com" },
  update: { name: "Alice Updated" },
  create: { name: "Alice", email: "alice@example.com" },
});
```

---

## 14 — Tips & Gotchas

| Tip | Detail |
|-----|--------|
| **Always run `migrate dev` after schema changes** | Forgetting this means your DB and client are out of sync |
| **Use `db push` for prototyping only** | It doesn't create migration files — use `migrate dev` for real projects |
| **Add `.env` to `.gitignore`** | Never commit your `DATABASE_URL` — the generated client lives in `node_modules` and does not need to be committed |
| **Never commit credentials** | Keep `DATABASE_URL` in `.env`, which is gitignored |
| **Prisma Client is type-safe** | If your query is wrong, TypeScript will catch it at compile time |
| **Use `include` for relations** | By default, Prisma only returns scalar fields — you must opt in to relations |
| **Async/await everywhere** | All Prisma Client methods return Promises — always `await` them |
| **Use transactions for multi-step writes** | `prisma.$transaction([...])` ensures all-or-nothing updates |
| **Disconnect in scripts** | Call `prisma.$disconnect()` in standalone scripts (seed, CLI tools) |

---

## Project Structure After Setup

```
src/
├── controllers/
│   └── postController.ts
├── routes/
│   └── postRouter.ts
├── services/
│   └── postService.ts
├── prismaClient.ts         ← singleton instance
└── index.ts
prisma/
├── schema.prisma           ← your data model
├── migrations/             ← migration history
└── seed.ts                 ← seed script
```

---

## Quick Start Summary

```bash
# 1. Install
npm install prisma --save-dev
npm install @prisma/client

# 2. Initialise
npx prisma init --datasource-provider postgresql

# 3. Edit prisma/schema.prisma (add your models)

# 4. Migrate
npx prisma migrate dev --name init

# 5. Generate client (happens automatically with migrate, but just in case)
npx prisma generate

# 6. Seed (optional)
npx prisma db seed

# 7. View data
npx prisma studio

# 8. Start your app
npm run dev
```
