import type { Request, Response } from "express";
import type { ExpenseService } from "../services/expenseService.js";

export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const expenses = await this.expenseService.getAll();
    res.render("pages/expenses.njk", { expenses });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).render("pages/error.njk", {
        status: 400,
        message: "Invalid expense ID",
      });
      return;
    }

    const expense = await this.expenseService.getById(id);
    if (!expense) {
      res.status(404).render("pages/error.njk", {
        status: 404,
        message: "Expense not found",
      });
      return;
    }

    res.render("pages/expense-detail.njk", { expense });
  }

  async showCreateForm(req: Request, res: Response): Promise<void> {
    res.render("pages/expense-form.njk");
  }

  async showEditForm(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).render("pages/error.njk", {
        status: 400,
        message: "Invalid expense ID",
      });
      return;
    }

    const expense = await this.expenseService.getById(id);
    if (!expense) {
      res.status(404).render("pages/error.njk", {
        status: 404,
        message: "Expense not found",
      });
      return;
    }

    res.render("pages/expense-form.njk", { expense });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { date, description, user, amount } = req.body;
    await this.expenseService.create({
      date,
      description,
      user,
      amount: Number.parseFloat(amount),
    });
    res.redirect("/expenses");
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).render("pages/error.njk", {
        status: 400,
        message: "Invalid expense ID",
      });
      return;
    }

    const { date, description, user, amount } = req.body;
    const updated = await this.expenseService.update(id, {
      date,
      description,
      user,
      amount: Number.parseFloat(amount),
    });

    if (!updated) {
      res.status(404).render("pages/error.njk", {
        status: 404,
        message: "Expense not found",
      });
      return;
    }

    res.redirect(`/expenses/${id}`);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).render("pages/error.njk", {
        status: 400,
        message: "Invalid expense ID",
      });
      return;
    }

    const deleted = await this.expenseService.delete(id);
    if (!deleted) {
      res.status(404).render("pages/error.njk", {
        status: 404,
        message: "Expense not found",
      });
      return;
    }

    res.redirect("/expenses");
  }
}
