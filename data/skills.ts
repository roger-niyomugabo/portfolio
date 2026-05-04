import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    icon: "code",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 85 },
      { name: "Go", level: 55 }
    ]
  },
  {
    name: "Frontend",
    icon: "monitor",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "Redux Toolkit", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Webpack / Vite", level: 80 }
    ]
  },
  {
    name: "Backend",
    icon: "server",
    items: [
      { name: "Node.js", level: 92 },
      { name: "NestJS", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "Django", level: 85 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets", level: 82 }
    ]
  },
  {
    name: "Databases & ORMs",
    icon: "database",
    items: [
      { name: "PostgreSQL", level: 92 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Prisma", level: 88 },
      { name: "Sequelize", level: 82 },
      { name: "Mongoose", level: 78 }
    ]
  },
  {
    name: "DevOps & Tooling",
    icon: "container",
    items: [
      { name: "Docker", level: 88 },
      { name: "Docker Compose", level: 88 },
      { name: "GitHub Actions", level: 88 },
      { name: "Digital Ocean", level: 80 },
      { name: "Git", level: 95 },
      { name: "Swagger / OpenAPI", level: 85 }
    ]
  },
  {
    name: "Testing & Practices",
    icon: "check",
    items: [
      { name: "Jest", level: 88 },
      { name: "Supertest", level: 82 },
      { name: "Unit / Integration", level: 88 },
      { name: "Code Reviews", level: 95 },
      { name: "Mentorship", level: 90 },
      { name: "Agile / Scrum", level: 92 }
    ]
  }
];
