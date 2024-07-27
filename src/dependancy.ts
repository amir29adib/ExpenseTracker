import { ExpenseRepository } from "./modules/expense/expense.repository";
import { GroupRepository } from "./modules/group/group.repository";
import { UserRepository } from "./modules/user/user.repository";

export const mainUserRepository = new UserRepository();
export const mainGroupRepository = new GroupRepository();
export const mainExpenseRepository = new ExpenseRepository();
