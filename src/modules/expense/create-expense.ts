import { v4 } from "uuid";
import { HttpError } from "../../utilities/http-error";
import { users } from "../../models/user.model";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { Expense, expenses } from "../../models/expense.model";

export const createExpense = (dto: CreateExpenseDto): string => {
  if (dto.cost <= 0) {
    throw new HttpError(400, "Price must be positive number!");
  }

  const checkSpenderExist = users.find((item) => item.id === dto.spender.id);
  if (checkSpenderExist === undefined) {
    throw new HttpError(400, "Spender does not exist!");
  }

  const expense: Expense = {
    id: v4(),
    group_id: dto.group_id,
    cost: dto.cost,
    spender: dto.spender,
    description: dto.description,
  };

  expenses.push(expense);
  return expense.id;
};
