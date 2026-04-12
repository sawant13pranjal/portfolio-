"use client"

import { useRef, useCallback } from "react"

const skillCategories = [
  {
    category: "Design",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    skills: ["Figma", "Adobe XD", "Photoshop", "Canva"],
    color: "#A259FF",
  },
  {
    category: "Development",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: ["Antigravity", "Webflow", "Framer", "WordPress"],
    color: "#4F8EF7",
  },
  {
    category: "UX Research",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
    color: "#00C853",
  },
  {
    category: "Tools",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.658 3.286a.75.75 0 01-1.106-.79l1.082-6.31-4.588-4.474a.75.75 0 01.416-1.28l6.335-.92L10.73 .81a.75.75 0 011.34 0l2.83 5.672 6.335.92a.75.75 0 01.416 1.28l-4.588 4.474 1.082 6.31a.75.75 0 01-1.106.79L12.58 16.96" />
      </svg>
    ),
    skills: ["Git", "VS Code", "Notion"],
    color: "#FF7262",
  },
]

const marqueeSkills = [
  "Figma", "Webflow", "Framer", "UI/UX Designer", "Prototyping",
  "User Research", "Wireframing", "Design Systems", "Responsive Design"
]

export default function SkillsSection() {
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }, [])

  return (
    <section id="skills" className="relative overflow-hidden py-32 md:py-40">
      <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="skills-label mb-16 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Skills & Tools
          </span>
        </div>

        <h2
          className="skills-title mb-20 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          My <span className="text-primary">toolkit</span>
        </h2>

        {/* Interactive skill cards with spotlight effect */}
        <div className="mb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="skill-card group relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_oklch(0.65_0.18_250/0.2)]"
              onMouseMove={onCardMouseMove}
              data-hover
            >
              {/* Spotlight glow that follows mouse */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cat.color}15, transparent 60%)`,
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: `${cat.color}15`,
                    color: cat.color,
                    boxShadow: `0 0 0px ${cat.color}00`,
                  }}
                >
                  {cat.icon}
                </div>

                <h3
                  className="mb-5 text-lg font-bold text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cat.category}
                </h3>

                <div className="space-y-3">
                  {cat.skills.map((skill, i) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <div
                        className="h-1 w-1 rounded-full transition-all duration-500 group-hover:h-1.5 group-hover:w-1.5"
                        style={{ background: cat.color }}
                      />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single marquee ticker */}
      <div className="mt-10">
        <div className="relative overflow-hidden border-y border-primary/20 bg-primary/5 py-6 backdrop-blur-sm">
          <div className="marquee flex whitespace-nowrap">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`a-${skill}-${i}`}
                className="mx-6 text-2xl font-bold text-muted-foreground md:mx-8 md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {skill}
                <span className="mx-6 inline-block text-primary/60">{"/"}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
