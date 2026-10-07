import { z } from "zod";

// Shared by the contact form (client) and /api/contact (server).
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100, "That name is a bit long"),
  email: z
    .string()
    .trim()
    .email("That doesn't look like a valid email")
    .max(200, "That email is a bit long"),
  subject: z
    .string()
    .trim()
    .min(3, "A short subject helps")
    .max(150, "Please keep the subject short"),
  message: z
    .string()
    .trim()
    .min(10, "A few more words please")
    .max(5000, "Please keep it under 5,000 characters"),
  // Hidden field; humans leave it empty.
  honeypot: z.string().optional()
});

export type ContactValues = z.infer<typeof contactSchema>;
