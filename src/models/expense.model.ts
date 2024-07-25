import { User } from "./user.model";

export interface Expense {
  id: string;
  group_id: string;
  cost: number;
  spender: User;
  description: string;
}

export const expenses: Expense[] = [];
