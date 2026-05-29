import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="section section-mid">
      <div className="eyebrow contact-anim">Contact</div>
      <h2 className="heading-section mb-14 contact-anim">
        Get in <em>Touch</em>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        <div className="contact-anim">
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-navy-soft)] mb-1.5">Location</div>
          <div className="text-[0.92rem] text-[var(--color-navy)] font-light leading-[1.6]">Dubai, United Arab Emirates</div>
        </div>
        <div className="contact-anim">
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-navy-soft)] mb-1.5">Email</div>
          <div className="text-[0.92rem] text-[var(--color-navy)] font-light leading-[1.6]">info@twenty1global.com</div>
        </div>
        <div className="contact-anim">
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-navy-soft)] mb-1.5">Sectors</div>
          <div className="text-[0.92rem] text-[var(--color-navy)] font-light leading-[1.6]">Oil & Gas &nbsp;·&nbsp; Industrial Commodities &nbsp;·&nbsp; Energy Resources</div>
        </div>
        <div className="contact-anim">
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-navy-soft)] mb-1.5">Operating Regions</div>
          <div className="text-[0.92rem] text-[var(--color-navy)] font-light leading-[1.6]">Middle East &nbsp;·&nbsp; Asia &nbsp;·&nbsp; Europe &nbsp;·&nbsp; CIS</div>
        </div>
      </div>
    </section>
  )
}
