import { v4 } from "uuid";
import { createExpense } from "../modules/expense/create-expense";
import { HttpError } from "../utilities/http-error";

describe("Create Expense", () => {
  it("should not create if cost is not positive", () => {
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: 0,
        user_id: v4(),
        description: "cafe",
      })
    ).toThrow(HttpError);
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: -10,
        user_id: v4(),
        description: "park",
      })
    ).toThrow(HttpError);
  });

  it("should not create if the spender user does not exist!", () => {
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: 10000,
        user_id: v4(),
        description: "escape room",
      })
    ).toThrow(HttpError);
  });
});
