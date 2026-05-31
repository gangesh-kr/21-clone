import { motion } from 'framer-motion'

const SERVICES = [
  {
    num: '01',
    title: 'Commodity Sourcing',
    subtitle: 'STRATEGIC RESOURCE ACQUISITION',
    text: 'We identify and procure high-quality energy resources and industrial goods from vetted global suppliers, ensuring supply security and pricing optimization.'
  },
  {
    num: '02',
    title: 'Trade Facilitation',
    subtitle: 'CROSS-BORDER CONTRACTING',
    text: 'Airtight negotiation, contract structuring, legal compliance, and multi-jurisdictional clearing processes for seamless international resource trades.'
  },
  {
    num: '03',
    title: 'Supply Chain Operations',
    subtitle: 'END-TO-END TRANSIT LOGISTICS',
    text: 'Managing complex maritime shipping, customs clearances, storage nodes, and real-time cargo tracking to ensure zero-delay operations.'
  },
  {
    num: '04',
    title: 'Market Penetration Support',
    subtitle: 'GLOBAL EXPANSION INFRASTRUCTURE',
    text: 'Providing global brands and commodity producers with deep local relationships and compliance structures to scale in high-growth networks.'
  }
]

export default function Services() {
  return (
    <section id="services" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24">
          <div className="lg:col-span-6">
            <span className="eyebrow">SERVICES</span>
            <h2 className="heading-section">
              STRUCTURAL TRADE MANAGEMENT.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm text-text-muted font-light leading-relaxed max-w-[500px]">
              We offer institutional trade capability. From negotiation structure and customs clearing to maritime transit compliance, our systems secure seamless resource movements across major continents.
            </p>
          </div>
        </div>

        {/* Vertical typographics lists */}
        <div className="flex flex-col border-b border-border">
          {SERVICES.map((svc, index) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="border-t border-border py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:text-text-primary transition-colors group"
            >
              <div className="lg:col-span-1 text-[11px] tracking-[0.25em] text-text-muted font-mono">
                {svc.num}
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-lg font-sans uppercase tracking-[0.15em] text-text-primary mb-1 font-light">
                  {svc.title}
                </h3>
                <span className="text-[9px] tracking-[0.2em] text-text-muted block">
                  {svc.subtitle}
                </span>
              </div>
              <div className="lg:col-span-6">
                <p className="text-[13px] text-text-muted leading-relaxed font-light">
                  {svc.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
