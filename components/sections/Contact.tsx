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
      heading="contact."
      title={<>Let&apos;s build something good.</>}
      description="Whether it's a full-stack feature, a backend you'd like a second opinion on, or a long-term role - I'd love to hear from you."
    >
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="space-y-3">
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <span className="icon-tile h-10 w-10">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="block truncate text-sm font-medium text-fg hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <span className="icon-tile h-10 w-10">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-fg hover:underline"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <span className="icon-tile h-10 w-10">
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
                className="btn btn-outline h-10 w-10 p-0"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/roger-niyomugabo"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn btn-outline h-10 w-10 p-0"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card p-6 md:p-8"
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
                    className="field"
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
                    className="field"
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
                    className="field"
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
                    className="field resize-y"
                  />
                }
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary mt-6 w-full sm:w-auto"
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
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </label>
  );
}
