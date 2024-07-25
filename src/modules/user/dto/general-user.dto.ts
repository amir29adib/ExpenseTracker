import { z } from "zod";

export const generalUserDto = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type GeneralUserDto = z.infer<typeof generalUserDto>;