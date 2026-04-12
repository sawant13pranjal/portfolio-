"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Show the animation for 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 2000)

    // Remove from DOM after fade transition completes (500ms)
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    // Optional: wait until document is loaded if you want it strictly tied to load event
    // But fixed timer ensures the user enjoys the animation.

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Rotating background aura */}
        <div className="aura" />
        
        {/* Animated Logo */}
        <div className="flex flex-col items-center">
          <img 
            src="/My NAME LGO.png" 
            alt="Pranjal Sawant Logo"
            className="animate-logo-loader relative z-10 w-32 h-auto object-contain"
          />
          
          {/* Uiverse Dot Loader */}
          <div className="loader">
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
