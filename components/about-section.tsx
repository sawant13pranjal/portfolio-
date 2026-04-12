"use client"

import { useRef, useEffect, useState } from "react"

const skills = [
  { name: "Figma", color: "#A259FF" },
  { name: "Webflow", color: "#4353FF" },
  { name: "AdobeXD", color: "#05F" },
  { name: "Canva", color: "#61DAFB" },
  { name: "UI Design", color: "#FF7262" },
  { name: "Prototyping", color: "#00C853" },
]

const stats = [
  { value: 4, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "-", suffix: "", label: "Hackathon" },
  { value: 1, prefix: "", suffix: "", label: "Rank in GD-PI" },
]

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
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
  }, [value])

  return (
    <div ref={ref} className="counter-value text-4xl font-bold text-primary md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
      {prefix}{count}{suffix}
    </div>
  )
}

// Client-only orbit ring - each tag orbits individually so text stays upright
function OrbitRing() {
  const tagsRef = useRef<(HTMLDivElement | null)[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let rotation = 0
    let animId: number

    const animate = () => {
      rotation += 0.15
      const total = skills.length
      tagsRef.current.forEach((tag, i) => {
        if (!tag) return
        // Each tag orbits at its own angle offset, but text never rotates
        const baseAngle = (i / total) * 360
        const currentAngle = ((baseAngle + rotation) * Math.PI) / 180
        const radius = 180
        const x = Math.cos(currentAngle) * radius
        const y = Math.sin(currentAngle) * radius
        // translate only, no rotation - text stays perfectly upright
        tag.style.transform = `translate(${x}px, ${y}px)`
      })
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [mounted])

  if (!mounted) {
    return <div className="absolute inset-[-40px] md:inset-[-50px]" />
  }

  return (
    <div className="absolute inset-[-40px] md:inset-[-50px]">
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          ref={(el) => { tagsRef.current[i] = el }}
          className="absolute left-1/2 top-1/2"
          style={{ marginLeft: "-40px", marginTop: "-14px" }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary/50"
            style={{ boxShadow: `0 0 20px ${skill.color}15` }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: skill.color }}
            />
            {skill.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute right-0 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-[oklch(0.3_0.08_250/0.1)] blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="about-label mb-16 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            About Me
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: 3D Orbit Avatar */}
          <div className="about-left relative flex items-center justify-center">
            <div className="relative h-80 w-80 md:h-96 md:w-96">
              {/* Outer orbit ring with skill tags */}
              <OrbitRing />

              {/* Static orbit rings */}
              <div className="absolute inset-0 rounded-full border border-primary/8" />
              <div className="absolute inset-4 rounded-full border border-primary/5" />
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-primary/6" />

              {/* Center avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="group relative flex h-52 w-52 items-center justify-center rounded-full border border-border/30 bg-gradient-to-br from-card to-card/60 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-primary/30 md:h-64 md:w-64">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 via-[oklch(0.3_0.08_250/0.2)] to-primary/10 md:h-48 md:w-48">
                    <span
                      className="select-none text-6xl font-bold text-primary transition-transform duration-500 group-hover:scale-110 md:text-7xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      PS
                    </span>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10 group-hover:blur-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio text with reveal */}
          <div className="about-right flex flex-col justify-center">
            <h2
              className="mb-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-foreground">Designing digital</span>
              <span className="block text-primary">experiences</span>
              <span className="block text-foreground">that matter.</span>
            </h2>

            <div className="mb-10 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p className="about-text-line">
                {"I'm Pranjal Sawant, a passionate UI/UX Designer with a keen eye for crafting intuitive, user-centered digital experiences. I specialize in turning complex problems into elegant, functional designs."}
              </p>
              <p className="about-text-line">
                {"From wireframes to high-fidelity prototypes, I bring ideas to life using Figma, Webflow, and Framer. I believe great design is invisible \u2014 it just works."}
              </p>
            </div>

            {/* Stats with counters */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat group text-center">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  <div className="mt-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
