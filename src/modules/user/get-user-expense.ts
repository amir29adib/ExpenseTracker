import { HttpError } from "../../utilities/http-error";
import { isEmptyString } from "../../utilities/empty-validation";
import { userExpenseDto } from "./dto/user-expense.dto";
import { ExpenseService } from "../expense/expense.service";

const expenseService = new ExpenseService();

export const getUserExpense = (user_id: string): userExpenseDto => {
  if (isEmptyString(user_id)) {
    throw new HttpError(400, "user_id should not empty");
  }

  const creditorExpenses = expenseService.getCreditorExpnese(user_id);

  const debtorExpenses = expenseService.getDebtorExpnese(user_id);

  const dto: userExpenseDto = {
    debtorExpenses: debtorExpenses,
    creditorExpenses: creditorExpenses,
  };

  return dto;
};
