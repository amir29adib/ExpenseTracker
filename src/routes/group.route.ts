import { Router } from "express";
import { GroupService } from "../modules/group/group.service";

export const makeGroupRouter = (groupService: GroupService) => {
  const app = Router();

  app.post("", (req, res) => {
    const { user_ids } = req.body;
    const group = groupService.createGroup({ user_ids: user_ids });
    res.status(200).send(group);
  });

  return app;
};
