import { z } from "zod";

export const formValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .trim()
    .toLowerCase(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format")
    .trim()
    .toLowerCase(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
