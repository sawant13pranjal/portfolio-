"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import AwardsSection from "@/components/awards-section"
import ContactSection from "@/components/contact-section"
import LoadingScreen from "@/components/loading-screen"

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), { ssr: false })
const AnimationController = dynamic(() => import("@/components/animation-controller"), { ssr: false })
const SplineBackground = dynamic(() => import("@/components/spline-background"), { ssr: false })

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SmoothScroll />
      <AnimationController />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <ContactSection />
      </main>
    </>
  )
}
