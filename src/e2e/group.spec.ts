import { v4 } from "uuid";
import { createGroup } from "../modules/group/create-group";
import { createUser } from "../modules/user/create-user";
import { HttpError } from "../utilities/http-error";

describe("Group", () => {
  describe("Create", () => {
      it("should not create if user did not login", async () => {
        await 
    });
    it("should not create if user did not login", async () => {
      const spenderUser = createUser({
        username: "amir",
        password: "amir1234",
      });
      const firstUser = createUser({ username: "ali", password: "ali1234" });
      const secondUser = createUser({ username: "omid", password: "omid1234" });

      createGroup({
        user_ids: [firstUser.id, secondUser.id],
      });
      expect(() =>
        createGroup({
          user_ids: [secondUser.id, firstUser.id],
        })
      ).toThrow(HttpError);
    });

    it("should not create if at least one item of user_ids does not exist!", () => {
      createGroup({
        user_ids: [v4()],
      });
    });
  });
});
