import { v4 } from "uuid";
import { Expense } from "./model/expense.model";

export interface IExpenseRepository {
  create(expense: CreateExpense): Expense;
  getAll(): Expense[];
}

export interface CreateExpense {
  cost: number;
  group_id: string;
  user_id: string;
  description: string;
}

export class ExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = [];

  create(expense: CreateExpense): Expense {
    const createdExpense = { ...expense, id: v4() };
    this.expenses.push(createdExpense);
    return createdExpense;
  }

  getAll(): Expense[] {
    return this.expenses;
  }
}
