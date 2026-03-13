import { z } from "zod";

export const formValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .trim()
    .toLowerCase(),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .trim()
    .toLowerCase(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
