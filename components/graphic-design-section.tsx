"use client"

import { ExternalLink, ArrowRight } from "lucide-react"

export default function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="py-24 px-6 md:px-12 bg-[#030303]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="reveal-label font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-4 block">
            VISUAL WORK
          </span>
          <h2 className="reveal-title text-5xl md:text-7xl font-serif text-white mb-6">
            Graphic <span className="italic">Design</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <a
          href="https://drive.google.com/drive/folders/1lEnh-SLXlDeY-xGchUqPYKs_qNZy6fcV?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal-item max-w-4xl w-full glass glass-hover rounded-[32px] p-8 flex flex-col md:flex-row gap-8 group cursor-pointer"
        >
          <div className="h-64 md:h-80 md:w-1/2 w-full rounded-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1634942537034-2b96ac9aa1e7?w=800&q=80" 
              alt="Graphic Design Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20 text-sm text-white font-medium flex items-center gap-2">
                  View Drive <ExternalLink size={16} />
               </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              Portfolio Archive
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-primary transition-colors">
              Graphic Design Collection
            </h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
              A comprehensive collection of my visual design work including branding, social media creatives, posters, and digital assets.
            </p>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  Branding
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  Social Media
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  Posters
                </span>
              </div>
              <ArrowRight size={16} className="text-neutral-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </a>

        <div className="mt-16 flex justify-center">
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
