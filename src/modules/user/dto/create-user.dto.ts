import { z } from "zod";

export const createUserDto = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
