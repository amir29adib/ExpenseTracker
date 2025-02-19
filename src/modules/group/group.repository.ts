import { v4 } from "uuid";
import { Group } from "./model/group.model";

export interface IGroupRepository {
  create(group: CreateGroup): Group;
  getAll(): Group[];
}

export interface CreateGroup {
  user_ids: string[];
}

export class GroupRepository implements IGroupRepository {
  private groups: Group[] = [];

  create(group: CreateGroup): Group {
    const createdGroup = { ...group, id: v4() };
    this.groups.push(createdGroup);
    return createdGroup;
  }

  getAll(): Group[] {
    return this.groups;
  }
}
