import { User } from "../modules/user/model/user";

export interface Expense {
  id: string;
  group_id: string;
  cost: number;
  user_id: string;
  description: string;
}

export const expenses: Expense[] = [];
