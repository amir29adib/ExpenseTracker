import { generalUserDto } from "modules/user/dto/general-user.dto";
import { string, z } from "zod";

export const createGroupDto = z.object({
  user_ids: z.array(z.string().min(1)),
});

export type CreateGroupDto = z.infer<typeof createGroupDto>;
