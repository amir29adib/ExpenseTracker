import { Router } from "express";
import { ExpenseService } from "../modules/expense/expense.service";

export const makeExpenseRouter = (expenseService: ExpenseService) => {
  const app = Router();

  app.post("", (req, res) => {
    const { user_id, group_id, cost, description } = req.body;
    const expense = expenseService.createExpense({
      user_id: user_id,
      group_id: group_id,
      cost: cost,
      description: description,
    });
    res.status(200).send(expense);
  });

  return app;
};
