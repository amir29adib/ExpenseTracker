import { HttpError } from "../../utilities/http-error";
import { isEmptyString } from "../../utilities/empty-validation";
import { getCreditorExpnese, getDebtorExpnese } from "../expense/get-expense";
import { userExpenseDto } from "./dto/user-expense.dto";

export const getUserExpense = (user_id: string): userExpenseDto => {
  if (isEmptyString(user_id)) {
    throw new HttpError(400, "user_id should not empty");
  }

  const creditorExpenses = getCreditorExpnese(user_id);

  const debtorExpenses = getDebtorExpnese(user_id);

  const dto: userExpenseDto = {
    debtorExpenses: debtorExpenses,
    creditorExpenses: creditorExpenses,
  };

  return dto;
};
