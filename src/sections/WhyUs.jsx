import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

const ADVANTAGES = [
  { roman: 'I', title: 'Strong Global Network', text: 'Established relationships with suppliers and buyers across the Middle East, Asia, Europe, and CIS regions — built on trust and long-term commitment.' },
  { roman: 'II', title: 'Reliable Execution', text: 'Our structured process ensures every transaction is handled with precision from initiation to delivery — with no compromise on quality or timeline.' },
  { roman: 'III', title: 'Competitive Pricing', text: 'Leveraging our network and market intelligence to secure optimal terms for every trade, maximising value for all parties involved.' },
  { roman: 'IV', title: 'Transparent Dealings', text: 'Clarity and integrity at every stage. Trust, once established, is the foundation of all successful long-term trade relationships.' },
  { roman: 'V', title: 'Personalised Approach', text: 'Every client has unique requirements. We tailor our services and strategies to meet your specific needs, goals, and market context.' },
  { roman: 'VI', title: 'Discreet & Professional', text: 'We understand the confidentiality that international trading demands. Our dealings are conducted with the highest level of discretion, always.' },
]

export default function WhyUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why" ref={sectionRef} className="section section-light">
      <div className="eyebrow">Why Choose Us</div>
      <h2 className="heading-section mb-14">
        The Twenty1Global<br/><em>Advantage</em>
      </h2>

      <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ADVANTAGES.map((adv) => (
          <div key={adv.roman} className="why-card why-anim">
            <span className="why-roman">{adv.roman}</span>
            <h3 className="heading-sub mb-2.5">{adv.title}</h3>
            <p className="text-[0.8rem] text-[var(--color-navy-muted)] leading-[1.72]">{adv.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
