import { z } from "zod";

export const zodEmptyObject = z
  .object({})
  .refine((data) => Object.keys(data).length > 0);