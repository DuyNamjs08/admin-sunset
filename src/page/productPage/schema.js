import { z } from "zod";

export const productSchema = z.object({
  productName: z
    .string({
      required_error: "Trường này là bắt buộc",
      invalid_type_error: "Trường này là bắt buộc",
    })
    .trim(),
  description: z.string().trim().optional(),
  price: z.string().trim(),
  category_id: z.string().trim(),
  promoteType: z.boolean(),
  promotePrice: z.string().trim(),
  // // =====
  type: z.string().trim(),
  status: z.boolean(),
  inStore: z.string().trim(),
  weight: z.string().trim(),
  size: z.string().trim(),
  color: z.string().trim(),
});
