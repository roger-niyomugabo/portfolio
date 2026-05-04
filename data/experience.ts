import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    company: "A2SV (Africa to Silicon Valley)",
    role: "Backend Software Engineer (Full Stack contributions)",
    type: "Full-time",
    location: "Kigali, Rwanda",
    start: "Jan 2026",
    end: "Present",
    current: true,
    highlights: [
      "Design and ship scalable backend services and RESTful APIs powering production applications across multiple regions, with a focus on low-latency request handling under high traffic.",
      "Architect and optimize PostgreSQL data models and queries — applying indexing and query-tuning strategies that measurably improve hot read paths.",
      "Collaborate with distributed engineering teams across time zones, contributing to technical design discussions, architectural decisions, and Agile sprint planning.",
      "Implement comprehensive automated testing (unit + integration) and maintain CI/CD pipelines to keep deployments fast, repeatable, and safe.",
      "Lead code reviews and mentor junior engineers — raising the bar on code quality and engineering standards across the team."
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "REST APIs"
    ]
  },
  {
    company: "Smart Class Rwanda",
    role: "Full Stack Software Engineer",
    type: "Full-time · Remote",
    location: "Remote",
    start: "Nov 2024",
    end: "Oct 2025",
    highlights: [
      "Designed, built, and maintained end-to-end full-stack applications using React, TypeScript, Python (Django), and PostgreSQL — owning features from spec to production for clients in e-learning and education.",
      "Led frontend architecture decisions and built a reusable component library that enforced UI consistency across multiple client-facing dashboards, accelerating delivery on subsequent projects.",
      "Set up and maintained CI/CD pipelines with GitHub Actions and shipped containerized deployments to Digital Ocean using Docker and Docker Compose — cutting deployment time and reducing release-day incidents.",
      "Translated complex business requirements into technical specifications, managing client relationships from discovery through delivery in a fully remote, distributed setup.",
      "Partnered closely with UI/UX designers, product managers, and QA to deliver polished software on tight deadlines."
    ],
    stack: [
      "React",
      "TypeScript",
      "Django",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Digital Ocean"
    ]
  },
  {
    company: "Imperium Ltd.",
    role: "Software Developer (Full Stack)",
    type: "Full-time · Hybrid",
    location: "Kigali, Rwanda",
    start: "Jul 2022",
    end: "Aug 2023",
    highlights: [
      "Built interactive React frontends and robust REST APIs consumed by multiple client-facing web applications — delivering full-stack solutions across several industries in parallel.",
      "Conducted code reviews enforcing coding standards, surfacing performance bottlenecks, and improving codebase consistency across the team.",
      "Adapted quickly across simultaneous client projects — sharpening Agile practices and cross-functional collaboration with designers, PMs, and QA."
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"]
  },
  {
    company: "Solvit Africa",
    role: "Backend Developer Intern (Team Lead)",
    type: "Internship · On-site",
    location: "Kigali, Rwanda",
    start: "Feb 2023",
    end: "Jun 2023",
    highlights: [
      "Served as team lead — coordinating the development team, distributing tasks, and ensuring on-time milestone delivery.",
      "Built RESTful APIs in Node.js and Express, implementing authentication, validation, and error-handling patterns that became team standards.",
      "Ran code reviews to maintain quality and consistency, and partnered with the frontend team for clean API integration end-to-end."
    ],
    stack: ["Node.js", "Express", "REST APIs", "Git"]
  }
];
