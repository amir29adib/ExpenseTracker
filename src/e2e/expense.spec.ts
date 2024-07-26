import request from "supertest";
import { app } from "../api";

describe("Group", () => {
  describe("Create", () => {
    it("should create group if users of group are exist", async () => {
      const { body: spenderUser } = await request(app)
        .post("/user")
        .send({ username: "arman", password: "arman1234" })
        .expect(200);

      const { body: user1 } = await request(app)
        .post("/user")
        .send({ username: "ali", password: "ali1234" })
        .expect(200);
      const { body: user2 } = await request(app)
        .post("/user")
        .send({ username: "omid", password: "omid1234" })
        .expect(200);

      const { body: user3 } = await request(app)
        .post("/user")
        .send({ username: "amir", password: "amir1234" })
        .expect(200);

      const { body: group } = await request(app)
        .post("/group")
        .send({ user_ids: [user1.id, user2.id, user3.id] })
        .expect(200);

      await request(app)
        .post("/expense")
        .send({
          group_id: group.id,
          cost: 10000,
          user_id: spenderUser.id,
          description: "telecabin",
        })
        .expect(200);
    });
  });
});
