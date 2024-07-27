import { v4 } from "uuid";
import { ExpenseService } from "../modules/expense/expense.service";
import { HttpError } from "../utilities/http-error";

describe("Create Expense", () => {
  let expenseService: ExpenseService;

  beforeEach(() => {
    expenseService = new ExpenseService();
  });

  it("should not create if cost is not positive", () => {
    expect(() =>
      expenseService.createExpense({
        group_id: v4(),
        cost: 0,
        user_id: v4(),
        description: "cafe",
      })
    ).toThrow(HttpError);
    expect(() =>
      expenseService.createExpense({
        group_id: v4(),
        cost: -10,
        user_id: v4(),
        description: "park",
      })
    ).toThrow(HttpError);
  });

  it("should not create if the spender user does not exist!", () => {
    expect(() =>
      expenseService.createExpense({
        group_id: v4(),
        cost: 10000,
        user_id: v4(),
        description: "escape room",
      })
    ).toThrow(HttpError);
  });
});
