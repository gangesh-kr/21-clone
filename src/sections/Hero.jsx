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

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-36 pb-20 relative overflow-hidden bg-transparent w-full"
    >
      <div className="hero-container relative z-10 w-full">
        <div className="max-w-[1100px]">
          <div className="hero-eyebrow text-[#a3b3c2] flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase mb-12">
            Twenty1Global Trading
          </div>

          <h1 className="hero-h1 heading-hero text-[#f4f6f8] mb-12">
            Powering Global Trade.<br />
            Delivering Trusted Execution.<br />
            Managing Strategic Assets.
          </h1>

          <p className="hero-sub body-intro text-[#a3b3c2] max-w-[620px] font-light leading-relaxed">
            Headquartered in Dubai with a strategic presence in Geneva and Singapore. We leverage deep logistical depth, board-level risk management, and structured execution to connect critical resources with high-demand global markets.
          </p>
        </div>
      </div>

      {/* Corporate Institutional Stats */}
      <div className="absolute right-[10.3%] bottom-28 hidden md:flex flex-col gap-10 text-right z-10">
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#f4f6f8] font-extralight uppercase">GLOBAL</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#a3b3c2] block mt-1 uppercase">Operating Network</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#f4f6f8] font-extralight uppercase">SECURE</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#a3b3c2] block mt-1 uppercase">Airtight Compliance</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num text-2xl font-sans tracking-[0.05em] text-[#f4f6f8] font-extralight uppercase">TRUSTED</span>
          <span className="stat-label text-[9px] tracking-[0.25em] text-[#a3b3c2] block mt-1 uppercase">Strategic Capital</span>
        </div>
      </div>
    </section>
  )
}
