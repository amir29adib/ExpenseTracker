import { v4 } from "uuid";
import { UserService } from "../modules/user/user.service";
import { HttpError } from "../utilities/http-error";
import { GroupService } from "../modules/group/group.service";

describe("Create Group", () => {
  let groupService: GroupService;
  let userService: UserService;

  beforeEach(() => {
    groupService = new GroupService();
    userService = new UserService();
  });

  it("should not create if one user_ids is repetitious", () => {
    const firstUser = userService.createUser({
      username: "ali",
      password: "ali1234",
    });
    const secondUser = userService.createUser({
      username: "omid",
      password: "omid1234",
    });

    groupService.createGroup({
      user_ids: [firstUser.id, secondUser.id],
    });
    expect(() =>
      groupService.createGroup({
        user_ids: [secondUser.id, firstUser.id],
      })
    ).toThrow(HttpError);
  });

  it("should not create if at least one item of user_ids does not exist!", () => {
    expect(() =>
      groupService.createGroup({
        user_ids: [v4()],
      })
    ).toThrow(HttpError);
  });
});
