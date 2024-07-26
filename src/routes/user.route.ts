import { Router } from "express";
import { createUser } from "../modules/user/create-user";

export const app = Router();

app.post("", (req, res) => {
  const { username, password } = req.body;
  const user = createUser({ username: username, password: password });
  res.status(200).send(user);
});