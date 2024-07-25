import { Expense } from "../../../models/expense.model";

export interface userExpenseDto {
  debtorExpenses: Expense[];
  creditorExpenses: Expense[];
};