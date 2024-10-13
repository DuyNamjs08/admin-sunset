import { z } from "zod";

export const orderSchema = z.object({
  status: z.string().trim(),
});
