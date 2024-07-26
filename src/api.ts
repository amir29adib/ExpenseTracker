import express from "express";
import { makeUserRouter } from "./routes/user.route";
import { app as groupRoutes } from "./routes/group.route";
import { app as expenseRoutes } from "./routes/expense.route";
import { UserService } from "./modules/user/user.service";
import { UserRepository } from "./modules/user/user.repository";

export const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "Test") {
  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });
}

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

app.use("/user", makeUserRouter(userService));
app.use("/group", groupRoutes);
app.use("/expense", expenseRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not Found!" });
});
