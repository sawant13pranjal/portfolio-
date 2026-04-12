"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AnimationController() {
  useEffect(() => {
    // Set initial states BEFORE creating timeline
    gsap.set([".hero-intro", ".hero-name", ".hero-subtitle", ".hero-cta"], {
      y: 60,
      opacity: 0,
    })
    gsap.set(".hero-scroll", { opacity: 0 })

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({ delay: 0.5 })

      heroTl
        .to(".hero-intro", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          ".hero-name",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          ".hero-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".hero-scroll",
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.2"
        )

      // About Section - staggered reveals
      gsap.from(".about-label", {
        scrollTrigger: {
          trigger: ".about-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".about-left", {
        scrollTrigger: {
          trigger: ".about-left",
          start: "top 80%",
        },
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: "power3.out",
      })

      gsap.from(".about-right", {
        scrollTrigger: {
          trigger: ".about-right",
          start: "top 80%",
        },
        opacity: 0,
        x: 80,
        duration: 1.2,
        ease: "power3.out",
      })

      // Text lines reveal one by one
      gsap.utils.toArray<HTMLElement>(".about-text-line").forEach((line, i) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 88%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
        })
      })

      gsap.from(".about-stat", {
        scrollTrigger: {
          trigger: ".about-stat",
          start: "top 88%",
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      })

      // Experience Section
      gsap.from(".experience-label", {
        scrollTrigger: {
          trigger: ".experience-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".experience-title", {
        scrollTrigger: {
          trigger: ".experience-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          x: i % 2 === 0 ? -100 : 100,
          duration: 1,
          ease: "power3.out",
        })
      })

      // Projects Section
      gsap.from(".projects-label", {
        scrollTrigger: {
          trigger: ".projects-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      // Skills Section
      gsap.from(".skills-label", {
        scrollTrigger: {
          trigger: ".skills-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        })
      })

      // Awards Section
      gsap.from(".awards-label", {
        scrollTrigger: {
          trigger: ".awards-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".awards-title", {
        scrollTrigger: {
          trigger: ".awards-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.utils.toArray<HTMLElement>(".award-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          opacity: 0,
          y: 70,
          scale: 0.93,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        })
      })

      // Contact Section
      gsap.from(".contact-label", {
        scrollTrigger: {
          trigger: ".contact-label",
          start: "top 85%",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      })

      gsap.utils.toArray<HTMLElement>(".contact-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
        })
      })

      gsap.utils.toArray<HTMLElement>(".contact-social").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
          },
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power3.out",
        })
      })

      // Parallax floating glow orbs
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "0")
        gsap.to(el, {
          y: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}
