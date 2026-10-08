import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  className?: string;
};

// A generated product mockup for a project — browser window, phone or terminal,
// chosen from its category. Decorative; the real content lives in the case study.
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const kind =
    project.category === "Mobile"
      ? "phone"
      : project.category === "Backend"
        ? "terminal"
        : "browser";

  return (
    <div className={cn("accent-panel relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.14),transparent_45%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center px-6 sm:top-14 sm:px-12"
      >
        {kind === "browser" && <Browser project={project} />}
        {kind === "phone" && <Phone project={project} />}
        {kind === "terminal" && <Terminal project={project} />}
      </div>
      <span className="absolute right-4 top-4 rounded-[4px] bg-ink px-2.5 py-1 text-xs font-medium text-accent">
        {project.year}
      </span>
    </div>
  );
}

// The mockups sit on the fixed green panel, so they use fixed colours rather than theme tokens.
const mint = "#86efac";
const frame =
  "w-full overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-[#0b1619]/90 text-white shadow-2xl shadow-black/40";

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-white/15", className)} />;
}

function Dots() {
  return (
    <span className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
    </span>
  );
}

function Browser({ project }: { project: Project }) {
  return (
    <div className={cn(frame, "max-w-[560px]")}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <Dots />
        <span className="flex-1 rounded-[4px] bg-white/10 px-3 py-1 font-mono text-[11px] text-white/60">
          {project.slug}.app
        </span>
      </div>
      <div className="grid grid-cols-[3.5rem_1fr] gap-4 p-4">
        <div className="space-y-3 border-r border-white/10 pr-3">
          <Bar className="w-8" />
          <Bar className="w-6 bg-[#86efac]/70" />
          <Bar className="w-7" />
          <Bar className="w-5" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{project.title}</span>
            <span className="h-5 w-14 rounded-[4px] bg-[#86efac]/80" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((n) => (
              <div key={n} className="rounded-md border border-white/10 p-3">
                <Bar className="w-8 bg-white/20" />
                <span className="mt-3 block h-5 w-12 rounded bg-[#86efac]/30" />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 300 70" className="mt-4 h-16 w-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={mint}
              strokeWidth="2"
              points="0,55 30,48 60,52 90,35 120,40 150,22 180,28 210,15 240,20 270,8 300,12"
            />
          </svg>
          <div className="mt-4 space-y-2.5">
            {[0, 1, 2].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <Bar className="w-1/3" />
                <Bar className="w-1/4" />
                <Bar className="ml-auto w-10 bg-[#86efac]/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone({ project }: { project: Project }) {
  return (
    <div className="w-[230px] overflow-hidden rounded-t-[2rem] border border-b-0 border-white/15 bg-[#0b1619]/90 px-3 pt-3 text-white shadow-2xl shadow-black/40">
      <div className="mx-auto h-1.5 w-16 rounded-full bg-white/20" />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold">{project.title}</span>
        <span className="h-6 w-6 rounded-full bg-[#86efac]/70" />
      </div>
      <div className="mt-3 rounded-md bg-white/10 px-3 py-2">
        <Bar className="w-20 bg-white/25" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="rounded-md border border-white/10 p-2">
            <div className="h-14 rounded bg-white/10" />
            <Bar className="mt-2 w-12" />
            <span className="mt-1.5 block h-2 w-8 rounded-full bg-[#86efac]/60" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around border-t border-white/10 py-2">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn("h-2.5 w-2.5 rounded-full", n === 0 ? "bg-[#86efac]" : "bg-white/25")}
          />
        ))}
      </div>
    </div>
  );
}

const terminalLines: [string, string][] = [
  ["$", "docker compose up -d --build"],
  ["✓", "api        listening on :4000"],
  ["✓", "worker     connected to queue"],
  ["✓", "postgres   migrations up to date"],
  ["→", "GET  /health            200  3ms"],
  ["→", "POST /deploy/release    202  41ms"]
];

function Terminal({ project }: { project: Project }) {
  return (
    <div className={cn(frame, "max-w-[560px] font-mono text-xs")}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <Dots />
        <span className="text-white/60">{project.slug} — deploy</span>
      </div>
      <div className="space-y-2 p-4">
        {terminalLines.map(([mark, text], i) => (
          <p key={i} className="flex gap-3 whitespace-pre">
            <span className={mark === "✓" ? "text-[#86efac]" : "text-white/50"}>{mark}</span>
            <span className={i === 0 ? "text-white" : "text-white/75"}>{text}</span>
          </p>
        ))}
        <p className="flex gap-3">
          <span className="text-white/50">$</span>
          <span className="inline-block h-3.5 w-2 animate-pulse bg-[#86efac]" />
        </p>
      </div>
    </div>
  );
}
