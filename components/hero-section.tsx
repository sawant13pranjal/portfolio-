"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { ChevronDown, ArrowRight } from "lucide-react"





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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050508]"
    >
      {/* Background Glow behind 3D - Fixed "no background" issue */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_60%_50%,oklch(0.3_0.08_185/0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Spline Background Container - Local to Hero */}
      <div
        className="absolute inset-0 z-0 h-full w-full overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 50%, transparent 95%)'
        }}
      >
        <iframe
          src='https://my.spline.design/reactiveorb-Ke0BtYWyJFL27RTjya6COo27/'
          frameBorder='0'
          width='100%'
          height='100%'
          className="h-full w-full scale-[1.8] opacity-80 lg:translate-x-[6%]"
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      </div>

      {/* High-vibrance Teal gradient overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.06_0.02_270/0.4)_50%,oklch(0.06_0.01_270)_80%)]" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_top_left,oklch(0.72_0.2_185/0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.2_0.04_185/0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.1_185/0.1)_0%,transparent_40%)]" />

      <div
        className="relative z-10 flex w-full max-w-7xl flex-col items-center px-6 text-center lg:items-start lg:px-24 lg:text-left pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Small intro line */}
        <div className="hero-intro mb-8 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Portfolio 2026
          </span>
        </div>

        <h1
          ref={nameRef}
          className="hero-name mb-8 max-w-2xl cursor-default pointer-events-auto"
          style={{
            fontFamily: "var(--font-display)",
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <span
            className="block text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
            style={{
              transform: `rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            From concept
          </span>
          <span
            className="block text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
            style={{
              transform: `rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg) translateZ(20px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            to click —
          </span>
          <span
            className="mt-4 block text-3xl font-light text-primary/80 lg:text-4xl"
            style={{
              transform: `translateZ(40px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            I design it all.
          </span>
        </h1>

        <div className="hero-subtitle mb-12 max-w-xl pointer-events-auto">
          <p className="text-base font-light tracking-wide text-muted-foreground/80 md:text-lg leading-relaxed lg:text-left">
            Crafting intuitive digital experiences that merge aesthetic harmony
            with functional precision.
          </p>
        </div>

        {/* Magnetic CTA buttons - High Contrast Hover Effects */}
        <div className="hero-cta mb-16 flex items-center gap-5 pointer-events-auto">
          <MagneticButton
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-full bg-foreground px-10 py-4 text-sm font-semibold text-background transition-all hover:scale-105 hover:shadow-[0_0_30px_oklch(0.72_0.16_185/0.4)] active:scale-95"
          >
            <span className="relative z-20 flex items-center gap-2">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          </MagneticButton>

          <MagneticButton
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative cursor-pointer overflow-hidden rounded-full border border-primary/30 bg-card/20 px-10 py-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_30px_oklch(0.72_0.16_185/0.2)]"
          >
            <span className="relative z-20 flex items-center gap-2">
              Get in Touch
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </span>
          </MagneticButton>
        </div>

      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        data-hover
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Tap to explore
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
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-[oklch(0.3_0.08_185/0.1)] blur-[120px]" />
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 md:block">
        <span className="text-[10px] tracking-[0.5em] text-muted-foreground/30">
          GRAPHIC DESIGNER
        </span>
      </div>
    </section>
  )
}
