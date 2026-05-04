export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "twitter" | "phone";
};

export type Profile = {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  resumeHref: string;
  availability: "open" | "selective" | "closed";
  availabilityLabel: string;
  roles: string[];
  socials: SocialLink[];
};

export type Experience = {
  company: string;
  role: string;
  type: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full Stack" | "Backend" | "Frontend" | "Mobile";
  year: string;
  featured?: boolean;
  stack: string[];
  highlights: string[];
  problem: string;
  solution: string;
  impact: string[];
  links?: { label: string; href: string }[];
  cover: { from: string; to: string; emoji: string };
};

export type SkillGroup = {
  name: string;
  icon: string;
  items: { name: string; level?: number }[];
};

export type Service = {
  title: string;
  blurb: string;
  bullets: string[];
  icon: "layout" | "server" | "container" | "users";
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  body: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};
