import { createGroup } from "modules/group/create-group";
import { createUser } from "modules/user/create-user";
import { HttpError } from "utilities/http-error";

describe("Create Group", () => {
  it("should not create if one user_ids is repetitious", () => {
    const firstUserId = createUser({ username: "ali", password: "ali1234" });
    const secondUserId = createUser({ username: "omid", password: "omid1234" });

    createGroup({
      user_ids: [firstUserId, secondUserId],
    });
    expect(() =>
      createGroup({
        user_ids: [secondUserId, firstUserId],
      })
    ).toThrow(HttpError);
  });

  it("should not create if at least one item of user_ids does not exist!", () => {
    expect(() =>
      createGroup({
        user_ids: ["kdghbffgngghmkhllacfb"],
      })
    ).toThrow(HttpError);
  });
});
