import { HttpError } from "../../utilities/http-error";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group, groups } from "./model/group";
import { GroupRepository } from "./group.repository";
import { UserRepository } from "../user/user.repository";
import { mainGroupRepository, mainUserRepository } from "../../dependancy";

export class GroupService {
  private groupRepo: GroupRepository;
  private userRepo: UserRepository;

  constructor() {
    this.groupRepo = mainGroupRepository;
    this.userRepo = mainUserRepository;
  }

  createGroup = (dto: CreateGroupDto): Group => {
    const group = {
      user_ids: dto.user_ids,
    };

    if (!this.canCreateGroup(dto)) {
      throw new HttpError(400, `This group of users is exist!`);
    }

    const usersIds = this.userRepo.getAll().map((item) => item.id);
    const unknownUserId = dto.user_ids.find(
      (user_id) => !usersIds.includes(user_id)
    );
    console.log(unknownUserId);
    if (unknownUserId !== undefined) {
      throw new HttpError(400, `User_id ${unknownUserId} is not found`);
    }

    return this.groupRepo.create(group);
  };

  canCreateGroup = (dto: CreateGroupDto): boolean => {
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
}
