# Exercise 4 — Models & DTOs

In this exercise you'll replace all uses of `any` in your expenses API with proper types. You'll create a domain model class with constructor validation, define DTOs to control what enters and leaves your API, and update the service and controller to use them.

---

## What You're Building

By the end of this exercise your project structure should look like this:

```
src/
├── controllers/
│   └── expenseController.ts   ← UPDATE (build DTOs before responding)
├── routes/
│   └── expenseRouter.ts       ← no changes needed
├── services/
│   └── expenseService.ts      ← UPDATE (store and return Expense instances)
├── models/
│   └── expense.ts             ← NEW (domain model class)
├── dtos/
│   └── expenseDto.ts          ← NEW (request and response DTOs)
└── index.ts
```

---

## Step 1 — Create the Expense Interface, then Class

### 1a — Start with an interface

Create a new file at `src/models/expense.ts` and define an interface first:

```typescript
export interface Expense {
  id: number;
  date: string;
  description: string;
  user: string;
}
```

Update `ExpenseService` to replace `any[]` with `Expense[]`. Run the app and confirm TypeScript is happy before continuing.

---

### 1b — Upgrade to a class with validation

Replace the interface with a class that enforces invariants in the constructor:

```typescript
// src/models/expense.ts
export class Expense {
  constructor(
    public readonly id: number,
    public readonly date: string,
    public readonly description: string,
    public readonly user: string,
  ) {
    if (id <= 0) throw new Error("ID must be positive");
    if (!date.trim()) throw new Error("Date cannot be empty");
    if (!description.trim()) throw new Error("Description cannot be empty");
    if (!user.trim()) throw new Error("User cannot be empty");
  }
}
```

> **Why a class?** `readonly` prevents accidental mutation after creation, and the constructor guarantees invalid `Expense` objects can never be constructed — validation is in one place, not scattered across the codebase.

---

## Step 2 — Create DTOs

Create a new file at `src/dtos/expenseDto.ts` with two interfaces:

```typescript
// src/dtos/expenseDto.ts

export interface ExpenseResponseDto {
  id: number;
  date: string;
  description: string;
  user: string;
}

export interface CreateExpenseRequestDto {
  date: string;
  description: string;
  user: string;
}
```

**Why two separate types?**

- `ExpenseResponseDto` controls exactly what clients see — if you later add sensitive internal fields to `Expense`, they won't accidentally appear in responses
- `CreateExpenseRequestDto` types incoming request bodies — clients never supply an `id` (the server generates it)

---

## Step 3 — Update the ExpenseService

Replace the `any[]` mock data with `Expense` class instances and update all method signatures:

| Before | After |
|--------|-------|
| `const mockExpenses: any[]` | `const mockExpenses: Expense[]` |
| `findAll(): Promise<any[]>` | `findAll(): Promise<Expense[]>` |
| `findById(id): Promise<any>` | `findById(id): Promise<Expense \| undefined>` |
| `create(expense: any): Promise<any>` | `create(data: CreateExpenseRequestDto): Promise<Expense>` |
| `update(id, expense: any): Promise<any>` | `update(id, data: CreateExpenseRequestDto): Promise<Expense \| undefined>` |

### Your mock data should use the class constructor:

```typescript
import { Expense } from "../models/expense";

const mockExpenses: Expense[] = [
  new Expense(1, "20-10-2026", "Lunch with a client", "Joe Bloggs"),
  new Expense(2, "21-10-2026", "Train to Edinburgh", "Jane Smith"),
];
```

### The `create` method should construct a new `Expense`:

```typescript
async create(data: CreateExpenseRequestDto): Promise<Expense> {
  const id = Math.max(...mockExpenses.map(e => e.id), 0) + 1;
  const expense = new Expense(id, data.date, data.description, data.user);
  mockExpenses.push(expense);
  return expense;
}
```

> The `Expense` constructor will throw if any field is empty — invalid data never reaches the array.

---

## Step 4 — Update the ExpenseController

The controller should now build an `ExpenseResponseDto` before sending any response, instead of returning `Expense` instances directly.

### For `getAll`:

```typescript
async getAll(req: Request, res: Response): Promise<void> {
  const expenses = await this.service.findAll();
  const dtos: ExpenseResponseDto[] = expenses.map(e => ({
    id: e.id,
    date: e.date,
    description: e.description,
    user: e.user,
  }));
  res.status(200).json(dtos);
}
```

### For `getById`:

```typescript
async getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID must be a number" });
    return;
  }
  const expense = await this.service.findById(id);
  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }
  const dto: ExpenseResponseDto = {
    id: expense.id,
    date: expense.date,
    description: expense.description,
    user: expense.user,
  };
  res.status(200).json(dto);
}
```

Apply the same pattern (`Expense` → `ExpenseResponseDto`) in `create` and `update`.

---

## Step 5 — Type the Request Body in `create`

Use `CreateExpenseRequestDto` to type the incoming body:

```typescript
async create(req: Request, res: Response): Promise<void> {
  const body: CreateExpenseRequestDto = req.body;

  if (!body.date || !body.description || !body.user) {
    res.status(400).json({ error: "date, description and user are required" });
    return;
  }

  const expense = await this.service.create(body);
  const dto: ExpenseResponseDto = {
    id: expense.id,
    date: expense.date,
    description: expense.description,
    user: expense.user,
  };
  res.status(201).json(dto);
}
```

> The controller validates that fields are present, then passes the typed body to the service. The `Expense` constructor acts as a second line of defence.

---

## Expected Behaviour

Test each route in **Insomnia or Postman** — the responses should look identical to Exercise 3, but the code is now fully typed:

| Request | Expected response |
|---------|------------------|
| `GET /api/expenses` | `200` — array of `ExpenseResponseDto` objects |
| `GET /api/expenses/1` | `200` — single `ExpenseResponseDto` |
| `GET /api/expenses/999` | `404` — `{ "error": "Expense not found" }` |
| `GET /api/expenses/abc` | `400` — `{ "error": "ID must be a number" }` |
| `POST /api/expenses` with valid body | `201` — new `ExpenseResponseDto` with generated `id` |
| `POST /api/expenses` with missing fields | `400` — `{ "error": "date, description and user are required" }` |
| `PUT /api/expenses/1` with body | `200` — updated `ExpenseResponseDto` |
| `DELETE /api/expenses/1` | `204` — no body |
| `DELETE /api/expenses/999` | `404` — `{ "error": "Expense not found" }` |

---

## Stretch Goals

- Try adding an `amount: number` field to `Expense` — trace all the places TypeScript forces you to update
- Add validation to `amount` in the constructor (e.g. must be greater than 0)
- Add an `AmountExpenseResponseDto` that also includes `amount` and return it from a new `GET /api/expenses/:id/details` route
