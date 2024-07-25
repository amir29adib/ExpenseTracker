import { createUser } from "modules/user/create-user";
import { HttpError } from "utilities/http-error";

describe("Create User", () => {
  it("should not create if username or password is empty", () => {
    expect(() => createUser({ username: "", password: "" })).toThrow(HttpError);
  });

  it("should not create if username would have existed", () => {
    createUser({ username: "ali", password: "ali1234" });
    expect(() => createUser({ username: "ali", password: "ali1234" })).toThrow(
      HttpError
    );
  });
});
