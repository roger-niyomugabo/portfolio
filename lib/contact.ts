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

// Attachments: documents and images only, small enough to stay under a Vercel
// function's 4.5 MB request limit. Raise the total if you host elsewhere.
export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENTS_MB = 4;
export const MAX_ATTACHMENTS_BYTES = MAX_ATTACHMENTS_MB * 1024 * 1024;
export const ATTACHMENT_EXTENSIONS = [
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods", "odp",
  "txt", "md", "csv", "rtf", "png", "jpg", "jpeg", "gif", "webp"
];
export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.map((ext) => `.${ext}`).join(",");

type FileLike = { name: string; size: number };

// Why `file` can't be added to `accepted`, or null when it can.
export function attachmentProblem(file: FileLike, accepted: FileLike[]) {
  const parts = file.name.toLowerCase().split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1] : "";
  if (!ATTACHMENT_EXTENSIONS.includes(ext)) {
    return `${file.name}: only PDF, Office documents, text files and images are accepted.`;
  }
  if (file.size === 0) return `${file.name} is empty.`;
  if (accepted.length >= MAX_ATTACHMENTS) {
    return `You can attach up to ${MAX_ATTACHMENTS} files.`;
  }
  const total = accepted.reduce((sum, f) => sum + f.size, 0) + file.size;
  if (total > MAX_ATTACHMENTS_BYTES) {
    return `Attachments must total under ${MAX_ATTACHMENTS_MB} MB.`;
  }
  return null;
}
