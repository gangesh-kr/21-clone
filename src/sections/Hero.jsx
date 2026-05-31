// import { useEffect, useRef } from 'react'
// import { gsap } from '../lib/animations'

// export default function Hero() {
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ delay: 0.3 })

//       tl.from('.hero-eyebrow', { y: 15, opacity: 0, duration: 1.2, ease: 'power3.out' })
//         .from('.hero-h1', { y: 25, opacity: 0, duration: 1.6, ease: 'power3.out' }, '-=0.8')
//         .from('.hero-sub', { y: 15, opacity: 0, duration: 1.4, ease: 'power3.out' }, '-=1.0')
//         .from('.hero-stat', { y: 15, opacity: 0, duration: 1.0, stagger: 0.2, ease: 'power3.out' }, '-=0.8')
//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <section
//       id="home"
//       ref={sectionRef}
//       className="min-h-screen flex items-center pt-36 pb-20 relative overflow-hidden bg-transparent w-full"
//     >
//       <div className="hero-container relative z-10 w-full">
//         <div className="max-w-[1100px]">
//           <div className="hero-eyebrow text-[#1b365d] flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase mb-12">
//             Twenty1Global Trading
//           </div>

//           <h1 className="hero-h1 heading-hero text-[#0a0e17] mb-12">
//             Powering Global Trade.<br />
//             Delivering Trusted Execution.<br />
//             Managing Strategic Assets.
//           </h1>

//           <p className="hero-sub body-intro text-[#2b3e50] max-w-[620px] font-light leading-relaxed">
//             Headquartered in Dubai with a strategic presence in Geneva and Singapore. We leverage deep logistical depth, board-level risk management, and structured execution to connect critical resources with high-demand global markets.
//           </p>
//         </div>
//       </div>

//       {/* Corporate Institutional Stats */}
//       <div className="absolute right-[10.3%] bottom-28 hidden md:flex flex-col gap-10 text-right z-10">
//         <div className="hero-stat">
//           <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">GLOBAL</span>
//           <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Operating Network</span>
//         </div>
//         <div className="hero-stat">
//           <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">SECURE</span>
//           <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Airtight Compliance</span>
//         </div>
//         <div className="hero-stat">
//           <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">TRUSTED</span>
//           <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Strategic Capital</span>
//         </div>
//       </div>
//     </section>
//   )
// }


import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from('.hero-eyebrow', { y: 15, opacity: 0, duration: 1.2, ease: 'power3.out' })
        .from('.hero-h1', { y: 25, opacity: 0, duration: 1.6, ease: 'power3.out' }, '-=0.8')
        .from('.hero-sub', { y: 15, opacity: 0, duration: 1.4, ease: 'power3.out' }, '-=1.0')
        .from('.hero-stat', { y: 15, opacity: 0, duration: 1.0, stagger: 0.2, ease: 'power3.out' }, '-=0.8')
    }, sectionRef)

    // ── Mouse parallax: nudge the GIF slightly on pointer move ──
    // We target the img directly via the DOM to avoid coupling components.
    // The offset is tiny — just enough to give a living, breathing feel.
    const handleMouseMove = (e) => {
      const gifEl = document.querySelector('[data-mountain-gif]')
      if (!gifEl) return

      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx // -1 → 1
      const dy = (e.clientY - cy) / cy // -1 → 1

      // Read current scale from inline style (set by MountainScene scroll handler)
      const currentTransform = gifEl.style.transform || 'scale(1.08) translateY(0%)'
      // Extract the scale value so we don't fight the scroll handler
      const scaleMatch = currentTransform.match(/scale\(([\d.]+)\)/)
      const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1.08
      const translateYMatch = currentTransform.match(/translateY\(([-\d.]+)%\)/)
      const currentTranslateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0

      // Apply additional mouse offset — very subtle (max 1.5% / 0.8%)
      const mouseOffsetX = dx * 1.5
      const mouseOffsetY = dy * 0.8

      gifEl.style.transform = `scale(${currentScale}) translateY(${currentTranslateY}%) translate(${mouseOffsetX}%, ${mouseOffsetY}%)`
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-36 pb-20 relative overflow-hidden bg-transparent w-full"
    >
      {/*
        data-mountain-gif attr lets the mouse handler locate the img
        without importing MountainScene or lifting state.
        We query it via document.querySelector in the effect above.
        (The actual img lives in MountainScene but we address it from here
         for the mouse parallax — coupling is intentional and minimal.)
      */}

      <div className="hero-container relative z-10 w-full">
        <div className="max-w-[1100px]">
          <div className="hero-eyebrow text-[#1b365d] flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase mb-12">
            Twenty1Global Trading
          </div>

          <h1 className="hero-h1 heading-hero text-[#0a0e17] mb-12">
            Powering Global Trade.<br />
            Delivering Trusted Execution.<br />
            Managing Strategic Assets.
          </h1>

          <p className="hero-sub body-intro text-[#2b3e50] max-w-[620px] font-light leading-relaxed">
            Headquartered in Dubai with a strategic presence in Geneva and Singapore. We leverage deep logistical depth, board-level risk management, and structured execution to connect critical resources with high-demand global markets.
          </p>
        </div>
      </div>

      {/* Corporate Institutional Stats */}
      <div className="absolute right-[10.3%] bottom-28 hidden md:flex flex-col gap-10 text-right z-10">
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">GLOBAL</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Operating Network</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">SECURE</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Airtight Compliance</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#0a0e17] font-extralight uppercase">TRUSTED</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#1b365d] block mt-1 uppercase">Strategic Capital</span>
        </div>
      </div>
    </section>
  )
}
