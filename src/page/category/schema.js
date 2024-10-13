import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({
      required_error: "Trường này là bắt buộc",
      invalid_type_error: "Trường này là bắt buộc",
    })
    .trim(),
  // image: z.string(),
  description: z.string().trim(),
});
