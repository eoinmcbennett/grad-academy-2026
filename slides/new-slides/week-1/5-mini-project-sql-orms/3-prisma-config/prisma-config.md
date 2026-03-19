---
theme: default
title: Integrating Prisma into Your API
transition: view-transition
mdc: true
---

# Integrating Prisma into Your API

Wiring your database service into Express — controller, routes, seeding & queries

<!--
In the previous exercise students installed Prisma, defined a schema, ran a migration, created the singleton, and wrote a Prisma-backed service. This session covers the rest: wiring the service into the controller and router, seeding initial data, using Prisma Studio, and a full CLI + query reference.
-->

---

# What You Built in Exercise 7

- Installed `prisma` and `@prisma/client`
- Defined `Author` and `Post` models in `schema.prisma`
- Ran `prisma migrate dev` to create the tables
- Created the `PrismaClient` singleton
- Replaced the in-memory `PostService` with a Prisma-backed one

Now you'll wire it into your controller and routes, seed the database, and explore the full Prisma toolkit.

<!--
This recap anchors students before moving forward. Everything covered in the next few slides plugs into the service they just built.
-->

---

# 8 — Controller

Your controller **doesn't change** — it still receives the service via the constructor:

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
    if (Number.isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
    const post = await this.postService.findById(id);
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }
    res.json(post);
  }

  // create, update, delete follow the same pattern...
}
```

<!--
The controller is identical to Part 4 — it doesn't know or care whether the service uses Prisma or in-memory arrays. This is dependency inversion (the D in SOLID) paying off — swapping the service implementation required zero changes here.
-->

---

# 9 — Routes

Your router stays exactly the same — `src/routes/postRouter.ts`:

```typescript
import { Router } from "express";
import { PostController } from "../controllers/postController.js";
import { PostService } from "../services/postService.js";

const router = Router();
const service = new PostService();
const controller = new PostController(service);

router.get("/",     (req, res) => controller.getAll(req, res));
router.get("/:id",  (req, res) => controller.getById(req, res));
router.post("/",    (req, res) => controller.create(req, res));
router.put("/:id",  (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
```

In `src/index.ts`:

```typescript
app.use("/api/posts", postRouter);
```

<!--
The router wires URL paths to controller methods. The only thing that changes from Part 4 is the service it constructs — and even that swap is a one-liner. This is the MVC + DI pattern from SOLID delivering on its promise.
-->

---

# 10 — Seed the Database

`prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.author.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: { name: "Alice", email: "alice@example.com" },
  });

  await prisma.post.createMany({
    data: [
      { title: "Introduction to Prisma", content: "A next-gen ORM for Node.js.", published: true, authorId: alice.id },
      { title: "TypeScript Tips", content: "How type safety saves time.", published: false, authorId: alice.id },
      { title: "Building REST APIs", content: "Express makes it simple.", published: true, authorId: alice.id },
    ],
    skipDuplicates: true,
  });
}

main().finally(() => prisma.$disconnect());
```

<!--
createMany inserts multiple records in one query. skipDuplicates makes the seed script safe to run multiple times without creating duplicate rows — idempotent seeding.
-->

---

# Seed Config & Run

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run the seed:

```bash
npx prisma db seed
```

Reset and re-seed from scratch:

```bash
npx prisma migrate reset
```

> `migrate reset` drops the database, re-runs all migrations, and calls `db seed` automatically

<!--
The seed script is tightly coupled to the schema, so it's stored alongside the schema in the prisma/ folder. Prisma picks it up from package.json automatically.
-->

---
layout: center
---

# 11 — Prisma Studio

```bash
npx prisma studio
```

Opens at **http://localhost:5555**

- Browse all tables
- Create, edit, and delete records
- Follow relationships visually
- No SQL required

Great for **debugging** and **manual testing** during development

<!--
Prisma Studio is a full GUI for your database. Think of it like a spreadsheet view of your tables. You can test your data model before writing any service code.
-->

---

# 12 — CLI Reference

| Command | What It Does |
|---------|-------------|
| `npx prisma init` | Bootstrap schema and .env |
| `npx prisma migrate dev --name <n>` | Create & apply migration |
| `npx prisma migrate reset` | Drop DB, re-run migrations + seed |
| `npx prisma generate` | Regenerate the Prisma Client |
| `npx prisma db push` | Prototype without migration files |
| `npx prisma db seed` | Run the seed script |
| `npx prisma studio` | Open visual database browser |
| `npx prisma format` | Auto-format schema.prisma |
| `npx prisma validate` | Check schema for errors |

<!--
You'll use migrate dev and studio the most during day-to-day development. migrate reset is useful when you want to start fresh on your local database.
-->

---

# 13 — Query Examples: Filtering & Sorting

```typescript
// Posts by a specific author (using relation filter)
const byAuthor = await prisma.post.findMany({
  where: { author: { name: "Alice" } },
  include: { author: true },
});

// Search title
const results = await prisma.post.findMany({
  where: { title: { contains: "prisma", mode: "insensitive" } },
});

// Published posts, newest first, paginated
const page = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: "desc" },
  skip: 0,
  take: 10,
});
```

<!--
All queries are fully type-safe — TypeScript will error if you reference a field that doesn't exist in the schema. The where clause supports extensive filtering options: equals, contains, startsWith, gt, lt, in, and more.
-->

---

# 13 — Query Examples: Select & Aggregate

```typescript
// Select only specific fields (leaner response)
const summaries = await prisma.post.findMany({
  select: { id: true, title: true, published: true },
});

// Count all posts
const total = await prisma.post.count();

// Count published posts
const publishedCount = await prisma.post.count({ where: { published: true } });

// Upsert — create or update (useful in seed scripts)
const post = await prisma.post.upsert({
  where: { id: 1 },
  update: { published: true },
  create: { title: "Hello World", content: "First post!", published: false, authorId: 1 },
});
```

<!--
include fetches related data in a single query (like a JOIN). select narrows the response to specific fields, which is useful for performance. upsert is perfect for seed scripts and sync operations.
-->

---

# 14 — Tips & Gotchas

| Tip | Detail |
|-----|--------|
| **Run `migrate dev` after every schema change** | DB and client go out of sync otherwise |
| **`db push` is for prototyping only** | Never use it on a shared/production DB |
| **Never commit `.env`** | It contains your `DATABASE_URL` — always add it to `.gitignore` |
| **`include` is opt-in** | Relations aren't fetched unless you ask |
| **Always `await` Prisma calls** | Every Prisma method returns a Promise |
| **Use `$transaction` for multi-step writes** | Ensures all-or-nothing updates |
| **Call `$disconnect()` in scripts** | Seed files and CLI tools must disconnect manually |

<!--
The most common mistake beginners make is forgetting to run migrate dev after changing the schema. The client and database will be out of sync and you'll get confusing errors.
-->

---

# Project Structure

```
src/
├── controllers/
│   └── postController.ts
├── routes/
│   └── postRouter.ts
├── services/
│   └── postService.ts      ← now backed by Prisma
├── prismaClient.ts         ← singleton
└── index.ts
prisma/
├── schema.prisma           ← source of truth
├── migrations/             ← migration history (commit this)
└── seed.ts                 ← seed script
```

<!--
Commit schema.prisma and the migrations folder. Never commit .env. Any developer can clone the repo, set their own DATABASE_URL, and run migrate dev to recreate the full schema locally.
-->

---
layout: center
---

# Now it's your turn

**Exercise 8** — Wire your Prisma-backed `ExpenseService` into the full API: confirm the controller and routes need no changes, seed the database with initial data, explore it in Prisma Studio, and verify your test suite still passes.

<!--
This exercise completes the full integration. Students swap in the Prisma service, add a seed script, run Studio to inspect data, and update unit tests to mock Prisma — confirming the DI pattern from Exercise 6 makes testing equally clean.
-->
