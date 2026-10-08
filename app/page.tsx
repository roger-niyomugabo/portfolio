import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { SectionRail } from "@/components/layout/SectionRail";

export default function HomePage() {
  return (
    <>
      <SectionRail />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <BlogTeaser />
      <Contact />
    </>
  );
}
