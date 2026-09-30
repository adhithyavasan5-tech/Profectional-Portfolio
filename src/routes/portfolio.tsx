import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroBg from "@/assets/hero-desk.png.asset.json";
import projectLumen from "@/assets/project-lumen.jpg";
import projectOrbital from "@/assets/project-orbital.jpg";
import projectFlux from "@/assets/project-flux.jpg";
import projectVanta from "@/assets/project-vanta.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiLeetcode,
} from "react-icons/si";
import { Linkedin, Mail, Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title: "Adhithyavasan R — Creative Developer & Designer",
      },
      {
        name: "description",
        content:
          "Selected work by Adhithyavasan R: cinematic, tactile web experiences built with WebGL, motion design and 3D interaction.",
      },
      {
        property: "og:title",
        content: "Adhithyavasan R — Creative Developer & Designer",
      },
      {
        property: "og:description",
        content:
          "Selected work, skills and contact — cinematic, tactile web experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

/* ---------- interaction primitives ---------- */

function useTilt(max = 7) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
      2
    )}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}

function Magnetic({
  children,
  className = "",
  href,
  download,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  download?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-flex items-center gap-2 transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group/reveal transition-[transform,opacity,filter] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] will-change-transform motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-[6px]"
        } ${className}`}
    >
      {children}
    </div>
  );
}

/* scroll-linked parallax for any element with data-parallax="<speed>" */
function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = Number(el.dataset["parallax"]) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

/* thin bar under the navbar that fills as the page scrolls */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}

/* ---------- tilt project card ---------- */

const projects = [
  {
    title: "MediTwin AI",
    year: "2026",
    description:
      "MediTwin AI is an AI-powered smart hospital digital twin that optimizes patient flow, doctor queues, appointments, and waiting times for a faster, smoother healthcare experience.",
    tags: ["AI", "Healthcare","Web Development", "Firebase"],
    image: projectLumen,
    alt: "Abstract 3D glass sculpture floating in dark space with iridescent blue and violet light",
    demo: "https://adhithyavasan5-tech.github.io/MediTwin-AI/",
    github: "https://github.com/adhithyavasan5-tech/MediTwin-AI",
  },
  {
    title: "FixFlow-All In One ",
    year: "2026",
    description:
      "FixFlow is a smart service management platform that connects users with reliable technicians, simplifies issue reporting, and streamlines the entire repair process.",
    tags: ["React", "Web Development", "Service Management","Responsive Design"],
    image: projectOrbital,
    alt: "Futuristic dashboard UI with glowing data visualizations on dark glass panels",
    demo: "https://flow-home-pros-git-main-adhithyavasan5-5105s-projects.vercel.app/",
    github: "https://github.com/adhithyavasan5-tech/flow-home-pros",
  },
  {
    title: "Captain-Portfolio",
    year: "2026",
    description:
      "A modern, interactive personal portfolio showcasing my skills, projects, achievements, and journey as a Full-Stack Developer and AI enthusiast.",
    tags: ["UI/UX", "Animation", "Creative Development"],
    image: projectVanta,
    alt: "Minimalist 3D typography sculpture in frosted glass with soft studio lighting",
    demo: "https://adhithyavasan5-tech.github.io/Portfolio/#projects",
    github: "https://github.com/adhithyavasan5-tech/Portfolio",
  },
  {
    title:"MARVEL-LANDINGPAGE",
    year: "2026",
    description:
      "An interactive Marvel-themed website showcasing iconic heroes and villains through immersive character pages, animations, and cinematic UI.",
    tags: ["Marvel", "HTML","CSS","JavaScript", "Animations"],
    image: projectFlux,
    alt: "Flowing liquid metal ribbon in a dark environment with cool metallic reflections",
    demo: "https://marvel-avengers-vert.vercel.app/",
    github: "https://github.com/adhithyavasan5-tech/Marvel-Avengers",
  },
  
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const tilt = useTilt(6);

  return (
    <Reveal delay={(index % 2) * 100}>
      <article
        ref={tilt.ref as React.RefObject<HTMLElement | null>}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group rounded-[min(1vw,18px)] bg-frost/5 ring-1 ring-frost/10 backdrop-blur-xl p-3 transition-transform duration-300 ease-out will-change-transform hover:ring-frost/20"
      >
        <div
          className="overflow-hidden rounded-[min(1vw,12px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={project.image}
            alt={project.alt}
            width={1024}
            height={768}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">
              {project.title}
            </h3>
            <span className="text-xs text-frost-muted">{project.year}</span>
          </div>
          <p className="mt-2 text-sm text-pretty text-frost-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-frost/5 ring-1 ring-frost/10 px-2.5 py-1 text-xs text-frost-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-frost px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-frost/85"
            >
              Live demo <span aria-hidden="true">→</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-frost ring-1 ring-frost/15 transition-colors hover:bg-frost/5"
            >
              <SiGithub className="size-3.5" /> GitHub
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- page ---------- */

const tickerSkills = [
  "WebGL",
  "Three.js",
  "GLSL Shaders",
  "Motion Design",
  "Creative Coding",
  "TypeScript",
];

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "text-skill-html", blurb: "Semantic markup" },
  { name: "CSS3", icon: SiCss, color: "text-skill-css", blurb: "Layout & animation" },
  { name: "JavaScript", icon: SiJavascript, color: "text-skill-js", blurb: "ES2023+" },
  { name: "TypeScript", icon: SiTypescript, color: "text-skill-ts", blurb: "Typed apps" },
  { name: "React", icon: SiReact, color: "text-skill-react", blurb: "UI architecture" },
  { name: "Three.js", icon: SiThreedotjs, color: "text-frost", blurb: "3D & WebGL" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-skill-node", blurb: "APIs & tooling" },
  { name: "Git", icon: SiGit, color: "text-skill-git", blurb: "Version control" },
];

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[number];
  index: number;
}) {
  const Icon = skill.icon;
  return (
    <Reveal delay={(index % 4) * 80}>
      <div className="group flex h-full flex-col items-center gap-2.5 rounded-[min(1vw,16px)] bg-frost/5 ring-1 ring-frost/10 backdrop-blur-xl px-4 py-6 text-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:ring-frost/25">
        <Icon
          className={`size-9 transition-transform duration-300 ease-out group-hover:scale-110 ${skill.color}`}
        />
        <p className="font-display text-sm font-semibold">{skill.name}</p>
        <p className="text-xs text-frost-muted">{skill.blurb}</p>
      </div>
    </Reveal>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = "home";
      for (const item of NAV_ITEMS.slice(1)) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return active;
}

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

export function PortfolioPage() {
  const active = useActiveSection();
  const { dark, toggle } = useTheme();
  useParallax();
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-frost antialiased selection:bg-accent/30 selection:text-frost">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
      `}</style>
      {/* ambient light */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="glow absolute -left-32 -top-40 size-[520px] rounded-full bg-accent/20 blur-[120px]" style={{ animation: 'pulseGlow 8s ease-in-out infinite' }} />
        <div className="glow absolute -right-40 top-1/3 size-[560px] rounded-full bg-accent-2/15 blur-[130px]" style={{ animation: 'pulseGlow 12s ease-in-out infinite 2s' }} />
        <div className="glow absolute bottom-0 left-1/3 size-[420px] rounded-full bg-accent/10 blur-[120px]" style={{ animation: 'pulseGlow 10s ease-in-out infinite 5s' }} />
      </div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-frost/10 bg-ink/90 backdrop-blur-xl">
        <div className="flex h-[72px] w-full items-center justify-between px-6">
          <a
            href="#"
            aria-label="Back to home"
            className="group relative flex h-11 w-20 items-center justify-center border-2 border-accent font-display text-2xl font-bold text-accent"
          >
            AR
            <span className="absolute inset-x-2 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100" />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-semibold text-frost-muted sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative pb-1 transition-colors duration-300 hover:text-frost ${isActive ? "text-accent" : ""}`}
                >
                  {item.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-500 ease-out ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#contact" className="text-sm font-semibold text-accent sm:hidden">Contact</a>
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-frost/15 text-frost-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Sun className={`absolute size-4 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
              <Moon className={`absolute size-4 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>

      {/* HERO */}
      <section className="relative z-10 overflow-hidden">
        {/* theme-adaptive background image */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <style>{`
            @keyframes slowPan {
              0% { transform: scale(1.05) translate(0, 0); }
              50% { transform: scale(1.12) translate(-2%, -1%); }
              100% { transform: scale(1.05) translate(1%, 2%); }
            }
          `}</style>
          <img
            src="https://img.magnific.com/premium-photo/modern-minimalist-web-development-workspace-with-laptop-coffee_1355276-9369.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Dark coding desk setup"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-50 transition-opacity duration-700 dark:opacity-[0.14]"
            style={{ animation: "slowPan 30s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-[130px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-frost/5 px-3 py-1 text-xs text-frost-muted ring-1 ring-frost/10 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-accent animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              Available for select projects
            </div>
            <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-normal leading-none tracking-[-0.02em] text-balance">
              Adhithyavasan R
            </h1>
            <p className="mt-4 font-display text-[clamp(1.1rem,2.6vw,1.75rem)] leading-tight text-frost-muted">
              Creative developer building cinematic, tactile web experiences.
            </p>
            <p className="mt-6 max-w-[46ch] text-base text-pretty text-frost-muted/90 sm:text-lg">
              I turn ambitious ideas into interfaces that feel alive — motion,
              depth, and detail treated as first-class materials.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic
                href="#work"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink ring-1 ring-accent/40 hover:bg-accent/90"
              >
                View selected work
                <span aria-hidden="true">→</span>
              </Magnetic>
              <Magnetic
                href="#about"
                className="rounded-full px-5 py-3 text-sm font-medium text-frost ring-1 ring-frost/15 hover:bg-frost/5"
              >
                About me
              </Magnetic>
              <Magnetic
                href="/resume.pdf"
                download="Adhithya-R-Resume.pdf"
                className="rounded-full px-5 py-3 text-sm font-medium text-frost ring-1 ring-frost/15 hover:bg-frost/5"
              >
                <span aria-hidden="true">↓</span> Download resume
              </Magnetic>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="font-display text-2xl font-semibold leading-none">5+</p>
                <p className="mt-1 text-xs text-frost-muted">projects shipped</p>
              </div>
              <div className="h-8 w-px bg-frost/15" aria-hidden="true" />
              
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS TICKER */}
      <section className="relative z-10 border-y border-frost/10 bg-frost/[0.03] backdrop-blur-md">
        <div className="overflow-hidden py-5">
          <div className="ticker-track gap-10">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex items-center gap-10"
              >
                {tickerSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-10">
                    <span className="whitespace-nowrap font-display text-lg text-frost/80">
                      {skill}
                    </span>
                    <span className="text-accent">◆</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
          
            <h2 className="mt-3 font-display text-4xl font-normal text-balance sm:text-6xl">About me</h2>
            <span className="mt-5 block h-1 w-14 origin-left scale-x-0 rounded-full bg-accent transition-transform delay-300 duration-1000 ease-out group-data-[visible=true]/reveal:scale-x-100" />
          </Reveal>
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <p className="max-w-[62ch] text-base leading-8 text-pretty text-frost-muted sm:text-lg">
                 Hi, I’m Adhithya — a passionate Full-Stack Developer, AI Enthusiast, and UI/UX Designer who loves turning creative ideas into meaningful digital experiences.

I’m currently pursuing my B.Tech in Information Technology, where I’m continuously exploring web development, artificial intelligence, modern UI/UX, and emerging technologies.
                </p>
                <p className="mt-5 max-w-[62ch] text-base leading-8 text-pretty text-frost-muted sm:text-lg">
                 I believe great development is not just about writing code — it’s about understanding people, solving problems, and creating experiences that are simple, useful, and memorable.
                </p>
                <Magnetic href="#contact" className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink hover:bg-accent/90">
                  Get in touch <span aria-hidden="true">→</span>
                </Magnetic>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-5" delay={180}>
              <div data-parallax="0.08" className="mx-auto max-w-sm will-change-transform"><div className="floaty" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <img
                  src={aboutStudio}
                  alt="Adhithyavasan R working at his studio desk at night, lit by glowing monitors"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-[min(1vw,18px)] object-cover ring-1 ring-frost/10"
                />
              </div></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 scroll-mt-20 border-y border-frost/10 bg-frost/[0.025]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            
            <h2 className="mt-3 font-display text-4xl font-normal text-balance sm:text-6xl">Tools I build with</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {skills.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Projects</p>
              <h2 className="mt-3 font-display text-4xl font-normal text-balance sm:text-6xl">Selected work</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="relative z-10 scroll-mt-20">
        <div className="star-field border-y border-frost/10 px-6 py-24 sm:py-28">
          <div className="relative mx-auto max-w-5xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl font-bold uppercase text-balance sm:text-6xl">Let’s connect</h2>
              <span className="mx-auto mt-6 block h-1 w-20 scale-x-0 rounded-full bg-accent transition-transform delay-300 duration-1000 ease-out group-data-[visible=true]/reveal:scale-x-100" />
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-frost-muted sm:text-2xl">
                I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "GitHub", href: "https://github.com/adhithyavasan5-tech", icon: SiGithub, tone: "text-contact-github" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/adhithyavasan-r?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: Linkedin, tone: "text-contact-linkedin" },
                { label: "Email", href: "mailto:adhithyavasan5@gmail.com", icon: Mail, tone: "text-contact-email" },
                { label: "LeetCode", href: "https://leetcode.com/u/Adhithyavasan", icon: SiLeetcode, tone: "text-contact-code" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="group flex min-h-44 flex-col items-center justify-center gap-5 rounded-lg bg-frost/5 p-5 ring-1 ring-frost/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-frost/10 hover:ring-frost/30">
                    <Icon className={`size-12 transition-transform duration-300 group-hover:scale-110 ${item.tone}`} aria-hidden="true" />
                    <span className="font-display text-base font-semibold sm:text-lg">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-frost/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-frost-muted">
            © 2026 Adhithyavasan R
          </p>
      
        </div>
      </footer>
    </div>
  );
}
