import { v4 } from "uuid";
import { HttpError } from "../../utilities/http-error";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group, groups } from "../../models/group.model";
import { users } from "../user/model/user.model";

export const createGroup = (dto: CreateGroupDto): Group => {
  if (!canCreateGroup(dto)) {
    throw new HttpError(400, `This group of users is exist!`);
  }

  const usersIds = users.map((item) => item.id);
  const unknownUserId = dto.user_ids.find(
    (user_id) => !usersIds.includes(user_id)
  );

  if (unknownUserId !== undefined) {
    throw new HttpError(400, `User_id ${unknownUserId} is not found`);
  }

  const group: Group = {
    id: v4(),
    user_ids: dto.user_ids,
  };

  groups.push(group);

  return group;
};

export const canCreateGroup = (dto: CreateGroupDto): boolean => {
  let flag = true;

  groups.forEach((element) => {
    let counter = 0;
    element.user_ids.forEach((user_id) => {
      if (dto.user_ids.includes(user_id)) {
        counter++;
      }

      if (counter === dto.user_ids.length) {
        flag = false;
      }
    });
  });

  return flag;
};
