import { z } from "zod";

export const footerSchema = z.object({
  title_footer_col1: z.string().trim(),
  footerCol1: z.string().trim(),
  title_footer_col2: z.string().trim(),
  footerCol2: z.string().trim(),
  title_footer_col3: z.string().trim(),
  footerCol3: z.string().trim(),
  titleSubFooter: z.string().trim(),
  address: z.string().trim(),
  phone: z.string().trim(),
  mail: z.string().trim(),
});
