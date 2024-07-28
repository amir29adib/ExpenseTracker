import { UserService } from "../modules/user/user.service";
import { HttpError } from "../utilities/http-error";

describe("Get User Expenses", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("should not get userExpense if user_id is empty", () => {
    expect(() => userService.getUserExpense("")).toThrow(HttpError);
  });
});
