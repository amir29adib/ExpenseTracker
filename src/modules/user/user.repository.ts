import { v4 } from "uuid";
import { User } from "./model/user";
import { DataSourceType } from "../../data-soure";
import fs from "fs";

interface IUserRepository {
  create(user: CreateUser): User;
  update(id: string, user: UpdateUser): User | undefined;
  findByUsername(username: string): User | undefined;
  findById(id: string): User | undefined;
  getAll(): User[];
}

export interface CreateUser {
  username: string;
  password: string;
}

export interface UpdateUser {
  password: string;
}

export class UserRepository implements IUserRepository {
  private users: User[] = getUserDataSource("json");

  public create(user: CreateUser): User {
    const createdUser = { ...user, id: v4() };
    this.users.push(createdUser);
    return createdUser;
  }

  public findById(id: string): User | undefined {
    return this.users.find((item) => item.id === id);
  }

  public findByUsername(username: string): User | undefined {
    return this.users.find((item) => item.username === username);
  }

  public update(id: string, user: UpdateUser): User | undefined {
    const updatedUser = { ...user };
    const index = this.users.findIndex((user) => user.id === user.id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    }

    return this.findById(id);
  }

  public getAll(): User[] {
    return this.users;
  }
}

const getUserDataSource = (env: DataSourceType) => {
  switch (env) {
    case "json":
      const jsonString = fs.readFileSync("../../myData.json", "utf-8");
      return JSON.parse(jsonString);

    case "array":
      break;

    case "db":
      break;

    default:
      const jsonStringDefault = fs.readFileSync("../../myData.json", "utf-8");
      return JSON.parse(jsonStringDefault);
  }
};
