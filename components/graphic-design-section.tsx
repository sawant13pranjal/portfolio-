"use client"

import { ExternalLink } from "lucide-react"

export default function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="py-24 px-6 md:px-12 bg-[#030303]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <span className="reveal-label font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4 block">
            VISUAL WORK
          </span>
          <h2 className="reveal-title text-5xl md:text-7xl font-serif text-white mb-6">
            Graphic <span className="italic">Design</span>
          </h2>
          <p className="reveal-title text-neutral-400 max-w-2xl mx-auto mb-8 text-lg">
            A collection of my visual design work including branding, social media creatives, posters, and digital assets.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mb-12" />
        </div>

        <div className="flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=drive_link"
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
