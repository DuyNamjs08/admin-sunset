import { z } from "zod";
export const profileSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  address: z.string().trim(),
  sub_address: z.string().trim(),
  coordinates_address: z.string().trim(),
  phone: z.string().trim(),
  sub_phone: z.string().trim(),
  // // =====
  mail: z.string().trim(),
  sub_mail: z.string().trim(),
  tax_code: z.string().trim(),
  facebook: z.string().trim(),
  message: z.string().trim(),
});
