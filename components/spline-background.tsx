"use client"

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
      {/* Spline Background Container - Full Width with Gradient Mask to hide edges */}
      <div 
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 50%, transparent 95%)'
        }}
      >
        <iframe
          src='https://my.spline.design/reactiveorb-Ke0BtYWyJFL27RTjya6COo27/'
          frameBorder='0'
          width='100%'
          height='100%'
          className="h-full w-full scale-[1.3] opacity-60 lg:scale-[1.8] lg:opacity-80 lg:translate-x-[6%]"
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      </div>

      {/* High-vibrance Teal gradient overlays - Globalized */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.06_0.02_270/0.4)_50%,oklch(0.06_0.01_270)_80%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_top_left,oklch(0.72_0.2_185/0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.2_0.04_185/0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.1_185/0.1)_0%,transparent_40%)]" />
      
      {/* Additional depth shadow */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-[#050508]/80 pointer-events-none" />
    </div>
  )
}
