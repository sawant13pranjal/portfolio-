"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Award, Star, Trophy } from "lucide-react"

const awards = [
  {
    title: "Smart India Hackathon 2023",
    subtitle: "Finalist",
    description: "Reached the national finals of SIH 2023, showcasing strong problem-solving and design thinking skills.",
    icon: Trophy,
    stat: "Finalist",
    numVal: 0,
    prefix: "",
    year: "2023",
    color: "#8B5CF6",
  },
  {
    title: "Smart India Hackathon 2024",
    subtitle: "Finalist",
    description: "Selected as a finalist in SIH 2024, competing among top teams from across India with an innovative solution.",
    icon: Trophy,
    stat: "Finalist",
    numVal: 0,
    prefix: "",
    year: "2024",
    color: "#38BDF8",
  },
  {
    title: "GD-PI Competition",
    subtitle: "Rank 1",
    description: "Secured 1st rank in the Group Discussion and Personal Interview competition in the institutional event Aarohan 2026 ",
    icon: Star,
    stat: "1st",
    numVal: 1,
    prefix: "#",
    year: "2026",
    color: "#059669",
  },
  {
    title: "Debate Competition",
    subtitle: "Second Rank",
    description: "Achieved 2nd rank in the debate competition in institutional event Aarohan 2024 and Aarohan 2025.",
    icon: Award,
    stat: "2nd",
    numVal: 2,
    prefix: "#",
    year: "2024 & 2025",
    color: "#FB7185",
  },
]

function AnimatedStat({ award }: { award: typeof awards[0] }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          if (award.numVal === 0) {
            setCount(0)
            return
          }
          const duration = 2000
          const steps = 60
          const increment = award.numVal / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= award.numVal) {
              setCount(award.numVal)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [award.numVal])

  return (
    <div
      ref={ref}
      className="counter-value text-5xl font-bold md:text-6xl"
      style={{ fontFamily: "var(--font-display)", color: award.color }}
    >
      {award.numVal === 0 ? award.stat : `${award.prefix}${count}`}
    </div>
  )
}

export default function AwardsSection() {
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, color: string) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty("--glow-x", `${x}px`)
    card.style.setProperty("--glow-y", `${y}px`)
  }, [])

  return (
    <section id="awards" className="relative py-16 md:py-24">
      <div className="absolute left-1/3 top-0 -z-10 h-96 w-96 rounded-full bg-[oklch(0.3_0.08_185/0.1)] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="awards-label mb-12 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Recognition
          </span>
        </div>

        <h2
          className="awards-title mb-16 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Awards {"&"}
          <br />
          <span className="text-primary">achievements</span>
        </h2>

        <div className="flex flex-col border-t border-border/20">
          {awards.map((award) => (
            <div
              key={award.title}
              className="award-card group relative overflow-hidden border-b border-border/20 py-8 px-4 md:px-8 transition-all duration-500 hover:bg-card/20"
              onMouseMove={(e) => onCardMouseMove(e, award.color)}
              data-hover
            >
              {/* Spotlight glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${award.color}10, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-12">
                {/* Left side: Icon and Year */}
                <div className="flex shrink-0 items-center gap-6 md:w-[25%]">
                  <div
                    className="flex h-14 w-14 shadow-sm items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `${award.color}15`,
                    }}
                  >
                    <award.icon className="h-7 w-7" style={{ color: award.color }} />
                  </div>
                  <div>
                    <span className="mb-0.5 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {award.year}
                    </span>
                    <p className="text-base font-bold" style={{ color: award.color }}>
                      {award.subtitle}
                    </p>
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div className="flex w-full flex-col md:w-[45%]">
                  <h3
                    className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-white md:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {award.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {award.description}
                  </p>
                </div>

                {/* Right side: Static Stat (Removed numeric loading effect) */}
                <div className="mt-2 flex shrink-0 md:mt-0 md:w-[30%] md:justify-end">
                  <div className="text-4xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-display)", color: award.color }}>
                    {award.numVal === 0 ? award.stat : `${award.prefix}${award.numVal}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
