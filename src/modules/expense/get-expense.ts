import { Expense, expenses } from "../../models/expense.model";
import { groups } from "../../models/group.model";

export const getCreditorExpnese = (user_id: string): Expense[] => {
  const creditorExpenses = expenses.filter(
    (item) => item.user_id === user_id
  );

  return creditorExpenses;
};

export const getDebtorExpnese = (user_id: string): Expense[] => {
  const debtorExpenses = expenses.filter((expenseItem) =>
    groups.find(
      (groupItem) =>
        groupItem.id === expenseItem.group_id &&
        groupItem.user_ids.includes(user_id)
    )
  );

  return debtorExpenses;
};