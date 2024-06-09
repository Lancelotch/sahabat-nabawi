import validator from "validator";
import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  phone_number: z.string().refine(validator.isMobilePhone),
});

export type User = z.infer<typeof registerSchema>;
