import * as z from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(8, "Name must be at most 8 characters long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters long",
    }),
});
