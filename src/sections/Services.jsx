import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

const SERVICES = [
  { num: '01', title: 'Commodity Sourcing', text: 'We identify and procure high-quality commodities from rigorously vetted global suppliers, ensuring consistent quality and competitive pricing at every stage.' },
  { num: '02', title: 'Trade Facilitation', text: 'End-to-end support for cross-border transactions — from negotiation and contract structuring through to execution and full coordination.' },
  { num: '03', title: 'Supply Chain Management', text: 'Efficient handling of logistics, documentation, and delivery processes, ensuring full regulatory compliance and seamless movement of goods.' },
  { num: '04', title: 'Market Entry Support', text: 'Helping businesses expand into new regions through our established global network, local expertise, and on-the-ground strategic guidance.' },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section section-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end mb-14">
        <div>
          <div className="eyebrow">Services</div>
          <h2 className="heading-section" style={{ marginBottom: 0 }}>
            End-to-End<br/><em>Trade Solutions</em>
          </h2>
        </div>
        <p className="text-[0.9rem] text-[var(--color-navy-muted)] leading-[1.85]">
          From initial requirement analysis to final delivery, we provide comprehensive support across every phase of the international trading process — ensuring efficiency, compliance, and competitive value.
        </p>
      </div>

      <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(13,27,42,0.1)] border border-[rgba(13,27,42,0.1)]">
        {SERVICES.map((svc) => (
          <div key={svc.num} className="svc-card svc-anim">
            <div className="svc-num">{svc.num}</div>
            <h3 className="heading-card mb-3.5">{svc.title}</h3>
            <p className="text-[0.8rem] text-[var(--color-navy-muted)] leading-[1.72]">{svc.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
