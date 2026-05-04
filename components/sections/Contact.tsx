"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("That doesn't look like a valid email"),
  subject: z.string().min(3, "A short subject helps"),
  message: z.string().min(10, "A few more words please")
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      // Open the user's mail client as a graceful fallback when no backend exists.
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} <${values.email}>`
      );
      const subject = encodeURIComponent(values.subject);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast.success("Opening your email client…");
      reset();
    } catch (err) {
      toast.error("Something went wrong. Try emailing me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Let&apos;s build something good.</>}
      description="Whether it's a full-stack feature, a backend you'd like a second opinion on, or a long-term role - I'd love to hear from you."
    >
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="space-y-3">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="block truncate text-sm font-medium text-fg hover:text-brand-500"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-fg hover:text-brand-500"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Location
                  </p>
                  <p className="text-sm font-medium text-fg">
                    {profile.location} · Remote-friendly
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="https://github.com/roger-niyomugabo"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/roger-niyomugabo"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                error={errors.name?.message}
                input={
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    {...register("name")}
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 transition focus:border-brand-500 focus:ring-2"
                  />
                }
              />
              <Field
                label="Email"
                error={errors.email?.message}
                input={
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 transition focus:border-brand-500 focus:ring-2"
                  />
                }
              />
            </div>

            <div className="mt-4">
              <Field
                label="Subject"
                error={errors.subject?.message}
                input={
                  <input
                    type="text"
                    placeholder="Let's collaborate on…"
                    {...register("subject")}
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 transition focus:border-brand-500 focus:ring-2"
                  />
                }
              />
            </div>

            <div className="mt-4">
              <Field
                label="Message"
                error={errors.message?.message}
                input={
                  <textarea
                    rows={5}
                    placeholder="A bit about your project, timeline, and what success looks like…"
                    {...register("message")}
                    className="w-full resize-y rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm outline-none ring-brand-500/30 transition focus:border-brand-500 focus:ring-2"
                  />
                }
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-all hover:opacity-90 disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Sending…" : "Send message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  error,
  input
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      {input}
      {error && (
        <span className="mt-1 block text-xs text-rose-500">{error}</span>
      )}
    </label>
  );
}
