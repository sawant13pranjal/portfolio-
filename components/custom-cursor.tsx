"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX - 10, y: e.clientY - 10 }
    }

    // Smooth follow with RAF
    let animId: number
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15
      if (cursor) {
        cursor.style.left = `${posRef.current.x}px`
        cursor.style.top = `${posRef.current.y}px`
      }
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    const onMouseEnter = () => cursor.classList.add("hovering")
    const onMouseLeave = () => cursor.classList.remove("hovering")

    document.addEventListener("mousemove", onMouseMove)

    // Use MutationObserver to catch dynamically added hover elements
    const attachHoverListeners = () => {
      const hoverElements = document.querySelectorAll("a, button, [data-hover]")
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter)
        el.addEventListener("mouseleave", onMouseLeave)
      })
    }

    attachHoverListeners()

    const observer = new MutationObserver(() => {
      attachHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener("mousemove", onMouseMove)
      observer.disconnect()
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />
}
