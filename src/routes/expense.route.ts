import { Router } from "express";
import { createExpense } from "../modules/expense/create-expense";

export const app = Router();

app.post("", (req, res) => {
  const { spender, group_id, cost, description } = req.body;
  const expense_id = createExpense({
    spender: spender,
    group_id: group_id,
    cost: cost,
    description: description,
  });
  res.status(200).send({ expense_id: expense_id });
});
