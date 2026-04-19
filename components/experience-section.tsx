"use client"

import { useCallback } from "react"
import { Briefcase, ExternalLink } from "lucide-react"

const experiences = [
  {
    role: "UI/UX Design Intern",
    company: "Haloxion",
    period: "Sep 2024 — May 2025",
    description:
      "Worked on the Amppere Cable brand, contributing to design, research, and digital presence.",
    bullets: [
      "Designed social media creatives for brand engagement",
      "Conducted R&D on industry trends and user behavior",
      "Created wireframes and UI/UX prototypes",
    ],
    link: null,
    highlight: false,
  },
  {
    role: "Freelance UI/UX Designer",
    company: "Self-Employed",
    period: "2024 \u2014 2026",
    description:
      "Worked on UI/UX design and digital creatives for various clients, focusing on enhancing brand presence and user experience.",
    bullets: [
      "Delivered 4+ client projects with high satisfaction",
      "Specialized in responsive web design and mobile-first approach",
    ],
    link: null,
    highlight: false,
  },
  {
    role: "Design Head",
    company: "University Projects",
    period: "2023 \u2014 2026",
    description:
      "Led design initiatives for academic and hackathon projects, including the NAAC portal and various team competitions.",
    bullets: [
      "Designed academic portals and interfaces",
      "Led design teams in Smart India Hackathon (SIH) 2023 & 2024",
    ],
    link: null,
    highlight: true,
  },
];

export default function ExperienceSection() {
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
    card.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section id="experience" className="relative py-16 md:py-24 bg-secondary/10 border-y border-border/5">
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-[oklch(0.3_0.08_185/0.1)] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="experience-label mb-12 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Experience
          </span>
        </div>

        <h2
          className="experience-title mb-20 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {"Where I've"}
          <br />
          <span className="text-primary">worked</span>
        </h2>

        {/* Experience List - Side by Side Layout */}
        <div className="relative mt-12 flex flex-col gap-24">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="experience-item group grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_2fr]"
            >
              {/* Left Column: Brand & Role */}
              <div className="flex flex-col lg:items-end lg:text-right pt-2">
                <h3
                  className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {exp.role}
                </h3>
                <div className="mt-2 flex items-center justify-start gap-2 text-lg font-medium text-primary lg:justify-end">
                  {exp.company}
                  {exp.link && <ExternalLink className="h-4 w-4" />}
                </div>
              </div>

              {/* Right Column: Details & Description */}
              <div
                className={`relative rounded-2xl border border-transparent p-6 transition-all duration-500 hover:border-border/30 hover:bg-card/20 hover:backdrop-blur-sm lg:p-8 ${exp.highlight ? "bg-card/10 lg:pl-12" : "lg:pl-12"
                  }`}
                onMouseMove={onCardMouseMove}
              >
                {/* Spotlight glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.72 0.16 185 / 0.08), transparent 60%)",
                  }}
                />

                <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                  {exp.period}
                </span>

                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {exp.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm text-muted-foreground/80 transition-colors group-hover:text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Vertical Decorative line on the left of content */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border/20 to-transparent hidden lg:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
