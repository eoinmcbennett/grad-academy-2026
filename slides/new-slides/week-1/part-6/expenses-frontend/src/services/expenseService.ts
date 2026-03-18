export interface Expense {
  id: number;
  date: string;
  description: string;
  user: string;
  amount: number;
}

export class ExpenseService {
  private expenses: Expense[] = [
    {
      id: 1,
      date: "2026-01-15",
      description: "Lunch with client",
      user: "Alice",
      amount: 25.5,
    },
    {
      id: 2,
      date: "2026-01-20",
      description: "Train ticket to London",
      user: "Bob",
      amount: 85.0,
    },
    {
      id: 3,
      date: "2026-02-03",
      description: "Office supplies",
      user: "Alice",
      amount: 42.99,
    },
  ];

  private nextId = 4;

  async getAll(): Promise<Expense[]> {
    return this.expenses;
  }

  async getById(id: number): Promise<Expense | undefined> {
    return this.expenses.find((e) => e.id === id);
  }

  async create(data: Omit<Expense, "id">): Promise<Expense> {
    const expense: Expense = { id: this.nextId++, ...data };
    this.expenses.push(expense);
    return expense;
  }

  async update(id: number, data: Omit<Expense, "id">): Promise<Expense | undefined> {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    this.expenses[index] = { id, ...data };
    return this.expenses[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.expenses.splice(index, 1);
    return true;
  }
}
