"use client"

import { useRef, useEffect, useState } from "react"

const skills = [
  { name: "Figma", color: "#2dd4bf" },
  { name: "Webflow", color: "#0d9488" },
  { name: "AdobeXD", color: "#14b8a6" },
  { name: "Canva", color: "#5eead4" },
  { name: "UI Design", color: "#0f766e" },
  { name: "Prototyping", color: "#2dd4bf" },
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
            style={{ boxShadow: `0 0 20px oklch(0.72 0.16 185 / 0.1)` }}
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
    <section id="about" className="relative py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute right-0 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-[oklch(0.3_0.08_250/0.1)] blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="about-label mb-12 flex items-center gap-4">
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

              {/* Static orbit rings - Restored with Spline Teal theme */}
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-4 rounded-full border border-primary/5" />
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-primary/8" />

              {/* Center avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="group relative flex h-64 w-64 items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center">
                    {/* Intense Background Glow - Spline Teal */}
                    <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_185/0.4)_0%,transparent_70%)] blur-3xl" />
                    
                    <img 
                      src="/Yoga Pranjal.png" 
                      alt="Avatar" 
                      className="relative z-10 h-full w-full object-cover scale-150 transition-transform duration-500 animate-float"
                    />
                    
                    {/* Minimal hover glow enhancement */}
                    <div className="absolute inset-0 z-20 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio text with reveal */}
          <div className="about-right flex flex-col justify-center">
            <h2
              className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-foreground">Designing digital</span>
              <span className="block text-primary">experiences</span>
              <span className="block text-foreground">that matter.</span>
            </h2>

            <div className="mb-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p className="about-text-line">
                {"I'm Pranjal Sawant, a passionate UI/UX Designer with a keen eye for crafting intuitive, user-centered digital experiences. I specialize in turning complex problems into elegant, functional designs."}
              </p>
              <p className="about-text-line">
                {"From wireframes to high-fidelity prototypes, I bring ideas to life using Figma, Webflow, and Framer. I believe great design is invisible \u2014 it just works."}
              </p>
            </div>

            {/* Stats - Reduced and made static to remove numeric loading effect */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat group text-center">
                  <div className="text-4xl font-bold text-primary md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
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
