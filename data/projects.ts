import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "fimboo",
    title: "Fimboo",
    tagline: "Real-time inventory management",
    description:
      "A full-stack inventory platform with live stock-level updates and notifications powered by WebSockets. Designed for SMBs that need fast, accurate visibility into multi-warehouse stock without the cost of enterprise tools.",
    category: "Full Stack",
    year: "2024",
    featured: true,
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "WebSockets",
      "PostgreSQL",
      "Docker"
    ],
    highlights: [
      "Real-time stock-level updates pushed to all clients via WebSocket subscriptions",
      "Optimized PostgreSQL queries with strategic indexes for fast retrieval at scale",
      "Order and product CRUD APIs with audit-friendly write paths",
      "Containerized deployment with Docker Compose for a one-command bring-up"
    ],
    problem:
      "Operations teams were juggling spreadsheets and lagging dashboards — by the time someone refreshed a report, stock figures were already stale, leading to oversells and missed reorders.",
    solution:
      "I built Fimboo as a single source of truth with a WebSocket layer that pushes updates the moment a transaction commits. The data model treats stock movements as an append-only ledger, so historical state is reconstructable and reports are trustworthy.",
    impact: [
      "Live updates reduced reconciliation time across warehouses",
      "Indexed PostgreSQL queries kept the product list snappy at 10k+ SKUs",
      "Containerized stack made onboarding new environments trivial"
    ],
    cover: { from: "from-indigo-500", to: "to-cyan-500", emoji: "📦" }
  },
  {
    slug: "skill-synchronization",
    title: "Skill Synchronization",
    tagline: "AI-powered internship matching",
    description:
      "An AI-powered platform that connects Rwandan students with internships at top companies based on skills, interests, and availability. Includes employer dashboards, applicant ranking, and a guided onboarding flow.",
    category: "Full Stack",
    year: "2024",
    featured: true,
    stack: ["React", "TypeScript", "Django", "PostgreSQL", "Python"],
    highlights: [
      "Led architecture, sprint planning, and delivery for a small team of developers",
      "Worked directly with partner companies to translate hiring needs into product features",
      "Designed the matching pipeline that ranks applicants by skill fit and availability",
      "Mentored junior contributors through code reviews and pairing sessions"
    ],
    problem:
      "Students struggled to find internships aligned to their skills, while employers spent days sifting through unfiltered applications. The market needed a better signal layer between the two sides.",
    solution:
      "I led the product from architecture to delivery, designing a matching pipeline that scores applicants against role requirements, plus dashboards that let employers focus on the top of the funnel without losing sight of the rest.",
    impact: [
      "Shortened the time-to-shortlist for partner employers",
      "Gave students structured feedback on application strength",
      "Established a reusable architecture for future matching products"
    ],
    cover: { from: "from-fuchsia-500", to: "to-rose-500", emoji: "🎓" }
  },
  {
    slug: "keza-eshop",
    title: "Keza E-Shop",
    tagline: "Mobile-first e-commerce",
    description:
      "A mobile-first e-commerce platform with a NestJS + PostgreSQL backend and a React Native client. Includes product browsing, cart, payment gateway integration, and authentication.",
    category: "Mobile",
    year: "2023",
    featured: true,
    stack: ["NestJS", "PostgreSQL", "React Native", "TypeScript"],
    highlights: [
      "Scalable NestJS + PostgreSQL backend for product listings, orders, and authentication",
      "Integrated payment gateway flows with safe retry semantics",
      "Clean REST APIs documented via Swagger / OpenAPI",
      "Modular service layer designed for future event-driven extensions"
    ],
    problem:
      "Local merchants needed a lightweight, mobile-first storefront that worked on patchy networks and integrated with the payment rails their customers actually use.",
    solution:
      "I built a NestJS backend that keeps the API surface small and well-typed, paired with a React Native client tuned for low-bandwidth conditions. The payment flow is idempotent so dropped requests don't double-charge.",
    impact: [
      "Stable order flow even under flaky mobile connectivity",
      "Predictable, type-safe API contracts between mobile and server",
      "Foundation for future seller dashboards and analytics"
    ],
    cover: { from: "from-emerald-500", to: "to-teal-500", emoji: "🛍️" }
  },
  {
    slug: "component-library",
    title: "Internal Design System",
    tagline: "Reusable UI for client dashboards",
    description:
      "A reusable React + TypeScript component library that powered multiple client-facing dashboards at Smart Class Rwanda. Themed via Tailwind, documented in Storybook, and shipped as a versioned internal package.",
    category: "Frontend",
    year: "2025",
    stack: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    highlights: [
      "Token-based theming so brand updates ripple through every product",
      "Accessible primitives (modals, menus, comboboxes) built on headless patterns",
      "Storybook docs with copy-paste examples for every component",
      "Dramatically cut build time for subsequent product launches"
    ],
    problem:
      "Each new dashboard was reinventing buttons, modals, and form patterns — creating drift in look-and-feel and slowing delivery.",
    solution:
      "I led the design and implementation of a token-driven component library with strong TypeScript types and Storybook docs. New dashboards now compose from the library instead of rebuilding primitives.",
    impact: [
      "Consistent UX across the product portfolio",
      "Faster delivery on subsequent dashboards",
      "Lower maintenance cost when refreshing the brand"
    ],
    cover: { from: "from-amber-500", to: "to-orange-500", emoji: "🧩" }
  },
  {
    slug: "ci-cd-platform",
    title: "Containerized Delivery Pipeline",
    tagline: "GitHub Actions → Digital Ocean",
    description:
      "End-to-end CI/CD setup with GitHub Actions and Docker Compose, deploying full-stack apps to Digital Ocean. Includes automated tests, image builds, and zero-downtime rollouts.",
    category: "Backend",
    year: "2025",
    stack: ["GitHub Actions", "Docker", "Docker Compose", "Digital Ocean"],
    highlights: [
      "Pipelines that run unit + integration tests before any deploy",
      "Versioned container images with rollback by retag",
      "Compose-based deploys with healthchecks and graceful restarts",
      "Cut release-day incidents and shrunk deployment time"
    ],
    problem:
      "Deploys were manual, slow, and risky — making teams hesitant to ship and creating long feedback loops on production issues.",
    solution:
      "I designed a pipeline that bakes test gates and image builds into every PR, then promotes images through environments. The Compose-based deploy is simple enough to reason about and robust enough for production.",
    impact: [
      "Shorter, more predictable deployment windows",
      "Fewer release-day surprises",
      "Confidence to ship multiple times per day"
    ],
    cover: { from: "from-sky-500", to: "to-indigo-500", emoji: "🚀" }
  }
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
