import { User } from "models/user.model";

export interface Group {
  id: string;
  user_ids: string[];
}

export const groups: Group[] = [];
