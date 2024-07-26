import request from "supertest";
import { app } from "../api";

describe("Group", () => {
  describe("Create", () => {
    it("should create group if users of group are exist", async () => {
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

      await request(app)
        .post("/group")
        .send({ user_ids: [user1.id, user2.id, user3.id] })
        .expect(200);
    });
  });
});
