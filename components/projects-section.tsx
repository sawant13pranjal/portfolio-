"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { ArrowRight, X, ExternalLink } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Amppere Cable",
    category: "UI/UX Design",
    image: "/projects/ampere-cable-final.png",
    description:
      "Redesigned the website for Amppere Cable to enhance user experience, improve product visibility, and create a modern, responsive interface aligned with the brand’s industrial identity..",
    tags: ["Wireframing", "Website Redesign", "Figma"],
    color: "#4F8EF7",
    year: "2026",
    details: "Designed the complete product line packaging, brand guidelines, and digital presence for Ampere Cable. The project involved creating a cohesive visual system that communicates premium quality and modern technology.",
  },
  {
    title: "CaseTorch",
    category: "UI/UX Design",
    image: "/projects/casetorch-final.png",
    description:
      "Designed a smart web platform for CaseTorch, enabling advocates to conduct faster legal research using AI, with an intuitive interface that simplifies case discovery and improves workflow efficiency.",
    tags: ["UI/UX", "E-commerce", "Website"],
    color: "#3366CC",
    year: "2025",
    details: "Built an intuitive shopping experience with a custom 3D phone case previewer. Users can upload their designs, preview in AR, and checkout seamlessly. Increased conversion rate by 35%.",
  },
  {
    title: "Netflix Clone",
    category: "UI/UX Design",
    image: "/projects/netflix-clone-final.png",
    description:
      "A pixel-perfect recreation of the Netflix interface with responsive design, dynamic content loading, and smooth animations.",
    tags: ["Prototyping", "Figma", "Clone"],
    color: "#E50914",
    year: "2023",
    details: "Full-stack Netflix clone with user authentication, dynamic movie browsing, and a custom recommendation engine. Built with React and integrated with TMDB API for real-time content.",
  },
  {
    title: "SS Photo & Films",
    category: "Portfolio Website",
    image: "/projects/ss-photo-final.jpg",
    description:
      "A cinematic portfolio website for a photography and filmmaking studio with immersive gallery and smooth transitions.",
    tags: ["Figma", "Visual Design", "Wireframing"],
    color: "#4F8EF7",
    year: "2026",
    details: "Designed and developed a stunning portfolio website that showcases photography and film work through immersive galleries, parallax scrolling, and cinematic transitions. Built on Webflow.",
  },
  {
    title: "NAAC Portal",
    category: "Web Application",
    image: "/projects/naac-portal-final.jpg",
    description:
      "Comprehensive college accreditation portal serving 200+ students and faculty with document management and reporting tools.",
    tags: ["UI/UX", "Dashboard", "Web Design"],
    color: "#00C853",
    year: "2024",
    details: "End-to-end design and development of the NAAC accreditation portal for the college. Features include document management, automated report generation, faculty dashboards, and student portals.",
    link: "https://www.figma.com/proto/udEn4GDKjqquldu76r6ZQd/NAAC-Accreditation?page-id=0%3A1&node-id=1-1123&p=f&viewport=144%2C243%2C0.02&t=sdAttUNmsWCNa3Ch-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A40",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // GSAP horizontal scroll pinning
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // 3D card tilt
  const onCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`

    // Move shine effect
    const shine = card.querySelector(".card-shine") as HTMLElement
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(79,142,247,0.15) 0%, transparent 60%)`
    }
  }, [])

  const onCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)"
    const shine = e.currentTarget.querySelector(".card-shine") as HTMLElement
    if (shine) {
      shine.style.background = "transparent"
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      {/* This section gets pinned by GSAP */}
      <div className="flex h-screen items-center">
        <div ref={trackRef} className="flex items-center gap-8 pl-6 md:pl-12">
          {/* Title card */}
          <div className="flex h-[75vh] w-[40vw] min-w-[350px] shrink-0 flex-col justify-center pr-12 md:w-[30vw]">
            <div className="projects-label mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Selected Work
              </span>
            </div>
            <h2
              className="projects-title mb-6 text-5xl font-bold tracking-tight md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured
              <br />
              <span className="text-primary">projects</span>
            </h2>
            <p className="text-base text-muted-foreground">
              Scroll to explore my selected works across branding, UI/UX design, and web development.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground/60">
              <div className="flex items-center gap-1">
                <div className="h-px w-8 bg-primary/50" />
                <ArrowRight className="h-4 w-4 text-primary/50" />
              </div>
              Keep scrolling
            </div>
          </div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group h-[75vh] w-[40vw] min-w-[380px] shrink-0 cursor-pointer md:w-[35vw] md:min-w-[450px]"
              onMouseMove={onCardMouseMove}
              onMouseLeave={onCardMouseLeave}
              onClick={() => setSelectedProject(project)}
              data-hover
              style={{
                transitionProperty: "transform",
                transitionDuration: "300ms",
                transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="glass-card relative h-full overflow-hidden rounded-3xl transition-shadow duration-500 group-hover:shadow-[0_0_60px_-12px_oklch(0.65_0.18_250/0.3)]">
                {/* Card shine overlay */}
                <div className="card-shine pointer-events-none absolute inset-0 z-10 transition-all duration-200" />

                {/* Project visual area */}
                <div
                  className="relative flex h-[55%] items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(160deg, ${project.color}10, transparent, ${project.color}05)`,
                  }}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Black overlay with 20% opacity */}
                      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
                    </div>
                  )}

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 z-1 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(${project.color}50 1px, transparent 1px), linear-gradient(90deg, ${project.color}50 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Big project number */}
                  <span
                    className="relative z-1 select-none text-[12rem] font-bold leading-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 md:text-[15rem]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "transparent",
                      WebkitTextStroke: `1px ${project.color}30`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md">
                      View Project <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Corner accent */}
                  {!project.image && (
                    <div
                      className="absolute right-4 top-4 h-16 w-16 rounded-full opacity-20 blur-2xl z-1"
                      style={{ background: project.color }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex h-[45%] flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground/60">
                        {project.year}
                      </span>
                    </div>
                    <h3
                      className="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-primary md:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/30 bg-secondary/30 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="h-1 w-32 shrink-0" />
        </div>
      </div>

      {/* Project detail overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 p-6 backdrop-blur-2xl"
          onClick={() => setSelectedProject(null)}
          style={{ animation: "fadeIn 0.3s ease" }}
        >
          <div
            className="glass-card relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/50 p-8 shadow-2xl md:p-12"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-foreground transition-all hover:bg-secondary hover:scale-110"
              data-hover
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: `${selectedProject.color}15`,
                color: selectedProject.color,
                border: `1px solid ${selectedProject.color}30`,
              }}
            >
              {selectedProject.category}
            </div>

            <h3
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {selectedProject.title}
            </h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {selectedProject.details}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.65_0.18_250/0.3)]"
                data-hover
              >
                View Live <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
