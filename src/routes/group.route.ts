import { Router } from "express";
import { createGroup } from "../modules/group/create-group";

export const app = Router();

app.post("", (req, res) => {
  const { user_ids } = req.body;
  const group = createGroup({ user_ids: user_ids });
  res.status(200).send(group);
});