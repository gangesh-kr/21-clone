import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export default function FMCG() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fmcg-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="fmcg" ref={sectionRef} className="section section-mid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[5.5rem] items-center">
        <div>
          <div className="eyebrow fmcg-anim">FMCG &amp; Market Penetration</div>
          <h2 className="heading-section mb-8 fmcg-anim">
            Your One-Stop<br/><em>Market Entry Partner</em>
          </h2>
          <span className="fmcg-tag fmcg-anim">For FMCG Companies</span>
          <p className="body-text mb-5 fmcg-anim">
            Are you an FMCG company looking to enter a new market? Twenty1Global goes beyond commodity trading. We leverage our deep regional networks and on-the-ground expertise to help consumer goods brands penetrate two of the world's most dynamic and high-growth markets.
          </p>
          <p className="body-text mb-5 fmcg-anim">
            From regulatory navigation and distributor identification to logistics and localisation strategy — we are your end-to-end partner for market entry, so you can focus on your product while we open the doors.
          </p>
          <div className="fmcg-callout fmcg-anim">
            <p className="font-serif text-[1.05rem] italic text-[var(--color-beige)] leading-[1.6]">
              "Whether you are entering Russia or India for the first time, or scaling an existing presence — we are the bridge between your brand and your market."
            </p>
          </div>
        </div>

        <div className="fmcg-anim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(13,27,42,0.1)] border border-[rgba(13,27,42,0.1)]">
            {[
              { num: 'Market 01', title: 'Russia', text: 'Access one of Europe\'s largest consumer markets through our established CIS network. We navigate regulatory requirements, local distribution channels, and logistics infrastructure to get your product on shelf — efficiently and compliantly.' },
              { num: 'Market 02', title: 'India', text: 'Tap into one of the world\'s fastest-growing FMCG markets with a population of 1.4 billion. We connect you with the right distributors, regional partners, and supply chains to establish a strong, scalable foothold across India.' },
            ].map((country) => (
              <div key={country.num} className="fmcg-country">
                <div className="text-[0.6rem] tracking-[0.28em] uppercase text-[var(--color-navy-soft)] mb-3">{country.num}</div>
                <h4 className="font-serif text-[1.5rem] font-normal text-[var(--color-navy)] mb-2.5">{country.title}</h4>
                <p className="text-[0.8rem] text-[var(--color-navy-muted)] leading-[1.7]">{country.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
