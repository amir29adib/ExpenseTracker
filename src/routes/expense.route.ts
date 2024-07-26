import { Router } from "express";
import { createExpense } from "../modules/expense/create-expense";

export const app = Router();

app.post("", (req, res) => {
  const { user_id, group_id, cost, description } = req.body;
  const expense = createExpense({
    user_id: user_id,
    group_id: group_id,
    cost: cost,
    description: description,
  });
  res.status(200).send(expense);
});
