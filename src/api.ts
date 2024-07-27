import express from "express";
import { makeUserRouter } from "./routes/user.route";
import { makeGroupRouter } from "./routes/group.route";
import { makeExpenseRouter } from "./routes/expense.route";
import { UserService } from "./modules/user/user.service";
import { GroupService } from "./modules/group/group.service";
import { ExpenseService } from "./modules/expense/expense.service";

export const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "Test") {
  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });
}

const userService = new UserService();
const groupService = new GroupService();
const expenseService = new ExpenseService();

app.use("/user", makeUserRouter(userService));
app.use("/group", makeGroupRouter(groupService));
app.use("/expense", makeExpenseRouter(expenseService));

app.use((req, res) => {
  res.status(404).send({ message: "Not Found!" });
});
