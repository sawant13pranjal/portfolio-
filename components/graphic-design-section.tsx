"use client"

import { ExternalLink, ArrowRight } from "lucide-react"

const graphicProjects = [
  {
    title: "Branding",
    description: "Visual identities, logos, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1634942537034-2b96ac9aa1e7?w=800&q=80",
    link: "https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=sharing"
  },
  {
    title: "Social Media",
    description: "Engaging creatives for Instagram, LinkedIn, and Facebook.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    link: "https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=sharing"
  },
  {
    title: "Posters",
    description: "Event posters, promotional materials, and typography art.",
    image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&q=80",
    link: "https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=sharing"
  },
  {
    title: "Creative Ads",
    description: "Digital advertising assets for marketing campaigns.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    link: "https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=sharing"
  }
]

export default function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="py-24 px-6 md:px-12 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="reveal-label font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4 block">
            VISUAL WORK
          </span>
          <h2 className="reveal-title text-5xl md:text-7xl font-serif text-white mb-6">
            Graphic <span className="italic">Design</span>
          </h2>
          <p className="reveal-title text-neutral-400 max-w-2xl mx-auto mb-6 text-lg">
            A collection of my visual design work including branding, social media creatives, posters, and digital assets.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {graphicProjects.map((project, i) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              className="reveal-item glass glass-hover rounded-[24px] p-4 flex flex-col h-full group"
            >
              <div className="h-64 w-full rounded-[16px] overflow-hidden mb-6 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20 text-sm text-white font-medium flex items-center gap-2">
                      View Work <ArrowRight size={16} />
                   </div>
                </div>
              </div>

              <div className="flex-1 px-2 pb-2">
                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-item bg-primary text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            Explore Full Graphic Portfolio <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
