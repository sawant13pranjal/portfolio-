"use client"

import { useState, useEffect } from "react"

export default function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`spline-wrapper transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <iframe
        src="https://my.spline.design/reactiveorb-Ke0BtYWyJFL27RTjya6COo27/"
        className="spline-iframe"
        onLoad={() => setIsLoaded(true)}
        title="Spline Reactive Orb"
      />
      
      {/* Overlay to catch some mouse events or just to add a vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  )
}
