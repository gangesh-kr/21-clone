import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

const STEPS = [
  { num: '1', title: 'Requirement Analysis', text: 'Understanding precise needs, volumes, and timelines of our clients and partners.' },
  { num: '2', title: 'Supplier Identification', text: 'Sourcing from a vetted global network of reliable, quality-assured commodity suppliers.' },
  { num: '3', title: 'Negotiation & Structuring', text: 'Securing the best terms through expert deal structuring and commercial negotiation.' },
  { num: '4', title: 'Documentation & Compliance', text: 'Full regulatory compliance and airtight documentation across all jurisdictions.' },
  { num: '5', title: 'Logistics & Delivery', text: 'End-to-end coordination of logistics to deliver on time, every time.' },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.proc-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="section section-light">
      <div className="eyebrow">Our Process</div>
      <h2 className="heading-section mb-14">
        Five Steps to<br/><em>Flawless Execution</em>
      </h2>

      <div className="proc-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute top-[1.45rem] left-[10%] right-[10%] h-px bg-[rgba(13,27,42,0.15)]" />

        {STEPS.map((step) => (
          <div key={step.num} className="proc-anim flex flex-col items-center text-center md:flex-col md:items-center md:text-center">
            <div className="proc-num">{step.num}</div>
            <h4 className="heading-sub mb-2">{step.title}</h4>
            <p className="text-[0.77rem] text-[var(--color-navy-muted)] leading-[1.65]">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
