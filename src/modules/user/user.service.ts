import { v4 } from "uuid";
import { User } from "./model/user";
import { HttpError } from "../../utilities/http-error";
import { CreateUserDto } from "./dto/create-user.dto";
import { isEmptyString } from "../../utilities/empty-validation";
import { UserRepository } from "./user.repository";
import { userExpenseDto } from "./dto/user-expense.dto";
import { mainUserRepository } from "../../dependancy";
import { ExpenseService } from "../expense/expense.service";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = mainUserRepository;
  }

  createUser = (dto: CreateUserDto): User => {
    if (isEmptyString(dto.username) || isEmptyString(dto.password)) {
      throw new HttpError(400, "Username or Password is empty!");
    }

    if (this.userRepo.findByUsername(dto.username) !== undefined) {
      throw new HttpError(400, "This Username is exist!");
    }

    const user: User = {
      id: v4(),
      username: dto.username,
      password: dto.password,
    };

    return this.userRepo.create(user);
  };

  findUserById(id: string): User | undefined {
    return this.userRepo.findById(id);
  }

  getAllUser(): User[] {
    return this.userRepo.getAll();
  }

  getUserExpense = (user_id: string): userExpenseDto => {
    if (isEmptyString(user_id)) {
      throw new HttpError(400, "user_id should not empty");
    }

    const expenseService = new ExpenseService();
    const creditorExpenses = expenseService.getCreditorExpnese(user_id);
    const debtorExpenses = expenseService.getDebtorExpnese(user_id);

    const dto: userExpenseDto = {
      debtorExpenses: debtorExpenses,
      creditorExpenses: creditorExpenses,
    };

    return dto;
  };
}
