"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"

const Scene3D = dynamic(() => import("./scene-3d"), { ssr: false })



// Magnetic button component
function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`transition-transform duration-300 ease-out ${className}`}
      data-hover
    >
      {children}
    </button>
  )
}

export default function HeroSection() {

  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState({ x: 0, y: 0 })



  // Full page 3D parallax on mouse move
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  // Continuous subtle 3D auto-rotation for the name
  useEffect(() => {
    let animId: number
    const animate = (time: number) => {
      const t = time * 0.001
      setAutoRotate({
        x: Math.sin(t * 0.7) * 6,
        y: Math.cos(t * 0.5) * 8,
      })
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      <Scene3D />

      {/* Multi-layered gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.015_270/0.4)_50%,oklch(0.08_0.015_270)_80%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_left,oklch(0.65_0.18_250/0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.3_0.08_250/0.05)_0%,transparent_50%)]" />

      <div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Small intro line */}
        <div className="hero-intro mb-8 flex items-center gap-3 opacity-0">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Portfolio 2026
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Name with deep 3D perspective */}
        <h1
          ref={nameRef}
          className="hero-name mb-6 cursor-default opacity-0"
          style={{
            fontFamily: "var(--font-display)",
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className="block text-6xl font-bold leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem]"
            style={{
              transform: `rotateY(${mousePos.x * 4 + autoRotate.y}deg) rotateX(${mousePos.y * -3 + autoRotate.x}deg)`,
              transition: "transform 0.15s ease-out",
              background: "linear-gradient(135deg, oklch(0.95 0.01 250) 0%, oklch(0.65 0.18 250) 50%, oklch(0.95 0.01 250) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            Pranjal
          </span>
          <span
            className="block text-6xl font-bold leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem]"
            style={{
              transform: `rotateY(${mousePos.x * 4 + autoRotate.y}deg) rotateX(${mousePos.y * -3 + autoRotate.x}deg) translateZ(20px)`,
              transition: "transform 0.15s ease-out",
              background: "linear-gradient(135deg, oklch(0.65 0.18 250) 0%, oklch(0.95 0.01 250) 50%, oklch(0.65 0.18 250) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sawant
          </span>
        </h1>

        <div className="hero-subtitle mb-12 flex h-8 items-center opacity-0">
          <div className="h-px w-6 bg-primary/50" />
          <span className="mx-4 text-base font-light tracking-wide text-muted-foreground md:text-lg">
            UI/UX Designer
          </span>
          <div className="h-px w-6 bg-primary/50" />
        </div>

        {/* Magnetic CTA buttons */}
        <div className="hero-cta flex items-center gap-5 opacity-0">
          <MagneticButton
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-lg bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
          >
            <span className="relative z-20 flex items-center gap-2">
              View Projects
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-[oklch(0.55_0.2_260)] to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute -inset-1 z-0 rounded-lg bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-60" />

            <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0 z-10"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0 z-10"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0 z-10"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0 z-10"></span>
          </MagneticButton>

          <MagneticButton
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-card/20 px-10 py-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
          >
            <span className="relative z-20 flex items-center gap-2">
              Get in Touch
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </span>

            <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/10 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-primary/50 absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0 z-10 opacity-0 group-hover:opacity-100"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-primary/50 absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0 z-10 opacity-0 group-hover:opacity-100"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-primary/50 absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0 z-10 opacity-0 group-hover:opacity-100"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-primary/50 absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0 z-10 opacity-0 group-hover:opacity-100"></span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
        data-hover
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Scroll to explore
        </span>
        <div className="relative flex h-10 w-5 items-start justify-center rounded-full border border-primary/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </button>

      {/* Side decorative text */}
      <div className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 md:block">
        <span className="text-[10px] tracking-[0.5em] text-muted-foreground/30">
          UI/UX DESIGNER
        </span>
      </div>
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 md:block">
        <span className="text-[10px] tracking-[0.5em] text-muted-foreground/30">
          BASED IN INDIA
        </span>
      </div>
    </section>
  )
}
