import { z } from "zod";

export const loginSchema = z.object({
  mail: z
    .string({
      required_error: "Trường này là bắt buộc",
      invalid_type_error: "Trường này là bắt buộc",
    })
    .trim(),
  password: z.string().trim(),
});
