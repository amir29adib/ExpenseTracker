import { Router } from "express";
import { UserService } from "../modules/user/user.service";
import { createUserDto } from "../modules/user/dto/create-user.dto";

export const makeUserRouter = (userService: UserService) => {
  const app = Router();

  app.post("", (req, res) => {
    const dto = createUserDto.parse(req.body);
    const user = userService.createUser(dto);
    res.status(200).send(user);
  });

  return app;
};
