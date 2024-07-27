import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { HttpError } from "../utilities/http-error";

describe("Create User", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("should not create if username or password is empty", () => {
    expect(() =>
      userService.createUser({ username: "", password: "" })
    ).toThrow(HttpError);
  });

  it("should not create if username would have existed", () => {
    userService.createUser({ username: "ali", password: "ali1234" });
    expect(() =>
      userService.createUser({ username: "ali", password: "ali1234" })
    ).toThrow(HttpError);
  });
});
