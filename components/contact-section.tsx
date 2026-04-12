"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"

const socials = [
  { name: "GitHub", icon: Github, link: "https://github.com/sawant13pranjal" },
  { name: "LinkedIn", icon: Linkedin, link: "https://linkedin.com/in/pranjalsawant1301" },

]

// Canvas wave background
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.parentElement?.clientHeight || 400
      canvas.width = width
      canvas.height = height
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Draw multiple waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath()
        const baseY = height * 0.6 + w * 30
        const amplitude = 20 + w * 10
        const frequency = 0.003 - w * 0.0005
        const speed = time * 0.0005 * (1 + w * 0.3)
        const opacity = 0.03 - w * 0.008

        ctx.moveTo(0, baseY)
        for (let x = 0; x <= width; x += 2) {
          const y = baseY + Math.sin(x * frequency + speed) * amplitude + Math.sin(x * frequency * 2.5 + speed * 1.5) * amplitude * 0.3
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        ctx.fillStyle = `rgba(45, 212, 191, ${opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text)
    if (type === "email") {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  // Magnetic effect for social links
  const onMagneticMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }, [])

  const onMagneticLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)"
  }, [])

  return (
    <section id="contact" className="relative overflow-hidden py-10 md:py-14">
      {/* Wave background */}
      <WaveCanvas />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="contact-label mb-8 flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Contact
          </span>
        </div>

        <div className="mb-10 text-center">
          <h2
            className="contact-title mb-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Let's build"}
            <br />
            <span className="bg-gradient-to-r from-primary via-[oklch(0.72_0.16_190)] to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
              something great
            </span>
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {"Have a project in mind? Let's create something amazing together."}
          </p>
        </div>

        {/* Contact info cards */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="contact-item group flex w-full items-center gap-4 rounded-2xl border border-border/30 bg-card/40 px-5 py-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_0_40px_-12px_oklch(0.72_0.16_185/0.2)] sm:w-auto">
            <a 
              href="mailto:pranjalsawant1301@gmail.com"
              className="flex items-center gap-4 grow"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/20">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">
                pranjalsawant1301@gmail.com
              </span>
            </a>
            <button
              onClick={() => copyToClipboard("pranjalsawant1301@gmail.com", "email")}
              className="p-1 hover:text-primary transition-colors"
              title="Copy to clipboard"
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>

          <div className="contact-item group flex w-full items-center gap-4 rounded-2xl border border-border/30 bg-card/40 px-5 py-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_0_40px_-12px_oklch(0.72_0.16_185/0.2)] sm:w-auto">
            <a 
              href="tel:+919421431584"
              className="flex items-center gap-4 grow"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/20">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">+91 94214 31584</span>
            </a>
            <button
              onClick={() => copyToClipboard("+91 94214 31584", "phone")}
              className="p-1 hover:text-primary transition-colors"
              title="Copy to clipboard"
            >
              {copiedPhone ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Social links with magnetic effect */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={onMagneticMove}
              onMouseLeave={onMagneticLeave}
              className="contact-social group flex items-center gap-2 rounded-full border border-border/30 bg-card/30 px-5 py-2.5 text-xs text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_20px_-6px_oklch(0.72_0.16_185/0.2)]"
              data-hover
            >
              <social.icon className="h-4 w-4" />
              {social.name}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-border/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <span className="text-xs text-muted-foreground/60">
              {"Designed & Built by Pranjal Sawant"}
            </span>
            <span className="text-[10px] text-muted-foreground/40">
              {"2026 All Rights Reserved"}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
