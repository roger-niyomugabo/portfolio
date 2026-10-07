import nodemailer, { type Transporter } from "nodemailer";
import { profile } from "@/data/profile";
import type { ContactValues } from "@/lib/contact";

// SMTP settings come from the environment; defaults suit Gmail with an App Password.
const smtp = () => ({
  user: process.env.API_SENDER_EMAIL,
  pass: process.env.EMAIL_PASSWORD,
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  to: process.env.CONTACT_TO_EMAIL || profile.email
});

export const mailConfigured = () => Boolean(smtp().user && smtp().pass);

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

let transporter: Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    const { host, port, user, pass } = smtp();
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 60_000
    });
  }
  return transporter;
}

export async function sendContactEmail(
  values: ContactValues,
  attachments: MailAttachment[] = []
) {
  const { user, to } = smtp();
  const info = await getTransporter().sendMail({
    from: { name: `${profile.name} — portfolio`, address: user! },
    to,
    replyTo: { name: values.name, address: values.email },
    subject: `[Portfolio] ${values.subject}`,
    text: [
      "New message from your portfolio contact form.",
      "",
      `Name:    ${values.name}`,
      `Email:   ${values.email}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
      ...(attachments.length
        ? ["", `Attachments: ${attachments.map((a) => a.filename).join(", ")}`]
        : [])
    ].join("\n"),
    attachments
  });
  return info.messageId;
}
