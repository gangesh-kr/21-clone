import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.pillar-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section section-mid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[5.5rem] items-center">
        <div>
          <div className="eyebrow about-anim">About Us</div>
          <h2 className="heading-section mb-14 about-anim">
            Where <em>Markets</em><br/>Connect Across Borders
          </h2>
          <p className="body-text mb-5 about-anim">
            Twenty1Global Trading is an international trading company built on the principles of reliability, transparency, and precision. We specialise in connecting trusted suppliers with high-demand markets, ensuring seamless execution at every stage of the trade cycle.
          </p>
          <p className="body-text mb-5 about-anim">
            Our foundation in international commodity trading allows us to navigate complex cross-border transactions with confidence — from sourcing and negotiation through to logistics and final delivery.
          </p>
          <div className="mt-8 pl-5 border-l-2 border-[var(--color-navy-soft)] about-anim">
            <p className="font-serif text-[1.18rem] italic text-[var(--color-navy-mid)] leading-[1.55]">
              "We don't just trade commodities — we build long-term value across borders."
            </p>
          </div>
        </div>

        <div className="pillars-grid grid grid-cols-2 gap-px bg-[rgba(13,27,42,0.1)] border border-[rgba(13,27,42,0.1)]">
          {[
            { num: '01', title: 'Global Network', text: 'Strategic relationships across the Middle East, Asia, Europe, and CIS regions built on trust and long-term commitment.' },
            { num: '02', title: 'Efficient Logistics', text: 'End-to-end supply chain management with focus on documentation, compliance, and timely delivery.' },
            { num: '03', title: 'Trusted Partnerships', text: 'Long-term relationships built on integrity, transparency, and consistent high performance.' },
            { num: '04', title: 'Market Intelligence', text: 'Data-driven insights and strategic analysis to identify profitable opportunities across global markets.' },
          ].map((p) => (
            <div key={p.num} className="pillar pillar-anim">
              <div className="text-[0.6rem] tracking-[0.28em] uppercase text-[var(--color-navy-soft)] mb-3.5">{p.num}</div>
              <h4 className="heading-sub mb-2">{p.title}</h4>
              <p className="text-[0.8rem] text-[var(--color-navy-muted)] leading-[1.7]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
