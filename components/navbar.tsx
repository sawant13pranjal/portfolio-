"use client"

import { useRef, useEffect } from "react"

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add("backdrop-blur-xl", "bg-background/80", "border-b", "border-border/50")
        } else {
          navRef.current.classList.remove("backdrop-blur-xl", "bg-background/80", "border-b", "border-border/50")
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => scrollTo("hero")}
          className="text-lg font-bold tracking-tight text-foreground"
          data-hover
        >
          <span className="text-primary">P</span>S
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["about", "experience", "projects", "skills", "awards", "contact"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                data-hover
              >
                {section}
              </button>
            )
          )}
        </div>

        <a
          href="/resume.pdf"
          download
          className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:border-primary/50"
          data-hover
        >
          Download Resume
        </a>
      </div>
    </nav>
  )
}
