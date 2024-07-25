import { getUserExpense } from "../modules/user/get-user-expense";
import { HttpError } from "../utilities/http-error";

describe("Get User Expenses", () => {
  it("should not get userExpense if user_id is empty", () => {
    expect(() => getUserExpense("")).toThrow(HttpError);
  });
});
