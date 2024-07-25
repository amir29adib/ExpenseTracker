import { createExpense } from "../modules/expense/create-expense";
import { HttpError } from "../utilities/http-error";

describe("Create Expense", () => {
  it("should not create if cost is not positive", () => {
    expect(() =>
      createExpense({
        group_id: "sdsdvdffvdvs4234fvsfv",
        cost: 0,
        spender: {
          id: "abbfdert231dcsdc3sdc",
          username: "ali",
          password: "ali1234",
        },
        description: "cafe",
      })
    ).toThrow(HttpError);
    expect(() =>
      createExpense({
        group_id: "sdsdvdffvdvs4234fvsfv",
        cost: -10,
        spender: {
          id: "abbfdert231dcsdc3sdc",
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
        group_id: "sdsdvdffvdvs4234fvsfv",
        cost: 10000,
        spender: {
          id: "abbfdert231dcsdc3sdc",
          username: "ali",
          password: "ali1234",
        },
        description: "escape room",
      })
    ).toThrow(HttpError);
  });
});
