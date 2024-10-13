import { z } from "zod";

export const contactSchema = z.object({
  title: z.string().trim(),
  textTitle: z.string().trim(),
  subTitle: z.string().trim(),
  textSubTitle: z.string().trim(),
  address: z.string().trim(),
  phone: z.string().trim(),
  location: z.string().trim(),
});
