import { v4 } from "uuid";
import { User } from "./model/user.model";
import { HttpError } from "../../utilities/http-error";
import { CreateUserDto } from "./dto/create-user.dto";
import { isEmptyString } from "../../utilities/empty-validation";
import { UserRepository } from "./user.repository";
import { userExpenseDto } from "./dto/user-expense.dto";
import { getCreditorExpnese, getDebtorExpnese } from "../expense/get-expense";

export class UserService {
  constructor(private userRepo: UserRepository) {
    this.userRepo = new UserRepository();
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

    this.userRepo.create(user);

    return user;
  };

  getUserExpense = (user_id: string): userExpenseDto => {
    if (isEmptyString(user_id)) {
      throw new HttpError(400, "user_id should not empty");
    }

    const creditorExpenses = getCreditorExpnese(user_id);

    const debtorExpenses = getDebtorExpnese(user_id);

    const dto: userExpenseDto = {
      debtorExpenses: debtorExpenses,
      creditorExpenses: creditorExpenses,
    };

    return dto;
  };
}
