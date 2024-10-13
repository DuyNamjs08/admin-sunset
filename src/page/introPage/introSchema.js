import { z } from "zod";
export const introSchema = z.object({
  name: z.string().trim(),
});
