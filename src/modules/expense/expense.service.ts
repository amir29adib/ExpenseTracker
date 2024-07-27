import { v4 } from "uuid";
import { HttpError } from "../../utilities/http-error";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { Expense } from "./model/expense";
import { UserService } from "../user/user.service";
import { GroupService } from "../group/group.service";
import { ExpenseRepository } from "./expense.repository";
import { mainExpenseRepository } from "../../dependancy";

export class ExpenseService {
  private expenseRepo: ExpenseRepository;
  private userService: UserService;
  private groupService: GroupService;

  constructor() {
    this.expenseRepo = mainExpenseRepository;
    this.userService = new UserService();
    this.groupService = new GroupService();
  }

  createExpense = (dto: CreateExpenseDto): Expense => {
    if (dto.cost <= 0) {
      throw new HttpError(400, "Price must be positive number!");
    }

    const checkSpenderExist = this.userService.findUserById(dto.user_id);
    if (checkSpenderExist === undefined) {
      throw new HttpError(400, "Spender does not exist!");
    }

    const expense: Expense = {
      id: v4(),
      group_id: dto.group_id,
      cost: dto.cost,
      user_id: dto.user_id,
      description: dto.description,
    };

    this.expenseRepo.create(expense);

    return expense;
  };

  getAllExpense(): Expense[] {
    return this.expenseRepo.getAll();
  }

  getCreditorExpnese = (user_id: string): Expense[] => {
    const creditorExpenses = this.getAllExpense().filter(
      (item) => item.user_id === user_id
    );

    return creditorExpenses;
  };

  getDebtorExpnese = (user_id: string): Expense[] => {
    const debtorExpenses = this.getAllExpense().filter((expenseItem) =>
      this.groupService
        .getAllGroup()
        .find(
          (groupItem) =>
            groupItem.id === expenseItem.group_id &&
            groupItem.user_ids.includes(user_id)
        )
    );

    return debtorExpenses;
  };
}
