import { NextResponse } from "next/server";
import {
  attachmentProblem,
  contactSchema,
  MAX_ATTACHMENTS_BYTES,
  MAX_ATTACHMENTS_MB
} from "@/lib/contact";
import { mailConfigured, sendContactEmail } from "@/lib/mail";

// nodemailer needs Node APIs, so keep this off the edge runtime.
export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

// Per-instance, in-memory limit: enough to stop a script hammering the form.
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 1000) {
    for (const [key, times] of attempts) {
      if (now - times[times.length - 1] > WINDOW_MS) attempts.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

// Keep the name mail clients see free of control characters and sane in length.
const safeFilename = (name: string) =>
  name.replace(/\p{Cc}/gu, "").trim().slice(0, 120) || "attachment";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages in a short time. Please try again later." },
      { status: 429 }
    );
  }

  // Refuse oversized uploads before buffering them.
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_ATTACHMENTS_BYTES + 64 * 1024) {
    return NextResponse.json(
      { error: `Attachments must total under ${MAX_ATTACHMENTS_MB} MB.` },
      { status: 413 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked so they move on.
  if (form.get("honeypot")) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    subject: form.get("subject"),
    message: form.get("message")
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const accepted: File[] = [];
  for (const entry of form.getAll("attachments")) {
    // A file input with nothing chosen still submits an empty, nameless part.
    if (typeof entry === "string" || (entry.size === 0 && entry.name === "")) continue;
    const problem = attachmentProblem(entry, accepted);
    if (problem) return NextResponse.json({ error: problem }, { status: 400 });
    accepted.push(entry);
  }

  if (!mailConfigured()) {
    return NextResponse.json(
      { error: "Email isn't configured on this site yet." },
      { status: 503 }
    );
  }

  try {
    const attachments = await Promise.all(
      accepted.map(async (file) => ({
        filename: safeFilename(file.name),
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || undefined
      }))
    );
    await sendContactEmail(
      { ...parsed.data, subject: parsed.data.subject.replace(/\s+/g, " ") },
      attachments
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please email me directly." },
      { status: 502 }
    );
  }
}
