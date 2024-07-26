import { v4 } from "uuid";
import { User } from "./model/user.model";

interface IUserRepository {
  create(user: CreateUser): User;
  findByUsername(username: string): User | undefined;
}

export interface CreateUser {
  username: string;
  password: string;
}

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  public create(user: CreateUser): User {
    const createdUser = { ...user, id: v4() };
    this.users.push(createdUser);
    return createdUser;
  }

  public findByUsername(username: string): User | undefined {
    return this.users.find((item) => item.username === username);
  }
}
