import { v4 } from "uuid";
import { User, users } from "models/user.model";
import { HttpError } from "utilities/http-error";
import { CreateUserDto } from "modules/user/dto/create-user.dto";

export const createUser = (dto: CreateUserDto): string => {
  if (dto.username === "" || dto.password === "") {
    throw new HttpError(400, "Username or Password is empty!");
  }

  const existUser = users.find((item) => item.username === dto.username);
  if (existUser !== undefined) {
    throw new HttpError(400, "This Username is exist!");
  }

  const user: User = {
    id: v4(),
    username: dto.username,
    password: dto.password,
  };
  users.push(user);

  return user.id;
};
