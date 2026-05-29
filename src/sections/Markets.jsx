import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function Markets() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mkt-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.mkt-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="markets" ref={sectionRef} className="section section-mid">
      <div className="eyebrow">Markets &amp; Industries</div>
      <h2 className="heading-section mb-14">
        Key Sectors &amp;<br/><em>Operating Regions</em>
      </h2>

      <div className="mkt-grid grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {[
          { title: 'Oil & Gas', text: 'Navigating one of the world\'s most complex and high-value commodity sectors with deep expertise in sourcing, negotiation, and regulatory compliance.' },
          { title: 'Industrial Commodities', text: 'Procurement and distribution of essential industrial goods, with a strong focus on supply reliability and quality assurance across global supply chains.' },
          { title: 'Energy Resources', text: 'Strategic trading of energy commodities across key demand centres, leveraging our network to identify and secure optimal trade opportunities.' },
        ].map((m) => (
          <div key={m.title} className="mkt-card mkt-anim">
            <h3 className="font-serif text-[1.35rem] font-normal text-[var(--color-navy)] mb-3">{m.title}</h3>
            <p className="text-[0.8rem] text-[var(--color-navy-muted)] leading-[1.72]">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-8 border-t border-[rgba(13,27,42,0.1)]">
        {['Middle East', 'Asia', 'Europe', 'CIS Regions'].map((geo) => (
          <span key={geo} className="geo-tag">{geo}</span>
        ))}
      </div>
    </section>
  )
}
