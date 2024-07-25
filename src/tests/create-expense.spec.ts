import { v4 } from "uuid";
import { createExpense } from "../modules/expense/create-expense";
import { HttpError } from "../utilities/http-error";

describe("Create Expense", () => {
  it("should not create if cost is not positive", () => {
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: 0,
        spender: {
          id: v4(),
          username: "ali",
          password: "ali1234",
        },
        description: "cafe",
      })
    ).toThrow(HttpError);
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: -10,
        spender: {
          id: v4(),
          username: "ali",
          password: "ali1234",
        },
        description: "park",
      })
    ).toThrow(HttpError);
  });

  it("should not create if the spender does not exist!", () => {
    expect(() =>
      createExpense({
        group_id: v4(),
        cost: 10000,
        spender: {
          id: v4(),
          username: "ali",
          password: "ali1234",
        },
        description: "escape room",
      })
    ).toThrow(HttpError);
  });
});
