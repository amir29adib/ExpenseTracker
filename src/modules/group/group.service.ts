import { HttpError } from "../../utilities/http-error";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./model/group.model";
import { GroupRepository } from "./group.repository";
import { mainGroupRepository } from "../../dependancy";
import { UserService } from "../user/user.service";

export class GroupService {
  private groupRepo: GroupRepository;
  private userService = new UserService();

  constructor() {
    this.groupRepo = mainGroupRepository;
  }

  createGroup = (dto: CreateGroupDto): Group => {
    const group = {
      user_ids: dto.user_ids,
    };

    if (!this.canCreateGroup(dto)) {
      throw new HttpError(400, `This group of users is exist!`);
    }

    const usersIds = this.userService.getAllUser().map((item) => item.id);
    const unknownUserId = dto.user_ids.find(
      (user_id) => !usersIds.includes(user_id)
    );

    if (unknownUserId !== undefined) {
      throw new HttpError(400, `User_id ${unknownUserId} is not found`);
    }

    return this.groupRepo.create(group);
  };

  getAllGroup(): Group[] {
    return this.groupRepo.getAll();
  }

  canCreateGroup = (dto: CreateGroupDto): boolean => {
    let flag = true;

    this.groupRepo.getAll().forEach((element) => {
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
