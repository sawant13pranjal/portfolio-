"use client"

import { Mail, Phone, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const contactOptions = [
    {
      icon: Mail,
      href: "mailto:pranjalsawant1301@gmail.com",
      label: "Email Me",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      icon: Phone,
      href: "tel:+919421431584",
      label: "Call Me",
      color: "bg-green-500/20 text-green-400"
    }
  ]

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[999] flex flex-col gap-3 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      {contactOptions.map((option, index) => (
        <a
          key={index}
          href={option.href}
          className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-black/80 lg:h-14 lg:w-14`}
          aria-label={option.label}
          data-hover
        >
          <option.icon className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 whitespace-nowrap rounded-md bg-black/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-white/10">
            {option.label}
          </span>
        </a>
      ))}
    </div>
  )
}
