import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    title: "Frontend Architecture",
    blurb:
      "I design React + TypeScript frontends that scale — reusable components, predictable state, accessibility built in.",
    bullets: [
      "Design systems and component libraries",
      "Performance budgeting and bundle hygiene",
      "Accessibility-first patterns (WCAG-aware)"
    ],
    icon: "layout"
  },
  {
    title: "Backend & APIs",
    blurb:
      "Production-grade Node.js, NestJS, and Django services with clean contracts, sound data models, and meaningful tests.",
    bullets: [
      "REST API design and OpenAPI documentation",
      "PostgreSQL modeling, indexing, and query tuning",
      "Real-time features with WebSockets"
    ],
    icon: "server"
  },
  {
    title: "DevOps & Delivery",
    blurb:
      "CI/CD pipelines and containerized deployments that make shipping boring — in the best possible way.",
    bullets: [
      "GitHub Actions pipelines with test gates",
      "Docker / Docker Compose for repeatable envs",
      "Digital Ocean and cloud deploys with rollbacks"
    ],
    icon: "container"
  },
  {
    title: "Mentorship & Code Review",
    blurb:
      "I coach junior engineers, lead reviews, and help teams raise their bar on code quality and engineering practices.",
    bullets: [
      "Pairing on tough features and refactors",
      "Code review culture and review checklists",
      "Architecture coaching for small teams"
    ],
    icon: "users"
  }
];
