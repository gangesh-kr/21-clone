import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero-h1', { y: 60, opacity: 0, duration: 1.4, ease: 'power4.out' }, '-=0.7')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.9')
        .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
        .from('.hero-stat', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.6')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center pt-32 pb-20 px-5 md:px-14 relative overflow-hidden bg-[var(--color-white)]"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(13,27,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(13,27,42,0.055) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />
      {/* Glow */}
      <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block" style={{ background: 'radial-gradient(circle, rgba(13,27,42,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-[780px]">
        <div className="hero-eyebrow">
          <span className="w-9 h-px bg-[var(--color-navy-soft)] shrink-0" />
          Twenty1Global Trading LLC
        </div>

        <h1 className="hero-h1 heading-hero mb-7">
          Powering <em>Global Trade.</em><br/>
          Delivering Trusted<br/>
          Commodities.
        </h1>

        <p className="hero-sub body-intro mb-11">
          A dynamic international trading company specialising in the sourcing and delivery of high-quality commodities — with reliability, precision, and strategic depth.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explore Our Services
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute right-5 md:right-14 bottom-24 hidden md:flex flex-col gap-9 text-right">
        <div className="hero-stat"><span className="stat-num">4+</span><span className="stat-label">Global Regions</span></div>
        <div className="hero-stat"><span className="stat-num">4</span><span className="stat-label">Core Services</span></div>
        <div className="hero-stat"><span className="stat-num">100%</span><span className="stat-label">Transparent Dealings</span></div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden absolute bottom-8 left-5 right-5 flex flex-wrap gap-x-8 gap-y-6">
        <div className="hero-stat"><span className="stat-num text-[1.8rem]">4+</span><span className="stat-label text-[0.55rem]">Global Regions</span></div>
        <div className="hero-stat"><span className="stat-num text-[1.8rem]">4</span><span className="stat-label text-[0.55rem]">Core Services</span></div>
        <div className="hero-stat"><span className="stat-num text-[1.8rem]">100%</span><span className="stat-label text-[0.55rem]">Transparent Dealings</span></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute left-5 md:left-14 bottom-14 hidden md:flex flex-col items-center gap-2.5">
        <div className="w-px h-[52px]" style={{ background: 'linear-gradient(to bottom, var(--color-navy-soft), transparent)' }} />
        <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-navy-light)] [writing-mode:vertical-lr] rotate-180">Scroll</span>
      </div>
    </section>
  )
}
