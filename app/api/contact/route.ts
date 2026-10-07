import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked so they move on.
  if ((body as { honeypot?: unknown } | null)?.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  if (!mailConfigured()) {
    return NextResponse.json(
      { error: "Email isn't configured on this site yet." },
      { status: 503 }
    );
  }

  try {
    await sendContactEmail({
      ...parsed.data,
      subject: parsed.data.subject.replace(/\s+/g, " ")
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please email me directly." },
      { status: 502 }
    );
  }
}
