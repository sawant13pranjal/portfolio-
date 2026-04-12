"use client"

import { useCallback } from "react"
import { Briefcase, ExternalLink } from "lucide-react"

const experiences = [
  {
    role: "UI/UX Design Intern",
    company: "Haloxion",
    period: "Sep 2024 \u2014 May 2025",
    description:
      "Worked on the Amppere Cable brand, contributing to design, research, and digital presence.",
    bullets: [
      "Designed social media creatives for brand engagement",
      "Conducted R&D on industry trends and user behavior",
      "Created wireframes and UI/UX prototypes",
      "Ensured consistency in branding and visual communication",
    ],
    link: "#",
    highlight: true,
  },
  {
    role: "Freelance UI/UX Designer",
    company: "Self-Employed",
    period: "2024 \u2014 2026",
    description:
      "Worked on UI/ UX design and digital creatives for Amppere Cable and Nexus Engineering, focusing on enhancing brand presence and user experience.",
    bullets: [
      "Delivered 4+ client projects with 100% satisfaction rate",
      "Specialized in responsive web design and mobile-first approaches",
      "Built interactive prototypes for user testing and validation",
    ],
    link: null,
    highlight: true,
  },
  {
    role: "Design Lead",
    company: "University Projects",
    period: "2023 \u2014 2026",
    description:
      "Led design initiatives for academic and hackathon projects, including the NAAC portal and various team competitions.",
    bullets: [
      "Designed the academic projects",
      "Led design teams in Smart India Hackathon (SIH) 2023 & 2024",
    ],
    link: null,
    highlight: true,
  },
]

export default function ExperienceSection() {
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
    card.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-[oklch(0.3_0.08_250/0.1)] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="experience-label mb-16 flex items-center gap-4">
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

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="timeline-line absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className={`experience-card relative mb-16 flex flex-col gap-4 pl-12 md:mb-24 md:w-1/2 md:pl-0 ${i % 2 === 0
                ? "md:pr-16 md:text-right"
                : "md:ml-auto md:pl-16 md:text-left"
                }`}
            >
              {/* Timeline dot - always centered on the vertical line */}
              <div
                className={`absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 md:top-4 ${i % 2 === 0
                  ? "md:left-auto md:right-0 md:translate-x-1/2"
                  : "md:left-0 md:-translate-x-1/2"
                  } ${exp.highlight
                    ? "border-primary bg-primary/20"
                    : "border-border bg-background"
                  }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${exp.highlight ? "bg-primary animate-pulse" : "bg-muted-foreground"
                    }`}
                />
              </div>

              {/* Card with spotlight */}
              <div
                className={`group relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 md:p-8 ${exp.highlight
                  ? "border-primary/20 shadow-[0_0_40px_-12px_oklch(0.65_0.18_250/0.15)]"
                  : ""
                  }`}
                onMouseMove={onCardMouseMove}
                data-hover
              >
                {/* Spotlight glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.65 0.18 250 / 0.08), transparent 60%)",
                  }}
                />

                <div className={`relative flex items-start gap-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:shadow-[0_0_15px_oklch(0.65_0.18_250/0.15)]">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="mb-1 block text-xs text-muted-foreground/60">
                      {exp.period}
                    </span>
                    <h3
                      className="text-xl font-bold text-foreground"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-primary">
                      {exp.company}
                      {exp.link && <ExternalLink className="h-3 w-3" />}
                    </div>
                  </div>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>

                <ul className="relative mt-4 space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={`flex items-start gap-2 text-xs text-muted-foreground transition-colors group-hover:text-muted-foreground/80 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                        }`}
                    >
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
