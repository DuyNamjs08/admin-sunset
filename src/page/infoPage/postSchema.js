import { z } from "zod";

export const postSchema = z.object({
  name: z.string().trim(),
});
