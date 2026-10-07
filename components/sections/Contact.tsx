"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  Send,
  X
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import {
  ATTACHMENT_ACCEPT,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENTS_MB,
  attachmentProblem,
  contactSchema,
  type ContactValues
} from "@/lib/contact";
import { formatBytes } from "@/lib/utils";

// Fallback when the site has no email credentials: hand the message to the visitor's mail app.
function openMailClient(values: ContactValues) {
  const body = encodeURIComponent(
    `${values.message}\n\n— ${values.name} <${values.email}>`
  );
  const subject = encodeURIComponent(values.subject);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const addFiles = (chosen: FileList | null) => {
    const next = [...files];
    for (const file of Array.from(chosen ?? [])) {
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      const problem = attachmentProblem(file, next);
      if (problem) {
        setFileError(problem);
        return;
      }
      next.push(file);
    }
    setFileError(undefined);
    setFiles(next);
  };

  const removeFile = (file: File) => {
    setFiles((current) => current.filter((f) => f !== file));
    setFileError(undefined);
  };

  const onSubmit = async (values: ContactValues) => {
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("name", values.name);
      body.append("email", values.email);
      body.append("subject", values.subject);
      body.append("message", values.message);
      body.append("honeypot", values.honeypot ?? "");
      for (const file of files) body.append("attachments", file, file.name);

      const res = await fetch("/api/contact", { method: "POST", body });

      if (res.ok) {
        toast.success("Message sent. I'll get back to you soon.");
        reset();
        setFiles([]);
      } else if (res.status === 503) {
        openMailClient(values);
        toast(
          files.length
            ? "Email isn't set up here yet, so I'm opening your email app instead. Please attach your files there."
            : "Email isn't set up here yet, so I'm opening your email app instead."
        );
        reset();
        setFiles([]);
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(data?.error ?? "Something went wrong. Try emailing me directly.");
      }
    } catch {
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

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                Attachments (optional)
              </p>
              <div className="rounded-[4px] border border-dashed border-border p-3">
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  accept={ATTACHMENT_ACCEPT}
                  className="hidden"
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    className="btn btn-outline"
                  >
                    <Paperclip className="h-4 w-4" />
                    Add files
                  </button>
                  <span className="text-xs text-muted">
                    Up to {MAX_ATTACHMENTS} files, {MAX_ATTACHMENTS_MB} MB in total:
                    PDF, Office documents, text files or images.
                  </span>
                </div>
                {files.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {files.map((file) => (
                      <li
                        key={`${file.name}-${file.size}`}
                        className="flex items-center gap-2 text-sm"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0 text-muted" />
                        <span className="min-w-0 truncate">{file.name}</span>
                        <span className="flex-shrink-0 text-xs text-muted">
                          {formatBytes(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() => removeFile(file)}
                          className="ml-auto inline-flex h-7 w-7 flex-shrink-0 items-center justify-center text-muted transition-colors hover:text-fg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {fileError && (
                <span className="mt-1 block text-xs text-red-500">{fileError}</span>
              )}
            </div>

            {/* Spam trap: hidden from people, filled in by bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              {...register("honeypot")}
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />

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
